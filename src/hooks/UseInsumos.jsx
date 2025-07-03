import { handleApiResponse, handleApiError } from "../utils/apiUtils";
import { useUser } from "../context/UserContext";

export default function useInsumos() {
  const apiUrl = import.meta.env.VITE_API_ENDPOINT;
  const { getAuthHeaders } = useUser();

  const fetchInsumos = async () => {
    try {
      const url = `${apiUrl}/insumos`;
      const res = await fetch(url, {
        headers: getAuthHeaders()
      });
      return await handleApiResponse(res);
    } catch (err) {
      await handleApiError(err);
      return false;
    }
  };

  const fetchInsumo = async (id) => {
    try {
      const url = `${apiUrl}/insumos/${id}`;
      const res = await fetch(url, {
        headers: getAuthHeaders()
      });
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
        headers: getAuthHeaders(),
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
        headers: getAuthHeaders(),
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
        headers: getAuthHeaders()
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
