import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import useInsumos from "../../hooks/UseInsumos";
import "../../styles/sharedStyles.css";

function ListaInsumos({ onAgregarClick, onEditarClick }) {
  const { fetchInsumos, eliminarInsumo } = useInsumos();
  const [insumos, setInsumos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(null);

  const cargarInsumos = async () => {
    setLoading(true);
    const data = await fetchInsumos();
    setInsumos(data);
    setLoading(false);
  };

  // Cerrar dropdown al hacer click fuera
  useEffect(() => {
    const handleClickOutside = () => setOpen(null);
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  useEffect(() => {
    cargarInsumos();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleDropdownClick = (e, index) => {
    e.stopPropagation(); // Evitar que se cierre inmediatamente
    setOpen(open === index ? null : index);
  };

  return (
    <div className="show-container">
      <div className="header">
        <h1>Insumos</h1>
        <div>
          <button onClick={onAgregarClick}>Agregar Insumo</button>
        </div>
      </div>
      {loading ? (
        <p>Cargando...</p>
      ) : (
        <table className="show-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Descripción</th>
              <th>Tipo</th>
              <th>Precio Unitario</th>
              <th>ID Proveedor</th>
              <th>✏️</th>
            </tr>
          </thead>
          <tbody>
            {insumos.map((insumo, index) => (
              <tr key={insumo.id}>
                <td>{insumo.id}</td>
                <td>{insumo.descripcion}</td>
                <td>{insumo.tipo}</td>
                <td>${insumo.precio_unitario}</td>
                <td>{insumo.id_proveedor}</td>
                <td>
                  <div className="dropdown">
                    <button
                      className="dots-button"
                      onClick={(e) => handleDropdownClick(e, index)}
                    >
                      ⋮
                    </button>
                    {open === index && (
                      <div className="dropdown-content">
                        <button
                          className="dropdown-item"
                          onClick={() => {
                            setOpen(null);
                            onEditarClick(insumo.id);
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
                                      ¿Estás seguro de eliminar este insumo?
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
                                          eliminarInsumo(insumo.id).then(
                                            () => {
                                              cargarInsumos();
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
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default ListaInsumos;
