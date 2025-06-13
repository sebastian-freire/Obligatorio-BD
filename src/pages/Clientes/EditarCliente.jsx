import { useEffect } from "react";
import useFetch from "./Fetchs";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";


export default function EditarCliente() {
  const params = useParams();
  const navigate = useNavigate();

  const {
    nombre,
    setNombre,
    telefono,
    setTelefono,
    correo,
    setCorreo,
    fetchCliente
  } = useFetch();

  const cargarCliente = async () => {
    const data = await fetchCliente(params.idCliente);
    if (data) {
      setNombre(data.nombre);
      setCorreo(data.correo);
      setTelefono(data.telefono);
      console.log(data);
    } else {
      navigate("/clientes");
    }
  };

  useEffect(() => {
    cargarCliente();
  }, [params.idCliente]);

  return (
    <div className="agregar-cliente-container">
      <h1>Editar Cliente</h1>
      <input
        type="text"
        placeholder="Nombre"
        name="nombre"
        value={nombre}
        onChange={(event) => {
          setNombre(event.target.value);
        }}
      />
      <br />
      <input
        type="tel"
        placeholder="Teléfono"
        value={telefono}
        name="telefono"
        onChange={(event) => {
          setTelefono(event.target.value);
        }}
      />
      <br />
      <input
        type="email"
        placeholder="Correo"
        value={correo}
        name="correo"
        onChange={(event) => {
          setCorreo(event.target.value);
        }}
      />
      <br />
      <button>Editar Cliente</button>
    </div>
  );
}
