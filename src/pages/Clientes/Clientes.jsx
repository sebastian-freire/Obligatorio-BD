import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Clientes.css";

function Clientes() {
  const apiUrl = import.meta.env.VITE_API_ENDPOINT;
  const navigate = useNavigate();
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    fetch(`${apiUrl}/clientes`)
      .then((res) => res.json())
      .then((data) => {
        setClientes(data);
        setOpen(Array(data.length).fill(false));
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
              <th></th>
            </tr>
          </thead>
          <tbody>
            {console.log("todo", open)}
            {clientes.map((cliente, index) => (
              <tr key={cliente.id}>
                <td>{cliente.id}</td>
                <td>{cliente.nombre}</td>
                <td>{cliente.telefono}</td>
                <td>{cliente.correo}</td>
                <td><button className="dots-button" onClick={() => {
                  const newOpen = [...open];
                  newOpen[index] = !newOpen[index];
                  setOpen(newOpen);
                }}>
                  &#8942;
                </button></td>
                {console.log("indice", open[index])}
                {open[index] && (
                  <div className="dropdown-menu">
                    <div className="dropdown-item" onClick={() => navigate(`/clientes/editar/${cliente.id}`)}>
                      Edit
                    </div>
                    <div className="dropdown-item" onClick={() => alert('Delete clicked')}>
                      Delete
                    </div>
                    <div className="dropdown-item" onClick={() => alert('Share clicked')}>
                      Share
                    </div>
                  </div>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Clientes;
