<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PlaylistSong extends Model
{
    use HasFactory;

    protected $fillable = [
        'playlist_id', 'song_id'
    ];

    public function song()
    {
        return $this->belongsTo(Song::class);
    }

    public function playlist()
    {
        return $this->belongsTo(Playlist::class);
    }
}
