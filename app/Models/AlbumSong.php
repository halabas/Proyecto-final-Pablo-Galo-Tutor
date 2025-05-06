<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\Pivot;

class AlbumSong extends Pivot
{
    protected $fillable = [
        'album_id',
        'song_id',
    ];
}
