<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class LeaveRequest extends Model
{
    protected $fillable = [
        'staff_id',
        'leave_type_id',
        'start_date',
        'end_date',
        'reason',
        'status',
    ];

    public function staff()
    {
        return $this->belongsTo(Staffs::class);
    }

    public function leaveType()
    {
        return $this->belongsTo(LeaveType::class);
    }
}
