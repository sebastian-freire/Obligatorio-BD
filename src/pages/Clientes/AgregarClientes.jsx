import toast from "react-hot-toast";
import useClientes from "../../hooks/UseClientes";
import { useState } from "react";

export default function AgregarCliente() {
  const [nuevoCliente, setNuevoCliente] = useState({
    nombre: "",
    telefono: "",
    correo: "",
    direccion: ""
  });
  const {
    agregarCliente
  } = useClientes();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setNuevoCliente((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div className="agregar-cliente-container">
      <h1>Agregar Cliente</h1>
      <input
        type="text"
        value={nuevoCliente.nombre}
        placeholder="Nombre"
        name="nombre"
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
        type="tel"
        value={nuevoCliente.telefono}
        placeholder="Teléfono"
        name="telefono"
        maxLength={20}
        style={{
          borderColor: '#e74c3c',
          boxShadow: '0 0 5px rgba(231, 76, 60, 0.5)',
          borderRadius: '2px'
        }}
        onChange={handleChange}
      />
      <br />
      <input
        type="email"
        value={nuevoCliente.correo}
        placeholder="Correo"
        name="correo"
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
        type="direction"
        value={nuevoCliente.direccion}
        placeholder="Dirección"
        name="direccion"
        maxLength={50}
        style={{
          borderColor: '#e74c3c',
          boxShadow: '0 0 5px rgba(231, 76, 60, 0.5)',
          borderRadius: '2px'
        }}
        onChange={handleChange}
      />
      <br />
      <button
        onClick={() => {
          if (nuevoCliente.nombre.trim() === "" || nuevoCliente.telefono.trim() === "" || nuevoCliente.correo.trim() === "" || nuevoCliente.direccion.trim() === "") {
            toast.error("Por favor, complete todos los campos obligatorios.");
            return;
          }
          console.log(nuevoCliente);
          agregarCliente(nuevoCliente);
        }}
      >
        Agregar Cliente
      </button>
    </div>
  );
}
