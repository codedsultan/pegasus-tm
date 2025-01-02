<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('tasks', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('category');
            $table->enum('status', ['Todo', 'Inprogress', 'Review', 'Done'])->default('Todo');
            $table->string('priority');
            $table->text('description');
            $table->foreignId('list_id')->nullable();
            $table->integer('order')->default(0);
            // $table->foreignId('assignedTo')->nullable()->constrained('users')->onDelete('cascade');
            // $table->date('dueDate')->nullable();
            $table->integer('comments')->nullable();
            $table->json('user_avatar')->nullable();
            $table->foreignId('assigned_to')->nullable()->constrained('users')->onDelete('cascade');
            $table->date('due_date')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('items');
    }
};
