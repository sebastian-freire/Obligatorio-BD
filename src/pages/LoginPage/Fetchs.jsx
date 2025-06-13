import React, { useState } from "react";
import { useParams } from "react-router-dom";



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
  let user = await fetchUsuario(
    usuarioActual.current.value,
    contraseña.current.value
  );
  if (!user) {
    setUsuarioIncorrecto(true);
  } else {
    setUsuarioIncorrecto(false);
    setCurrentUser(user);
    navigate("/menu");
  }
};
