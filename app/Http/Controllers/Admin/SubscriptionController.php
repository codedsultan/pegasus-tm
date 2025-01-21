<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Subscription;
use App\Models\Plan;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SubscriptionController extends Controller
{
    public function index()
    {
        $subscriptions = Subscription::with(['user', 'plan'])->get();

        return Inertia::render('Admin/Subscriptions/Index', [
            'subscriptions' => $subscriptions,
        ]);
    }

    public function create()
    {
        $plans = Plan::where('status', 'active')->get();
        $users = User::all();

        return Inertia::render('Admin/Subscriptions/Create', [
            'plans' => $plans,
            'users' => $users,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'user_id' => 'required|exists:users,id',
            'plan_id' => 'required|exists:plans,id',
            'started_at' => 'required|date',
            'ends_at' => 'nullable|date|after:started_at',
        ]);

        Subscription::create($request->all());

        return redirect()->route('admin.subscriptions.index')->with('success', 'Subscription created successfully.');
    }

    public function edit($id)
    {
        $subscription = Subscription::with('user', 'plan')->findOrFail($id);
        $plans = Plan::where('status', 'active')->get();
        $users = User::all();

        return Inertia::render('Admin/Subscriptions/Edit', [
            'subscription' => $subscription,
            'plans' => $plans,
            'users' => $users,
        ]);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'user_id' => 'required|exists:users,id',
            'plan_id' => 'required|exists:plans,id',
            'status' => 'required|in:active,cancelled,paused',
            'started_at' => 'required|date',
            'ends_at' => 'nullable|date|after:started_at',
        ]);

        $subscription = Subscription::findOrFail($id);
        $subscription->update($request->all());

        return redirect()->route('admin.subscriptions.index')->with('success', 'Subscription updated successfully.');
    }

    public function destroy($id)
    {
        $subscription = Subscription::findOrFail($id);
        $subscription->delete();

        return redirect()->route('admin.subscriptions.index')->with('success', 'Subscription deleted successfully.');
    }
}
