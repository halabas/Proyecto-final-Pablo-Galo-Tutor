import React, { useState, useEffect } from 'react';

const EjemploFetch = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Include the necessary headers
                const headers = {
                    'Accept': 'application/json',
                    'Referer': "http://localhost:8000"
                };

                const response = await fetch('/api/users', {
                    headers: headers
                });
                const jsonData = await response.json();
                setData(jsonData);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            {loading ? (
                <p>Cargando...</p>
            ) : (
                <div>
                    <h2>Datos de usuarios:</h2>
                    <ul>
                        {data.map(user => (
                            <li key={user.id}>
                                {user.name} - {user.email}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default EjemploFetch;
