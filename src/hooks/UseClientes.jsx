import toast from "react-hot-toast";

export default function useClientes() {
  const apiUrl = import.meta.env.VITE_API_ENDPOINT;

  const fetchCliente = async (id) => {
    try {
      const url = `${apiUrl}/clientes/${id}`;
      const res = await fetch(url);
      const data = await res.json();
      return data;
    } catch (err) {
      console.error("Failed to fetch:", err);
    }
  };

  //lo uso?
  const cargarClientes = async () => {
    try {
      const url = `${apiUrl}/clientes`;
      const res = await fetch(url);
      const data = await res.json();
      return data;
    } catch (err) {
      console.error("Failed to fetch:", err);
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
      if (!res.ok) throw new Error("Error al agregar post");
      toast.success("Cliente agregado correctamente");
      return true;
    } catch (err) {
      console.error(err);
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
      if (!res.ok) throw new Error("Error al editar cliente");
      toast.success("Cliente editado correctamente");
      return true;
    } catch (err) {
      console.error(err);
      toast.error("Error al editar cliente");
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
      if (!res.ok) throw new Error("Error al agregar post");
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  };

  return {
    agregarCliente,
    editarCliente,
    fetchCliente,
    eliminarCliente,
    cargarClientes
  };
}
