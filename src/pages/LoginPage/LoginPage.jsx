import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../context/UserContext.jsx";
import "./LoginPage.css";

function LoginPage() {
  const usuarioActual = useRef("");
  const contraseña = useRef("");
  const [UsuarioIncorrecto, setUsuarioIncorrecto] = useState(false);
  const [loading, setLoading] = useState(false);

  const { login, logout } = useUser();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setUsuarioIncorrecto(false);

    const correo = usuarioActual.current.value;
    const contrasena = contraseña.current.value;

    if (!correo || !contrasena) {
      setUsuarioIncorrecto(true);
      setLoading(false);
      return;
    }

    const success = await login(correo, contrasena);

    if (success) {
      navigate("/menu");
    } else {
      setUsuarioIncorrecto(true);
    }

    setLoading(false);
  };

  const handleLogout = (e) => {
    e.preventDefault();
    logout();
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h2 className="login-h1">Iniciar sesión</h2>
        <input
          className="login-input"
          type="email"
          name="usuario"
          placeholder="Correo electrónico"
          ref={usuarioActual}
          disabled={loading}
        />
        <input
          className="login-input"
          type="password"
          name="contraseña"
          placeholder="Contraseña"
          ref={contraseña}
          disabled={loading}
        />
        {UsuarioIncorrecto && (
          <p className="error-message">Usuario o contraseña incorrectos</p>
        )}
        <button className="login_button" type="submit" onClick={handleLogin} disabled={loading}>
          {loading ? "Ingresando..." : "Ingresar"}
        </button>
        <button className="login_button" type="button" onClick={handleLogout} disabled={loading}>
          Cerrar sesión
        </button>
      </div>
    </div>
  );
}

export default LoginPage;
