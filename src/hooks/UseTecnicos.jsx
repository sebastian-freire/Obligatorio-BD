import { useState } from "react";
import toast from "react-hot-toast";

export default function useTecnicos() {
    const apiUrl = import.meta.env.VITE_API_ENDPOINT;
    const [tecnicos, setTecnicos] = useState([]);

    const fetchTecnicos = async () => {
        try {
            const response = await fetch(`${apiUrl}/tecnicos`);
            if (response.ok) {
                const data = await response.json();
                setTecnicos(data);
            } else {
                toast.error("Error al obtener técnicos");
            }
        } catch (error) {
            toast.error("Error de conexión");
        }
    };

    const fetchTecnico = async (ci) => {
        try {
            const response = await fetch(`${apiUrl}/tecnicos/${ci}`);
            if (response.ok) {
                const data = await response.json();
                return data[0];
            } else {
                toast.error("Error al obtener técnico");
                return null;
            }
        } catch (error) {
            toast.error("Error de conexión");
            return null;
        }
    };

    const agregarTecnico = async (tecnico) => {
        try {
            const response = await fetch(`${apiUrl}/tecnicos`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(tecnico),
            });

            if (response.ok) {
                toast.success("Técnico agregado exitosamente");
                window.location.href = "/tecnicos";
            } else {
                toast.error("Error al agregar técnico");
            }
        } catch (error) {
            toast.error("Error de conexión");
        }
    };

    const editarTecnico = async (ci, tecnico) => {
        try {
            const response = await fetch(`${apiUrl}/tecnicos/${ci}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(tecnico),
            });

            if (response.ok) {
                toast.success("Técnico editado exitosamente");
                window.location.href = "/tecnicos";
            } else {
                toast.error("Error al editar técnico");
            }
        } catch (error) {
            toast.error("Error de conexión");
        }
    };

    const eliminarTecnico = async (ci) => {
        try {
            const response = await fetch(`${apiUrl}/tecnicos/${ci}`, {
                method: "DELETE",
            });

            if (response.ok) {
                toast.success("Técnico eliminado exitosamente");
            } else {
                toast.error("Error al eliminar técnico");
            }
        } catch (error) {
            toast.error("Error de conexión");
        }
    };

    return {
        tecnicos,
        fetchTecnicos,
        fetchTecnico,
        agregarTecnico,
        editarTecnico,
        eliminarTecnico,
    };
}
