<?php

namespace App\Http\Controllers;

use App\Models\AdminDashboard;
use App\Models\Departments;
use App\Models\Staffs;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminDashboardController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $recentHires = Staffs::with([
            'department',
            'position',
        ])
            ->latest()
            ->take(5)
            ->get()
            ->map(function ($staff) {
                return [
                    'name' => $staff->preferredName,
                    'department' => $staff->position?->department?->name ?? '-',
                    'position' => $staff->position?->title ?? '-',
                    'hiredAt' => $staff->created_at->format('d M, Y'),
                ];
            });

        $staffsCountByDepartment = Departments::withCount('positions')
            ->get()
            ->map(function ($department) {

                $staffCount = $department->positions()
                    ->withCount('staffs')
                    ->get()
                    ->sum('staffs_count');

                return [
                    'name' => $department->name,
                    'count' => $staffCount,
                ];
            });

        return Inertia::render('admin/Dashboard/Index', [
            'stats' => [
                'totalStaffs' => Staffs::count(),
                'totalDepartments' => Departments::count(),
                'totalPayroll' => Staffs::sum('salary'),
                'newHires' => Staffs::whereMonth('created_at', '>=', Carbon::now()->month)->whereYear('created_at', Carbon::now()->year)->count(),
                'recentHires' => $recentHires,
                'staffsCountByDepartment' => $staffsCountByDepartment,
            ],

        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(AdminDashboard $adminDashboard)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(AdminDashboard $adminDashboard)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, AdminDashboard $adminDashboard)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(AdminDashboard $adminDashboard)
    {
        //
    }
}
