<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Staffs extends Model
{
    protected $fillable = [
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

    public function department()
    {
        return $this->belongsTo(Departments::class);
    }

    public function position()
    {
        return $this->belongsTo(Positions::class);
    }

    public function attendance()
    {
        // return $this->hasMany(Attendance::class);
    }
}
