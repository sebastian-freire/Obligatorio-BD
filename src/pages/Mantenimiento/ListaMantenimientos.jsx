import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import useMantenimientos from "../../hooks/UseMantenimientos";
import "../../styles/sharedStyles.css";

function ListaMantenimientos({ onAgregarClick, onEditarClick }) {
  const { fetchMantenimientos, eliminarMantenimiento } = useMantenimientos();
  const [mantenimientos, setMantenimientos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(null);

  const cargarMantenimientos = async () => {
    setLoading(true);
    try {
      const data = await fetchMantenimientos();
      setMantenimientos(data);
    } catch (error) {
      console.error("Error cargando mantenimientos:", error);
      toast.error("Error al cargar la lista de mantenimientos");
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
    cargarMantenimientos();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleDropdownClick = (e, index) => {
    e.stopPropagation(); // Evitar que se cierre inmediatamente
    setOpen(open === index ? null : index);
  };

  // Función para formatear fecha para mostrar en la tabla
  const formatearFechaParaMostrar = (fecha) => {
    if (!fecha) return "";

    try {
      const fechaObj = new Date(fecha);

      if (isNaN(fechaObj.getTime())) {
        return fecha; // Si no se puede parsear, mostrar como viene
      }

      // Formatear como: "29/06/2025 14:30"
      const day = String(fechaObj.getDate()).padStart(2, "0");
      const month = String(fechaObj.getMonth() + 1).padStart(2, "0");
      const year = fechaObj.getFullYear();
      const hours = String(fechaObj.getHours()).padStart(2, "0");
      const minutes = String(fechaObj.getMinutes()).padStart(2, "0");

      return `${day}/${month}/${year} ${hours}:${minutes}`;
    } catch (error) {
      console.error("Error al formatear fecha para mostrar:", error);
      return fecha; // Si hay error, mostrar como viene
    }
  };

  return (
    <div>
      {loading ? (
        <p>Cargando...</p>
      ) : (
        <div className="show-container">
          <div className="header">
            <h1>Mantenimientos</h1>
            <div>
              <button onClick={onAgregarClick}>Agregar Mantenimiento</button>
            </div>
          </div>
          <table className="show-table">
            <thead>
              <tr>
                <th>Fecha</th>
                <th>ID Máquina</th>
                <th>C.I. técnico</th>
                <th>Tipo</th>
                <th>Observaciones</th>
                <th>✏️</th>
              </tr>
            </thead>
            <tbody>
              {mantenimientos.map((mantenimiento, index) => (
                <tr key={mantenimiento.id}>
                  <td>{formatearFechaParaMostrar(mantenimiento.fecha)}</td>
                  <td>{mantenimiento.id_maquina}</td>
                  <td>{mantenimiento.ci_tecnico}</td>
                  <td>{mantenimiento.tipo}</td>
                  <td>{mantenimiento.observaciones}</td>
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
                              onEditarClick(mantenimiento.id);
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
                                        ¿Estás seguro de eliminar este
                                        mantenimiento?
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
                                            eliminarMantenimiento(
                                              mantenimiento.id
                                            ).then((data) => {
                                              cargarMantenimientos();
                                              if (data) {
                                                const successToast =
                                                  toast.success(
                                                    "Mantenimiento eliminado correctamente"
                                                  );
                                                setTimeout(() => {
                                                  toast.dismiss(successToast);
                                                }, 2000);
                                              }
                                            });
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
        </div>
      )}
    </div>
  );
}

export default ListaMantenimientos;
