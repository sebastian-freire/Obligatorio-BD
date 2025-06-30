import toast from "react-hot-toast";
import { useUser } from "../context/UserContext";

export default function useProveedores() {
  const apiUrl = import.meta.env.VITE_API_ENDPOINT;
  const { getAuthHeaders } = useUser();

  const fetchProveedores = async () => {
    try {
      const url = `${apiUrl}/proveedores`;
      const res = await fetch(url, {
        headers: getAuthHeaders()
      });
      const data = await res.json();
      return data;
    } catch (err) {
      console.error("Failed to fetch:", err);
    }
  };

  const fetchProveedor = async (id) => {
    try {
      const url = `${apiUrl}/proveedores/${id}`;
      const res = await fetch(url, {
        headers: getAuthHeaders()
      });
      const data = await res.json();
      return data;
    } catch (err) {
      console.error("Failed to fetch:", err);
    }
  };

  const agregarProveedor = async (proveedor) => {
    try {
      const res = await fetch(`${apiUrl}/proveedores`, {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify({
          nombre: proveedor.nombre,
          contacto: proveedor.contacto
        })
      });
      if (!res.ok) throw new Error("Error al agregar proveedor");
      toast.success("Proveedor agregado correctamente");
      return true;
    } catch (err) {
      console.error(err);
      toast.error("Error al agregar el proveedor");
      return false;
    }
  };

  const editarProveedor = async (id, proveedor) => {
    try {
      const res = await fetch(`${apiUrl}/proveedores/${id}`, {
        method: "PATCH",
        headers: getAuthHeaders(),
        body: JSON.stringify({
          nombre: proveedor.nombre,
          contacto: proveedor.contacto
        })
      });
      if (!res.ok) throw new Error("Error al editar proveedor");
      toast.success("Proveedor editado correctamente");
      return true;
    } catch (err) {
      console.error(err);
      toast.error("Error al editar el proveedor");
      return false;
    }
  };

  const eliminarProveedor = async (id) => {
    try {
      const res = await fetch(`${apiUrl}/proveedores/${id}`, {
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
    fetchProveedores,
    fetchProveedor,
    agregarProveedor,
    editarProveedor,
    eliminarProveedor
  };
}
