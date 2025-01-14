<?php

use App\Http\Controllers\Admin\AuthController;
use App\Http\Controllers\Admin\DashboardController;

use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\Admin\TaskController;
use App\Http\Controllers\Admin\WorkspaceController;
use App\Http\Controllers\Admin\BoardController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::prefix('admin')->name('admin.')->group(function () {
    // Route::middleware(['web'])->group(function () {
        Route::middleware(['guest:admin'])->group(function () {
            Route::get('/login', [AuthController::class, 'loginForm'])->name('login');
            Route::post('/login', [AuthController::class, 'login'])->name('login');

        });

        Route::middleware(['auth:admin'])->group(function () {
            Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
            Route::post('/logout', [AuthController::class, 'logout'])->name('logout');
            // Admin CRUD routes
            Route::resource('users', UserController::class);
            Route::resource('workspaces', WorkspaceController::class);
            Route::resource('boards', BoardController::class);
            Route::resource('tasks', TaskController::class);
        });
    // });
});
