import toast from "react-hot-toast";
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
      const data = await res.json();
      return data;
    } catch (err) {
      console.error("Failed to fetch:", err);
    }
  };

  const fetchTecnico = async (ci) => {
    try {
      const url = `${apiUrl}/tecnicos/${ci}`;
      const res = await fetch(url, {
        headers: getAuthHeaders()
      });
      const data = await res.json();
      return data;
    } catch (err) {
      console.error("Failed to fetch:", err);
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
      if (!res.ok) throw new Error("Error al agregar post");
      toast.success("Técnico agregado correctamente");
      return true;
    } catch (err) {
      console.error(err);
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
      if (!res.ok) throw new Error("Error al agregar post");
      toast.success("Técnico editado correctamente");
      return true;
    } catch (err) {
      console.error(err);
    }
  };

  const eliminarTecnico = async (ci) => {
    try {
      const res = await fetch(`${apiUrl}/tecnicos/${ci}`, {
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

  return {
    fetchTecnicos,
    fetchTecnico,
    agregarTecnico,
    editarTecnico,
    eliminarTecnico
  };
}
