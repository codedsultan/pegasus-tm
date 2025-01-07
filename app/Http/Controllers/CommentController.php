<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use Illuminate\Http\Request;

class CommentController extends Controller
{
    // Fetch comments for a post
    public function index($postId)
    {
        $comments = Comment::with(['user', 'replies.user'])
            ->where('task_id', $postId)
            ->whereNull('parent_id') // Only top-level comments
            ->get();

        return redirect()->back()->with('comments', $comments);
    }

    public function getReplies($id)
    {
        $comment = Comment::with('replies')->findOrFail($id);

        return redirect()->back()->with('replies', $comment->replies);
    }

    // Store a new comment
    public function store(Request $request)
    {
        $request->validate([
            'content' => 'required|string',
            'task_id' => 'required|integer',
            'parent_id' => 'nullable|integer',
        ]);

        $comment = Comment::create([
            'user_id' => $request->user->id,
            'task_id' => $request->task_id,
            'parent_id' => $request->parent_id,
            'content' => $request->content,
        ]);

        // return response()->json($comment, 201);
        return redirect()->back()->with('success', 'Comment created successfully.');
    }

    // Delete a comment
    public function destroy($id, Request $request)
    {
        $comment = Comment::findOrFail($id);

        // Allow only the owner or an admin to delete
        if ($comment->user_id != $request->user->id && !$request->user->is_admin) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $comment->delete();

        return redirect()->back()->with('success', 'Comment deleted successfully.');
        // return response()->json(['message' => 'Comment deleted']);
    }

}
