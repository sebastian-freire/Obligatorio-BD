import "../../styles/sharedStyles.css";
import { useUser } from "../../context/UserContext.jsx";
import { useNavigate } from "react-router-dom";

export default function MenuPage() {
  const { getCurrentUser, logout } = useUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="menu-container">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
          gap: "20px"
        }}
      >
        <h1 style={{ margin: 0 }}>Menú Principal</h1>
        <button
          onClick={handleLogout}
          className="cancel-button"
          style={{
            padding: "6px 12px",
            fontSize: "12px",
            minWidth: "auto"
          }}
        >
          Cerrar Sesión
        </button>
      </div>

      <ul>
        <li>
          <a href="/clientes">Clientes</a>
        </li>
        <li>
          <a href="/mantenimientos">Mantenimientos</a>
        </li>
        <li>
          <a href="/insumos">Insumos</a>
        </li>

        {getCurrentUser()?.isAdmin && (
          <>
            <li>
              <a href="/maquinas">Máquinas</a>
            </li>
            <li>
              <a href="/tecnicos">Técnicos</a>
            </li>
            <li>
              <a href="/proveedores">Proveedores</a>
            </li>
          </>
        )}
      </ul>
    </div>
  );
}
