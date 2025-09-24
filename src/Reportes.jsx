import React from "react";
import ChatbotButton from "./ChatbotButton";

export default function Reportes() {
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
          maxWidth: "700px",
          textAlign: "center",
        }}
      >
        <h1 style={{ color: "#333" }}>Reporte de Incidencias</h1>
        <p style={{ color: "#555" }}>
          Aquí podrás registrar y dar seguimiento a incidencias dentro de la
          residencia.
        </p>
      </div>
      
    <ChatbotButton />
    </div>
  );
}
