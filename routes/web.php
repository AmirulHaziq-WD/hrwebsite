<?php

use App\Http\Controllers\AdminDashboardController;
use App\Http\Controllers\DepartmentsController;
use App\Http\Controllers\EmployeeLeaveController;
use App\Http\Controllers\PositionsController;
use App\Http\Controllers\StaffsController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'admin'])->group(function () {
    Route::get('/admin/dashboard', [AdminDashboardController::class, 'index'])->name('admin.dashboard');
    Route::get('/departments', [DepartmentsController::class, 'index'])->name('departments.index');
    Route::get('/departments/create', [DepartmentsController::class, 'create'])->name('departments.create');
    Route::post('departments', [DepartmentsController::class, 'store'])->name('departments.store');
    Route::get('/departments/{departments}', [DepartmentsController::class, 'show'])->name('departments.show');

    Route::get('/departments/{departments}/positions/create', [PositionsController::class, 'create'])->name('positions.create');
    Route::post('/departments/{departments}', [PositionsController::class, 'store'])->name('positions.store');

    Route::get('/staffs', [StaffsController::class, 'index'])->name('staffs.index');
    Route::get('/staffs/create', [StaffsController::class, 'create'])->name('staffs.create');
    Route::post('/staffs', [StaffsController::class, 'store'])->name('staffs.store');
    Route::get('/staffs/{staffs}/edit', [StaffsController::class, 'edit'])->name('staffs.edit');
    Route::put('/staffs/{staffs}', [StaffsController::class, 'update'])->name('staffs.update');
    Route::delete('/staffs/{staffs}', [StaffsController::class, 'destroy'])->name('staffs.destroy');
});

Route::middleware(['auth'])->group(function () {
    Route::get('/staffs/dashboard', function () {
        return Inertia::render('staffs/dashboard');
    })->name('staffs.dashboard');
    Route::get('/staffs/leave', [EmployeeLeaveController::class, 'index'])->name('leave.index');
    Route::post('/staffs/leave', [EmployeeLeaveController::class, 'store'])->name('leave.store');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
