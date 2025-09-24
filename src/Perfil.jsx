import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Perfil() {
  const navigate = useNavigate();

  const [usuario, setUsuario] = useState({
    nombre: '',
    correo: '',
    celular: '',
    residencia: '',
  });

  const [editando, setEditando] = useState(false);

  useEffect(() => {
    const usuarioGuardado = localStorage.getItem('usuarioInfo');
    if (usuarioGuardado) {
      setUsuario(JSON.parse(usuarioGuardado));
    } else {
      navigate('/'); // Redirige si no hay usuario (por ejemplo, a login)
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUsuario((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditar = () => {
    setEditando(true);
  };

  const handleGuardar = () => {
    localStorage.setItem('usuarioInfo', JSON.stringify(usuario));
    setEditando(false);
    alert('Perfil actualizado');
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

        <label>
          Nombre
          <input
            className="boton-login"
            style={{ width: '100%', padding: '0.5rem', borderRadius: '5px', border: '1px solid #ccc' }}
            type="text"
            name="nombre"
            value={usuario.nombre}
            onChange={handleChange}
            readOnly={!editando}
            placeholder="Nombre completo"
          />
        </label>

        <label>
          Correo electrónico
          <input
            className="boton-login"
            style={{ width: '100%', padding: '0.5rem', borderRadius: '5px', border: '1px solid #ccc' }}
            type="email"
            name="correo"
            value={usuario.correo}
            onChange={handleChange}
            readOnly={!editando}
            placeholder="correo@ejemplo.com"
          />
        </label>

        <label>
          Celular
          <input
            className="boton-login"
            style={{ width: '100%', padding: '0.5rem', borderRadius: '5px', border: '1px solid #ccc' }}
            type="tel"
            name="celular"
            value={usuario.celular}
            onChange={handleChange}
            readOnly={!editando}
            placeholder="Ej. 123-456-7890"
          />
        </label>

        <label>
          Residencia
          <input
            className="boton-login"
            style={{ width: '100%', padding: '0.5rem', borderRadius: '5px', border: '1px solid #ccc' }}
            type="text"
            name="residencia"
            value={usuario.residencia}
            onChange={handleChange}
            readOnly={!editando}
            placeholder="Ej. Edificio A, Apartamento 203"
          />
        </label>

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