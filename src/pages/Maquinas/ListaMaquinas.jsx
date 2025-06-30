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
    const data = await fetchMaquinas();
    setMaquinas(data || []);
    setLoading(false);
  };

  // Cerrar dropdown al hacer click fuera
  useEffect(() => {
    const handleClickOutside = () => setOpen(null);
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  useEffect(() => {
    cargarMaquinas();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDropdownClick = (e, maquinaId) => {
    e.stopPropagation(); // Evitar que se cierre inmediatamente
    setOpen(open === maquinaId ? null : maquinaId);
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
            <th>✏️</th>
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
                <td style={{ position: "relative" }}>
                  <div className="dropdown">
                    <button
                      className="dots-button"
                      onClick={(e) => handleDropdownClick(e, maquina.id)}
                    >
                      ⋮
                    </button>
                    {open === maquina.id && (
                      <div className="dropdown-content">
                        <button
                          className="dropdown-item"
                          onClick={() => {
                            setOpen(null);
                            if (onEditarClick) onEditarClick(maquina.id);
                          }}
                        >
                          Editar
                        </button>
                        <button
                          className="dropdown-item"
                          onClick={() => {
                            setOpen(null);
                            toast.custom(
                              (t) => {
                                return (
                                  <div key={t.id} className="toast-custom">
                                    <p>
                                      ¿Estás seguro de eliminar esta máquina?
                                    </p>
                                    <div className="toast-buttons">
                                      <button
                                        className="cancel-button"
                                        onClick={() => toast.dismiss(t.id)}
                                      >
                                        Cancelar
                                      </button>
                                      <button
                                        className="delete-button"
                                        onClick={() => {
                                          toast.remove(t.id);
                                          eliminarMaquina(maquina.id).then(
                                            () => {
                                              cargarMaquinas();
                                            }
                                          );
                                        }}
                                      >
                                        Eliminar
                                      </button>
                                    </div>
                                  </div>
                                );
                              },
                              { duration: Infinity }
                            );
                          }}
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
