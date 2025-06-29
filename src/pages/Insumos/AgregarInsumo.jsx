import toast from "react-hot-toast";
import { useState } from "react";
import useInsumos from "../../hooks/UseInsumos";

export default function AgregarInsumo({ onCancel }) {
  const [nuevoInsumo, setNuevoInsumo] = useState({
    descripcion: "",
    tipo: "",
    precio_unitario: "",
    id_proveedor: ""
  });
  const { agregarInsumo } = useInsumos();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setNuevoInsumo((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  return (
    <div className="agregar-cliente-container">
      <h1>Agregar Insumo</h1>
      <input
        type="text"
        value={nuevoInsumo.descripcion}
        placeholder="Descripción"
        name="descripcion"
        maxLength={50}
        onChange={handleChange}
      />
      <input
        type="text"
        value={nuevoInsumo.tipo}
        placeholder="Tipo"
        name="tipo"
        maxLength={50}
        onChange={handleChange}
      />
      <input
        type="number"
        value={nuevoInsumo.precio_unitario}
        placeholder="Precio Unitario"
        name="precio_unitario"
        step="0.01"
        onChange={handleChange}
      />
      <input
        type="number"
        value={nuevoInsumo.id_proveedor}
        placeholder="ID Proveedor"
        name="id_proveedor"
        onChange={handleChange}
      />
      <div className="form-buttons">
        <button
          onClick={() => {
            if (
              !nuevoInsumo.descripcion ||
              !nuevoInsumo.tipo ||
              !nuevoInsumo.precio_unitario ||
              !nuevoInsumo.id_proveedor
            ) {
              toast.error("Por favor, complete todos los campos.");
              return;
            }
            agregarInsumo(nuevoInsumo);
            // Después de agregar exitosamente, volver a la lista
            if (onCancel) onCancel();
          }}
        >
          Agregar Insumo
        </button>
        <button onClick={onCancel} className="cancel-button">
          Cancelar
        </button>
      </div>
    </div>
  );
}
