<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;

use App\Actions\CreateAvatar;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Contracts\Auth\CanResetPassword;
use Illuminate\Auth\Passwords\CanResetPassword as CanResetPasswordTrait;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;

class User extends Authenticatable implements MustVerifyEmail, CanResetPassword ,HasMedia
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable, CanResetPasswordTrait;
    use InteractsWithMedia;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'first_name',
        'last_name',
        'email',
        'password',

    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    protected $appends = ['avatar','fullname','avatar_img'];
    public function avatar(): Attribute
    {
        return Attribute::get(fn () => CreateAvatar::run($this->first_name, $this->email, null, null, 'initials'));
    }

    public function getFullnameAttribute()
    {
        return $this->first_name . ' ' . $this->last_name;
    }

    public function tasks()
    {
        return $this->belongsToMany(Task::class, 'task_user');
    }


    public function ownedTasks()
    {
        return $this->hasMany(Task::class, 'created_by'); // Define inverse relationship
    }
    // public function registerMediaConversions(?Media $media = null): void
    // {
    //     // Convert image to a thumbnail
    //     return $this->addMediaConversion('thumb')
    //         ->width(100)
    //         ->height(100)
    //         ->sharpen(10); // Optional sharpening to make the thumbnail clearer
    // }

    public function avatarImg(): Attribute
    {
        return Attribute::get(fn () => $this->getFirstMedia('avatars')?->getUrl());
    }


    public function workspaces()
    {
        return $this->belongsToMany(Workspace::class, 'user_workspace');
    }


}
