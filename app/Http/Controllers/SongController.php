<?php

namespace App\Http\Controllers;

use App\Models\Song;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class SongController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Song/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $user = Auth::user();
        $hashedFileName = md5($request->title . $user->name) . '.' . $request->file('file')->getClientOriginalExtension();
        $fileStoredPath = $request->file('file')->storeAs('songs', $hashedFileName);
        $url = Storage::url('songs/' . $hashedFileName);

        $song = new Song();
        $song->title = $request->title;
        $song->duration = $request->duration;
        $song->url = $url;
        $song->save();

        $user->songs()->attach($song->id, ['owner' => true]);

        return Redirect::back();
    }




    /**
     * Display the specified resource.
     */
    public function show(Song $song)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Song $song)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Song $song)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Song $song)
    {
        //
    }
}
