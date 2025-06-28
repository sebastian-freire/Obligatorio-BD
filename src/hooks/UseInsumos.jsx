import toast from "react-hot-toast";

export default function useInsumos() {
    const apiUrl = import.meta.env.VITE_API_ENDPOINT;

    const fetchInsumos = async () => {
        try {
            const url = `${apiUrl}/insumos`;
            const res = await fetch(url);
            const data = await res.json();
            return data;
        } catch (err) {
            console.error("Failed to fetch:", err);
        }
    };

    const fetchInsumo = async (id) => {
        try {
            const url = `${apiUrl}/insumos/${id}`;
            const res = await fetch(url);
            const data = await res.json();
            return data;
        } catch (err) {
            console.error("Failed to fetch:", err);
        }
    };

    const agregarInsumo = async (insumo) => {
        try {
            const res = await fetch(`${apiUrl}/insumos`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    descripcion: insumo.descripcion,
                    tipo: insumo.tipo,
                    precio_unitario: insumo.precio_unitario,
                    id_proveedor: insumo.id_proveedor
                })
            });
            if (!res.ok) throw new Error("Error al agregar post");
            toast.success("Insumo agregado correctamente");
            return true;
        } catch (err) {
            console.error(err);
        }
    };

    const editarInsumo = async (id, insumo) => {
        try {
            const res = await fetch(`${apiUrl}/insumos/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    descripcion: insumo.descripcion,
                    tipo: insumo.tipo,
                    precio_unitario: insumo.precio_unitario,
                    id_proveedor: insumo.id_proveedor
                })
            });
            if (!res.ok) throw new Error("Error al editar cliente");
            toast.success("Insumo editado correctamente");
            return true;
        } catch (err) {
            console.error(err);
            toast.error("Error al editar cliente");
        }
    };

    const eliminarInsumo = async (id) => {
        try {
            const res = await fetch(`${apiUrl}/insumos/${id}`, {
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
        fetchInsumos,
        fetchInsumo,
        agregarInsumo,
        editarInsumo,
        eliminarInsumo,
    };
}
