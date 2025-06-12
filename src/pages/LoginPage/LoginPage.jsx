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


    //que me va a devolver el fetch a la base de datos

    const fetchUsuario = async (correo, password) => {
        try {
            const url = `http://127.0.0.1:5000/login/?correo=${correo}&password=${password}`;
            const res = await fetch(url);
            const data = await res.json();
            return data ? data : null; // Retorna el usuario si existe, o null si no
        } catch (err) {
            console.error("Failed to fetch:", err);
        }
    };

    const logIn = async (e) => {
        e.preventDefault();
        let user = await fetchUsuario(usuarioActual.current.value, contraseña.current.value);
        if (!user) {
            setUsuarioIncorrecto(true);
        } else {
            setUsuarioIncorrecto(false);
            setCurrentUser(user);
            navigate("/menu");
        }
    };

    return (
        <div className="login-container">
            <h2>Iniciar sesión</h2>
            <input type="text" name="usuario" placeholder="Correo electrónico" ref={usuarioActual} />
            <input type="text" name="contraseña" placeholder="Contraseña" ref={usuarioActual} />
            {UsuarioIncorrecto && <p className="error-message">Usuario o contraseña incorrectos</p>}
            <button type="submit" onClick={logIn}>
                Ingresar
            </button>
        </div>
    );
}

export default LoginPage;