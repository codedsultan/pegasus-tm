<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class AuthController extends Controller
{

    public function loginForm()
    {
        return Inertia::render('auth/AdminLogin');
    }
    public function login(Request $request)
    {
        $request->validate([
            'username' => 'required|email',
            'password' => 'required',
        ]);

        // use the email as the username
        $request->merge(['email' => $request->username]);

        //
        if (Auth::guard('admin')->attempt($request->only('email', 'password'))) {
            $request->session()->regenerate(); // Ensure session is regenerated
            // return redirect()->intended('admin/dashboard');
            return redirect()->route('admin.dashboard');
        }
        // $request->session()->regenerate();
        // return redirect()->route('admin.login');
        // return redirect()->intended('admin/dashboard');
        return back()->withErrors([
            'email' => 'The provided credentials do not match our records.',
        ]);
    }

    public function logout(Request $request)
    {
        // dd('logout');
        Auth::guard('admin')->logout(); // Log out the admin user

        $request->session()->invalidate(); // Invalidate the session
        $request->session()->regenerateToken(); // Regenerate the CSRF token

        // return redirect()->route('admin.login'); // Redirect to the login page
    }
}
