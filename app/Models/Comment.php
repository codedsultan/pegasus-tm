<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Comment extends Model
{
    use HasFactory;
    protected $fillable = ['user_id', 'task_id', 'parent_id', 'content', 'replied_to', 'quoted_user'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function replies()
    {
        return $this->hasMany(Comment::class, 'parent_id');
    }

    public function task()
    {
        return $this->belongsTo(Task::class, 'task_id');
    }

    public function parent()
    {
        return $this->belongsTo(Comment::class, 'parent_id');
    }

    /**
     * Get the child comments (replies) for this comment.
     */
    public function children()
    {
        return $this->hasMany(Comment::class, 'parent_id');
    }

    // for polymorphic relationships (tasks, projects, etc.)
    // public function commentable()
    // {
    //     return $this->morphTo();
    // }

    // load top level comments

    // public function getTopLevelCommentsAttribute()
    // {
    //     return $this->whereNull('parent_id')->get();
    // }

}
