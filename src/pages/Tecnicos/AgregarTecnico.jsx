import toast from "react-hot-toast";
import { useState } from "react";
import useTecnicos from "../../hooks/UseTecnicos";
import "../../styles/sharedStyles.css";

export default function AgregarTecnico({ onCancel }) {
  const [nuevoTecnico, setNuevoTecnico] = useState({
    ci: "",
    nombre: "",
    apellido: "",
    telefono: ""
  });
  const { agregarTecnico } = useTecnicos();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setNuevoTecnico((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  return (
    <div className="agregar-cliente-container">
      <h1>Agregar Técnico</h1>
      <input
        type="text"
        value={nuevoTecnico.ci}
        placeholder="Cédula de Identidad"
        name="ci"
        maxLength={8}
        onChange={handleChange}
      />
      <input
        type="text"
        value={nuevoTecnico.nombre}
        placeholder="Nombre"
        name="nombre"
        maxLength={50}
        onChange={handleChange}
      />
      <input
        type="text"
        value={nuevoTecnico.apellido}
        placeholder="Apellido"
        name="apellido"
        maxLength={50}
        onChange={handleChange}
      />
      <input
        type="tel"
        value={nuevoTecnico.telefono}
        placeholder="Teléfono"
        name="telefono"
        maxLength={20}
        onChange={handleChange}
      />
      <div className="form-buttons">
        <button
          onClick={async () => {
            if (
              nuevoTecnico.ci.trim() === "" ||
              nuevoTecnico.nombre.trim() === "" ||
              nuevoTecnico.apellido.trim() === "" ||
              nuevoTecnico.telefono.trim() === ""
            ) {
              toast.error("Por favor, complete todos los campos.");
              return;
            }
            const response = await agregarTecnico(nuevoTecnico);
            // Después de agregar exitosamente, volver a la lista
            if (response && onCancel) onCancel();
          }}
        >
          Agregar Técnico
        </button>
        <button onClick={onCancel} className="cancel-button">
          Cancelar
        </button>
      </div>
    </div>
  );
}
