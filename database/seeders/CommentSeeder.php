<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Task;
use App\Models\Comment;

class CommentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create tasks
        // $tasks = Task::factory(10)->create(); // Create 10 tasks
        $tasks = Task::all(); // Create 10 tasks

        // Create comments and replies for each task
        foreach ($tasks as $task) {
            // Create a top-level comment for the task
            $comment = Comment::factory()->create([
                'task_id' => $task->id, // Assign the task to the comment
            ]);

            // Create 2 replies to the comment
            Comment::factory()->replyTo($comment)->count(2)->create([
                'task_id' => $task->id, // Assign the task to the reply comments
            ]);

            // Optionally, create more top-level comments and replies
            Comment::factory()->count(2)->create([
                'task_id' => $task->id, // Assign the task to the comments
            ]);
        }
    }
}
