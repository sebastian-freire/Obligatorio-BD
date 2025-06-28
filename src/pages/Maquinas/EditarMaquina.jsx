import { useEffect, useState } from "react";
import useMaquinas from "../../hooks/UseMaquinas";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";


export default function EditarMaquina() {
  const params = useParams();
  const [maquina, setMaquina] = useState({});

  const {
    editarMaquina,
    fetchMaquinaById
  } = useMaquinas();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setMaquina((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  useEffect(() => {
    fetchMaquinaById(params.idMaquina)
      .then((data) => {
        setMaquina(data);
      })
  }, [params.idMaquina]);

  return (
    <div className="agregar-cliente-container">
      <h1>Editar Maquina</h1>
      <input
        type="text"
        placeholder="Modelo"
        name="modelo"
        value={maquina.modelo}
        maxLength={50}
        style={{
          borderColor: '#e74c3c',
          boxShadow: '0 0 5px rgba(231, 76, 60, 0.5)',
          borderRadius: '2px'
        }}
        onChange={handleChange}
      />
      <br />
      <input
        type="number"
        placeholder="Id Cliente"
        value={maquina.id_cliente}
        name="id_cliente"
        style={{
          borderColor: '#e74c3c',
          boxShadow: '0 0 5px rgba(231, 76, 60, 0.5)',
          borderRadius: '2px'
        }}
        onChange={handleChange}
      />
      <br />
      <input
        type="text"
        placeholder="Ubicación en el cliente"
        value={maquina.ubicacion_maquina}
        name="ubicacion_maquina"
        maxLength={50}
        style={{
          borderColor: '#e74c3c',
          boxShadow: '0 0 5px rgba(231, 76, 60, 0.5)',
          borderRadius: '2px'
        }}
        onChange={handleChange}
      />
      <br />
      <input
        type="number"
        value={maquina.costo_alquiler_mensual}
        placeholder="Costo alquiler mensual"
        name="costo_alquiler_mensual"
        maxLength={50}
        style={{
          borderColor: '#e74c3c',
          boxShadow: '0 0 5px rgba(231, 76, 60, 0.5)',
          borderRadius: '2px'
        }}
        onChange={handleChange}
      />
      <br />
      <button onClick={() => editarMaquina(maquina)}>Editar Maquina</button>
    </div>
  );
}
