import { handleApiResponse, handleApiError } from "../utils/apiUtils";
import { useUser } from "../context/UserContext";

export default function useTecnicos() {
  const apiUrl = import.meta.env.VITE_API_ENDPOINT;
  const { getAuthHeaders } = useUser();

  const fetchTecnicos = async () => {
    try {
      const url = `${apiUrl}/tecnicos`;
      const res = await fetch(url, {
        headers: getAuthHeaders()
      });
      return await handleApiResponse(res);
    } catch (err) {
      return handleApiError(err);
    }
  };

  const fetchTecnico = async (ci) => {
    try {
      const url = `${apiUrl}/tecnicos/${ci}`;
      const res = await fetch(url, {
        headers: getAuthHeaders()
      });
      return await handleApiResponse(res);
    } catch (err) {
      return handleApiError(err);
    }
  };

  const agregarTecnico = async (tecnico) => {
    try {
      const res = await fetch(`${apiUrl}/tecnicos`, {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify({
          ci: tecnico.ci,
          nombre: tecnico.nombre,
          apellido: tecnico.apellido,
          telefono: tecnico.telefono
        })
      });
      await handleApiResponse(res);
      return true;
    } catch (err) {
      return handleApiError(err);
    }
  };

  const editarTecnico = async (ci, tecnico) => {
    try {
      const res = await fetch(`${apiUrl}/tecnicos/${ci}`, {
        method: "PATCH",
        headers: getAuthHeaders(),
        body: JSON.stringify({
          ci: tecnico.ci,
          nombre: tecnico.nombre,
          apellido: tecnico.apellido,
          telefono: tecnico.telefono
        })
      });
      await handleApiResponse(res);
      return true;
    } catch (err) {
      return handleApiError(err);
    }
  };

  const eliminarTecnico = async (ci) => {
    try {
      const res = await fetch(`${apiUrl}/tecnicos/${ci}`, {
        method: "DELETE",
        headers: getAuthHeaders()
      });
      await handleApiResponse(res);
      return true;
    } catch (err) {
      return handleApiError(err);
    }
  };

  return {
    fetchTecnicos,
    fetchTecnico,
    agregarTecnico,
    editarTecnico,
    eliminarTecnico
  };
}
