<?php

use App\Http\Controllers\Admin\AuthController;
use App\Http\Controllers\Admin\DashboardController;

use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\Admin\TaskController;
use App\Http\Controllers\Admin\WorkspaceController;
use App\Http\Controllers\Admin\BoardController;
use App\Http\Controllers\Admin\PlanController;
use App\Http\Controllers\Admin\SubscriptionController;
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
            // Route::resource('users', UserController::class);
            Route::get('/users', [UserController::class, 'index'])->name('users.index');
            Route::get('/user/create', [UserController::class, 'create'])->name('users.create');
            Route::post('/users', [UserController::class, 'store'])->name('users.store');
            Route::get('/users/{user}', [UserController::class, 'show'])->name('users.show');
            Route::get('/users/{user}/edit', [UserController::class, 'edit'])->name('users.edit');
            Route::post('/user-update/{user}', [UserController::class, 'update'])->name('users.update');
            Route::delete('/users/{user}', [UserController::class, 'destroy'])->name('users.destroy');

            // Route::resource('workspaces', WorkspaceController::class);
            Route::get('/workspaces', [WorkspaceController::class, 'index'])->name('workspaces.index');
            Route::post('/workspaces', [WorkspaceController::class, 'store'])->name('workspaces.store');
            Route::get('/workspace/create', [WorkspaceController::class, 'create'])->name('workspaces.create'); // Show the workspace details
            Route::get('/workspaces/{workspace}', [WorkspaceController::class, 'show'])->name('workspaces.show');
            Route::get('/workspaces/{workspace}/edit', [WorkspaceController::class, 'edit'])->name('workspaces.edit');
            Route::post('/workspace-update/{workspace}', [WorkspaceController::class, 'update'])->name('workspaces.update');
            Route::delete('/workspaces/{workspace}', [WorkspaceController::class, 'destroy'])->name('workspaces.destroy');
            // Route::resource('boards', BoardController::class);
            Route::get('/boards', [BoardController::class, 'index'])->name('boards.index');
            Route::post('/boards', [BoardController::class, 'store'])->name('boards.store');
            Route::get('/board/create', [BoardController::class, 'create'])->name('boards.create'); // Show the board details
            Route::get('/boards/{board}', [BoardController::class, 'show'])->name('boards.show');
            Route::get('/boards/{board}/edit', [BoardController::class, 'edit'])->name('boards.edit');
            Route::post('/board-update/{board}', [BoardController::class, 'update'])->name('boards.update');
            Route::delete('/boards/{board}', [BoardController::class, 'destroy'])->name('boards.destroy');

            // Route::resource('tasks', TaskController::class);
            Route::get('/tasks', [TaskController::class, 'index'])->name('tasks.index');
            Route::post('/tasks', [TaskController::class, 'store'])->name('tasks.store');
            Route::get('/task/create', [TaskController::class, 'create'])->name('tasks.create'); // Show the task details
            Route::get('/tasks/{task}', [TaskController::class, 'show'])->name('tasks.show');
            Route::get('/tasks/{task}/edit', [TaskController::class, 'edit'])->name('tasks.edit');
            Route::post('/task-update/{task}', [TaskController::class, 'update'])->name('tasks.update');
            Route::delete('/tasks/{task}', [TaskController::class, 'destroy'])->name('tasks.destroy');

            // Route::resource('plans', PlanController::class);
            Route::get('/plans', [PlanController::class, 'index'])->name('plans.index');
            Route::post('/plans', [PlanController::class, 'store'])->name('plans.store');
            Route::get('/plan/create', [PlanController::class, 'create'])->name('plans.create'); // Show the plan details
            Route::get('/plans/{plan}', [PlanController::class, 'show'])->name('plans.show');
            Route::get('/plans/{plan}/edit', [PlanController::class, 'edit'])->name('plans.edit');
            Route::post('/plan-update/{plan}', [PlanController::class, 'update'])->name('plans.update');
            Route::delete('/plans/{plan}', [PlanController::class, 'destroy'])->name('plans.destroy');

            // Route::resource('subscriptions', SubscriptionController::class);
            Route::get('/subscriptions', [SubscriptionController::class, 'index'])->name('subscriptions.index');
            Route::post('/subscriptions', [SubscriptionController::class, 'store'])->name('subscriptions.store');
            Route::get('/subscription/create', [SubscriptionController::class, 'create'])->name('subscriptions.create'); // Show the subscription details
            Route::get('/subscriptions/{subscription}', [SubscriptionController::class, 'show'])->name('subscriptions.show');
            Route::get('/subscriptions/{subscription}/edit', [SubscriptionController::class, 'edit'])->name('subscriptions.edit');
            Route::post('/subscription-update/{subscription}', [SubscriptionController::class, 'update'])->name('subscriptions.update');
            Route::delete('/subscriptions/{subscription}', [SubscriptionController::class, 'destroy'])->name('subscriptions.destroy');
            // Route::resource('subscriptions', SubscriptionController::class);

        });
    // });
});
