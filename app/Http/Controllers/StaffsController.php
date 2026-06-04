<?php

namespace App\Http\Controllers;

use App\Models\Departments;
use App\Models\Staffs;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class StaffsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $staffs = Staffs::all();

        return Inertia::render('admin/Staffs/Index', compact('staffs'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $departments = Departments::with('positions')
            ->orderBy('name')
            ->get();

        return Inertia::render('admin/Staffs/Create', [
            'departments' => $departments,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'firstName' => 'required|string|max:255',
            'lastName' => 'required|string|max:255',
            'preferredName' => 'required|string|max:255',
            'ic' => 'required|string|min:12|max:12|unique:staffs,ic',
            'age' => 'required|integer|min:18|max:60',
            'gender' => 'required',
            'phoneNumber' => 'required|string|min:10|max:11|unique:staffs,phoneNumber',
            'email' => 'required|string|email|max:255|unique:staffs,email',
            'address.address1' => 'required|string',
            'address.address2' => 'nullable|string',
            'address.postalCode' => 'required|string|max:5',
            'address.city' => 'required|string',
            'address.state' => 'required|string',
        ]);

        Staffs::create([
            'firstName' => $request->firstName,
            'lastName' => $request->lastName,
            'preferredName' => $request->preferredName,
            'ic' => $request->ic,
            'age' => $request->age,
            'gender' => $request->gender,
            'phoneNumber' => $request->phoneNumber,
            'email' => $request->email,
            'address' => $request->address,
            'salary' => $request->salary,
            'position_id' => $request->position_id,
        ]);

        return redirect()->route('staffs.index')->with('message', 'Staff created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Staffs $staffs)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Staffs $staffs)
    {
        $staffs->load('position.department');
        $departments = Departments::with('positions')->get();

        return Inertia::render('admin/Staffs/Edit', [
            'staffs' => $staffs,
            'departments' => $departments,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Staffs $staffs)
    {
        $request->validate([
            'firstName' => 'required|string|max:255',
            'lastName' => 'required|string|max:255',
            'preferredName' => 'required|string|max:255',
            'ic' => [
                'required',
                'string',
                'min:12',
                'max:12',
                Rule::unique('staffs', 'ic')->ignore($staffs->id),
            ],
            'age' => 'required|integer|min:18|max:60',
            'gender' => 'required',
            'phoneNumber' => [
                'required',
                'string',
                'min:10',
                'max:11',
                Rule::unique('staffs', 'phoneNumber')->ignore($staffs->id),
            ],
            'email' => [
                'required',
                'email',
                'max:255',
                Rule::unique('staffs', 'email')->ignore($staffs->id),
            ],
            'address.address1' => 'required|string',
            'address.address2' => 'nullable|string',
            'address.postalCode' => 'required|string|max:5',
            'address.city' => 'required|string',
            'address.state' => 'required|string',
            'salary' => 'required|numeric|min:0',
            'position_id' => 'required|exists:positions,id',
        ]);

        $staffs->update([
            'firstName' => $request->input('firstName'),
            'lastName' => $request->input('lastName'),
            'preferredName' => $request->input('preferredName'),
            'ic' => $request->input('ic'),
            'age' => $request->input('age'),
            'gender' => $request->input('gender'),
            'phoneNumber' => $request->input('phoneNumber'),
            'email' => $request->input('email'),
            'address' => $request->input('address'),
            'salary' => $request->salary,
            'position_id' => $request->position_id,
        ]);

        return redirect()->route('staffs.index')->with('message', 'Staff updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Staffs $staffs)
    {
        $staffs->delete();

        return redirect()->route('staffs.index')->with('message', 'Staff deleted successfully.');
    }
}
