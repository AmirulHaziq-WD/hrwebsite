<?php

namespace App\Http\Controllers;

use App\Models\LeaveRequest;
use App\Models\LeaveType;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class EmployeeLeaveController extends Controller
{
    public function index()
    {
        $staff = Auth::user()->staff;

        return Inertia::render('staffs/EmployeeLeave/Index', [
            'staff' => $staff,

            'leaveTypes' => LeaveType::all(),

            'leaveRequests' => LeaveRequest::with('leaveType')
                ->where('staff_id', $staff->id)
                ->latest()
                ->get(),
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'staff_id' => 'required|exists:staffs,id',
            'leave_type_id' => 'required|exists:leave_types,id',
            'start_date' => 'required|date',
            'end_date' => 'required|date|after_or_equal:start_date',
            'reason' => 'required|string|max:500',
        ]);

        LeaveRequest::create([
            'staff_id' => $request->staff_id,
            'leave_type_id' => $request->leave_type_id,
            'start_date' => $request->start_date,
            'end_date' => $request->end_date,
            'reason' => $request->reason,
            'status' => 'pending',
        ]);

        return redirect()->route('leave.index')->with('success', 'Leave submitted.');
    }
}
