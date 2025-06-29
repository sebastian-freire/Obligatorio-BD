import { useState } from "react";
import toast from "react-hot-toast";

export default function useProveedores() {
    const apiUrl = import.meta.env.VITE_API_ENDPOINT;

    const fetchProveedores = async () => {
        try {
            const url = `${apiUrl}/proveedores`;
            const res = await fetch(url);
            const data = await res.json();
            return data;
        } catch (err) {
            console.error("Failed to fetch:", err);
        }
    };

    const fetchProveedor = async (id) => {
        try {
            const url = `${apiUrl}/proveedores/${id}`;
            const res = await fetch(url);
            const data = await res.json();
            return data;
        } catch (err) {
            console.error("Failed to fetch:", err);
        }
    };

    const agregarProveedor = async (proveedor) => {
        try {
            const res = await fetch(`${apiUrl}/proveedores`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    nombre: proveedor.nombre,
                    telefono: proveedor.telefono,
                    correo: proveedor.correo,
                    direccion: proveedor.direccion
                })
            });
            if (!res.ok) throw new Error("Error al agregar post");
            toast.success("Proveedor agregado correctamente");
            return true;
        } catch (err) {
            console.error(err);
        }
    };

    const editarProveedor = async (id, proveedor) => {
        try {
            const res = await fetch(`${apiUrl}/proveedores/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    nombre: proveedor.nombre,
                    telefono: proveedor.telefono,
                    correo: proveedor.correo,
                    direccion: proveedor.direccion
                })
            });
            if (!res.ok) throw new Error("Error al agregar post");
            toast.success("Proveedor editado correctamente");
            return true;
        } catch (err) {
            console.error(err);
        }
    };

    const eliminarProveedor = async (id) => {
    try {
      const res = await fetch(`${apiUrl}/proveedores/${id}`, {
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
        fetchProveedores,
        fetchProveedor,
        agregarProveedor,
        editarProveedor,
        eliminarProveedor,
    };
}
