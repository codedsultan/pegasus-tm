<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
class Board extends Model
{
    use HasFactory;
    protected $fillable = ['name', 'description','workspace_id'];

    // protected $fillable = ['name', 'workspace_id'];

    public function workspace()
    {
        return $this->belongsTo(Workspace::class);
    }

    // A project has many tasks
    public function tasks()
    {
        return $this->hasMany(Task::class);
    }

    public function creator()
    {
        return $this->belongsTo(User::class, 'created_by'); // Define inverse relationship
    }

}
