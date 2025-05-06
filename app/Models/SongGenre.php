<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\Pivot;

class SongGenre extends Pivot
{
    protected $fillable = [
        'song_id',
        'genre_id',
    ];
}
