<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Board;
use App\Models\Workspace;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BoardController extends Controller
{
    // Display a listing of the boards
    public function index()
    {
        // Fetch all boards with their related workspace data (optional, depends on your requirements)
        $boards = Board::with('workspace.owner')->get();

        // Return boards data to the Inertia view
        return Inertia::render('Admin/Boards/Index', [
            'boards' => $boards
        ]);
    }

    // Show the form for creating a new board
    public function create()
    {
        // Get all workspaces to associate with the new board
        $workspaces = Workspace::all();

        return Inertia::render('Admin/Boards/Create', [
            'workspaces' => $workspaces
        ]);
    }

    // Store a newly created board in storage
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string|max:1000',
            'workspace_id' => 'required|exists:workspaces,id',  // Ensures the workspace exists
        ]);

        // Create the new board
        Board::create($request->all());

        // Redirect back to the board index
        return redirect()->route('admin.boards.index');
    }

    // Show the form for editing the specified board
    public function edit(Board $board)
    {
        // Get all workspaces to allow the user to change the workspace
        $workspaces = Workspace::all();

        return Inertia::render('Admin/Boards/Edit', [
            'board' => $board,
            'workspaces' => $workspaces
        ]);
    }

    // Update the specified board in storage
    public function update(Request $request, Board $board)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            // 'workspace_id' => 'required|exists:workspaces,id',  // Ensures the workspace exists
            'description' => 'nullable|string|max:1000',
        ]);

        // Update the board with the new data
        $board->update($request->all());

        // Redirect back to the board index
        return redirect()->route('admin.boards.index');
    }

    // Remove the specified board from storage
    public function destroy(Board $board)
    {
        $board->delete();

        return redirect()->route('admin.boards.index');
    }
}
