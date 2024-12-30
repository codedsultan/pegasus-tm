<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\Password;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        // dd($request->all());

        $data = $request->validate([
            'first_name' => ['required'],
            'last_name' => ['required'],
            'email' => ['required', 'email', Rule::unique('users', 'email')],
            // 'phone' => ['sometimes'],
            'password' => ['required'],
            'accept_terms' => ['required', 'accepted'],

        ], [
            'first_name.required' => 'Please enter first name',
            'last_name.required' => 'Please enter last name',
            'email.required' => 'Please enter email.',
            'email.email' => 'Please enter a valid email.',
            'email.unique' => 'The provided email is already registered.',
        ]);

        if (! $data['accept_terms']) {
            return redirect()->route('register')->withErrors([
                'accept_terms' => 'You must accept the terms and conditions to continue.',
            ]);
        }

        $user = User::create([
            'name' => $request->first_name.' '.$request->last_name,
            'first_name' => $request->first_name,
            'last_name' => $request->last_name,
            'email' => $request->email,
            'password' => bcrypt($request->password),

        ]);

        event(new Registered($user));

        Auth::login($user);

        return redirect()->intended('/dashboard');


    }


    public function login(Request $request)
    {
        $request->validate([
            'username' => 'required|email',
            'password' => 'required',
        ]);

        // use the email as the username
        $request->merge(['email' => $request->username]);

        if (!Auth::attempt($request->only('email', 'password'), $request->boolean('remember'))) {
            return back()->withErrors([
                'email' => 'The provided credentials do not match our records.',
            ]);
        }

        $request->session()->regenerate();

        return redirect()->intended('/dashboard');
    }

    public function destroy(Request $request)
    {
        Auth::guard('web')->logout();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect('/');
    }

}
