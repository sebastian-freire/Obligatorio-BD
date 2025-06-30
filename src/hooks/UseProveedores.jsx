import { handleApiResponse, handleApiError } from "../utils/apiUtils";
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
      return await handleApiResponse(res);
    } catch (err) {
      return handleApiError(err);
    }
  };

  const fetchProveedor = async (id) => {
    try {
      const url = `${apiUrl}/proveedores/${id}`;
      const res = await fetch(url, {
        headers: getAuthHeaders()
      });
      return await handleApiResponse(res);
    } catch (err) {
      return handleApiError(err);
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
      await handleApiResponse(res);
      return true;
    } catch (err) {
      return handleApiError(err);
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
      await handleApiResponse(res);
      return true;
    } catch (err) {
      return handleApiError(err);
    }
  };

  const eliminarProveedor = async (id) => {
    try {
      const res = await fetch(`${apiUrl}/proveedores/${id}`, {
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
    fetchProveedores,
    fetchProveedor,
    agregarProveedor,
    editarProveedor,
    eliminarProveedor
  };
}
