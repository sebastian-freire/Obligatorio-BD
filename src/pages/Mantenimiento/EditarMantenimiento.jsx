import { useEffect, useState } from "react";
import useMantenimientos from "../../hooks/UseMantenimientos";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";


export default function EditarMantenimiento() {
  const params = useParams();
  const navigate = useNavigate();
  const [mantenimiento, setMantenimiento] = useState({
    id_maquina: "",
    ci_tecnico: "",
    tipo: "",
    fecha: "",
    observaciones: ""
  });

  const {
    fetchMantenimiento,
    editarMantenimiento
  } = useMantenimientos();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setMantenimiento((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  useEffect(() => {
    fetchMantenimiento(params.idMantenimiento).then((data) => {
      if (data) {
        setMantenimiento(data);
      } else {
        navigate("/mantenimientos");
      }
    });
  }, [params.idMantenimiento]);

  return (
    <div className="agregar-cliente-container">
      <h1>Editar Mantenimiento</h1>
      <input
        type="datetime-local"
        value={mantenimiento.fecha}
        placeholder="Fecha"
        name="fecha"
        onChange={handleChange}
      />
      <br />
      <input
        type="number"
        value={mantenimiento.id_maquina}
        placeholder="ID Máquina"
        name="id_maquina"
        onChange={handleChange}
      />
      <br />
      <input
        type="text"
        value={mantenimiento.ci_tecnico}
        placeholder="C.I. técnico"
        name="ci_tecnico"
        onChange={handleChange}
      />
      <br />
      <input
        type="text"
        value={mantenimiento.tipo}
        placeholder="Tipo"
        name="tipo"
        onChange={handleChange}
      />
      <br />
      <input
        type="text"
        value={mantenimiento.observaciones}
        placeholder="Observaciones"
        name="observaciones"
        onChange={handleChange}
      />
      <br />
      <button onClick={() => editarMantenimiento(params.idMantenimiento, mantenimiento)}>Editar Mantenimiento</button>
    </div>
  );
}
