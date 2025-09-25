// frontend/src/components/Reservas.jsx
import React, { useState, useEffect } from "react";
import { API_BASE_URL } from './config';

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

  const zonasComunes = [
    "Salón Comunal",
    "Piscina",
    "Gimnasio",
    "Zona BBQ",
    "Parque Infantil",
  ];

  useEffect(() => { fetchReservas(); }, []);

  const fetchReservas = async () => {
    try {
      const res = await fetch(`${ API_BASE_URL}/reservas`);
      const data = await res.json();
      setReservas(data);
    } catch (error) { console.error("Error al obtener reservas:", error); }
  };

  const validarFecha = (fecha) => {
    const hoy = new Date().toISOString().split("T")[0];
    return fecha >= hoy;
  };

  const crearReserva = async () => {
    if (!zona || !fecha || !horaInicio || !horaFin || cantidad <= 0) {
      alert("Por favor completa todos los campos correctamente");
      return;
    }
    if (!validarFecha(fecha)) { alert("La fecha seleccionada no puede ser anterior al día actual"); return; }
    if (horaFin <= horaInicio) { alert("La hora de fin debe ser mayor que la hora de inicio"); return; }

    const nuevaReserva = { zona, fecha, horaInicio, horaFin, numeroPersonas: cantidad, comentarios: comentario || "Sin comentarios", estado: "pendiente" };

    try {
      const res = await fetch(`${ API_BASE_URL}/reservas`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(nuevaReserva) });
      if (!res.ok) { const err = await res.json(); alert(err.mensaje || "Error al crear reserva"); return; }
      const data = await res.json();
      alert(data.mensaje);
      fetchReservas();
      setZona(""); setFecha(""); setHoraInicio(""); setHoraFin(""); setCantidad(0); setComentario("");
    } catch (error) { console.error("Error al crear reserva:", error); alert("Error al crear reserva"); }
  };

  const enviarCodigo = () => {
    if (!telefono.match(/^\d{8}$/)) { alert("Ingrese un número válido de 8 dígitos"); return; }
    const letras = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let code = letras[Math.floor(Math.random() * letras.length)] + letras[Math.floor(Math.random() * letras.length)] + letras[Math.floor(Math.random() * letras.length)] + letras[Math.floor(Math.random() * letras.length)] + Math.floor(Math.random() * 10) + Math.floor(Math.random() * 10);
    setCodigoGenerado(code);
    alert("Código enviado por SMS (simulado): " + code);
  };

  const cancelarReserva = async (id) => {
    if (codigoVerificacion !== codigoGenerado) { alert("El código ingresado no es correcto"); return; }
    try {
      const res = await fetch(`${API_BASE_URL}/reservas/${id}`, { method: "DELETE" });
      if (!res.ok) { const err = await res.json(); alert(err.mensaje || "Error al cancelar reserva"); return; }
      const data = await res.json();
      alert(data.mensaje);
      fetchReservas();
      setTelefono(""); setCodigoVerificacion(""); setCodigoGenerado("");
    } catch (error) { console.error("Error al cancelar reserva:", error); alert("Error al cancelar reserva"); }
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh", background: "linear-gradient(to right, #4facfe, #00f2fe)" }}>
      <div style={{ background: "white", borderRadius: "15px", padding: "40px", boxShadow: "0px 4px 20px rgba(0,0,0,0.1)", width: "90%", maxWidth: "900px", position: "relative" }}>
        <h1 style={{ color: "#333", marginBottom: "20px", textAlign: "center" }}>Reservas de Zonas Comunes</h1>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "20px" }}>
          <div>
            <label>Zona</label>
            <select value={zona} onChange={(e) => setZona(e.target.value)} style={{ width: "100%", padding: "10px" }}>
              <option value="">Seleccionar...</option>
              {zonasComunes.map((z, i) => <option key={i} value={z}>{z}</option>)}
            </select>
          </div>
          <div><label>Fecha</label><input type="date" value={fecha} onChange={(e) => setFecha(e.target.value)} style={{ width: "100%", padding: "10px" }} /></div>
          <div><label>Hora inicio</label><input type="time" value={horaInicio} onChange={(e) => setHoraInicio(e.target.value)} style={{ width: "100%", padding: "10px" }} /></div>
          <div><label>Hora fin</label><input type="time" value={horaFin} onChange={(e) => setHoraFin(e.target.value)} style={{ width: "100%", padding: "10px" }} /></div>
          <div><label>Cantidad de personas</label><input type="number" value={cantidad} onChange={(e) => setCantidad(Number(e.target.value))} style={{ width: "100%", padding: "10px" }} /></div>
          <div><label>Comentarios</label><input type="text" value={comentario} onChange={(e) => setComentario(e.target.value)} style={{ width: "100%", padding: "10px" }} /></div>
        </div>

        <button onClick={crearReserva} style={{ width: "100%", padding: "12px", background: "#4facfe", border: "none", borderRadius: "8px", color: "white", fontSize: "1rem", cursor: "pointer" }}>Crear Reserva</button>

        <h2 style={{ marginTop: "30px", color: "#333" }}>Mis Reservas</h2>
        {reservas.length === 0 ? (<p style={{ color: "#777" }}>Aún no tienes reservas.</p>) : (
          reservas.map((r) => (
            <div key={r._id} style={{ border: "1px solid #ddd", borderRadius: "10px", padding: "15px", marginBottom: "10px", backgroundColor: "#f9f9f9" }}>
              <strong>{r.zona}</strong> <br />
              📅 {new Date(r.fecha).toLocaleDateString()} | ⏰ {r.horaInicio} - {r.horaFin} <br />
              👥 {r.numeroPersonas} personas <br
 />
              📝 {r.comentarios} <br />
              📌 Estado: <span style={{ color: r.estado === "aprobada" ? "green" : r.estado === "rechazada" ? "red" : "orange" }}>{r.estado}</span>
              <div style={{ marginTop: "10px" }}>
                <input type="text" placeholder="Teléfono (8 dígitos)" value={telefono} onChange={(e) => setTelefono(e.target.value)} style={{ marginRight: "5px" }} />
                <button onClick={enviarCodigo}>Enviar código</button>
                <input type="text" placeholder="Código recibido" value={codigoVerificacion} onChange={(e) => setCodigoVerificacion(e.target.value)} style={{ marginLeft: "5px", marginRight: "5px" }} />
                <button onClick={() => cancelarReserva(r._id)}>Cancelar</button>
              </div>
            </div>
          ))
        )}
      </div>

      <ChatbotButton />
    </div>
  );
}
