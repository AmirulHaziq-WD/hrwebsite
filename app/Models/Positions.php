<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Positions extends Model
{
    protected $fillable = [
        'departments_id',
        'title',
        'basicSalary',
    ];

    public function staffs()
    {
        return $this->hasMany(Staffs::class);
    }

    public function department()
    {
        return $this->belongsTo(Departments::class, 'departments_id');
    }
}
