import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext.jsx";

function ProtectedRoute({ children, adminOnly = false }) {
  const { user, loading } = useUser();
  const navigate = useNavigate();

  // Mientras se está verificando la autenticación
  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh"
        }}
      >
        <p>Verificando autenticación...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          flexDirection: "column",
          gap: "16px"
        }}
      >
        <h2>Acceso Denegado</h2>
        <p>Debes tener una sesión activa para acceder a esta sección.</p>
        <button
          onClick={() => navigate("/login", { replace: true })}
          style={{
            padding: "12px 24px",
            backgroundColor: "var(--dark-pink)",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer"
          }}
        >
          Volver al login
        </button>
      </div>
    );
  }

  if (adminOnly && user.isAdmin !== true) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          flexDirection: "column",
          gap: "16px"
        }}
      >
        <h2>Acceso Denegado</h2>
        <p>No tienes permisos para acceder a esta sección.</p>
        <button
          onClick={() => navigate("/menu", { replace: true })}
          style={{
            padding: "12px 24px",
            backgroundColor: "var(--dark-pink)",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer"
          }}
        >
          Volver al Menú
        </button>
      </div>
    );
  }

  // Si está autenticado y tiene permisos, mostrar el contenido
  return children;
}

export default ProtectedRoute;
