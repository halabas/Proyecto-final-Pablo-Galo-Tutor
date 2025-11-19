import React, { useState } from 'react';
import { useForm, router } from '@inertiajs/react';

export default function Crud({ resourceName, data, columns, formFields, editItem }) {
  const [editing, setEditing] = useState(!!editItem);
  const { data: formData, setData, post, put, reset, errors } = useForm(editItem || {});

  const handleChange = (e) => setData(e.target.name, e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editing) {
      put(`/${resourceName}/${formData.id}`, {
        onSuccess: () => { reset(); setEditing(false); },
      });
    } else {
      post(`/${resourceName}`, {
        onSuccess: () => { reset(); setEditing(false); },
      });
    }
  };

  const handleEdit = (item) => {
    setEditing(true);
    setData(item);
  };

  const handleCancel = () => {
    reset();
    setEditing(false);
  };

  const handleDelete = (id) => {
    if (confirm('¿Seguro que quieres eliminar este registro?')) {
      router.delete(`/${resourceName}/${id}`);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">{resourceName.toUpperCase()}</h1>

      <form onSubmit={handleSubmit} className="mb-6 border p-4 rounded">
        {formFields.map((field) => (
          <div key={field.name} className="mb-2">
            <label className="block font-medium">{field.label}</label>
            <input
              type={field.type || 'text'}
              name={field.name}
              value={formData[field.name] || ''}
              onChange={handleChange}
              className="border rounded px-2 py-1 w-full"
            />
            {errors[field.name] && (
              <p className="text-red-500 text-sm mt-1">{errors[field.name]}</p>
            )}
          </div>
        ))}

        <div className="flex gap-2">
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
            {editing ? 'Actualizar' : 'Crear'}
          </button>
          {editing && (
            <button
              type="button"
              onClick={handleCancel}
              className="bg-gray-400 text-white px-4 py-2 rounded"
            >
              Cancelar
            </button>
          )}
        </div>
      </form>

      <table className="w-full border-collapse border">
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col} className="border px-2 py-1">{col.toUpperCase()}</th>
            ))}
            <th className="border px-2 py-1">ACCIONES</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              {columns.map((col) => (
                <td key={col} className="border px-2 py-1">{item[col]}</td>
              ))}
              <td className="border px-2 py-1 flex gap-2">
                <button
                  onClick={() => handleEdit(item)}
                  className="bg-yellow-400 text-white px-2 py-1 rounded"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="bg-red-500 text-white px-2 py-1 rounded"
                >
                  Borrar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
