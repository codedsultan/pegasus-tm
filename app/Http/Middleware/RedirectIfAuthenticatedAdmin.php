<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class RedirectIfAuthenticatedAdmin
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next)
    {
        // // Check if the admin guard is authenticated
        // if (Auth::guard('admin')->check()) {
        //     // Redirect to admin dashboard
        //     return redirect('/admin/dashboard');
        // }

        return $next($request);
    }
}

