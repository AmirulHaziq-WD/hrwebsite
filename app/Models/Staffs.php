<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Staffs extends Model
{
    protected $fillable = [
        'user_id',
        'staff_id',
        'firstName',
        'lastName',
        'preferredName',
        'ic',
        'age',
        'gender',
        'phoneNumber',
        'email',
        'address',
        'salary',
        'position_id',
    ];

    protected $casts = [
        'address' => 'array',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function department()
    {
        return $this->belongsTo(Departments::class);
    }

    public function position()
    {
        return $this->belongsTo(Positions::class, 'position_id');
    }

    public function leaveRequests()
    {
        return $this->hasMany(LeaveRequest::class);
    }

    public function attendance()
    {
        // return $this->hasMany(Attendance::class);
    }
}
