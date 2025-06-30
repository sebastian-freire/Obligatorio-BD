import toast from "react-hot-toast";
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
      const data = await res.json();
      return data;
    } catch (err) {
      console.error("Failed to fetch:", err);
    }
  };

  const fetchMaquinaById = async (id) => {
    try {
      const url = `${apiUrl}/maquinas/${id}`;
      const res = await fetch(url, {
        headers: getAuthHeaders()
      });
      const data = await res.json();
      return data;
    } catch (err) {
      console.error("Failed to fetch:", err);
    }
  };

  const fetchMaquinas = async () => {
    try {
      const url = `${apiUrl}/maquinas`;
      const res = await fetch(url, {
        headers: getAuthHeaders()
      });
      const data = await res.json();
      return data;
    } catch (err) {
      console.error("Failed to fetch:", err);
    }
  };

  const eliminarMaquina = async (id) => {
    try {
      const res = await fetch(`${apiUrl}/maquinas/${id}`, {
        method: "DELETE",
        headers: getAuthHeaders()
      });
      if (!res.ok) throw new Error("Error al agregar post");
      return true;
    } catch (err) {
      console.error(err);
      return false;
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
      if (!res.ok) throw new Error("Error al editar máquina");
      toast.success("Maquina editada correctamente");
      return true;
    } catch (err) {
      console.error(err);
      toast.error("Error al editar la máquina");
      return false;
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
      if (!res.ok) throw new Error("Error al agregar máquina");
      toast.success("Maquina agregada correctamente");
      return true;
    } catch (err) {
      console.error(err);
      toast.error("Error al agregar la máquina");
      return false;
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
