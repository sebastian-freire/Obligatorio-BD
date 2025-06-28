import React, { useState } from "react";

export default function useMaquinas() {
  const apiUrl = import.meta.env.VITE_API_ENDPOINT;

  const fetchMaquinasCliente = async (id_cliente) => {
    try {
      const url = `${apiUrl}/maquinas/cliente/${id_cliente}`;
      const res = await fetch(url);
      const data = await res.json();
      return data;
    } catch (err) {
      console.error("Failed to fetch:", err);
    }
  };

  const fetchMaquinaById = async (id) => {
    try {
      const url = `${apiUrl}/maquinas/${id}`;
      const res = await fetch(url);
      const data = await res.json();
      return data;
    } catch (err) {
      console.error("Failed to fetch:", err);
    }
  };

  const fetchMaquinas = async () => {
    try {
      const url = `${apiUrl}/maquinas`;
      const res = await fetch(url);
      const data = await res.json();
      return data;
    } catch (err) {
      console.error("Failed to fetch:", err);
    }
  };

  const eliminarMaquina = async (id) => {
    try {
      const res = await fetch(`${apiUrl}/maquinas/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        }
      });
      if (!res.ok) throw new Error("Error al agregar post");
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  };

  const editarMaquina = async (maquina) => {
    try {
      const res = await fetch(`${apiUrl}/maquinas/${maquina.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          id: maquina.id,
          modelo: maquina.modelo,
          id_cliente: maquina.id_cliente,
          ubicacion_maquina: maquina.ubicacion_maquina,
          costo_alquiler_mensual: maquina.costo_alquiler_mensual
        })
      });
      toast.success("Maquina editada correctamente");
      if (!res.ok) throw new Error("Error al agregar post");
      return true;
    } catch (err) {
      console.error(err);
    }
  };

  const agregarMaquina = async (maquina) => {
    try {
      const res = await fetch(`${apiUrl}/maquinas`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          modelo: maquina.modelo,
          id_cliente: maquina.id_cliente,
          ubicacion_maquina: maquina.ubicacion_maquina,
          costo_alquiler_mensual: maquina.costo_alquiler_mensual
        })
      });
      if (!res.ok) throw new Error("Error al agregar post");
      toast.success("Maquina agregada correctamente");
      return true;
    } catch (err) {
      console.error(err);
    }
  };

  return {
    fetchMaquinasCliente,
    fetchMaquinas,
    eliminarMaquina,
    editarMaquina,
    fetchMaquinaById,
    agregarMaquina
  };
}
