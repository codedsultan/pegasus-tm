<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Task;
use App\Models\User;
use App\Models\Comment;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Comment>
 */
class CommentFactory extends Factory
{

    protected $model = Comment::class;
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => User::inRandomOrder()->first()->id, // Random user
            'task_id' => Task::inRandomOrder()->first()->id, // Random task
            'content' => $this->faker->paragraph(),
            'parent_id' => null, // Default to null for top-level comments
        ];

    }

    public function replyTo(Comment $parentComment)
    {
        return $this->state([
            'parent_id' => $parentComment->id,
        ]);
    }
}
