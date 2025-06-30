import toast from "react-hot-toast";
import { useState } from "react";
import useProveedores from "../../hooks/UseProveedores";
import "../../styles/sharedStyles.css";

export default function AgregarProveedor({ onCancel }) {
  const [nuevoProveedor, setNuevoProveedor] = useState({
    nombre: "",
    contacto: ""
  });
  const { agregarProveedor } = useProveedores();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setNuevoProveedor((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  return (
    <div className="agregar-cliente-container">
      <h1>Agregar Proveedor</h1>
      <input
        type="text"
        value={nuevoProveedor.nombre}
        placeholder="Nombre"
        name="nombre"
        maxLength={50}
        onChange={handleChange}
      />
      <input
        type="text"
        value={nuevoProveedor.contacto}
        placeholder="Contacto"
        name="contacto"
        maxLength={50}
        onChange={handleChange}
      />
      <div className="form-buttons">
        <button
          onClick={async () => {
            if (nuevoProveedor.nombre.trim() === "" || nuevoProveedor.contacto.trim() === "") {
              toast.error("Por favor, complete todos los campos.");
              return;
            }
            const response = await agregarProveedor(nuevoProveedor);
            // Después de agregar exitosamente, volver a la lista
            if (response && onCancel) onCancel();
          }}
        >
          Agregar Proveedor
        </button>
        <button onClick={onCancel} className="cancel-button">
          Cancelar
        </button>
      </div>
    </div>
  );
}
