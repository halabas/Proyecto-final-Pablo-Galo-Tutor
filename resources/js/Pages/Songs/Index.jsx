import React from 'react';
import { Link, usePage, router } from '@inertiajs/react';

export default function Index() {
    const { songs } = usePage().props;

    const handleDelete = (id) => {
        if (confirm('¿Estás seguro de que quieres eliminar esta canción?')) {
            router.delete(route('songs.destroy', id));
        }
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Canciones</h1>
            <Link href="/songs/create" className="bg-blue-500 text-white px-4 py-2 rounded">
                Crear Canción
            </Link>
            <ul className="mt-4">
                {songs.map(song => (
                    <li key={song.id} className="mb-4 flex items-center space-x-4">
                        <div className="flex-1">
                            {song.title} ({song.duration}s)
                        </div>

                        <audio controls>
                            <source src={`/storage/${song.file_path}`} type="audio/mp3" />
                        </audio>

                        <Link
                            href={`/songs/${song.id}/edit`}
                            className="text-blue-600 hover:underline"
                        >
                            Editar
                        </Link>

                        <button
                            onClick={() => handleDelete(song.id)}
                            className="text-red-600 hover:underline"
                        >
                            Borrar
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
