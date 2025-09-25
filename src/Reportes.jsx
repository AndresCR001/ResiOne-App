import React, { useState, useEffect } from "react";
import ChatbotButton from "./ChatbotButton";

const API_URL = "http://localhost:5050/api/reportes";

export default function Reportes({ esAdmin = false }) {
  const [tipoIncidencia, setTipoIncidencia] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [nivelPrioridad, setNivelPrioridad] = useState("");
  const [archivos, setArchivos] = useState([]);
  const [reportes, setReportes] = useState([]);
  const [expandedId, setExpandedId] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  // Para administración SMS
  const [telefono, setTelefono] = useState("");
  const [codigoVerificacion, setCodigoVerificacion] = useState("");
  const [codigoGenerado, setCodigoGenerado] = useState("");

  const tiposIncidencia = [
    "Eléctrica",
    "Sanitaria",
    "Ruido",
    "Accesos",
    "Limpieza",
    "Infraestructura",
    "Otro"
  ];
  const prioridades = ["Baja", "Media", "Alta", "Urgente"];

  useEffect(() => {
    fetchReportes();
  }, []);

  const fetchReportes = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setReportes(data);
    } catch (error) {
      console.error("Error al obtener reportes:", error);
    }
  };

  const validarFecha = (fecha) => {
    const hoy = new Date().toISOString().split("T")[0];
    return fecha >= hoy;
  };

  const crearReporte = async () => {
    if (!tipoIncidencia || !descripcion || !nivelPrioridad) {
      alert("Completa todos los campos obligatorios");
      return;
    }

    const fecha = new Date().toISOString().split("T")[0];
    if (!validarFecha(fecha)) {
      alert("La fecha no puede ser anterior al día actual");
      return;
    }

    const nuevoReporte = {
      tipo: tipoIncidencia,
      descripcion,
      nivelPrioridad,
      archivos: archivos.map(f => f.name),
      correoResidente: "residente@example.com" // Se reemplaza con el correo real
    };

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(nuevoReporte)
      });

      if (!res.ok) {
        const err = await res.json();
        alert(err.mensaje || "Error al crear reporte");
        return;
      }

      const data = await res.json();
      alert(data.mensaje);
      setTipoIncidencia("");
      setDescripcion("");
      setNivelPrioridad("");
      setArchivos([]);
      fetchReportes();
    } catch (error) {
      console.error("Error al crear reporte:", error);
      alert("Error al crear reporte");
    }
  };

  const cargarArchivos = (e) => {
    const files = Array.from(e.target.files);
    setArchivos(files);
  };

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const handleImagePreview = (file) => {
    const url = URL.createObjectURL(file);
    setPreviewImage(url);
  };

  const closePreview = () => {
    if (previewImage) {
      URL.revokeObjectURL(previewImage);
      setPreviewImage(null);
    }
  };

  // Simular envío de código SMS
  const enviarCodigo = () => {
    if (!telefono.match(/^\d{8}$/)) {
      alert("Ingrese un número válido de 8 dígitos");
      return;
    }
    const letras = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let code =
      letras[Math.floor(Math.random() * letras.length)] +
      letras[Math.floor(Math.random() * letras.length)] +
      letras[Math.floor(Math.random() * letras.length)] +
      letras[Math.floor(Math.random() * letras.length)] +
      Math.floor(Math.random() * 10) +
      Math.floor(Math.random() * 10);
    setCodigoGenerado(code);
    alert("Código enviado por SMS (simulado): " + code);
  };

  // Cambiar estado del reporte (administrador)
  const cambiarEstado = async (id, nuevoEstado) => {
    if (codigoVerificacion !== codigoGenerado) {
      alert("Código de verificación inválido");
      return;
    }
    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nuevoEstado,
          comentarios: prompt("Ingrese comentario opcional para el residente") || "",
          codigoValido: true,
          correoResidente: "residente@example.com"
        })
      });
      if (!res.ok) {
        const err = await res.json();
        alert(err.mensaje || "Error al cambiar estado");
        return;
      }
      const data = await res.json();
      alert("Estado actualizado");
      fetchReportes();
      setTelefono("");
      setCodigoVerificacion("");
      setCodigoGenerado("");
    } catch (error) {
      console.error("Error al cambiar estado:", error);
      alert("Error al cambiar estado");
    }
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "flex-start", minHeight: "100vh", background: "linear-gradient(to right, #4facfe, #00f2fe)", padding: "50px" }}>
      <div style={{ background: "white", borderRadius: "15px", boxShadow: "0px 4px 20px rgba(0,0,0,0.1)", width: "90%", maxWidth: "900px", position: "relative", display: "flex", flexDirection: "column", height: "100vh" }}>
        
        {/* Formulario */}
        <div style={{ padding: "40px", borderBottom: "1px solid #ddd", flexShrink: 0 }}>
          <h1 style={{ color: "#333", textAlign: "center", marginBottom: "30px" }}>Reportes</h1>

          <div style={{ marginBottom: "20px" }}>
            <label style={{ display: "block", marginBottom: "10px", color: "#555" }}>Tipo de incidencia</label>
            <select value={tipoIncidencia} onChange={e => setTipoIncidencia(e.target.value)} style={{ width: "100%", padding: "12px", borderRadius: "8px", border: "1px solid #ccc", fontSize: "1rem" }}>
              <option value="">Seleccionar tipo...</option>
              {tiposIncidencia.map((tipo, i) => (<option key={i} value={tipo}>{tipo}</option>))}
            </select>
          </div>

          <div style={{ marginBottom: "20px" }}>
            <label style={{ display: "block", marginBottom: "10px", color: "#555" }}>Nivel de prioridad</label>
            <select value={nivelPrioridad} onChange={e => setNivelPrioridad(e.target.value)} style={{ width: "100%", padding: "12px", borderRadius: "8px", border: "1px solid #ccc", fontSize: "1rem" }}>
              <option value="">Seleccionar prioridad...</option>
              {prioridades.map((p, i) => (<option key={i} value={p}>{p}</option>))}
            </select>
          </div>

          <div style={{ marginBottom: "20px" }}>
            <label style={{ display: "block", marginBottom: "10px", color: "#555" }}>Descripción</label>
            <textarea value={descripcion} onChange={e => setDescripcion(e.target.value)} placeholder="Describe el problema..." style={{ width: "100%", height: "90px", padding: "12px", borderRadius: "8px", border: "1px solid #ccc", resize: "vertical", fontSize: "1rem" }} />
          </div>

          <div style={{ marginBottom: "20px" }}>
            <label style={{ display: "block", marginBottom: "10px", color: "#555" }}>Adjuntar fotos</label>
            <input type="file" multiple onChange={cargarArchivos} style={{ display: "none" }} id="fileInput" />
            <label htmlFor="fileInput" style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "110px", padding: "10px", border: "1px solid #ccc", borderRadius: "8px", textAlign: "center", cursor: "pointer", background: "#f8f9fa", flexDirection: "column" }}>
              📎 Cargar fotos
              <span style={{ color: "#555", marginTop: "5px" }}>{archivos.length} archivo(s)</span>
            </label>
          </div>

          <button onClick={crearReporte} style={{ width: "100%", padding: "14px", background: "#4facfe", color: "white", border: "none", borderRadius: "8px", fontSize: "1.1rem", cursor: "pointer", marginBottom: "20px" }}>
            Crear reporte
          </button>
        </div>

        {/* Listado de reportes */}
        <div style={{ padding: "20px", flexGrow: 1, overflowY: "auto" }}>
          <h2 style={{ color: "#333", marginBottom: "20px" }}>Historial de reportes</h2>
          {reportes.length === 0 ? <p style={{ color: "#777" }}>No hay reportes.</p> :
            reportes.map(r => (
              <div key={r._id} style={{ border: "1px solid #ddd", borderRadius: "8px", padding: "15px", marginBottom: "15px", background: "#f9f9f9" }}>
                <div style={{ display: "flex", justifyContent: "space-between", cursor: "pointer" }} onClick={() => toggleExpand(r._id)}>
                  <strong>{r.tipo} ({r.nivelPrioridad})</strong>
                  <span>{expandedId === r._id ? "▲" : "▼"}</span>
                </div>
                {expandedId === r._id && (
                  <div style={{ marginTop: "10px" }}>
                    <p><strong>Descripción:</strong> {r.descripcion}</p>
                    <p><strong>Fecha:</strong> {r.fecha}</p>
                    <p><strong>Estado:</strong> <span style={{ color: r.estado === "Resuelto" ? "green" : r.estado === "En proceso" ? "orange" : "blue" }}>{r.estado}</span></p>
                    <p><strong>Archivos:</strong> {r.archivos.length > 0 ? r.archivos.map((f,i) => (<span key={i}><button onClick={() => handleImagePreview({name:f})} style={{ marginLeft: "10px", background: "#4facfe", color: "white", border: "none", borderRadius: "5px", padding: "5px 10px", cursor: "pointer" }}>{f}</button></span>)) : " Ninguno"}</p>

                    {esAdmin && (
                      <div style={{ marginTop: "10px" }}>
                        <input type="text" placeholder="Teléfono (8 dígitos)" value={telefono} onChange={e => setTelefono(e.target.value)} style={{ marginRight: "5px" }} />
                        <button onClick={enviarCodigo} style={{ marginRight: "5px" }}>Enviar código</button>
                        <input type="text" placeholder="Código recibido" value={codigoVerificacion} onChange={e => setCodigoVerificacion(e.target.value)} style={{ marginRight: "5px" }} />
                        <button onClick={() => cambiarEstado(r._id, "En proceso")} style={{ marginRight: "5px" }}>En proceso</button>
                        <button onClick={() => cambiarEstado(r._id, "Resuelto")}>Resuelto</button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))
          }
        </div>
      </div>

      {previewImage && (
        <div style={{ position: "fixed", top:0, left:0, right:0, bottom:0, background:"rgba(0,0,0,0.8)", display:"flex", justifyContent:"center", alignItems:"center", zIndex:1000 }}>
          <div>
            <img src={previewImage} alt="Vista previa" style={{ maxWidth:"90vw", maxHeight:"90vh" }} />
            <button onClick={closePreview} style={{ position:"absolute", top:"10px", right:"10px", background:"#ff4444", color:"white", border:"none", borderRadius:"50%", width:"30px", height:"30px", cursor:"pointer" }}>X</button>
          </div>
        </div>
      )}

      <ChatbotButton />
    </div>
  );
}
