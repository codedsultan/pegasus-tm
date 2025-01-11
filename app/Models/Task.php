<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Illuminate\Database\Eloquent\Builder;

class Task extends Model implements HasMedia
{
    use HasFactory;
    use InteractsWithMedia;

    protected $fillable = [
        'title',
        'category',
        'status',
        'priority',
        'description',
        'assigned_to',
        'due_date',
        'comments',
        'user_avatar',
        'list_id',
        'order',
        'archived_at',
    ];

    protected $casts = [
        'due_date' => 'date',
        'user_avatar' => 'array',
    ];
    protected $dates = ['archived_at'];

    protected $appends = ['assignee_ids','comment_count','is_archived','due_date_iso'];
    public function user()
    {
        return $this->belongsTo(User::class, 'assignedTo');
    }

    public function assignees()
    {
        return $this->belongsToMany(User::class, 'task_user');
    }

    public function assigneeIds(): Attribute
    {
        return Attribute::get(fn () =>
            $this->assignees()
                ->pluck('users.id')
                ->toArray()
        );
    }

    // top level comments only
    public function comments()
    {
        return $this->hasMany(Comment::class, 'task_id');
    }



    // public function comments()
    // {
    //     return $this->hasMany(Comment::class, 'task_id')->whereNull('parent_id');
    // }

    public function getCommentCountAttribute()
    {
        return $this->comments()->count();
    }
    public function scopeArchived(Builder $query)
    {
        return $query->whereNotNull('archived_at');
    }

    // Scope to fetch only active (non-archived) tasks
    public function scopeActive(Builder $query)
    {
        return $query->whereNull('archived_at');
    }

    // Check if a task is archived
    public function isArchived(): bool
    {
        return !is_null($this->archived_at);
    }

    // Archive the task
    public function archive()
    {
        $this->update(['archived_at' => now()]);
    }

    // Unarchive the task
    public function unarchive()
    {
        $this->update(['archived_at' => null]);
    }

    public function getIsArchivedAttribute()
    {
        return $this->isArchived();
    }

    public function board()
    {
        return $this->belongsTo(Board::class)->withDefault();
    }

    // Define relationship to User model for created_by
    public function creator()
    {
        return $this->belongsTo(User::class, 'created_by'); // Define inverse relationship
    }

    //  due date to readable iso format
    public function getDueDateIsoAttribute()
    {
        return $this->due_date ? $this->due_date->format('Y-m-d') : null;
    }
}
