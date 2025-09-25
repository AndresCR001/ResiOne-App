import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from './config';


export default function Perfil() {
  const navigate = useNavigate();

  const [usuario, setUsuario] = useState({
    nombre: '',
    correo: '',
    identificacion: '',
    telefono: '',
    apartamento: '',
    habitantes: '',
    esAdministrador: false,
    codigoEmpleado: ''
  });

  const [editando, setEditando] = useState(false);

  useEffect(() => {
    const datosGuardados = localStorage.getItem('usuarioInfo');
    if (datosGuardados) {
      setUsuario(JSON.parse(datosGuardados));
    } else {
      navigate('/'); // Redirige al login si no hay sesión
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUsuario(prev => ({ ...prev, [name]: value }));
  };

  const handleEditar = () => {
    setEditando(true);
  };

  const handleGuardar = async () => {
    try {
      const respuesta = await fetch(`${API_BASE_URL}/editar`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(usuario)
      });

      const data = await respuesta.json();

      if (respuesta.ok) {
        alert(data.mensaje);
        setUsuario(data.usuario);
        localStorage.setItem('usuarioInfo', JSON.stringify(data.usuario));
        setEditando(false);
      } else {
        alert('Error al guardar: ' + data.mensaje);
      }
    } catch (error) {
      console.error('Error al actualizar el perfil:', error);
      alert('Error de conexión con el servidor');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('usuarioInfo');
    navigate('/');
  };

  return (

    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
      <div
        style={{
          background: 'white',
          borderRadius: '10px',
          width: '90vw',
          maxWidth: '450px',
          padding: '2rem',
          boxShadow: '0px 4px 20px rgba(0,0,0,0.1)',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
        }}
      >
        <button
          style={{
            position: 'absolute',
            top: '1rem',
            left: '1rem',
            background: '#6c757d',
            border: 'none',
            borderRadius: '50%',
            color: 'white',
            width: '30px',
            height: '30px',
            cursor: 'pointer',
            fontSize: '1rem'
          }}
          onClick={() => navigate(-1)}
        >
          ←
        </button>

        <h1 style={{ margin: 0, textAlign: 'center' }}>Mi Perfil</h1>

        {/* Nombre */}
        <label>
          Nombre completo
          <input
            className="boton-login"
            type="text"
            name="nombre"
            value={usuario.nombre}
            readOnly
            style={{ width: '100%', padding: '0.5rem', borderRadius: '5px', backgroundColor: '#f0f0f0', border: '1px solid #ccc' }}
          />
        </label>

        {/* Correo */}
        <label>
          Correo electrónico
          <input
            className="boton-login"
            type="email"
            name="correo"
            value={usuario.correo}
            readOnly
            style={{ width: '100%', padding: '0.5rem', borderRadius: '5px', backgroundColor: '#f0f0f0', border: '1px solid #ccc' }}
          />
        </label>

        {/* Identificación */}
        <label>
          Identificación
          <input
            className="boton-login"
            type="text"
            name="identificacion"
            value={usuario.identificacion}
            readOnly
            style={{ width: '100%', padding: '0.5rem', borderRadius: '5px', backgroundColor: '#f0f0f0', border: '1px solid #ccc' }}
          />
        </label>

        {/* Teléfono */}
        <label>
          Teléfono
          <input
            className="boton-login"
            type="tel"
            name="telefono"
            value={usuario.telefono}
            onChange={handleChange}
            readOnly={!editando}
            placeholder="Ej. 88888888"
            style={{ width: '100%', padding: '0.5rem', borderRadius: '5px', border: '1px solid #ccc' }}
          />
        </label>

        {/* Apartamento */}
        <label>
          Apartamento / Unidad Habitacional
          <input
            className="boton-login"
            type="text"
            name="apartamento"
            value={usuario.apartamento}
            onChange={handleChange}
            readOnly={!editando}
            placeholder="Ej. Torre B - Apto 203"
            style={{ width: '100%', padding: '0.5rem', borderRadius: '5px', border: '1px solid #ccc' }}
          />
        </label>

        {/* Habitantes */}
        <label>
          Cantidad de personas en la unidad
          <input
            className="boton-login"
            type="number"
            name="habitantes"
            value={usuario.habitantes}
            onChange={handleChange}
            readOnly={!editando}
            placeholder="Ej. 3"
            style={{ width: '100%', padding: '0.5rem', borderRadius: '5px', border: '1px solid #ccc' }}
          />
        </label>

        {/* Código de empleado solo si es administrador */}
        {usuario.esAdministrador && (
          <label>
            Código de empleado
            <input
              className="boton-login"
              type="text"
              name="codigoEmpleado"
              value={usuario.codigoEmpleado}
              readOnly
              style={{ width: '100%', padding: '0.5rem', borderRadius: '5px', backgroundColor: '#f0f0f0', border: '1px solid #ccc' }}
            />
          </label>
        )}

        {/* Botones de acción */}
        {editando ? (
          <button className="boton-login" onClick={handleGuardar}>
            Guardar
          </button>
        ) : (
          <button className="boton-login" onClick={handleEditar}>
            Editar Perfil
          </button>
        )}

        <button
          className="boton-login"
          style={{ backgroundColor: '#f44336', marginTop: '0.5rem' }}
          onClick={handleLogout}
        >
          Cerrar Sesión
        </button>
      </div>
    </div>
  );
}