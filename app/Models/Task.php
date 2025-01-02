<?php

namespace App\Models;

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
    public function user()
    {
        return $this->belongsTo(User::class, 'assignedTo');
    }
}
