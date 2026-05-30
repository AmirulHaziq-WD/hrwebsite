<?php

namespace App\Http\Controllers;

use App\Models\Departments;
use App\Models\Positions;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PositionsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Departments $departments)
    {
        return Inertia::render('admin/Positions/Create', [
            'departments' => $departments,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request, Departments $departments)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'basicSalary' => 'required|numeric',
        ]);

        Positions::create([
            'departments_id' => $departments->id,
            'title' => $request->title,
            'basicSalary' => $request->basicSalary,
        ]);

        return redirect()->route('departments.show', $departments->slug)->with('message', 'Position created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Position $position)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Position $position)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Position $position)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Position $position)
    {
        //
    }
}
