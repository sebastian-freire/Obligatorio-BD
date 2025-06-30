import { useEffect, useState } from "react";
import useMaquinas from "../../hooks/UseMaquinas";
import toast from "react-hot-toast";
import "../../styles/sharedStyles.css";

export default function EditarMaquina({ maquinaId, onCancel }) {
  const [maquina, setMaquina] = useState({
    modelo: "",
    id_cliente: "",
    ubicacion_maquina: "",
    costo_alquiler_mensual: ""
  });

  const { editarMaquina, fetchMaquinaById } = useMaquinas();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setMaquina((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  useEffect(() => {
    if (maquinaId) {
      fetchMaquinaById(maquinaId).then((data) => {
        if (data) {
          setMaquina(data);
        } else {
          toast.error("Error al cargar los datos de la máquina");
          if (onCancel) onCancel();
        }
      });
    }
  }, [maquinaId]);

  const handleEditar = async () => {
    if (
      maquina.modelo.trim() === "" ||
      maquina.id_cliente.toString().trim() === "" ||
      maquina.ubicacion_maquina.trim() === "" ||
      maquina.costo_alquiler_mensual.toString().trim() === ""
    ) {
      toast.error("Por favor, complete todos los campos obligatorios.");
      return;
    }

    const resultado = await editarMaquina(maquinaId, maquina);
    if (resultado) {
      if (onCancel) onCancel();
    }
  };

  return (
    <div className="agregar-cliente-container">
      <h1>Editar Maquina</h1>
      <input
        type="text"
        placeholder="Modelo"
        name="modelo"
        value={maquina.modelo || ""}
        maxLength={50}
        onChange={handleChange}
      />
      <input
        type="number"
        placeholder="Id Cliente"
        value={maquina.id_cliente || ""}
        name="id_cliente"
        onChange={handleChange}
      />
      <input
        type="text"
        placeholder="Ubicación en el cliente"
        value={maquina.ubicacion_maquina || ""}
        name="ubicacion_maquina"
        maxLength={50}
        onChange={handleChange}
      />
      <input
        type="number"
        value={maquina.costo_alquiler_mensual || ""}
        placeholder="Costo alquiler mensual"
        name="costo_alquiler_mensual"
        onChange={handleChange}
      />
      <div className="form-buttons">
        <button onClick={handleEditar}>Editar Maquina</button>
        <button onClick={onCancel} className="cancel-button">
          Cancelar
        </button>
      </div>
    </div>
  );
}
