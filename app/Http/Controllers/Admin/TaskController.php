<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Task;
use App\Models\Board;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TaskController extends Controller
{
    // Display a listing of the tasks
    public function index()
    {
        // Fetch all tasks with their related board data
        $tasks = Task::with('board')->get();

        // Return tasks data to the Inertia view
        return Inertia::render('Admin/Tasks/Index', [
            'tasks' => $tasks
        ]);
    }

    // Show the form for creating a new task
    public function create()
    {
        // Get all boards to associate with the new task
        $boards = Board::all();

        return Inertia::render('Admin/Tasks/Create', [
            'boards' => $boards
        ]);
    }

    // Store a newly created task in storage
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'board_id' => 'required|exists:boards,id',  // Ensures the board exists
        ]);

        // Create the new task
        Task::create($request->all());

        // Redirect back to the task index
        return redirect()->route('admin.tasks.index');
    }

    // Show the form for editing the specified task
    public function edit(Task $task)
    {
        // Get all boards to allow the user to change the board
        $boards = Board::all();

        return Inertia::render('Admin/Tasks/Edit', [
            'task' => $task,
            'boards' => $boards
        ]);
    }

    // Update the specified task in storage
    public function update(Request $request, Task $task)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'board_id' => 'required|exists:boards,id',  // Ensures the board exists
        ]);

        // Update the task with the new data
        $task->update($request->all());

        // Redirect back to the task index
        return redirect()->route('admin.tasks.index');
    }

    // Remove the specified task from storage
    public function destroy(Task $task)
    {
        $task->delete();

        return redirect()->route('admin.tasks.index');
    }
}
