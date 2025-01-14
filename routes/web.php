<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\BoardTaskController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\PasswordController;
use App\Http\Controllers\WorkspaceController;
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

    Route::get('/dashboard', [WorkspaceController::class, 'index'])->name('dashboard.index');

});


Route::post('forgot-password', [PasswordController::class, 'sendResetLink'])
    ->name('password.email');

Route::get('reset-password/{token}', [PasswordController::class, 'showResetForm'])
    ->name('password.reset');

Route::post('reset-password', [PasswordController::class, 'resetPassword'])
    ->name('password.update');

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

Route::get('/phpinfo', function () {
    phpinfo();
});

Route::middleware('auth')->group(function () {
    Route::post('/comments', [CommentController::class, 'store'])->name('comments.store');
    Route::get('/comments/{comment}', [CommentController::class, 'show'])->name('comments.show');
    Route::delete('/comments/{comment}', [CommentController::class, 'destroy'])->name('comments.destroy');
    Route::get('/comments/{comment}/replies', [CommentController::class, 'getReplies'])->name('comments.getReplies');
    Route::post('/comments/{comment}/replies', [CommentController::class, 'storeReply'])->name('comments.storeReply');
});

Route::middleware(['auth'])->group(function () {
    Route::get('/workspaces', [WorkspaceController::class, 'index'])->name('workspaces.index');
    Route::get('/workspaces/create', [WorkspaceController::class, 'create'])->name('workspaces.create');
    Route::post('/workspaces', [WorkspaceController::class, 'store'])->name('workspaces.store');
    Route::get('/workspaces/{workspace}', [WorkspaceController::class, 'show'])->name('workspaces.show');
    Route::post('/workspaces/{workspace}/boards', [WorkspaceController::class, 'storeBoard'])->name('workspaces.board.create');
    Route::get('/workspaces/{workspace}/boards/{board}', [WorkspaceController::class, 'showWorkspaceBoard'])->name('workspaces.board.show');

});

Route::middleware(['auth', 'verified'])->prefix('workspaces/{workspace}/boards/{board}')->group(function () {

    Route::get('/tasks', [BoardTaskController::class, 'index'])->name('board.tasks.index');
    Route::post('/tasks', [BoardTaskController::class, 'store'])->name('boards.task.store');
    // Route::post('/tasks/{task}', [BoardTaskController::class, 'update'])->name('board.tasks.update');
    Route::post('/tasks/{task}/upload-file', [BoardTaskController::class, 'uploadFile'])->name('board.tasks.uploadFile');
    Route::post('/tasks/{task}/upload-files', [BoardTaskController::class, 'uploadFiles'])->name('board.tasks.uploadFiles');
    Route::delete('/tasks/delete-file/{mediaId}', [BoardTaskController::class, 'deleteFile'])->name('board.tasks.deleteFile');
    Route::patch('/tasks/{task}/archive', [BoardTaskController::class, 'archive'])->name('board.tasks.archive');
    Route::patch('/tasks/{task}/unarchive', [BoardTaskController::class, 'unarchive'])->name('board.tasks.unarchive');
    Route::post('/tasks/{task}', [BoardTaskController::class, 'updateTask'])->name('board.tasks.update');
    Route::post('/update-tasks', [BoardTaskController::class, 'updateTasks'])->name('board.update-tasks');
    Route::delete('/task-delete/{id}', [BoardTaskController::class, 'destroy'])->name('board.task.delete');
});

require __DIR__.'/../routes/admin.php';
