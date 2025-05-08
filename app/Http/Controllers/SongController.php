<?php

namespace App\Http\Controllers;

use App\Models\Song;
use Inertia\Inertia;
use Illuminate\Http\Request;

class SongController extends Controller
{
    public function index()
    {
        $songs = Song::all();
        return Inertia::render('Songs/Index', [
            'songs' => $songs
        ]);
    }

    public function create()
    {
        return Inertia::render('Songs/Create');
    }


    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'duration' => 'required|integer',
            'file' => 'required|mimes:mp3,wav,ogg|max:10240', // 10 MB
        ]);

        $file = $request->file('file');
        $fileName = uniqid() . '.' . $file->getClientOriginalExtension();
        $filePath = $file->storeAs('songs', $fileName, 'public');

        Song::create([
            'title' => $request->title,
            'duration' => $request->duration,
            'file_path' => $filePath,
        ]);

        return redirect()->route('songs.index')->with('success', 'Canción subida correctamente');
    }


    public function edit(Song $song)
    {
        return Inertia::render('Songs/Edit', [
            'song' => $song
        ]);
    }

    public function update(Request $request, Song $song)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'duration' => 'required|integer',
            'file_path' => 'required|string|max:255',
        ]);

        $song->update($request->all());

        return redirect()->route('songs.index');
    }

    public function destroy(Song $song)
    {

        $song->delete();

        return redirect()->route('songs.index');
    }
}
