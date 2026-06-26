<?php

namespace Database\Seeders;

use App\Models\LeaveType;
use Illuminate\Database\Seeder;

class LeaveTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        LeaveType::updateOrCreate(
            ['name' => 'Annual Leave'],
            ['default_days' => 14]
        );

        LeaveType::updateOrCreate(
            ['name' => 'Medical Leave'],
            ['default_days' => 14]
        );

        LeaveType::updateOrCreate(
            ['name' => 'Emergency Leave'],
            ['default_days' => 3]
        );

        LeaveType::updateOrCreate(
            ['name' => 'Unpaid Leave'],
            ['default_days' => 0]
        );
    }
}
