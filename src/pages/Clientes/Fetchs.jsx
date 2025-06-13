import React, { useState } from "react";

export default function useFetch() {
  const [nombre, setNombre] = useState("");
  const [direccion, setDireccion] = useState("");
  const [telefono, setTelefono] = useState("");
  const [correo, setCorreo] = useState("");

  const [cliente, setCliente] = useState(null);

  const fetchCliente = async (id) => {
    try {
      const url = `http://127.0.0.1:5000/clientes/${id}`;
      const res = await fetch(url);
      const data = await res.json();
      return data;
    } catch (err) {
      console.error("Failed to fetch:", err);
    }
  };

  const agregarCliente = async (nombre, telefono, correo) => {
    try {
      const res = await fetch("http://127.0.0.1:5000/clientes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          nombre: nombre,
          telefono: telefono,
          correo: correo
        })
      });
      if (!res.ok) throw new Error("Error al agregar post");
      return true;
    } catch (err) {
      console.error(err);
    }
  };

  const editarCliente = async (id, nombre, telefono, correo) => {
    try {
      const res = await fetch(`http://127.0.0.1:5000/clientes/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          nombre: nombre,
          telefono: telefono,
          correo: correo
        })
      });
      if (!res.ok) throw new Error("Error al agregar post");
      return true;
    } catch (err) {
      console.error(err);
    }
  };

  return {
    nombre,
    setNombre,
    direccion,
    setDireccion,
    telefono,
    setTelefono,
    correo,
    setCorreo,
    agregarCliente,
    editarCliente,
    cliente,
    setCliente,
    fetchCliente
  };
}
