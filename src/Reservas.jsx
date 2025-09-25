import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ChatbotButton from "./ChatbotButton";

export default function Reservas() {
  const [zona, setZona] = useState("");
  const [fecha, setFecha] = useState("");
  const [horaInicio, setHoraInicio] = useState("");
  const [horaFin, setHoraFin] = useState("");
  const [cantidad, setCantidad] = useState(0);
  const [comentario, setComentario] = useState("");
  const [reservas, setReservas] = useState([]);
  const [telefono, setTelefono] = useState("");
  const [codigoVerificacion, setCodigoVerificacion] = useState("");
  const [codigoGenerado, setCodigoGenerado] = useState("");
  const navigate = useNavigate();

  const zonasComunes = [
    "Salón Comunal",
    "Piscina",
    "Gimnasio",
    "Zona BBQ",
    "Parque Infantil",
  ];

  // Validar que no sea fecha pasada
  const validarFecha = (fecha) => {
    const hoy = new Date().toISOString().split("T")[0];
    return fecha >= hoy;
  };

  // Crear reserva
  const crearReserva = () => {
    if (!zona || !fecha || !horaInicio || !horaFin) {
      alert("Por favor completa todos los campos");
      return;
    }
    if (!validarFecha(fecha)) {
      alert("La fecha seleccionada no puede ser anterior al día actual");
      return;
    }
    if (cantidad <= 0) {
      alert("La cantidad de personas debe ser mayor a 0");
      return;
    }

    const nueva = {
      id: Date.now(),
      zona,
      fecha,
      horaInicio,
      horaFin,
      cantidad,
      comentario,
      estado: "pendiente", // por defecto
    };

    setReservas([...reservas, nueva]);
    setZona("");
    setFecha("");
    setHoraInicio("");
    setHoraFin("");
    setCantidad(0);
    setComentario("");
  };

  // Simular envío de código de verificación
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

  // Cancelar reserva
  const cancelarReserva = (id) => {
    if (codigoVerificacion !== codigoGenerado) {
      alert("El código ingresado no es correcto");
      return;
    }
    setReservas(reservas.filter((r) => r.id !== id));
    alert("Reserva cancelada correctamente ✅");
    setTelefono("");
    setCodigoVerificacion("");
    setCodigoGenerado("");
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
          {/* Zona */}
          <div>
            <label>Zona</label>
            <select
              value={zona}
              onChange={(e) => setZona(e.target.value)}
              style={{ width: "100%", padding: "10px" }}
            >
              <option value="">Seleccionar...</option>
              {zonasComunes.map((z, i) => (
                <option key={i} value={z}>
                  {z}
                </option>
              ))}
            </select>
          </div>

          {/* Fecha */}
          <div>
            <label>Fecha</label>
            <input
              type="date"
              value={fecha}
              onChange={(e) => setFecha(e.target.value)}
              style={{ width: "100%", padding: "10px" }}
            />
          </div>

          {/* Hora inicio */}
          <div>
            <label>Hora inicio</label>
            <input
              type="time"
              value={horaInicio}
              onChange={(e) => setHoraInicio(e.target.value)}
              style={{ width: "100%", padding: "10px" }}
            />
          </div>

          {/* Hora fin */}
          <div>
            <label>Hora fin</label>
            <input
              type="time"
              value={horaFin}
              onChange={(e) => setHoraFin(e.target.value)}
              style={{ width: "100%", padding: "10px" }}
            />
          </div>

          {/* Cantidad */}
          <div>
            <label>Cantidad de personas</label>
            <input
              type="number"
              value={cantidad}
              onChange={(e) => setCantidad(Number(e.target.value))}
              style={{ width: "100%", padding: "10px" }}
            />
          </div>

          {/* Comentarios */}
          <div>
            <label>Comentarios</label>
            <input
              type="text"
              value={comentario}
              onChange={(e) => setComentario(e.target.value)}
              style={{ width: "100%", padding: "10px" }}
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
              📅 {r.fecha} | ⏰ {r.horaInicio} - {r.horaFin} <br />
              👥 {r.cantidad} personas <br />
              📝 {r.comentario || "Sin comentarios"} <br />
              📌 Estado: {r.estado}
              <div style={{ marginTop: "10px" }}>
                <input
                  type="text"
                  placeholder="Teléfono (8 dígitos)"
                  value={telefono}
                  onChange={(e) => setTelefono(e.target.value)}
                  style={{ marginRight: "5px" }}
                />
                <button onClick={enviarCodigo}>Enviar código</button>
                <input
                  type="text"
                  placeholder="Código recibido"
                  value={codigoVerificacion}
                  onChange={(e) => setCodigoVerificacion(e.target.value)}
                  style={{ marginLeft: "5px", marginRight: "5px" }}
                />
                <button onClick={() => cancelarReserva(r.id)}>Cancelar</button>
              </div>
            </div>
          ))
        )}
      </div>

      <ChatbotButton />
    </div>
  );
}
