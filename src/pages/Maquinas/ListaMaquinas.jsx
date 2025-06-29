import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import useMaquinas from "../../hooks/UseMaquinas";
import "../../styles/sharedStyles.css";

function ListaMaquinas({ onAgregarClick, onEditarClick }) {
  const [maquinas, setMaquinas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(null);
  const { fetchMaquinas, eliminarMaquina } = useMaquinas();

  const cargarMaquinas = async () => {
    setLoading(true);
    try {
      const data = await fetchMaquinas();
      setMaquinas(data || []);
    } catch (error) {
      console.error("Error cargando máquinas:", error);
      toast.error("Error al cargar la lista de máquinas");
    } finally {
      setLoading(false);
    }
  };

  // Cerrar dropdown al hacer click fuera
  useEffect(() => {
    const handleClickOutside = () => setOpen(null);
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  useEffect(() => {
    cargarMaquinas();
  }, []);

  const handleEliminar = async (maquinaId) => {
    if (window.confirm("¿Estás seguro de que quieres eliminar esta máquina?")) {
      try {
        await eliminarMaquina(maquinaId);
        toast.success("Máquina eliminada correctamente");
        cargarMaquinas();
      } catch (error) {
        console.error("Error eliminando máquina:", error);
        toast.error("Error al eliminar la máquina");
      }
      setOpen(null);
    }
  };

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "300px"
        }}
      >
        <p>Cargando máquinas...</p>
      </div>
    );
  }

  return (
    <div className="show-container">
      <div className="header">
        <h1>Lista de Máquinas</h1>
        <button onClick={onAgregarClick}>Agregar Máquina</button>
      </div>

      <table className="show-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Modelo</th>
            <th>ID Cliente</th>
            <th>Ubicación</th>
            <th>Costo Alquiler Mensual</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {maquinas.length === 0 ? (
            <tr>
              <td colSpan="6" style={{ textAlign: "center", padding: "40px" }}>
                No hay máquinas registradas
              </td>
            </tr>
          ) : (
            maquinas.map((maquina) => (
              <tr key={maquina.id}>
                <td>{maquina.id}</td>
                <td>{maquina.modelo}</td>
                <td>{maquina.id_cliente}</td>
                <td>{maquina.ubicacion_maquina}</td>
                <td>${maquina.costo_alquiler_mensual}</td>
                <td>
                  <div className="dropdown">
                    <button
                      className="dots-button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setOpen(open === maquina.id ? null : maquina.id);
                      }}
                    >
                      ⋮
                    </button>
                    {open === maquina.id && (
                      <div className="dropdown-content">
                        <button onClick={() => onEditarClick(maquina.id)}>
                          Editar
                        </button>
                        <button
                          className="delete-button"
                          onClick={() => handleEliminar(maquina.id)}
                        >
                          Eliminar
                        </button>
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default ListaMaquinas;
