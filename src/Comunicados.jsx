import { useState } from 'react'
import { Link, useNavigate} from 'react-router-dom';
import './App.css';
import ChatbotButton from "./ChatbotButton";

export default function Comunicados() {

const navigate = useNavigate();
    
const [publicaciones, setPublicaciones] = useState([
{ id: 1, autor: "Admin", contenido: "Bienvenidos al feed de comunicados", editable: false },
]);
const [nuevoContenido, setNuevoContenido] = useState("");

const crearPublicacion = () => {
if (!nuevoContenido.trim()) return;

const nueva = {
    id: Date.now(),
    autor: "Usuario",
    contenido: nuevoContenido,
    editable: false,
};
setPublicaciones([nueva, ...publicaciones]);
setNuevoContenido("");
};

const toggleEditar = (id) => {
setPublicaciones(publicaciones.map(pub =>
    pub.id === id ? { ...pub, editable: !pub.editable } : pub
));
};

const actualizarPublicacion = (id, contenido) => {
setPublicaciones(publicaciones.map(pub =>
    pub.id === id ? { ...pub, contenido, editable: false } : pub
));
};


const handleReservas = () => {
navigate('/reservas'); // pantalla de crear publicación
};

const handleReportes = () => {
navigate('/reportes'); // pantalla de filtros
};

const handleChatbot = () => {
navigate('/chatbot'); // pantalla de opciones
};


  return (
   <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh" }}>
        <div style={{
            background: "white",
            borderRadius: "10px",
            width: "90vw",        // 90% del ancho de la ventana
            height: "90vh",       // 90% del alto de la ventana
            padding: "2%",        // padding proporcional al tamaño del div
            boxShadow: "0px 4px 20px rgba(0,0,0,0.1)",
            display: "flex", 
            flexDirection: "column"
        }}>
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
          <h1 style={{ margin: 0, textAlign: "left", flex: 1 }}>Comunicados</h1>
          <div>
            <button className="boton-login" style={{ marginRight: "10px" }} onClick={handleReservas}>Reservas</button>
            <button className="boton-login" style={{ marginRight: "10px" }}>Reportes</button>
            <button className="boton-login">Chatbot</button>
          </div>
        </div>

        {/* Crear nueva publicación */}
        <div className="crear-publicacion" style={{ marginBottom: "20px" }}>
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
          <div key={pub.id} className="publicacion" style={{ marginBottom: "15px" }}>
            <div style={{ fontWeight: "bold", marginBottom: "5px" }}>{pub.autor}</div>
            {pub.editable ? (
              <>
                <textarea
                  value={pub.contenido}
                  onChange={(e) => actualizarPublicacion(pub.id, e.target.value)}
                  style={{ width: "100%", borderRadius: "5px", padding: "5px", marginBottom: "5px" }}
                />
                <button className="boton-login" onClick={() => actualizarPublicacion(pub.id, pub.contenido)}>Guardar</button>
              </>
            ) : (
              <p style={{ marginBottom: "10px" }}>{pub.contenido}</p>
            )}

            <div className="acciones" style={{ display: "flex", gap: "10px" }}>
              <button className="boton-login" onClick={() => toggleEditar(pub.id)}>Editar</button>
              <button className="boton-login" >Eliminar</button>
              <button className="boton-login">Compartir</button>
            </div>
          </div>
        ))}
      </div>
      <ChatbotButton />
    </div>
  );
}
