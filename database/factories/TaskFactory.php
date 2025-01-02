<?php

namespace Database\Factories;

use App\Models\Task;
use Illuminate\Database\Eloquent\Factories\Factory;

class TaskFactory extends Factory
{
    protected $model = Task::class;

    public function definition()
    {
        return [
            'title' => $this->faker->sentence,
            'status' => $this->faker->randomElement(['Todo', 'Inprogress', 'Review', 'Done']),
            'priority' => $this->faker->randomElement(['High', 'Medium', 'Low']),
            'due_date' => $this->faker->date(),
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
}

