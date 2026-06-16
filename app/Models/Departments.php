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

    public function positions()
    {
        return $this->hasMany(Positions::class, 'departments_id');
    }

    public function staffs()
    {
        return $this->hasManyThrough(
            Staffs::class,     // Final model
            Positions::class,  // Intermediate model
            'departments_id',  // Foreign key on positions table
            'position_id',     // Foreign key on staffs table
            'id',              // Local key on departments table
            'id'               // Local key on positions table
        );
    }

    public function getRouteKeyName()
    {
        return 'slug';
    }
}
