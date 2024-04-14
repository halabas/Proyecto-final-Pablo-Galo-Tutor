<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Album extends Model
{
    use HasFactory;

    public function users()
    {
        return $this->belongsToMany(User::class, 'album_user')->withPivot('owner');
    }

    public function songs()
    {
        return $this->belongsToMany(Song::class, 'album_song');
    }
}
