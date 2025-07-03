import toast from "react-hot-toast";
import { useState } from "react";
import useMaquinas from "../../hooks/UseMaquinas";
import "../../styles/sharedStyles.css";

export default function AgregarMaquina({ onCancel }) {
  const [nuevaMaquina, setNuevaMaquina] = useState({
    modelo: "",
    id_cliente: "",
    ubicacion_maquina: "",
    costo_alquiler_mensual: ""
  });
  const { agregarMaquina } = useMaquinas();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setNuevaMaquina((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  return (
    <div className="agregar-cliente-container">
      <h1>Agregar Maquina</h1>
      <input
        type="text"
        value={nuevaMaquina.modelo}
        placeholder="Modelo"
        name="modelo"
        maxLength={50}
        onChange={handleChange}
      />
      <input
        type="number"
        value={nuevaMaquina.id_cliente}
        placeholder="ID Cliente"
        name="id_cliente"
        maxLength={50}
        onChange={handleChange}
      />
      <input
        type="text"
        value={nuevaMaquina.ubicacion_maquina}
        placeholder="Ubicación"
        name="ubicacion_maquina"
        maxLength={50}
        onChange={handleChange}
      />
      <input
        type="number"
        value={nuevaMaquina.costo_alquiler_mensual}
        placeholder="Costo Alquiler Mensual"
        name="costo_alquiler_mensual"
        maxLength={50}
        onChange={handleChange}
      />
      <div className="form-buttons">
        <button
          onClick={async () => {
            console.log(nuevaMaquina.costo_alquiler_mensual);
            if (
              nuevaMaquina.modelo.trim() === "" ||
              nuevaMaquina.id_cliente.trim() === "" ||
              nuevaMaquina.ubicacion_maquina.trim() === "" ||
              nuevaMaquina.costo_alquiler_mensual.trim() === ""
            ) {
              toast.error("Por favor, complete todos los campos.");
              return;
            }
            const response = await agregarMaquina(nuevaMaquina);
            // Después de agregar exitosamente, volver a la lista
            if (response && onCancel) onCancel();
          }}
        >
          Agregar Maquina
        </button>
        <button onClick={onCancel} className="cancel-button">
          Cancelar
        </button>
      </div>
    </div>
  );
}
