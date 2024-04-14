<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Playlist extends Model
{
    use HasFactory;

    public function users()
    {
        return $this->belongsToMany(User::class, 'playlist_user')->withPivot('role');
    }

    public function songs()
    {
        return $this->belongsToMany(Song::class, 'playlist_song');
    }
}
