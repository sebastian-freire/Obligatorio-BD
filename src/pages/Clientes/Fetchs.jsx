import React, { useState } from "react";
import { useParams } from "react-router-dom";

export async function agregarCliente({ nombre, direccion, telefono, correo }) {
    try {
        const res = await fetch("http://127.0.0.1:5000/clientes", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                nombre: nombre,
                direccion: direccion,
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

export async function editarCliente({ id, nombre, direccion, telefono, correo }) {
    try {
        const res = await fetch(`http://127.0.0.1:5000/clientes/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id: id,
                nombre: nombre,
                direccion: direccion,
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
