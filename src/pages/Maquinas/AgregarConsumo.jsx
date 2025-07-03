import { useEffect, useState } from "react";
import useMaquinas from "../../hooks/UseMaquinas";
import toast from "react-hot-toast";
import "../../styles/sharedStyles.css";

export default function AgregarConsumo({ maquinaId, onCancel }) {
  const [nuevoConsumo, setNuevoConsumo] = useState({
    id_maquina: maquinaId || "",
    id_insumo: "",
    fecha: "",
    cantidad_usada: "",
  });

  console.log("Nuevo consumo:", nuevoConsumo);

  console.log(maquinaId, "maquinaId");
  console.log(nuevoConsumo.id_maquina, "nuevoConsumo.id_maquina");

  const { registrarConsumo } = useMaquinas();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setNuevoConsumo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleRegistrar = async () => {
    if (
      nuevoConsumo.id_insumo.trim() === "" ||
      nuevoConsumo.cantidad_usada.trim() === ""
    ) {
      toast.error("Por favor, complete todos los campos.");
      return;
    }

    const consumoARegistrar = {
      ...nuevoConsumo,
      fecha: new Date().toISOString().slice(0, 19).replace("T", " "),
    };

    const resultado = await registrarConsumo(consumoARegistrar);
    if (resultado && onCancel) onCancel();
  };

  return (
    <div className="agregar-cliente-container">
      <h1>Registrar Consumo</h1>
      <input
        type="number"
        placeholder="ID Insumo"
        name="id_insumo"
        value={nuevoConsumo.id_insumo || ""}
        maxLength={50}
        onChange={handleChange}
      />
      <input
        type="number"
        value={nuevoConsumo.cantidad_usada || ""}
        placeholder="Cantidad usada"
        name="cantidad_usada"
        onChange={handleChange}
      />
      <div className="form-buttons">
        <button onClick={handleRegistrar}>Registrar consumo</button>
        <button onClick={onCancel} className="cancel-button">
          Cancelar
        </button>
      </div>
    </div>
  );
}
