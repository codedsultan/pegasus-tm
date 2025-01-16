<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Workspace;
use Illuminate\Http\Request;
use Inertia\Inertia;

class WorkspaceController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Workspaces/Index', [
            'workspaces' => Workspace::with('owner')->get(),
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Workspaces/Create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
        ]);

        Workspace::create($request->all());

        return redirect()->route('admin.workspaces.index');
    }

    public function edit(Workspace $workspace)
    {
        return Inertia::render('Admin/Workspaces/Edit', [
            'workspace' => $workspace,
        ]);
    }

    public function update(Request $request, Workspace $workspace)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
        ]);

        $workspace->update($request->all());

        return redirect()->route('admin.workspaces.index');
    }

    public function destroy(Workspace $workspace)
    {
        $workspace->delete();

        return redirect()->route('admin.workspaces.index');
    }

}
