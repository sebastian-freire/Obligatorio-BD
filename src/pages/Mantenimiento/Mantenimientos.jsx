import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import useMantenimientos from "../../hooks/UseMantenimientos";
import "../../styles/sharedStyles.css";

function Mantenimientos() {
  const apiUrl = import.meta.env.VITE_API_ENDPOINT;
  const navigate = useNavigate();
  const [mantenimientos, setMantenimientos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(null);
  const { fetchMantenimientos, eliminarMantenimiento } = useMantenimientos();

  const cargarMantenimientos = async () => {
    fetchMantenimientos()
      .then((data) => {
        setMantenimientos(data);
        setLoading(false);
      })
  }

  useEffect(() => {
    cargarMantenimientos()
  }, []);

  return (
    <div style={{ padding: 32 }}>
      {loading ? (
        <p>Cargando...</p>
      ) : (
        <div className="show-container">
          <div className="header">
            <h1>Mantenimientos</h1>
            <button onClick={() => window.location.href = "/mantenimientos/agregar"}>
              Agregar Mantenimiento
            </button>
          </div>
          <table className="show-table">
            <thead>
              <tr>
                <th>Fecha</th>
                <th>ID Máquina</th>
                <th>C.I. técnico</th>
                <th>Tipo</th>
                <th>Observaciones</th>
              </tr>
            </thead>
            <tbody>
              {mantenimientos.map((mantenimiento, index) => (
                <tr key={mantenimiento.id}>
                  <td>{mantenimiento.fecha}</td>
                  <td>{mantenimiento.id_maquina}</td>
                  <td>{mantenimiento.ci_tecnico}</td>
                  <td>{mantenimiento.tipo}</td>
                  <td>{mantenimiento.observaciones}</td>
                  <td style={{ position: "relative" }}>
                    <div className="dropdown">
                      <button
                        className="dots-button"
                        onClick={() => setOpen(open === index ? null : index)}
                      >
                        ⋮
                      </button>
                      {open === index && (
                        <div className="dropdown-content">
                          <button
                            className="dropdown-item"
                            onClick={() => navigate(`/mantenimientos/editar/${mantenimiento.id}`)}
                          >
                            Editar
                          </button>
                          <button
                            className="dropdown-item"
                            onClick={() => {
                              setOpen(null);
                              toast.custom((t) => {
                                return (
                                  <div key={t.id} className="toast-custom">
                                    <p>¿Estás seguro de eliminar este mantenimiento?</p>
                                    <div className="toast-buttons">
                                      <button className="cancel-button" onClick={() => toast.dismiss(t.id)}>Cancelar</button>
                                      <button className="delete-button" onClick={() => {
                                        toast.remove(t.id);
                                        eliminarMantenimiento(mantenimiento.id).then((data) => {
                                          cargarMantenimientos();
                                          if (data) {
                                          toast.success("Mantenimiento eliminado correctamente", {
                                            duration: 2000,
                                          });}
                                        });
                                      }}>Eliminar</button>
                                    </div>
                                  </div>
                                );
                              });
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

export default Mantenimientos;
