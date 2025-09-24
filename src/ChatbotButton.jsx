// ChatbotButton.jsx
import { MessageCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function ChatbotButton() {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate("/chatbot")}
      style={{
        position: "fixed",
        bottom: "20px",
        right: "20px",
        width: "60px",
        height: "60px",
        borderRadius: "50%",
        backgroundColor: "#007bff",
        border: "none",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        boxShadow: "0px 4px 12px rgba(0,0,0,0.2)",
        transition: "background 0.3s ease"
      }}
      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#0056b3")}
      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#007bff")}
    >
      <MessageCircle color="white" size={28} />
    </button>
  );
}
