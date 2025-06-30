import { handleApiResponse, handleApiError } from "../utils/apiUtils";
import { useUser } from "../context/UserContext";

export default function useMaquinas() {
  const apiUrl = import.meta.env.VITE_API_ENDPOINT;
  const { getAuthHeaders } = useUser();

  const fetchMaquinasCliente = async (id_cliente) => {
    try {
      const url = `${apiUrl}/maquinas/cliente/${id_cliente}`;
      const res = await fetch(url, {
        headers: getAuthHeaders()
      });
      return await handleApiResponse(res);
    } catch (err) {
      return handleApiError(err);
    }
  };

  const fetchMaquinaById = async (id) => {
    try {
      const url = `${apiUrl}/maquinas/${id}`;
      const res = await fetch(url, {
        headers: getAuthHeaders()
      });
      return await handleApiResponse(res);
    } catch (err) {
      return handleApiError(err);
    }
  };

  const fetchMaquinas = async () => {
    try {
      const url = `${apiUrl}/maquinas`;
      const res = await fetch(url, {
        headers: getAuthHeaders()
      });
      return await handleApiResponse(res);
    } catch (err) {
      return handleApiError(err);
    }
  };

  const eliminarMaquina = async (id) => {
    try {
      const res = await fetch(`${apiUrl}/maquinas/${id}`, {
        method: "DELETE",
        headers: getAuthHeaders()
      });
      await handleApiResponse(res);
      return true;
    } catch (err) {
      return handleApiError(err);
    }
  };

  const editarMaquina = async (id, maquina) => {
    try {
      const res = await fetch(`${apiUrl}/maquinas/${id}`, {
        method: "PATCH",
        headers: getAuthHeaders(),
        body: JSON.stringify({
          modelo: maquina.modelo,
          id_cliente: maquina.id_cliente,
          ubicacion_maquina: maquina.ubicacion_maquina,
          costo_alquiler_mensual: maquina.costo_alquiler_mensual
        })
      });
      await handleApiResponse(res);
      return true;
    } catch (err) {
      return handleApiError(err);
    }
  };

  const agregarMaquina = async (maquina) => {
    try {
      const res = await fetch(`${apiUrl}/maquinas`, {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify({
          modelo: maquina.modelo,
          id_cliente: maquina.id_cliente,
          ubicacion_maquina: maquina.ubicacion_maquina,
          costo_alquiler_mensual: maquina.costo_alquiler_mensual
        })
      });
      await handleApiResponse(res);
      return true;
    } catch (err) {
      return handleApiError(err);
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
