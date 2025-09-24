import { useState } from "react";
import { Info } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Chatbot() {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([
    { from: "bot", text: "👋 ¡Hola! Soy tu asistente virtual. ¿En qué puedo ayudarte hoy?" },
  ]);
  const [input, setInput] = useState("");

  const respuestas = {
    horarios: "⏰ Las zonas comunes están disponibles de 8:00am a 10:00pm.",
    reservas: "📅 Para hacer una reserva, dirígete a la sección 'Reservas' en el menú.",
    incidencias: "🛠️ Para reportar incidencias, usa el botón con el ícono 'i' en la sección de Reservas.",
    default: "🤖 Lo siento, no entendí tu consulta. Prueba con 'horarios', 'reservas' o 'incidencias'.",
  };

  const enviarMensaje = () => {
    if (!input.trim()) return;

    const nuevoMensaje = { from: "user", text: input };
    setMessages([...messages, nuevoMensaje]);

    // Respuesta automática
    let respuesta = respuestas.default;
    const texto = input.toLowerCase();
    if (texto.includes("horario")) respuesta = respuestas.horarios;
    else if (texto.includes("reserva")) respuesta = respuestas.reservas;
    else if (texto.includes("incidencia")) respuesta = respuestas.incidencias;

    setTimeout(() => {
      setMessages((prev) => [...prev, { from: "bot", text: respuesta }]);
    }, 500);

    setInput("");
  };

  return (
    <div style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "100vh",
      background: "#f4f6f9"
    }}>
      <div style={{
        background: "white",
        borderRadius: "12px",
        width: "400px",
        height: "600px",
        display: "flex",
        flexDirection: "column",
        boxShadow: "0px 4px 15px rgba(0,0,0,0.1)"
      }}>
        {/* Header */}
        <div style={{
          padding: "15px",
          borderBottom: "1px solid #ddd",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          fontWeight: "bold",
          fontSize: "18px"
        }}>
          <button
            onClick={() => navigate("/comunicados")}
            style={{
              background: "#6c757d",
              border: "none",
              borderRadius: "5px",
              color: "white",
              fontSize: "1rem",
              cursor: "pointer",
              padding: "5px 10px",
              marginRight: "10px",
            }}
          >
            ←
          </button>
          <h3 style={{ margin: "0", color: "#007bff" }}>Chatbot</h3>
          <Info
            size={20}
            style={{ cursor: "pointer", color: "#007bff" }}
            title="Ir a Reportes"
            onClick={() => navigate("/reportes")}
          />
        </div>

        {/* Mensajes */}
        <div style={{
          flex: 1,
          padding: "15px",
          overflowY: "auto",
          background: "#f9fafc"
        }}>
          {messages.map((msg, i) => (
            <div
              key={i}
              style={{
                marginBottom: "10px",
                textAlign: msg.from === "user" ? "right" : "left"
              }}
            >
              <span style={{
                display: "inline-block",
                padding: "10px",
                borderRadius: "10px",
                background: msg.from === "user" ? "#007bff" : "#e9ecef",
                color: msg.from === "user" ? "white" : "black",
                maxWidth: "70%",
                wordWrap: "break-word"
              }}>
                {msg.text}
              </span>
            </div>
          ))}
        </div>

        {/* Input */}
        <div style={{
          padding: "10px",
          borderTop: "1px solid #ddd",
          display: "flex",
          gap: "10px"
        }}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Escribe tu mensaje..."
            style={{
              flex: 1,
              padding: "10px",
              borderRadius: "8px",
              border: "1px solid #ccc"
            }}
            onKeyDown={(e) => e.key === "Enter" && enviarMensaje()}
          />
          <button
            onClick={enviarMensaje}
            style={{
              background: "#007bff",
              color: "white",
              border: "none",
              borderRadius: "8px",
              padding: "10px 15px",
              cursor: "pointer"
            }}
          >
            Enviar
          </button>
        </div>
      </div>
    </div>
  );
}