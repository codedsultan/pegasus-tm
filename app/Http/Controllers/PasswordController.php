<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Password;
use Inertia\Inertia;

class PasswordController extends Controller
{
    public function sendResetLink(Request $request)
    {
        $request->validate([
            'username' => 'required|email',
        ]);

        $request->merge([
            'email' => $request->username,
        ]);
        // Use the Password facade to send the reset link
        $status = Password::sendResetLink(
            $request->only('email')
        );

        return $status === Password::RESET_LINK_SENT
            ? back()->with(['status' => __($status)])
            : back()->withErrors(['email' => __($status)]);
    }

    // Show the reset password form
    public function showResetForm(Request $request, string $token)
    {
        return Inertia::render('auth/PasswordResetForm', [
            'token' => $token,
            'email' => $request->email
        ]);
    }

    // Handle the reset password form submission
    public function resetPassword(Request $request)
    {
        $request->validate([
            'token' => 'required',
            'email' => 'required|email',
            'password' => 'required|min:8|confirmed',
        ]);

        // dd($request->all());
        $status = Password::reset(
            $request->only('email', 'password', 'password_confirmation', 'token'),
            function ($user, $password) {
                $user->forceFill([
                    'password' => bcrypt($password)
                ])->save();
            }
        );

        return $status === Password::PASSWORD_RESET
            ? redirect()->route('login')->with('status', __($status))
            : back()->withErrors(['email' => __($status)]);
    }
}
