import { handleApiResponse, handleApiError } from "../utils/apiUtils";

export default function useInsumos() {
    const apiUrl = import.meta.env.VITE_API_ENDPOINT;

    const fetchInsumos = async () => {
        try {
            const url = `${apiUrl}/insumos`;
            const res = await fetch(url);
            return await handleApiResponse(res);
        } catch (err) {
            await handleApiError(err);
            return false;
        }
    };

    const fetchInsumo = async (id) => {
        try {
            const url = `${apiUrl}/insumos/${id}`;
            const res = await fetch(url);
            return await handleApiResponse(res);
        } catch (err) {
            await handleApiError(err);
            return false;
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
            await handleApiResponse(res);
            return true;
        } catch (err) {
            await handleApiError(err);
            return false;
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
            await handleApiResponse(res);
            return true;
        } catch (err) {
            await handleApiError(err);
            return false;
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
            await handleApiResponse(res);
            return true;
        } catch (err) {
            await handleApiError(err);
            return false;
        }
    };

    return {
        fetchInsumos,
        fetchInsumo,
        agregarInsumo,
        editarInsumo,
        eliminarInsumo
    };
}
