<?php

namespace Database\Factories;

use App\Models\Board;
use App\Models\Task;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Faker\Generator as Faker;

class TaskFactory extends Factory
{
    protected $model = Task::class;

    public function definition()
    {
        return [
            'title' => $this->faker->sentence,
            'status' => $this->faker->randomElement(['Todo', 'Inprogress', 'Review', 'Done']),
            'priority' => $this->faker->randomElement(['High', 'Medium', 'Low']),
            'due_date' => $this->faker->dateTimeBetween('now', '+1 year'),
            'board_id' => rand(0, 1) ? Board::inRandomOrder()->first()?->id : null,
            'category' => $this->faker->randomElement(['iOS', 'Attex', 'CRM', 'Design']),
            'comments' => $this->faker->numberBetween(0, 300),
            'user_avatar' => json_encode([
                [
                    'id' => $this->faker->uuid,
                    'isImage' => true,
                    'title' => $this->faker->firstName,
                    'image' => $this->faker->imageUrl(),
                ],
                [
                    'id' => $this->faker->uuid,
                    'isImage' => false,
                    'title' => $this->faker->word,
                    'image' => $this->faker->randomLetter,
                    'textBg' => 'bg-' . $this->faker->word . ' text-' . $this->faker->colorName,
                ],
            ]),
        ];
    }

    public function withFileUpload(Faker $faker)
    {
        return $this->afterCreating(function (Task $task) use ($faker) {
            // Simulate file upload to media library
            $task->addMediaFromUrl($faker->imageUrl())
                 ->toMediaCollection('task_files');
        });
    }

    public function configure()
    {
        return $this->afterCreating(function (Task $task) {
            // Attach predefined files to the task (e.g., using existing files from storage)
            $users = User::inRandomOrder()->take(rand(1, 5))->pluck('id');
            $task->assignees()->attach($users);
            $randomNumber = rand(1, 10);
            // $task->addMedia(storage_path('app/public/uploads/avatar-1.jpg')) // path to the file
            //     ->toMediaCollection('task_files'); // Media collection name
            $filePath = url("uploads/users/avatar-{$randomNumber}.jpg");
                // storage_path("app/public/uploads/users/avatar-{$user->id}.jpg");
            $task->addMediaFromUrl($filePath)
                ->toMediaCollection('avatars');
            // $task->addMedia(storage_path('app/public/uploads/avatar-2.jpgf')) // path to another file
            //     ->toMediaCollection('task_files'); // Media collection name

            // $task->addMediaFromUrl($faker->imageUrl())
            //     ->toMediaCollection('task_files');
        });
    }

}

