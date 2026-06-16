<?php

namespace App\Http\Controllers;

use App\Models\Departments;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;

class DepartmentsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {

        $departments = Departments::withCount('staffs')->orderBy('name')->get();

        return Inertia::render('admin/Departments/Index', [
            'departments' => $departments,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('admin/Departments/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'code' => 'required|string|max:5',
            'description' => 'required|string|min:40',
        ]);

        Departments::create([
            'name' => $request->name,
            'code' => $request->code,
            'description' => $request->description,
            'slug' => Str::slug($request->name),
        ]);

        return redirect()->route('departments.index')->with('message', 'Department created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Departments $departments)
    {
        $departments->load([
            'positions',
            'positions.staffs.position',
        ]);

        return Inertia::render('admin/Departments/Show', [
            'departments' => $departments,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Departments $departments)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Departments $departments)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Departments $departments)
    {
        //
    }
}
