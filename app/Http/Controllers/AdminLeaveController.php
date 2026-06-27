<?php

namespace App\Http\Controllers;

use App\Models\LeaveRequest;
use Inertia\Inertia;

class AdminLeaveController extends Controller
{
    public function index()
    {
        $leaveRequests = LeaveRequest::with([
            'staff',
            'leaveType',
        ])
            ->latest()
            ->get();

        return Inertia::render(
            'admin/LeaveRequests/Index',
            [
                'leaveRequests' => $leaveRequests,
            ]
        );
    }

    public function approve(LeaveRequest $leaveRequest)
    {
        $leaveRequest->update([
            'status' => 'approved',
        ]);

        return back()->with(
            'success',
            'Leave approved.'
        );
    }

    public function reject(LeaveRequest $leaveRequest)
    {
        $leaveRequest->update([
            'status' => 'rejected',
        ]);

        return back()->with(
            'success',
            'Leave rejected.'
        );
    }
}
