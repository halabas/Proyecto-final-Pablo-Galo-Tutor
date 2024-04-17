import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head , router } from '@inertiajs/react';
import { useState } from 'react';
import SelectField from "@/Components/selectfield";

export default function create({ auth }) {

    const [collaborators,setCollaborators] = useState([]);

    const storeSong = (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);

        router.post(
            route("songs.store"),
            {
                title: formData.get("title"),
                duration: formData.get("duration"),
                file: formData.get("file"),
            }
        );
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
        >
            <Head title="Añadir Cancion" />

            <form onSubmit={storeSong} encType="multipart/form-data">
                <div>
                    <label htmlFor="title">Título:</label>
                    <input
                        name='title'
                        type="text"
                        id="title"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="duration">Duración:</label>
                    <input
                        name='duration'
                        type="text"
                        id="duration"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="file">Archivo:</label>
                    <input
                        name='file'
                        type="file"
                        id="file"
                        accept=".mp3"
                        required
                    />
                </div>
                <button type="submit">Enviar</button>

            </form>
        </AuthenticatedLayout>
    );
}

