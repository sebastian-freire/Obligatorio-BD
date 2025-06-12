import useFetch from "./Fetchs";

export default function AgregarCliente() {
  const {
    nombre,
    setNombre,
    correo,
    setCorreo,
    telefono,
    setTelefono,
    agregarCliente
  } = useFetch();

  return (
    <div className="agregar-cliente-container">
      <h1>Agregar Cliente</h1>
      <input
        type="text"
        value={nombre}
        placeholder="Nombre"
        name="nombre"
        onChange={(event) => {
          setNombre(event.target.value);
        }}
      />
      <br />
      <input
        type="tel"
        value={telefono}
        placeholder="Teléfono"
        name="telefono"
        onChange={(event) => {
          setTelefono(event.target.value);
        }}
      />
      <br />
      <input
        type="email"
        value={correo}
        placeholder="Correo"
        name="correo"
        onChange={(event) => {
          setCorreo(event.target.value);
        }}
      />
      <br />
      <button
        onClick={() => {
          agregarCliente(nombre, telefono, correo);
          setNombre("");
          setTelefono("");
          setCorreo("");
        }}
      >
        Agregar Cliente
      </button>
    </div>
  );
}
