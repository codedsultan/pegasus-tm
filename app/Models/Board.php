<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
class Board extends Model
{
    use HasFactory;
    protected $fillable = ['name', 'description'];

    // A project has many tasks
    public function tasks()
    {
        return $this->hasMany(Task::class);
    }

}
