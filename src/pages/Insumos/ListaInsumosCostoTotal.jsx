import { useEffect, useState } from "react";
import useConsultasReportes from "../../hooks/UseConsultasReportes";
import "../../styles/sharedStyles.css";

function ListaInsumosCostoTotal() {
  const [insumosCosto, setInsumosCosto] = useState([]);
  const [loading, setLoading] = useState(true);
  const { fetchInsumosCostoTotal } = useConsultasReportes();

  const cargarInsumosCosto = async () => {
    setLoading(true);
    const data = await fetchInsumosCostoTotal();
    setInsumosCosto(data);
    setLoading(false);
  };

  useEffect(() => {
    cargarInsumosCosto();
  }, []);

  return (
    <div className="show-container">
      <div className="header">
        <h1>Insumos - mayor costo total</h1>
      </div>
      {loading ? (
        <p>Cargando...</p>
      ) : (
        <table className="show-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Descripción</th>
              <th>Cantidad Total Usada</th>
              <th>Precio Unitario</th>
              <th>Costo Total</th>
            </tr>
          </thead>
          <tbody>
            {insumosCosto.length > 0 ? (
              insumosCosto.map((insumo) => (
                <tr key={insumo.id}>
                  <td>{insumo.id}</td>
                  <td>{insumo.descripcion}</td>
                  <td>{insumo.cantidadTotal}</td>
                  <td>${insumo.precio_unitario}</td>
                  <td style={{ fontWeight: "bold" }}>${insumo.costoTotal}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" style={{ textAlign: "center" }}>
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

export default ListaInsumosCostoTotal;
