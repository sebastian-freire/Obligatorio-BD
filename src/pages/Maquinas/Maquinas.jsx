import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import "../../styles/sharedStyles.css";
import useMaquinas from "../../hooks/UseMaquinas";

function Maquinas() {
  const navigate = useNavigate();
  const [maquinas, setMaquinas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const { fetchMaquinas, eliminarMaquina } = useMaquinas();

  const cargarMaquinas = async () => {
    setLoading(true);
    fetchMaquinas()
      .then((data) => {
        console.log(data);
        setMaquinas(data);
        setLoading(false);
      })
  };

  useEffect(() => {
    cargarMaquinas();
  }, []);

  return (
    <div style={{ padding: 32 }}>
      {loading ? (
        <p>Cargando...</p>
      ) : (
        <div className="show-container">
          <div className="header">
            <h1>Máquinas</h1>
            <button onClick={() => window.location.href = "/maquinas/agregar"}>
              Agregar Máquina
            </button>
          </div>
          <table className="show-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Modelo</th>
                <th>ID cliente</th>
                <th>Ubicación</th>
                <th>Alquiler mensual</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {maquinas.map((maquina, index) => (
                <tr key={maquina.id}>
                  <td>{maquina.id}</td>
                  <td>{maquina.modelo}</td>
                  <td>{maquina.id_cliente}</td>
                  <td>{maquina.ubicacion_maquina}</td>
                  <td>{maquina.costo_alquiler_mensual}</td>
                  <td style={{ position: "relative" }}>
                    <div className="dropdown">
                      <button
                        className="dots-button"
                        onClick={() => { setOpen(open === index ? null : index) }}
                      >
                        ⋮
                      </button>
                      {open === index && (
                        <div className="dropdown-content">
                          <div
                            className="dropdown-item"
                            onClick={() =>
                              navigate(`/maquinas/editar/${maquina.id}`)
                            }
                          >
                            Edit
                          </div>
                          <div
                            className="dropdown-item"
                            onClick={() => {
                              setOpen(false);
                              toast.custom((t) => {
                                return (
                                  <div key={t.id} className="toast-custom">
                                    <p>¿Estás seguro de eliminar esta maquina?</p>
                                    <div className="toast-buttons">
                                      <button className="cancel-button" onClick={() => toast.dismiss(t.id)}>Cancelar</button>
                                      <button className="delete-button" onClick={() => {
                                        toast.remove(t.id);
                                        eliminarMaquina(maquina.id).then((data) => {
                                          cargarMaquinas();
                                          if (data) {
                                          toast.success("Maquina eliminado correctamente", {
                                            duration: 2000,
                                          });}
                                        })
                                      }}>Eliminar</button>
                                    </div>
                                  </div>
                                );
                              });
                            }}
                          >
                            Eliminar
                          </div>
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

export default Maquinas;
