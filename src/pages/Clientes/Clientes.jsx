import { useEffect, useState } from "react";
import "./Clientes.css";

function Clientes() {
  const apiUrl = import.meta.env.VITE_API_ENDPOINT;
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${apiUrl}/clientes`)
      .then((res) => res.json())
      .then((data) => {
        setClientes(data);
        console.log(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div style={{ padding: 32 }}>
      <h1>Lista de Clientes</h1>
      {loading ? (
        <p>Cargando...</p>
      ) : (
        <table border="1" cellPadding="8">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Teléfono</th>
              <th>Correo</th>
            </tr>
          </thead>
          <tbody>
            {clientes.map((cliente) => (
              <tr key={cliente.id}>
                <td>{cliente.id}</td>
                <td>{cliente.nombre}</td>
                <td>{cliente.telefono}</td>
                <td>{cliente.correo}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Clientes;
