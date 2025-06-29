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
      // Sin esto manda las cosas a la base de datos con 3 horas menos
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
      if (!res.ok) throw new Error("Error al agregar post");
      toast.success("Mantenimiento agregado correctamente");
      return true;
    } catch (err) {
      console.error(err);
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
