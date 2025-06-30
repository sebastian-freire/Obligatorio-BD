import { useEffect, useState } from "react";
import useClientes from "../../hooks/UseClientes";
import toast from "react-hot-toast";
import "../../styles/sharedStyles.css";

export default function EditarCliente({ clienteId, onCancel }) {
  const [cliente, setCliente] = useState({
    nombre: "",
    telefono: "",
    correo: "",
    direccion: ""
  });

  const { fetchCliente, editarCliente } = useClientes();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCliente((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  useEffect(() => {
    if (clienteId) {
      fetchCliente(clienteId).then((data) => {
        if (data) {
          setCliente(data);
        } else {
          if (onCancel) onCancel();
        }
      });
    }
  }, [clienteId]);

  const handleEditar = async () => {
    if (
      cliente.nombre.trim() === "" ||
      cliente.telefono.trim() === "" ||
      cliente.correo.trim() === "" ||
      cliente.direccion.trim() === ""
    ) {
      toast.error("Por favor, complete todos los campos obligatorios.");
      return;
    }

    const resultado = await editarCliente(clienteId, cliente);
    if (resultado && onCancel)  onCancel();
  };

  return (
    <div className="agregar-cliente-container">
      <h1>Editar Cliente</h1>
      <input
        type="text"
        placeholder="Nombre"
        name="nombre"
        value={cliente.nombre || ""}
        maxLength={50}
        onChange={handleChange}
      />
      <input
        type="tel"
        placeholder="Teléfono"
        value={cliente.telefono || ""}
        name="telefono"
        maxLength={20}
        onChange={handleChange}
      />
      <input
        type="email"
        placeholder="Correo"
        value={cliente.correo || ""}
        name="correo"
        maxLength={50}
        onChange={handleChange}
      />
      <input
        type="text"
        value={cliente.direccion || ""}
        placeholder="Dirección"
        name="direccion"
        maxLength={50}
        onChange={handleChange}
      />
      <div className="form-buttons">
        <button onClick={handleEditar}>Editar Cliente</button>
        <button onClick={onCancel} className="cancel-button">
          Cancelar
        </button>
      </div>
    </div>
  );
}
