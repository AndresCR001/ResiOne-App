import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ChatbotButton from "./ChatbotButton";

export default function Reportes() {
  const [tipoIncidencia, setTipoIncidencia] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [archivos, setArchivos] = useState([]);
  const [reportes, setReportes] = useState([]);
  const [expandedId, setExpandedId] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const navigate = useNavigate();

  const tiposIncidencia = [
    "Falla en instalaciones",
    "Seguridad",
    "Limpieza",
    "Ruido",
    "Otro"
  ];

  const realizarReporte = () => {
    if (!tipoIncidencia || !descripcion) {
      alert("Completa tipo y descripción");
      return;
    }
    const nuevoReporte = {
      id: Date.now(),
      tipo: tipoIncidencia,
      descripcion,
      archivos: archivos,
      fecha: new Date().toLocaleDateString()
    };
    setReportes([nuevoReporte, ...reportes]);
    setTipoIncidencia("");
    setDescripcion("");
    setArchivos([]);
    alert("Reporte creado");
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

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        background: "linear-gradient(to right, #4facfe, #00f2fe)",
        padding: "20px"
      }}
    >
      <div
        style={{
          background: "white",
          borderRadius: "15px",
          padding: "40px",
          boxShadow: "0px 4px 20px rgba(0,0,0,0.1)",
          width: "90%",
          maxWidth: "900px",
          position: "relative"
        }}
      >
        <button
          onClick={() => navigate("/comunicados")}
          style={{
            position: "absolute",
            top: "15px",
            left: "15px",
            background: "#6c757d",
            border: "none",
            borderRadius: "50%",
            color: "white",
            width: "30px",
            height: "30px",
            cursor: "pointer"
          }}
        >
          ←
        </button>

        <h1 style={{ color: "#333", textAlign: "center", marginBottom: "30px" }}>Reportes</h1>

        {/* Formulario de creación */}
        <div style={{ marginBottom: "20px" }}>
          <label style={{ display: "block", marginBottom: "10px", color: "#555" }}>Tipo de incidencia</label>
          <select
            value={tipoIncidencia}
            onChange={(e) => setTipoIncidencia(e.target.value)}
            style={{
              width: "100%",
              padding: "12px",
              borderRadius: "8px",
              border: "1px solid #ccc",
              fontSize: "1rem"
            }}
          >
            <option value="">Seleccionar tipo...</option>
            {tiposIncidencia.map((tipo, i) => (
              <option key={i} value={tipo}>{tipo}</option>
            ))}
          </select>
        </div>

        <div style={{ marginBottom: "20px", display: "flex", gap: "20px" }}>
          <div style={{ flex: 2 }}>
            <label style={{ display: "block", marginBottom: "10px", color: "#555" }}>Cuéntanos sobre tu problema</label>
            <textarea
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              placeholder="Describe el problema..."
              style={{
                width: "100%",
                height: "120px",
                padding: "12px",
                borderRadius: "8px",
                border: "1px solid #ccc",
                resize: "vertical",
                fontSize: "1rem"
              }}
            />
          </div>
          <div style={{ flex: 1 }}>
            <label style={{ display: "block", marginBottom: "10px", color: "#555" }}>Adjuntar fotos</label>
            <input
              type="file"
              multiple
              onChange={cargarArchivos}
              style={{ display: "none" }}
              id="fileInput"
            />
            <label
              htmlFor="fileInput"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "120px",
                padding: "10px",
                border: "1px solid #ccc",
                borderRadius: "8px",
                textAlign: "center",
                cursor: "pointer",
                background: "#f8f9fa",
                flexDirection: "column"
              }}
            >
              📎 Cargar fotos
              <span style={{ color: "#555", marginTop: "5px" }}>{archivos.length} archivo(s)</span>
            </label>
          </div>
        </div>

        <button
          onClick={realizarReporte}
          style={{
            width: "100%",
            padding: "14px",
            background: "#4facfe",
            color: "white",
            border: "none",
            borderRadius: "8px",
            fontSize: "1.1rem",
            cursor: "pointer",
            marginBottom: "40px"
          }}
        >
          Realizar reporte
        </button>

        {/* Listado de reportes */}
        <h2 style={{ color: "#333", marginBottom: "20px" }}>Reportes realizados</h2>
        {reportes.length === 0 ? (
          <p style={{ color: "#777" }}>No hay reportes.</p>
        ) : (
          reportes.map((reporte) => (
            <div
              key={reporte.id}
              style={{
                border: "1px solid #ddd",
                borderRadius: "8px",
                padding: "15px",
                marginBottom: "15px",
                background: "#f9f9f9"
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  cursor: "pointer"
                }}
                onClick={() => toggleExpand(reporte.id)}
              >
                <strong>{reporte.tipo}</strong>
                <span>{expandedId === reporte.id ? "▲" : "▼"}</span>
              </div>
              {expandedId === reporte.id && (
                <div style={{ marginTop: "10px" }}>
                  <p><strong>Descripción:</strong> {reporte.descripcion}</p>
                  <p><strong>Fecha:</strong> {reporte.fecha}</p>
                  <p><strong>Archivos:</strong>
                    {reporte.archivos.length > 0 ? (
                      reporte.archivos.map((file, index) => (
                        <span key={index}>
                          <button
                            onClick={() => handleImagePreview(file)}
                            style={{
                              marginLeft: "10px",
                              background: "#4facfe",
                              color: "white",
                              border: "none",
                              borderRadius: "5px",
                              padding: "5px 10px",
                              cursor: "pointer"
                            }}
                          >
                            {file.name}
                          </button>
                        </span>
                      ))
                    ) : (
                      " Ninguno"
                    )}
                  </p>
                </div>
              )}
            </div>
          ))
        )}

        {/* Vista previa de imagen */}
        {previewImage && (
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: "rgba(0,0,0,0.8)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              zIndex: 1000
            }}
          >
            <div>
              <img
                src={previewImage}
                alt="Vista previa"
                style={{ maxWidth: "90vw", maxHeight: "90vh" }}
              />
              <button
                onClick={closePreview}
                style={{
                  position: "absolute",
                  top: "10px",
                  right: "10px",
                  background: "#ff4444",
                  color: "white",
                  border: "none",
                  borderRadius: "50%",
                  width: "30px",
                  height: "30px",
                  cursor: "pointer"
                }}
              >
                X
              </button>
            </div>
          </div>
        )}
      </div>
      <ChatbotButton />
    </div>
  );
}