import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "/src/context/UserContext.jsx";
import "./LoginPage.css";

function LoginPage() {
    const navigate = useNavigate();
    const usuarioActual = useRef("");
    const contraseña = useRef("");
    const { setCurrentUser } = useUser();
    const [UsuarioIncorrecto, setUsuarioIncorrecto] = useState(false);
    


    return (
        <div className="login-container">
            <h2>Iniciar sesión</h2>
            <input type="text" name="usuario" placeholder="Correo electrónico" ref={usuarioActual} />
            <input type="text" name="contraseña" placeholder="Contraseña" ref={contraseña} />
            {UsuarioIncorrecto && <p className="error-message">Usuario o contraseña incorrectos</p>}
            <button type="submit" onClick={logIn} >
                Ingresar
            </button>
        </div>
    );
}

export default LoginPage;