<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Foundation\Http\Middleware\VerifyCsrfToken;
use Illuminate\Support\Facades\Route;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
        // then: function () {
        //     // $this->loadRoutesFrom(__DIR__.'/../routes/admin.php');
        //     Route::group(['prefix' => 'admin'], function () {
        //         require __DIR__.'/../routes/admin.php';
        //     });
        // }
    )
    ->withMiddleware(function (Middleware $middleware) {
        //
        // $middleware->append(VerifyCsrfToken::class);
        $middleware->web([

            \App\Http\Middleware\HandleInertiaRequests::class,
            \Illuminate\Http\Middleware\AddLinkHeadersForPreloadedAssets::class,
        ]);

        $middleware->redirectGuestsTo(function () {
            if (str_starts_with(request()->path(), 'admin')) {
                return route('admin.login');
            }

            return route('login');
        });

        $middleware->alias([
            'guest.admin' => \App\Http\Middleware\RedirectIfAuthenticatedAdmin::class,
            'auth.admin' => \App\Http\Middleware\AdminMiddleware::class,
            // 'admin' => \App\Http\Middleware\AdminMiddleware::class,
        ]);
    })

    ->withExceptions(function (Exceptions $exceptions) {
        //
    })->create();
