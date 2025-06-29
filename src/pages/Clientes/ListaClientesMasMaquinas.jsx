import { useEffect, useState } from "react";
import useConsultasReportes from "../../hooks/UseConsultasReportes";
import "../../styles/sharedStyles.css";

function ListaClientesMasMaquinas() {
  const [clientesMaquinas, setClientesMaquinas] = useState([]);
  const [loading, setLoading] = useState(true);
  const { fetchClientesMasMaquinas } = useConsultasReportes();

  const cargarClientesMasMaquinas = async () => {
    setLoading(true);
    const data = await fetchClientesMasMaquinas();
    setClientesMaquinas(data);
    setLoading(false);
  };

  useEffect(() => {
    cargarClientesMasMaquinas();
  }, []);

  return (
    <div>
      {loading ? (
        <p>Cargando...</p>
      ) : (
        <div className="show-container">
          <div className="header">
            <h1>Clientes con Más Máquinas</h1>
          </div>
          <table className="show-table">
            <thead>
              <tr>
                <th>ID Cliente</th>
                <th>Nombre</th>
                <th>Total Máquinas</th>
              </tr>
            </thead>
            <tbody>
              {clientesMaquinas.length > 0 ? (
                clientesMaquinas.map((cliente) => (
                  <tr key={cliente.id}>
                    <td>{cliente.id}</td>
                    <td>{cliente.nombre}</td>
                    <td>{cliente.total_maquinas}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" style={{ textAlign: "center" }}>
                    No hay datos disponibles
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default ListaClientesMasMaquinas;
