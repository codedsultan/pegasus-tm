<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class EmailVerificationController extends Controller
{
    public function verify(Request $request)
    {
        $user = $request->user();

        if (!$user->hasVerifiedEmail()) {
            $user->markEmailAsVerified();
            Auth::login($user); // Auto-login after email verification
        }

        return redirect('/dashboard');
    }
}
