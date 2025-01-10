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
        Schema::table('boards', function (Blueprint $table) {
            $table->unsignedBigInteger('created_by')->nullable(); // Adding created_by column
            $table->foreign('created_by')->references('id')->on('users')->onDelete('set null'); // Set up foreign key constraint

            $table->unsignedBigInteger('workspace_id')->nullable();
            $table->foreign('workspace_id')->references('id')->on('workspaces')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('tasks', function (Blueprint $table) {
            $table->dropForeign(['created_by']); // Drop foreign key constraint
            $table->dropColumn('created_by'); // Re
            $table->dropColumn('workspace_id');
            $table->dropForeign(['workspace_id']);
        });
    }
};
