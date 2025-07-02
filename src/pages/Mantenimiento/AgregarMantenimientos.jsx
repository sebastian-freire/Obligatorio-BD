import { useState } from "react"; // Import useState
import useMantenimientos from "../../hooks/UseMantenimientos";
import "../../styles/sharedStyles.css";
import toast from "react-hot-toast";

export default function AgregarMantenimientos({ onCancel }) {
  const { agregarMantenimiento } = useMantenimientos();
  // 1. Use useState for local form state
  const [mantenimiento, setMantenimiento] = useState({
    id_maquina: "",
    ci_tecnico: "",
    tipo: "",
    fecha: "",
    observaciones: ""
  });

  // Regarding your comment: Yes, foreign key (fk) checks are ultimately
  // handled by the database when you try to insert the data.

  const handleChange = (event) => {
    const { name, value } = event.target;
    setMantenimiento((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  return (
    <div className="agregar-cliente-container">
      <h1>Agregar Mantenimiento</h1>
      <input
        type="datetime-local"
        value={mantenimiento.fecha}
        placeholder="Fecha"
        name="fecha"
        onChange={handleChange}
      />
      {/* 2. Use type="number" for numeric input */}
      <input
        type="number"
        value={mantenimiento.id_maquina}
        placeholder="ID Máquina"
        name="id_maquina"
        onChange={handleChange}
      />
      <input
        type="text"
        value={mantenimiento.ci_tecnico}
        placeholder="C.I. técnico"
        name="ci_tecnico"
        onChange={handleChange}
      />
      <input
        type="text"
        value={mantenimiento.tipo}
        placeholder="Tipo"
        name="tipo"
        onChange={handleChange}
      />
      <input
        type="text"
        value={mantenimiento.observaciones}
        placeholder="Observaciones"
        name="observaciones"
        onChange={handleChange}
      />
      <div className="form-buttons">
        <button
          onClick={async () => {
            if (
              mantenimiento.fecha.trim() === "" ||
              mantenimiento.id_maquina.trim() === "" ||
              mantenimiento.ci_tecnico.trim() === "" ||
              mantenimiento.tipo.trim() === "" ||
              mantenimiento.observaciones.trim() === ""
            ) {
              toast.error("Por favor, complete todos los campos.");
              return;
            }

            const response = await agregarMantenimiento({
              ...mantenimiento,
              id_maquina: Number(mantenimiento.id_maquina),
              fecha: mantenimiento.fecha.replace("T", " ") + ":00"
            });
            // Solo cerrar si fue exitoso
            if (response && onCancel) {
              onCancel();
            }
          }}
        >
          Agregar Mantenimiento
        </button>
        <button onClick={onCancel} className="cancel-button">
          Cancelar
        </button>
      </div>
    </div>
  );
}
