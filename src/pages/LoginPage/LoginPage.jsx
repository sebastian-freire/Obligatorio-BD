import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "/src/context/UserContext.jsx";
import useFetch from "./Fetchs";
import "./LoginPage.css";

function LoginPage() {
    const usuarioActual = useRef("");
    const contraseña = useRef("");

    const { fetchUsuario, logIn, UsuarioIncorrecto, cerrar } = useFetch();
    


    return (
        <div className="login-container">
            <h2>Iniciar sesión</h2>
            <input type="text" name="usuario" placeholder="Correo electrónico" ref={usuarioActual} />
            <input type="text" name="contraseña" placeholder="Contraseña" ref={contraseña} />
            {UsuarioIncorrecto && <p className="error-message">Usuario o contraseña incorrectos</p>}
            <button type="submit" onClick={(e) => {
                e.preventDefault();
                logIn(usuarioActual.current.value, contraseña.current.value)}} >
                Ingresar
            </button>
            <button type="submit" onClick={(e) => {
                e.preventDefault();
                cerrar()}} >
                Cerrar sesión
            </button>
        </div>
    );
}

export default LoginPage;