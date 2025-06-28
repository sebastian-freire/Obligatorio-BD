import React, { useState } from "react";
import toast from "react-hot-toast";

export default function useMantenimientos() {
    const apiUrl = import.meta.env.VITE_API_ENDPOINT;

    const fetchMantenimiento = async (id) => {
        try {
            const url = `${apiUrl}/clientes/${id}`;
            const res = await fetch(url);
            const data = await res.json();
            return data;
        } catch (err) {
            console.error("Failed to fetch:", err);
        }
    };

    const fetchMantenimientos = async () => {
        try {
            const url = `${apiUrl}/mantenimientos`;
            const res = await fetch(url);
            const data = await res.json();
            return data;
        } catch (err) {
            console.error("Failed to fetch:", err);
        }
    };

    const agregarMantenimiento = async (nuevoMantenimiento) => {
        try {
            const res = await fetch(`${apiUrl}/clientes`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    id_maquina: nuevoMantenimiento.id_maquina,
                    ci_tecnico: nuevoMantenimiento.ci_tecnico,
                    tipo: nuevoMantenimiento.tipo,
                    fecha: nuevoMantenimiento.fecha,
                    observaciones: nuevoMantenimiento.observaciones
                })
            });
            if (!res.ok) throw new Error("Error al agregar post");
            toast.success("Mantenimiento agregado correctamente");
            return true;
        } catch (err) {
            console.error(err);
        }
    };



    //AAAAA
    const editarMantenimiento = async (id, nombre, telefono, correo) => {
        try {
            const res = await fetch(`${apiUrl}/clientes/${id}`, {
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
            toast.success("Mantenimiento editado correctamente");
            if (!res.ok) throw new Error(res.statusText);
            return true;
        } catch (err) {
            console.error(err);
        }
    };

    const eliminarMantenimiento = async (id) => {
        try {
            const res = await fetch(`${apiUrl}/mantenimientos/${id}`, {
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

    return {
        fetchMantenimiento,
        fetchMantenimientos,
        editarMantenimiento,
        eliminarMantenimiento,
        agregarMantenimiento
    };
}
