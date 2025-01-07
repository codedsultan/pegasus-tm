<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Faker\Generator as Faker;


/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\User>
 */
class UserFactory extends Factory
{
    /**
     * The current password being used by the factory.
     */
    protected static ?string $password;
    protected $model = User::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'first_name' =>  $this->faker->firstName,
            'last_name' => $this->faker->lastName,
            'name' => fake()->name(),
            'email' => fake()->unique()->safeEmail(),
            'email_verified_at' => now(),
            'password' => static::$password ??= Hash::make('password'),
            'remember_token' => Str::random(10),
        ];
    }

    /**
     * Indicate that the model's email address should be unverified.
     */
    public function unverified(): static
    {
        return $this->state(fn (array $attributes) => [
            'email_verified_at' => null,
        ]);
    }

    public function verified()
    {
        return $this->state(function (array $attributes) {
            return [
                'email_verified_at' => now(),
            ];
        });
    }

    public function configure()
    {
        return $this->afterCreating(function (User $user) {
            // $randomNumber = rand(1, 10); // Generates a random number between 1 and 10
            if($user->id <= 10){
                // $filePath = storage_path("app/public/uploads/users/avatar-1.jpg");

                $filePath = url("uploads/users/avatar-{$user->id}.jpg");
                // storage_path("app/public/uploads/users/avatar-{$user->id}.jpg");
                $user->addMediaFromUrl($filePath)
                ->toMediaCollection('avatars');
            }
            // Attach a predefined avatar to the user (use an existing file from storage)
            // Media collection name
        });
    }


}
