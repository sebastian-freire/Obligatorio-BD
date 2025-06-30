import { handleApiResponse, handleApiError } from "../utils/apiUtils";

export default function useMantenimientos() {
  const apiUrl = import.meta.env.VITE_API_ENDPOINT;

  const fetchMantenimiento = async (id) => {
    try {
      const url = `${apiUrl}/mantenimientos/${id}`;
      const res = await fetch(url);
      const data = await res.json();
      return data;
    } catch (err) {
      await handleApiError(err);
      return false;
    }
  };

  const fetchMantenimientos = async () => {
    try {
      const url = `${apiUrl}/mantenimientos`;
      const res = await fetch(url);
      const data = await res.json();
      return data;
    } catch (err) {
      await handleApiError(err);
      return false;
    }
  };

  const agregarMantenimiento = async (nuevoMantenimiento) => {
    try {
      // Convertir fecha a formato ISO ajustado a la zona horaria
      const fecha = new Date(nuevoMantenimiento.fecha);
      const fechaAjustada = fecha.toISOString().slice(0, 19).replace("T", " ");

      const res = await fetch(`${apiUrl}/mantenimientos`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          id_maquina: nuevoMantenimiento.id_maquina,
          ci_tecnico: nuevoMantenimiento.ci_tecnico,
          tipo: nuevoMantenimiento.tipo,
          fecha: fechaAjustada,
          observaciones: nuevoMantenimiento.observaciones
        })
      });

      await handleApiResponse(res);
      return true;
    } catch (err) {
      await handleApiError(err);
      return false;
    }
  };

  const editarMantenimiento = async (id, mantenimiento) => {
    try {
      const fecha = new Date(mantenimiento.fecha);
      const fechaAjustada = fecha.toISOString().slice(0, 19).replace("T", " ");

      const res = await fetch(`${apiUrl}/mantenimientos/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          id_maquina: mantenimiento.id_maquina,
          ci_tecnico: mantenimiento.ci_tecnico,
          tipo: mantenimiento.tipo,
          fecha: fechaAjustada,
          observaciones: mantenimiento.observaciones
        })
      });

      await handleApiResponse(res);
      return true;
    } catch (err) {
      await handleApiError(err);
      return false;
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

      await handleApiResponse(res);
      return true;
    } catch (err) {
      return handleApiError(err);
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
