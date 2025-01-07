<?php

namespace App\Http\Controllers;

use App\Models\Board;
use Illuminate\Http\Request;

class BoardController extends Controller
{
    public function index()
    {
        $boards = Board::with('tasks')->get();
        return view('projects.index', compact('projects'));
    }

    public function create()
    {
        return view('projects.create');
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
        ]);

        Board::create($data);

        return redirect()->route('projects.index')->with('success', 'Project created successfully!');
    }

    public function show(Board $board)
    {
        $board->load('tasks');
        return view('projects.show', compact('project'));
    }

    public function edit(Board $board)
    {
        return view('projects.edit', compact('project'));
    }

    public function update(Request $request, Board $board)
    {
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
        ]);

        $board->update($data);

        return redirect()->route('projects.index')->with('success', 'Project updated successfully!');
    }

    public function destroy(Board $board)
    {
        $board->delete();

        return redirect()->route('projects.index')->with('success', 'Project deleted successfully!');
    }

}
