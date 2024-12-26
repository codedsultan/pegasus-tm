<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Route::get('/', function () {
//     return view('welcome');
// });


Route::get('/', function () {
    return Inertia::render('Home', [
        'message' => 'Hello from Laravel!',
    ]);
});


Route::get('/login', function () {
    return Inertia::render('auth/Login', [
        'message' => 'Hello from Laravel!',
    ]);
});

Route::get('/register', function () {
    return Inertia::render('auth/Register', [
        'message' => 'Hello from Laravel!',
    ]);
});

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

Route::get('/recover-password', function () {
    return Inertia::render('auth/RecoverPassword', [
        'message' => 'Hello from Laravel!',
    ]);
});

Route::get('/logout', function () {
    return Inertia::render('auth/Logout', [
        'message' => 'Hello from Laravel!',
    ]);
});
