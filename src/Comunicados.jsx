import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import './App.css';
import ChatbotButton from "./ChatbotButton";

export default function Comunicados() {
  const navigate = useNavigate();

  const [publicaciones, setPublicaciones] = useState([]);
  const [nuevoContenido, setNuevoContenido] = useState("");
  const [nuevoTitulo, setNuevoTitulo] = useState(""); // Campo para título

  const cargarPublicaciones = async () => {
    try {
      const res = await fetch('/api/comunicados/feed');
      const data = await res.json();
      setPublicaciones(data.comunicados);
    } catch (error) {
      console.error('Error al cargar comunicados:', error);
    }
  };

  useEffect(() => {
    cargarPublicaciones();
  }, []);

  const crearPublicacion = async () => {
    if (!nuevoTitulo.trim() || !nuevoContenido.trim()) return;

    try {
      const res = await fetch('/api/comunicados/crear', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          titulo: nuevoTitulo,
          contenido: nuevoContenido,
          autorId: "ID_DEL_USUARIO_LOGUEADO", // Obtén de localStorage o sesión
          creadoPorAdministrador: true // Ajusta según rol
        })
      });
      if (res.ok) {
        setNuevoTitulo("");
        setNuevoContenido("");
        cargarPublicaciones();
      }
    } catch (error) {
      console.error('Error al crear comunicado:', error);
    }
  };

  const toggleEditar = (id) => {
    setPublicaciones(publicaciones.map(pub =>
      pub.id === id ? { ...pub, editable: !pub.editable } : pub
    ));
  };

  const actualizarPublicacion = async (id, titulo, contenido) => {
    try {
      const res = await fetch(`/api/comunicados/editar/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ titulo, contenido })
      });
      if (res.ok) {
        cargarPublicaciones();
      }
    } catch (error) {
      console.error('Error al actualizar:', error);
    }
  };

  const eliminarPublicacion = async (id) => {
    try {
      const res = await fetch(`/api/comunicados/eliminar/${id}`, {
        method: 'DELETE'
      });
      if (res.ok) {
        cargarPublicaciones();
      }
    } catch (error) {
      console.error('Error al eliminar:', error);
    }
  };

  const handlePerfil = () => {
    navigate('/perfil');
  };

  const handleReservas = () => {
    navigate('/reservas');
  };

  const handleReportes = () => {
    navigate('/reportes');
  };

  const handleChatbot = () => {
    navigate('/chatbot');
  };

  const handleLogout = () => {
    // Aquí podrías limpiar un token en localStorage si lo usas
    // localStorage.removeItem("token");
    navigate('/'); // vuelve al login
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh" }}>
      <div style={{
        background: "white",
        borderRadius: "10px",
        width: "90vw",
        height: "90vh",
        padding: "2%",
        boxShadow: "0px 4px 20px rgba(0,0,0,0.1)",
        display: "flex",
        flexDirection: "column"
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
          <h1 style={{ margin: 0, textAlign: "left", flex: 1 }}>Comunicados</h1>
          <div style={{ display: "flex", gap: "10px" }}>
            <button className="boton-login" onClick={handlePerfil}>Perfil</button>
            <button className="boton-login" onClick={handleReservas}>Reservas</button>
            <button className="boton-login" onClick={handleReportes}>Reportes</button>
            <button className="boton-login" onClick={handleChatbot}>Chatbot</button>
            <button className="boton-login" onClick={handleLogout}>Logout</button>
          </div>
        </div>

        {/* Crear nueva publicación */}
        <div className="crear-publicacion" style={{ marginBottom: "20px" }}>
          <input
            placeholder="Título del comunicado"
            value={nuevoTitulo}
            onChange={(e) => setNuevoTitulo(e.target.value)}
            style={{ width: "100%", borderRadius: "5px", padding: "10px", marginBottom: "10px" }}
          />
          <textarea
            placeholder="¿Qué quieres comunicar?"
            value={nuevoContenido}
            onChange={(e) => setNuevoContenido(e.target.value)}
            style={{ width: "100%", borderRadius: "5px", padding: "10px", height: "80px", marginBottom: "10px" }}
          />
          <button className="boton-login" onClick={crearPublicacion}>Publicar</button>
        </div>

        {/* Feed de publicaciones */}
        {publicaciones.map(pub => (
          <div key={pub._id} className="publicacion" style={{ marginBottom: "15px" }}>
            <div style={{ fontWeight: "bold", marginBottom: "5px" }}>{pub.titulo} - {pub.autorId.nombre || pub.autor}</div>
            {pub.editable ? (
              <>
                <textarea
                  value={pub.contenido}
                  onChange={(e) => actualizarPublicacion(pub._id, pub.titulo, e.target.value)}
                  style={{ width: "100%", borderRadius: "5px", padding: "5px", marginBottom: "5px" }}
                />
                <button className="boton-login" onClick={() => actualizarPublicacion(pub._id, pub.titulo, pub.contenido)}>Guardar</button>
              </>
            ) : (
              <p style={{ marginBottom: "10px" }}>{pub.contenido}</p>
            )}

            <div className="acciones" style={{ display: "flex", gap: "10px" }}>
              <button className="boton-login" onClick={() => toggleEditar(pub._id)}>Editar</button>
              <button className="boton-login" onClick={() => eliminarPublicacion(pub._id)}>Eliminar</button>
              <button className="boton-login">Compartir</button>
            </div>
          </div>
        ))}
      </div>
      <ChatbotButton />
    </div>
  )
}