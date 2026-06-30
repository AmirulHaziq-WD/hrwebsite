<?php

use App\Models\User;

test('guests are redirected to the login page', function () {
    $this->get('/dashboard')->assertRedirect('/login');
});

test('employee can visit dashboard', function () {

    $user = User::factory()->create([
        'role' => 'employee',
    ]);

    $response = $this->actingAs($user)
        ->get('/staffs/dashboard');

    $response->assertOk();
});

test('admin can visit dashboard', function () {

    $user = User::factory()->create([
        'role' => 'admin',
    ]);

    $response = $this->actingAs($user)
        ->get('/admin/dashboard');

    $response->assertOk();
});
