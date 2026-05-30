<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Departments extends Model
{
    protected $fillable = [
        'name',
        'slug',
        'code',
        'description',
    ];

    public function staffs()
    {
        return $this->hasMany(Staffs::class);
    }

    public function positions()
    {
        return $this->hasMany(Positions::class, 'departments_id');
    }

    public function getRouteKeyName()
    {
        return 'slug';
    }
}
