import { useEffect, useState } from "react";
import useTecnicos from "../../hooks/UseTecnicos";
import toast from "react-hot-toast";
import "../../styles/sharedStyles.css";

export default function EditarTecnico({ tecnicoId, onCancel }) {
  const [tecnico, setTecnico] = useState({
    ci: "",
    nombre: "",
    apellido: "",
    telefono: ""
  });

  const { fetchTecnico, editarTecnico } = useTecnicos();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setTecnico((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  useEffect(() => {
    if (tecnicoId) {
      fetchTecnico(tecnicoId)
        .then((data) => {
          if (data) {
            setTecnico(data);
          } else {
            toast.error("Error al cargar los datos del técnico");
          }
        })
        .catch((error) => {
          console.error("Error:", error);
          toast.error("Error al cargar los datos del técnico");
        });
    }
  }, [tecnicoId, fetchTecnico]);

  const handleEditar = async () => {
    if (
      !tecnico.ci ||
      !tecnico.nombre ||
      !tecnico.apellido ||
      !tecnico.telefono
    ) {
      toast.error("Por favor, complete todos los campos obligatorios.");
      return;
    }

    const resultado = await editarTecnico(tecnicoId, tecnico);
    if (resultado) {
      if (onCancel) onCancel();
    }
  };

  return (
    <div className="agregar-cliente-container">
      <h1>Editar Técnico</h1>
      <input
        type="text"
        placeholder="Cédula de Identidad"
        name="ci"
        value={tecnico.ci || ""}
        maxLength={8}
        onChange={handleChange}
        disabled
      />
      <input
        type="text"
        placeholder="Nombre"
        name="nombre"
        value={tecnico.nombre || ""}
        maxLength={50}
        onChange={handleChange}
      />
      <input
        type="text"
        placeholder="Apellido"
        value={tecnico.apellido || ""}
        name="apellido"
        maxLength={50}
        onChange={handleChange}
      />
      <input
        type="tel"
        placeholder="Teléfono"
        value={tecnico.telefono || ""}
        name="telefono"
        maxLength={20}
        onChange={handleChange}
      />
      <div className="form-buttons">
        <button onClick={handleEditar}>Editar Técnico</button>
        <button onClick={onCancel} className="cancel-button">
          Cancelar
        </button>
      </div>
    </div>
  );
}
