import { useEffect, useState } from "react";
import useProveedores from "../../hooks/UseProveedores";
import toast from "react-hot-toast";
import "../../styles/sharedStyles.css";

export default function EditarProveedor({ proveedorId, onCancel }) {
  const [proveedor, setProveedor] = useState({
    nombre: "",
    contacto: ""
  });

  const { fetchProveedor, editarProveedor } = useProveedores();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setProveedor((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  useEffect(() => {
    if (proveedorId) {
      fetchProveedor(proveedorId)
        .then((data) => {
          if (data) {
            setProveedor(data);
          } else {
            toast.error("Error al cargar los datos del proveedor");
          }
        })
        .catch((error) => {
          console.error("Error:", error);
          toast.error("Error al cargar los datos del proveedor");
        });
    }
  }, [proveedorId, fetchProveedor]);

  const handleEditar = async () => {
    if (!proveedor.nombre || !proveedor.contacto) {
      toast.error("Por favor, complete todos los campos obligatorios.");
      return;
    }

    const resultado = await editarProveedor(proveedorId, proveedor);
    if (resultado) {
      if (onCancel) onCancel();
    }
  };

  return (
    <div className="agregar-cliente-container">
      <h1>Editar Proveedor</h1>
      <input
        type="text"
        placeholder="Nombre"
        name="nombre"
        value={proveedor.nombre || ""}
        maxLength={50}
        onChange={handleChange}
      />
      <input
        type="text"
        placeholder="Contacto"
        value={proveedor.contacto || ""}
        name="contacto"
        maxLength={50}
        onChange={handleChange}
      />
      <div className="form-buttons">
        <button onClick={handleEditar}>Editar Proveedor</button>
        <button onClick={onCancel} className="cancel-button">
          Cancelar
        </button>
      </div>
    </div>
  );
}
