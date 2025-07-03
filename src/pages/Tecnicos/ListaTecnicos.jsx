import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import useTecnicos from "../../hooks/UseTecnicos";
import "../../styles/sharedStyles.css";

function ListaTecnicos({ onAgregarClick, onEditarClick }) {
  const [tecnicos, setTecnicos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(null);
  const { fetchTecnicos, eliminarTecnico } = useTecnicos();

  const cargarTecnicos = async () => {
    setLoading(true);
    const data = await fetchTecnicos();
    setTecnicos(data || []);
    setLoading(false);
  };

  // Cerrar dropdown al hacer click fuera
  useEffect(() => {
    const handleClickOutside = () => setOpen(null);
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  useEffect(() => {
    cargarTecnicos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDropdownClick = (e, tecnicoCI) => {
    e.stopPropagation(); // Evitar que se cierre inmediatamente
    setOpen(open === tecnicoCI ? null : tecnicoCI);
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
        <p>Cargando técnicos...</p>
      </div>
    );
  }

  return (
    <div className="show-container">
      <div className="header">
        <h1>Lista de Técnicos</h1>
        <button onClick={onAgregarClick}>Agregar Técnico</button>
      </div>

      <table className="show-table">
        <thead>
          <tr>
            <th>CI</th>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Teléfono</th>
            <th>✏️</th>
          </tr>
        </thead>
        <tbody>
          {tecnicos.length === 0 ? (
            <tr>
              <td colSpan="5" style={{ textAlign: "center", padding: "40px" }}>
                No hay técnicos registrados
              </td>
            </tr>
          ) : (
            tecnicos.map((tecnico) => (
              <tr key={tecnico.ci}>
                <td>{tecnico.ci}</td>
                <td>{tecnico.nombre}</td>
                <td>{tecnico.apellido}</td>
                <td>{tecnico.telefono}</td>
                <td style={{ position: "relative" }}>
                  <div className="dropdown">
                    <button
                      className="dots-button"
                      onClick={(e) => handleDropdownClick(e, tecnico.ci)}
                    >
                      ⋮
                    </button>
                    {open === tecnico.ci && (
                      <div className="dropdown-content">
                        <button
                          className="dropdown-item"
                          onClick={() => {
                            setOpen(null);
                            if (onEditarClick) onEditarClick(tecnico.ci);
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
                                      ¿Estás seguro de eliminar este técnico?
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
                                          eliminarTecnico(tecnico.ci).then(
                                            () => {
                                              cargarTecnicos();
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

export default ListaTecnicos;
