import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ChatbotButton from "./ChatbotButton";

export default function Reservas() {
  const [zona, setZona] = useState("");
  const [fecha, setFecha] = useState("");
  const [horaInicio, setHoraInicio] = useState("");
  const [horaFin, setHoraFin] = useState("");
  const [reservas, setReservas] = useState([]);
  const navigate = useNavigate();

  const zonasComunes = [
    "Salón Comunal",
    "Piscina",
    "Gimnasio",
    "Zona BBQ",
    "Parque Infantil",
  ];

  const crearReserva = () => {
    if (!zona || !fecha || !horaInicio || !horaFin) {
      alert("Por favor completa todos los campos");
      return;
    }

    const nueva = {
      id: Date.now(),
      zona,
      fecha,
      horaInicio,
      horaFin,
    };

    setReservas([...reservas, nueva]);
    setZona("");
    setFecha("");
    setHoraInicio("");
    setHoraFin("");
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        background: "linear-gradient(to right, #4facfe, #00f2fe)",
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
          position: "relative",
        }}
      >
        {/* Icono de Reportes */}
        <div
          style={{
            position: "absolute",
            top: "20px",
            right: "20px",
            cursor: "pointer",
            fontSize: "1.2rem",
            background: "#4facfe",
            color: "white",
            borderRadius: "50%",
            width: "28px",
            height: "28px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          title="Reporte de incidencias"
          onClick={() => navigate("/reportes")}
        >
          i
        </div>

        {/* Encabezado */}
        <h1 style={{ color: "#333", marginBottom: "20px", textAlign: "center" }}>
          Reservas de Zonas Comunes
        </h1>

        {/* Formulario */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "20px",
            marginBottom: "20px",
          }}
        >
          <div>
            <label style={{ fontSize: "0.9rem", color: "#555" }}>Zona</label>
            <select
              value={zona}
              onChange={(e) => setZona(e.target.value)}
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "5px",
                border: "1px solid #ccc",
              }}
            >
              <option value="">Seleccionar...</option>
              {zonasComunes.map((z, i) => (
                <option key={i} value={z}>
                  {z}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label style={{ fontSize: "0.9rem", color: "#555" }}>Fecha</label>
            <input
              type="date"
              value={fecha}
              onChange={(e) => setFecha(e.target.value)}
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "5px",
                border: "1px solid #ccc",
              }}
            />
          </div>

          <div>
            <label style={{ fontSize: "0.9rem", color: "#555" }}>
              Hora inicio
            </label>
            <input
              type="time"
              value={horaInicio}
              onChange={(e) => setHoraInicio(e.target.value)}
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "5px",
                border: "1px solid #ccc",
              }}
            />
          </div>

          <div>
            <label style={{ fontSize: "0.9rem", color: "#555" }}>
              Hora fin
            </label>
            <input
              type="time"
              value={horaFin}
              onChange={(e) => setHoraFin(e.target.value)}
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "5px",
                border: "1px solid #ccc",
              }}
            />
          </div>
        </div>

        <button
          onClick={crearReserva}
          style={{
            width: "100%",
            padding: "12px",
            background: "#4facfe",
            border: "none",
            borderRadius: "8px",
            color: "white",
            fontSize: "1rem",
            cursor: "pointer",
          }}
        >
          Crear Reserva
        </button>

        {/* Botón Regresar */}
        <button
          onClick={() => navigate("/comunicados")}
          style={{
            width: "100%",
            padding: "12px",
            background: "#6c757d",
            border: "none",
            borderRadius: "8px",
            color: "white",
            fontSize: "1rem",
            cursor: "pointer",
            marginTop: "20px",
          }}
        >
          Regresar
        </button>

        {/* Listado de reservas */}
        <h2 style={{ marginTop: "30px", color: "#333" }}>Mis Reservas</h2>
        {reservas.length === 0 ? (
          <p style={{ color: "#777" }}>Aún no tienes reservas.</p>
        ) : (
          reservas.map((r) => (
            <div
              key={r.id}
              style={{
                border: "1px solid #ddd",
                borderRadius: "10px",
                padding: "15px",
                marginBottom: "10px",
                backgroundColor: "#f9f9f9",
              }}
            >
              <strong>{r.zona}</strong> <br />
              📅 {r.fecha} | ⏰ {r.horaInicio} - {r.horaFin}
            </div>
          ))
        )}
      </div>
      
    <ChatbotButton />
    </div>
  );
}