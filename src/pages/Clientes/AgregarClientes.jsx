import toast from "react-hot-toast";
import useClientes from "../../hooks/UseClientes";
import { useState } from "react";
import "../../styles/sharedStyles.css";

export default function AgregarCliente({ onCancel }) {
  const [nuevoCliente, setNuevoCliente] = useState({
    nombre: "",
    telefono: "",
    correo: "",
    direccion: ""
  });
  const { agregarCliente } = useClientes();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setNuevoCliente((prevState) => ({
      ...prevState,
      [name]: value
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
        onChange={handleChange}
      />
      <input
        type="tel"
        value={nuevoCliente.telefono}
        placeholder="Teléfono"
        name="telefono"
        maxLength={20}
        onChange={handleChange}
      />
      <input
        type="email"
        value={nuevoCliente.correo}
        placeholder="Correo"
        name="correo"
        maxLength={50}
        onChange={handleChange}
      />
      <input
        type="text"
        value={nuevoCliente.direccion}
        placeholder="Dirección"
        name="direccion"
        maxLength={50}
        onChange={handleChange}
      />
      <div className="form-buttons">
        <button
          onClick={async () => {
            if (
              nuevoCliente.nombre.trim() === "" ||
              nuevoCliente.telefono.trim() === "" ||
              nuevoCliente.correo.trim() === "" ||
              nuevoCliente.direccion.trim() === ""
            ) {
              toast.error("Por favor, complete todos los campos obligatorios.");
              return;
            }
            const simbolosNumericos = [".", "-", "(", ")", " ", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
            const arrayTelefono = nuevoCliente.telefono.split("")
            if (
              !arrayTelefono.every((char) => simbolosNumericos.includes(char))
              && !(arrayTelefono.slice(1).every((char) => simbolosNumericos.includes(char) && arrayTelefono[0] === "+"))
            ) {
              toast.error("El teléfono debe solo contener números y símbolos permitidos");
              return;
            }
            if (!nuevoCliente.correo.includes("@")) {
              toast.error("El correo electrónico debe contener un '@'.");
              return;
            }

            const resultado = await agregarCliente(nuevoCliente);
            console.log(resultado);
            // Después de agregar exitosamente, volver a la lista
            if (resultado && onCancel) onCancel();
          }}
        >
          Agregar Cliente
        </button>
        <button onClick={onCancel} className="cancel-button">
          Cancelar
        </button>
      </div>
    </div>
  );
}
