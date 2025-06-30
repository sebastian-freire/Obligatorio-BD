import { handleApiResponse, handleApiError } from "../utils/apiUtils";

export default function useClientes() {
  const apiUrl = import.meta.env.VITE_API_ENDPOINT;

  const fetchCliente = async (id) => {
    try {
      const url = `${apiUrl}/clientes/${id}`;
      const res = await fetch(url);
      return await handleApiResponse(res);
    } catch (err) {
      await handleApiError(err);
      return false;
    }
  };

  const fetchClientes = async () => {
    try {
      const url = `${apiUrl}/clientes`;
      const res = await fetch(url);
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
        headers: {
          "Content-Type": "application/json"
        },
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
        headers: {
          "Content-Type": "application/json"
        },
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
        headers: {
          "Content-Type": "application/json"
        }
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
