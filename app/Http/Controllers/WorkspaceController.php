<?php

namespace App\Http\Controllers;

use App\Models\Board;
use App\Models\Task;
use App\Models\User;
use App\Models\Workspace;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class WorkspaceController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $workspaces = $request->user()->workspaces()->with('boards.tasks')->get();
        return Inertia::render('dashboard/index', ['workspaces' => $workspaces]);
        // return Inertia::render('Workspaces/Index', ['workspaces' => $workspaces]);
    }

    public function store(Request $request)
    {
        $data = $request->validate(['name' => 'required|string|max:255']);
        $request->user()->workspaces()->create($data);
        return redirect()->back()->with('success', 'Workspace created successfully.');
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('WorkspaceForm');
    }



    public function storeBoard(Request $request, Workspace $workspace)
    {
        $data = $request->validate(['name' => 'required|string|max:255']);
        $workspace->boards()->create($data);
        return redirect()->back()->with('success', 'Board created successfully.');
    }


    public function showWorkspaceBoard(Request $request,Workspace $workspace, Board $board)
    {
        $board->load('tasks');

        $tasks = Task::with('assignees')->get();
        $id = $request->get('task');
        $task = Task::find($id);
        $activeTasks = Task::active()->get();
        $archivedTasks = Task::archived()->get();


        // dd($task);
        // $task?->load('assignees:id');
        // $assigneeIds = Task::findOrFail($id)
        // ->assignees() // Relationship method
        // ->pluck('users.id') // Pluck only the IDs
        // ->toArray();
        // dd($assigneeIds);
        // dd($task->assignee_ids);
        $assignees = User::all();
        // dd($tasks);

        return Inertia::render('board/index', [
            'board' => $board,
            'workspace' => $workspace,
            'title' => 'Board Task Board',
            'description' => 'Attex React is a free and open-source admin dashboard template built with React and Tailwind CSS. It is designed to be easily customizable and includes a wide range of features and components to help you build your own dashboard quickly and efficiently.',
            'tasks' => $board->tasks,
            'task' =>
            // Inertia::defer(
                fn () => $request->has('task') ? $task?->load(['assignees','media','comments.user','comments.replies.user']) : null,
            // ),

            'assignees' =>
            // Inertia::defer(
                fn () => $request->has('task') ? $assignees : null
            // ),
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Workspace $workspace)
    {
        $workspace->load('boards'); // Eager load boards
        return Inertia::render('workspace/index', [
            'workspace' => $workspace,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Workspace $workspace)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Workspace $workspace)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Workspace $workspace)
    {
        //
    }
}
