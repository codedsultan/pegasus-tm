<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Workspace extends Model
{
    /** @use HasFactory<\Database\Factories\WorkspaceFactory> */
    use HasFactory;

    protected $fillable = ['name', 'owner_id'];

    public function owner()
    {
        return $this->belongsTo(User::class, 'owner_id');
    }

    public function boards()
    {
        return $this->hasMany(Board::class);
    }

    public function users()
    {
        return $this->belongsToMany(User::class, 'user_workspace');
    }

}
