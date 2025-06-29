import { useNavigate } from "react-router-dom";
import "../styles/sharedStyles.css";

export default function MenuButton({ className = "menu-button" }) {
  const navigate = useNavigate();

  return (
    <button className={className} onClick={() => navigate("/menu")}>
      Volver al Menú
    </button>
  );
}
