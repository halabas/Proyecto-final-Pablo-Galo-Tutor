import React from 'react';
import { useForm, usePage } from '@inertiajs/react';

export default function Edit() {
    const { song } = usePage().props;
    const { data, setData, put, processing, errors } = useForm({
        title: song.title,
        duration: song.duration,
        file_path: song.file_path,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(`/songs/${song.id}`);
    };

    return (
        <div className="p-6">
            <h1 className="text-xl font-bold mb-4">Editar</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block">TItulo</label>
                    <input type="text" className="border p-2 w-full" value={data.title} onChange={e => setData('title', e.target.value)} />
                    {errors.title && <div className="text-red-500">{errors.title}</div>}
                </div>
                <div>
                    <label className="block">Duracion</label>
                    <input type="number" className="border p-2 w-full" value={data.duration} onChange={e => setData('duration', e.target.value)} />
                    {errors.duration && <div className="text-red-500">{errors.duration}</div>}
                </div>
                <div>
                    <label className="block">Ruta</label>
                    <input type="text" className="border p-2 w-full" value={data.file_path} onChange={e => setData('file_path', e.target.value)} />
                    {errors.file_path && <div className="text-red-500">{errors.file_path}</div>}
                </div>
                <button type="submit" disabled={processing} className="bg-blue-500 text-white px-4 py-2 rounded">Actualizar</button>
            </form>
        </div>
    );
}
