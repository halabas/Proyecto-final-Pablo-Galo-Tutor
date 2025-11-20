import React, { useState } from 'react';
import { useForm, router } from '@inertiajs/react';

export default function Crud({ nombre_modelo, datos, columnas, campos, objeto_editando }) {
  const [editando, setEditando] = useState(!!objeto_editando);
  const { data: formData, setData, post, put, reset, errors } = useForm(objeto_editando || {});

  // Actualiza los campos del formulario a la hora de realizar una acción en este.
  const actualizar_campo = (e) => setData(e.target.name, e.target.value);

  // Se encarga de modificar el formulario dependiendo de si se está editando o creando un nuevo registro.
  const enviar_formulario = (e) => {
    e.preventDefault();
    if (editando) {
      put(`/${nombre_modelo}/${formData.id}`, {
        onSuccess: () => { reset(); setEditando(false); },
      });
    } else {
      post(`/${nombre_modelo}`, {
        onSuccess: () => { reset(); setEditando(false); },
      });
    }
  };

  // Función que se encarga de activar el modo edición del formulario.
  const editar = (item) => {
    setEditando(true);
    setData(item);
  };

  // Cancela la edición y borra el formulario
  const cancelar_edicion = () => {
    reset();
    setEditando(false);
  };

  // Elimina un registro con confirmación
  const eliminar = (id) => {
    if (confirm('¿Seguro que quieres eliminarlo?')) {
      router.delete(`/${nombre_modelo}/${id}`);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">{nombre_modelo ? nombre_modelo.toUpperCase() : ''}</h1>

      <form onSubmit={enviar_formulario} className="mb-6 border p-4 rounded">
        {campos.map((field) => {
          if (field.type === 'select') {
            return (
              <div key={field.name} className="mb-2">
                <label className="block font-medium">{field.label}</label>
                <select
                  name={field.name}
                  value={formData[field.name] || ''}
                  onChange={actualizar_campo}
                  className="border rounded px-2 py-1 w-full bg-white text-black"
                >
                  <option value="">Selecciona una Marca</option>
                  {field.options.map(opt => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
                {errors[field.name] && (
                  <p className="text-red-500 text-sm mt-1">{errors[field.name]}</p>
                )}
              </div>
            );
          }

          return (
            <div key={field.name} className="mb-2">
              <label className="block font-medium">{field.label}</label>
              <input
                type={field.type || 'text'}
                name={field.name}
                value={formData[field.name] || ''}
                onChange={actualizar_campo}
                className="border rounded px-2 py-1 w-full"
              />
              {errors[field.name] && (
                <p className="text-red-500 text-sm mt-1">{errors[field.name]}</p>
              )}
            </div>
          );
        })}

        <div className="flex gap-2">
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
            {editando ? 'Actualizar' : 'Crear'}
          </button>
          {editando && (
            <button
              type="button"
              onClick={cancelar_edicion}
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
            {columnas.map((col) => (
              <th key={col} className="border px-2 py-1">{col.toUpperCase()}</th>
            ))}
            <th className="border px-2 py-1">ACCIONES</th>
          </tr>
        </thead>
        <tbody>
          {datos.map((item) => (
            <tr key={item.id}>
              {columnas.map((col) => (
                <td key={col} className="border px-2 py-1">{item[col]}</td>
              ))}
              <td className="border px-2 py-1 flex gap-2">
                <button
                  onClick={() => editar(item)}
                  className="bg-yellow-400 text-white px-2 py-1 rounded"
                >
                  Editar
                </button>
                <button
                  onClick={() => eliminar(item.id)}
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
