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

        \App\Models\Plan::create([
            'name' => 'Basic',
            'price' => 10,
            'billing_cycle' => 1,
            'status' => 'active',
        ]);

        \App\Models\Plan::create([
            'name' => 'Premium',
            'price' => 20,
            'billing_cycle' => 3,
            'status' => 'active',
        ]);

        \App\Models\Plan::create([
            'name' => 'Enterprise',
            'price' => 30,
            'billing_cycle' => 6,
            'status' => 'active',
        ]);


        \App\Models\Subscription::create([
            'user_id' => 1,
            'plan_id' => 1,
            'status' => 'active',
            'started_at' => now(),
            'ended_at' => now()->addMonths(1),
            'price' => 10,
        ]);

        \App\Models\Subscription::create([
            'user_id' => 2,
            'plan_id' => 2,
            'status' => 'active',
            'started_at' => now()->addMonths(1),
            'ended_at' => now()->addMonths(2),
            'price' => 20,
        ]);



    }
}
