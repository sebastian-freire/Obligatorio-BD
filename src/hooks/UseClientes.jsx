import { handleApiResponse, handleApiError } from "../utils/apiUtils";
import { useUser } from "../context/UserContext";

export default function useClientes() {
  const apiUrl = import.meta.env.VITE_API_ENDPOINT;
  const { getAuthHeaders } = useUser();

  const fetchCliente = async (id) => {
    try {
      const url = `${apiUrl}/clientes/${id}`;
      const res = await fetch(url, {
        headers: getAuthHeaders()
      });
      return await handleApiResponse(res);
    } catch (err) {
      await handleApiError(err);
      return false;
    }
  };

  const fetchClientes = async () => {
    try {
      const url = `${apiUrl}/clientes`;
      const res = await fetch(url, {
        headers: getAuthHeaders()
      });
      return await handleApiResponse(res);
    } catch (err) {
      await handleApiError(err);
      return false;
    }
  };

  const agregarCliente = async (cliente) => {
    try {
      const res = await fetch(`${apiUrl}/clientes`, {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify({
          nombre: cliente.nombre,
          telefono: cliente.telefono,
          correo: cliente.correo,
          direccion: cliente.direccion
        })
      });
      await handleApiResponse(res);
      return true;
    } catch (err) {
      await handleApiError(err);
      return false;
    }
  };

  const editarCliente = async (id, cliente) => {
    try {
      const res = await fetch(`${apiUrl}/clientes/${id}`, {
        method: "PATCH",
        headers: getAuthHeaders(),
        body: JSON.stringify({
          nombre: cliente.nombre,
          telefono: cliente.telefono,
          correo: cliente.correo,
          direccion: cliente.direccion
        })
      });
      await handleApiResponse(res);
      return true;
    } catch (err) {
      await handleApiError(err);
      return false;
    }
  };

  const eliminarCliente = async (id) => {
    try {
      const res = await fetch(`${apiUrl}/clientes/${id}`, {
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
    agregarCliente,
    editarCliente,
    fetchCliente,
    eliminarCliente,
    fetchClientes
  };
}
