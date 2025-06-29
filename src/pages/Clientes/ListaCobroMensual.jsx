import { useEffect, useState } from "react";
import useConsultasReportes from "../../hooks/UseConsultasReportes";
import "../../styles/sharedStyles.css";

function ListaCobroMensual() {
  const [cobroMensual, setCobroMensual] = useState([]);
  const [loading, setLoading] = useState(true);
  const { fetchCobroMensualCliente } = useConsultasReportes();

  const cargarCobroMensual = async () => {
    setLoading(true);
    const data = await fetchCobroMensualCliente();
    setCobroMensual(data);
    setLoading(false);
  };

  useEffect(() => {
    cargarCobroMensual();
  }, []);

  return (
    <div className="show-container">
      <div className="header">
        <h1>Clientes - cobro mensual</h1>
        <p style={{ fontSize: "14px", color: "#666" }}>
          Mes actual - Junio 2025
        </p>
      </div>
      {loading ? (
        <p>Cargando...</p>
      ) : (
        <table className="show-table">
          <thead>
            <tr>
              <th>ID Cliente</th>
              <th>Costo Insumos</th>
              <th>Costo Alquiler</th>
              <th>Total Mensual</th>
            </tr>
          </thead>
          <tbody>
            {cobroMensual.length > 0 ? (
              cobroMensual.map((cliente) => {
                console.log("Cliente individual:", cliente);
                return (
                  <tr key={cliente.id_cliente}>
                    <td>{cliente.id_cliente}</td>
                    <td>${Number(cliente.cuenta_insumos || 0).toFixed(2)}</td>
                    <td>${Number(cliente.cuenta_alquiler || 0).toFixed(2)}</td>
                    <td style={{ fontWeight: "bold" }}>
                      ${Number(cliente.total_mensual || 0).toFixed(2)}
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="4" style={{ textAlign: "center" }}>
                  {loading
                    ? "Cargando..."
                    : "No hay datos disponibles para el mes actual"}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default ListaCobroMensual;
