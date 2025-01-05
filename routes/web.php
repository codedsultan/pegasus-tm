<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\PasswordController;
use App\Http\Controllers\TaskController;
use Illuminate\Foundation\Auth\EmailVerificationRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Route::get('/', function () {
//     return view('welcome');
// });

Route::get('/home', function () {
    return Inertia::render('Home', [
        'message' => 'Hello from Laravel!',
    ]);
});

Route::get('/', function () {
    return Inertia::render('Home', [
        'message' => 'Hello from Laravel!',
    ]);
});


Route::get('/login', function () {
    return Inertia::render('auth/Login', [
        'message' => 'Hello from Laravel!',
    ]);
})->middleware(['guest'])->name('login');

Route::post('/login', [AuthController::class,'login'])->name('login');

Route::get('/register', function () {
    return Inertia::render('auth/Register', [
        'message' => 'Hello from Laravel!',
    ]);
});

Route::post('/register', [AuthController::class,'register'])->name('register');


Route::get('/lock-screen', function () {
    return Inertia::render('auth/LockScreen', [
        'message' => 'Hello from Laravel!',
    ]);
});

Route::get('/confirm-mail', function () {
    return Inertia::render('auth/ConfirmMail', [
        'message' => 'Hello from Laravel!',
    ]);
});

Route::get('/forgot-password', function () {
    return Inertia::render('auth/RecoverPassword', [
        'message' => 'Hello from Laravel!',
    ]);
});

Route::get('/recover-password', function () {
    return Inertia::render('auth/RecoverPassword', [
        'message' => 'Hello from Laravel!',
    ]);
});
// forgot-password

Route::get('/logout', function () {
    return Inertia::render('auth/Logout', [
        'message' => 'Hello from Laravel!',
    ]);
});
// Route::get('/email/verify', function () {
//     return inertia('Auth/VerifyEmail');
// })->middleware('auth')->name('verification.notice');
Route::get('/email/verify', function () {
    return inertia('auth/VerifyEmail');
})->middleware('auth')->name('verification.notice');

Route::get('/email/verify/{id}/{hash}', function (EmailVerificationRequest $request) {
    $request->fulfill();
    return redirect('/dashboard');
})->middleware(['auth', 'signed'])->name('verification.verify');

Route::post('/email/resend', function (Request $request) {
    $request->user()->sendEmailVerificationNotification();
    return back()->with('status', 'verification-link-sent');
})->middleware(['auth', 'throttle:6,1'])->name('verification.send');


Route::middleware(['auth', 'verified'])->group(function () {

    Route::get('/dashboard', function () {
        return Inertia::render('dashboard/Analytics/index', [
            'message' => 'Hello from Laravel!',
        ]);
    });
});

// use App\Http\Controllers\PasswordController;

Route::post('forgot-password', [PasswordController::class, 'sendResetLink'])
    ->name('password.email');

Route::get('reset-password/{token}', [PasswordController::class, 'showResetForm'])
    ->name('password.reset');

Route::post('reset-password', [PasswordController::class, 'resetPassword'])
    ->name('password.update');
// use Illuminate\Support\Facades\Password;

// Route::post('/forgot-password', [PasswordController::class, 'sendResetLink'])->name('password.email');
// Route::post('/reset-password', [PasswordController::class, 'reset'])->name('password.update');

Route::post('/logout', [AuthController::class, 'destroy'])->name('logout');


Route::get('/profile', function () {
    return Inertia::render('other/Profile/index', [
        'message' => 'Hello from Laravel!',
    ]);
});

Route::get('/starter', function () {
    return Inertia::render('other/Starter', [
        'message' => 'Hello from Laravel!',
    ]);
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/boards',[TaskController::class, 'index'])->name('boards.index');
    Route::post('/boards/task/update', [TaskController::class, 'updateTask'])->name('boards.task.update');
    Route::post('/boards/update-tasks', [TaskController::class, 'updateTasks'])->name('boards.update-tasks');
});
// Task Routes
// Route::get('/items', [TaskController::class, 'index'])->name('items.index');
// Route::get('/items/create', [TaskController::class, 'create'])->name('items.create');
// Route::post('/items', [TaskController::class, 'store'])->name('items.store');
// Route::get('/items/{item}/edit', [TaskController::class, 'edit'])->name('items.edit');
// Route::put('/items/{item}', [TaskController::class, 'update'])->name('items.update');
// Route::delete('/items/{item}', [TaskController::class, 'destroy'])->name('items.destroy');

Route::middleware(['auth', 'verified'])->group(function () {
Route::get('/tasks', [TaskController::class, 'index'])->name('tasks.index');
Route::post('/tasks', [TaskController::class, 'store'])->name('tasks.store');
Route::patch('/tasks/{task}', [TaskController::class, 'update'])->name('tasks.update');
});
