import { useState } from "react";

function LogIn() {
  const [usuario, setUsuario] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [mensaje, setMensaje] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (usuario === "admin" && contrasena === "admin") {
      setMensaje("¡Login exitoso!");
    } else {
      setMensaje("Usuario o contraseña incorrectos");
    }
  };

  return (
    <div style={{ padding: 32 }}>
      <h2>Iniciar Sesión</h2>
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 12,
          width: 250
        }}
      >
        <input
          type="text"
          placeholder="Usuario"
          value={usuario}
          onChange={(e) => setUsuario(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={contrasena}
          onChange={(e) => setContrasena(e.target.value)}
          required
        />
        <button type="submit">Ingresar</button>
      </form>
      {mensaje && <p>{mensaje}</p>}
    </div>
  );
}

export default LogIn;
