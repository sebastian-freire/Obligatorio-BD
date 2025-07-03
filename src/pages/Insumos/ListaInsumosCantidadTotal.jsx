import { useEffect, useState } from "react";
import useConsultasReportes from "../../hooks/UseConsultasReportes";
import "../../styles/sharedStyles.css";

function ListaInsumosCantidadTotal() {
  const [insumosCantidad, setInsumosCantidad] = useState([]);
  const [loading, setLoading] = useState(true);
  const { fetchInsumosCantidadTotal } = useConsultasReportes();

  const cargarInsumosCantidad = async () => {
    setLoading(true);
    const data = await fetchInsumosCantidadTotal();
    setInsumosCantidad(data);
    setLoading(false);
  };

  useEffect(() => {
    cargarInsumosCantidad();
  }, []);

  return (
    <div className="show-container">
      <div className="header">
        <h1>Insumos - mayor cantidad total</h1>
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
            {insumosCantidad.length > 0 ? (
              insumosCantidad.map((insumo) => (
                <tr key={insumo.id}>
                  <td>{insumo.id}</td>
                  <td>{insumo.descripcion}</td>
                  <td style={{ fontWeight: "bold" }}>{insumo.cantidadTotal}</td>
                  <td>${insumo.precio_unitario}</td>
                  <td>${insumo.costoTotal}</td>
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

export default ListaInsumosCantidadTotal;
