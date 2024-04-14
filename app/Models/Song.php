<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Song extends Model
{
    use HasFactory;

    public function users()
    {
        return $this->belongsToMany(User::class, 'song_user')->withPivot('owner');
    }

    public function playlists()
    {
        return $this->belongsToMany(Playlist::class, 'playlist_song');
    }

    public function albums()
    {
        return $this->belongsToMany(Album::class, 'album_song');
    }
}
