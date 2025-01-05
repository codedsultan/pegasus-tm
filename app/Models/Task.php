<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    use HasFactory;

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
    ];

    protected $casts = [
        'due_date' => 'date',
        'user_avatar' => 'array',
    ];

    protected $appends = ['assignee_ids'];
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

}
