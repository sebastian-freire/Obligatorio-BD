import toast from "react-hot-toast";

export default function useMantenimientos() {
  const apiUrl = import.meta.env.VITE_API_ENDPOINT;

  const fetchMantenimiento = async (id) => {
    try {
      const url = `${apiUrl}/mantenimientos/${id}`;
      const res = await fetch(url);
      const data = await res.json();
      return data;
    } catch (err) {
      console.error("Failed to fetch:", err);
    }
  };

  const fetchMantenimientos = async () => {
    try {
      const url = `${apiUrl}/mantenimientos`;
      const res = await fetch(url);
      const data = await res.json();
      return data;
    } catch (err) {
      console.error("Failed to fetch:", err);
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

      const responseData = await res.json();

      if (!res.ok) {
        // Usar mensaje del servidor para errores
        const errorMessage =
          responseData.error ||
          responseData.message ||
          `Error ${res.status}: ${res.statusText}`;
        throw new Error(errorMessage);
      }

      // Usar mensaje del servidor para éxito
      const successMessage = responseData.message;
      toast.success(successMessage);
      return true;
    } catch (err) {
      console.error(err);
      const errorMsg = err.message;
      toast.error(errorMsg);
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
      if (!res.ok) throw new Error("Error al editar mantenimiento");
      toast.success("Mantenimiento editado correctamente");
      return true;
    } catch (err) {
      console.error(err);
      toast.error("Error al editar mantenimiento");
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
      if (!res.ok) throw new Error("Error al agregar post");
      return true;
    } catch (err) {
      console.error(err);
      return false;
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
