<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Song extends Model
{
    use HasFactory;

    protected $fillable = [
        'title', 'duration', 'file_path'
    ];

    public function playlists()
    {
        return $this->belongsToMany(Playlist::class, 'playlist_song');
    }

    public function genres()
    {
        return $this->belongsToMany(Genre::class, 'song_genre');
    }

    public function users()
    {
        return $this->belongsToMany(User::class, 'song_user')->withPivot('role');
    }

    public function albums()
{
    return $this->belongsToMany(Album::class, 'album_song');
}
}
