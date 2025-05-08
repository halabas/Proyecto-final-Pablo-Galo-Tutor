import { useForm } from '@inertiajs/react';
import React from 'react';

export default function CreateSong() {
  const { data, setData, post, processing, errors, reset } = useForm({
    title: '',
    duration: '',
    file: null,
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    post(route('songs.store'), {
      forceFormData: true,
      onSuccess: () => reset(),
    });
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-6">Subir nueva canción</h1>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
  <div className="mb-4">
    <label className="block mb-1">Título</label>
    <input
      type="text"
      value={data.title}
      onChange={(e) => setData('title', e.target.value)}
      className="w-full border rounded px-3 py-2"
    />
    {errors.title && <div className="text-red-500 text-sm">{errors.title}</div>}
  </div>

  <div className="mb-4">
    <label className="block mb-1">Duración (en segundos)</label>
    <input
      type="number"
      value={data.duration}
      onChange={(e) => setData('duration', e.target.value)}
      className="w-full border rounded px-3 py-2"
    />
    {errors.duration && <div className="text-red-500 text-sm">{errors.duration}</div>}
  </div>

  <div className="mb-4">
    <label className="block mb-1">Archivo de audio (.mp3, .wav, .ogg)</label>
    <input
      type="file"
      accept=".mp3,.wav,.ogg"
      onChange={(e) => setData('file', e.target.files[0])}
      className="w-full"
    />
    {errors.file && <div className="text-red-500 text-sm">{errors.file}</div>}
  </div>

  <button
    type="submit"
    disabled={processing}
    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
  >
    Subir canción
  </button>
</form>

    </div>
  );
}
