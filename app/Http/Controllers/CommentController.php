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
        // dd($request->all());
        $request->validate([
            'content' => 'required|string',
            'task_id' => 'required|integer',
            'parent_id' => 'nullable|integer',
            'attachments.*' => 'file|max:5120'
        ]);

        $comment = Comment::create([
            'user_id' => $request->user->id,
            'task_id' => $request->task_id,
            // 'commentable_id' => $request->input('commentable_id'),
            // 'commentable_type' => $request->input('commentable_type'),
            'parent_id' => $request->parent_id,
            'content' => $request->content,
        ]);

        if ($request->hasFile('attachments')) {
            foreach ($request->file('attachments') as $file) {
                $comment->addMedia($file)->toMediaCollection('attachments');
            }
        }
        // return response()->json($comment, 201);
        return redirect()->back()->with('success', 'Comment created successfully.');
    }

    public function storeReply(Comment $comment, Request $request)
    {
        $request->validate([
            'content' => 'required|string',
            'attachments.*' => 'file|max:5120'
        ]);

        $comment->replies()->create([
            'user_id' => $request->user->id,
            'content' => $request->content,
        ]);

        if ($request->hasFile('attachments')) {
            foreach ($request->file('attachments') as $file) {
                $comment->replies()->addMedia($file)->toMediaCollection('attachments');
            }
        }
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
