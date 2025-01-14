<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();



        User::factory()->create([
            'name' => 'Olusegun Ibraheem',
            'first_name' => 'Olusegun',
            'last_name' => 'Ibraheem',
            'email' => 'codesultan369@gmail.com',
        ]);

        User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
        ]);
        $this->call([
            UserSeeder::class,
            TaskSeeder::class,
            CommentSeeder::class,
        ]);
            // [UserSeeder::class, 'configure']

        \App\Models\Admin::create([
            'name' => 'Admin',
            'email' => 'admin@example.com',
            'password' => bcrypt('password'),
        ]);


        \App\Models\Admin::create([
            'name' => 'Olusegun',
            'email' => 'codesultan369@gmail.com',
            'password' => bcrypt('password'),
        ]);
    }
}
