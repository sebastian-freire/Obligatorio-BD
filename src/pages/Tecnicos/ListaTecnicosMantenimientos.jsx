import { useEffect, useState } from "react";
import useConsultasReportes from "../../hooks/UseConsultasReportes";
import "../../styles/sharedStyles.css";

function ListaTecnicosMantenimientos() {
  const [tecnicosMantenimientos, setTecnicosMantenimientos] = useState([]);
  const [loading, setLoading] = useState(true);
  const { fetchTecnicosMasMantenimientos } = useConsultasReportes();

  const cargarTecnicosMantenimientos = async () => {
    setLoading(true);
    const data = await fetchTecnicosMasMantenimientos();
    setTecnicosMantenimientos(data);
    setLoading(false);
  };

  useEffect(() => {
    cargarTecnicosMantenimientos();
  }, []);

  return (
    <div className="show-container">
      <div className="header">
        <h1>Clientes - más máquinas</h1>
      </div>
      {loading ? (
        <p>Cargando...</p>
      ) : (
        <table className="show-table">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Total Mantenimientos</th>
            </tr>
          </thead>
          <tbody>
            {tecnicosMantenimientos.length > 0 ? (
              tecnicosMantenimientos.map((tecnico, index) => (
                <tr key={index}>
                  <td>{tecnico.nombre}</td>
                  <td>{tecnico.apellido}</td>
                  <td>{tecnico.cantidadMantenimientos}</td>
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
      )}
    </div>
  );
}

export default ListaTecnicosMantenimientos;
