import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useUser } from "/src/context/UserContext.jsx";

export default function useFetch() {
  const apiUrl = import.meta.env.API_ENDPOINT;
  const [UsuarioIncorrecto, setUsuarioIncorrecto] = useState(false);
  const { setCurrentUser } = useUser();
  const navigate = useNavigate();


  const fetchUsuario = async (correo, password) => {
    try {
      const url = `${apiUrl}/login/?correo=${correo}&contrasena=${password}`;
      const res = await fetch(url);
      const data = await res.json();
      console.log(data);
      return data ? data : null; // Retorna el usuario si existe, o null si no
    } catch (err) {
      if (correo == "c@gmail.com", password == "1234") {
        return ({ corre0: "c@gmail.com", contrasena: "1234", es_administrador: false }/*, {corre0: "a@gmail.com", contrasena:"admin", es_administrador: true}]*/);
      } else {
        return null; // Si hay un error, retorna null 
      }

    }
  };

  const logIn = async (usuarioActual, contraseña) => {
    let user = await fetchUsuario(
      usuarioActual,
      contraseña
    );
    if (!user) {
      setUsuarioIncorrecto(true);
    } else {
      setUsuarioIncorrecto(false);
      setCurrentUser(user);
      navigate("/menu");
    }
  }

  const cerrar = async () => {
      setUsuarioIncorrecto(false);
      setCurrentUser(null);
  }

  return {
    fetchUsuario,
    logIn,
    UsuarioIncorrecto,
    cerrar
  };
};




