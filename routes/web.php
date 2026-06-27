<?php

use App\Http\Controllers\AdminDashboardController;
use App\Http\Controllers\AdminLeaveController;
use App\Http\Controllers\DepartmentsController;
use App\Http\Controllers\EmployeeLeaveController;
use App\Http\Controllers\PositionsController;
use App\Http\Controllers\StaffsController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'admin'])->prefix('admin')->group(function () {
    Route::get('/dashboard', [AdminDashboardController::class, 'index'])->name('admin.dashboard');
    Route::get('/departments', [DepartmentsController::class, 'index'])->name('departments.index');
    Route::get('/departments/create', [DepartmentsController::class, 'create'])->name('departments.create');
    Route::post('departments', [DepartmentsController::class, 'store'])->name('departments.store');
    Route::get('/departments/{departments}', [DepartmentsController::class, 'show'])->name('departments.show');

    Route::get('/departments/{departments}/positions/create', [PositionsController::class, 'create'])->name('positions.create');
    Route::post('/departments/{departments}', [PositionsController::class, 'store'])->name('positions.store');

    Route::get('/list-staffs', [StaffsController::class, 'index'])->name('staffs.index');
    Route::get('/list-staffs/create', [StaffsController::class, 'create'])->name('staffs.create');
    Route::post('/list-staffs', [StaffsController::class, 'store'])->name('staffs.store');
    Route::get('/list-staffs/{staffs}/edit', [StaffsController::class, 'edit'])->name('staffs.edit');
    Route::put('/list-staffs/{staffs}', [StaffsController::class, 'update'])->name('staffs.update');
    Route::delete('/list-staffs/{staffs}', [StaffsController::class, 'destroy'])->name('staffs.destroy');

    Route::get('/leave-requests', [AdminLeaveController::class, 'index'])->name('admin-leave.index');
    Route::patch('/leave-requests/{leaveRequest}/approve', [AdminLeaveController::class, 'approve'])->name('admin-leave.approve');
    Route::patch('/leave-requests/{leaveRequest}/reject', [AdminLeaveController::class, 'reject'])->name('admin-leave.reject');
});

Route::middleware(['auth'])->prefix('staffs')->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('staffs/dashboard');
    })->name('staffs.dashboard');
    Route::get('/leave', [EmployeeLeaveController::class, 'index'])->name('leave.index');
    Route::post('/leave', [EmployeeLeaveController::class, 'store'])->name('leave.store');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
