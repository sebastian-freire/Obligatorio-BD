import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useTecnicos from "../../hooks/UseTecnicos";
import "../../styles/sharedStyles.css";
import "../../styles/panelStyles.css";
import MenuButton from "../../components/MenuButton";
import toast from "react-hot-toast";
export default function Tecnicos() {
  const navigate = useNavigate();
  const { fetchTecnicos, eliminarTecnico } = useTecnicos();
  const [open, setOpen] = useState(null);
  const [tecnicos, setTecnicos] = useState([]);

  const cargarTecnicos = async () => {
    fetchTecnicos().then((data) => {
      setTecnicos(data);
    });
  };

  useEffect(() => {
    cargarTecnicos();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="panel-container">
      <div className="panel-header">
        <h1 className="panel-title">Panel de Técnicos</h1>
        <div className="panel-menu-button">
          <MenuButton />
        </div>
      </div>

      <div className="content-container">
        <div className="show-container">
          <div className="header">
            <h1>Técnicos</h1>
            <div>
              <button onClick={() => navigate("/tecnicos/agregar")}>
                Agregar Técnico
              </button>
            </div>
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
              {tecnicos.map((tecnico, index) => (
                <tr key={tecnico.ci}>
                  <td>{tecnico.ci}</td>
                  <td>{tecnico.nombre}</td>
                  <td>{tecnico.apellido}</td>
                  <td>{tecnico.telefono}</td>
                  <td>
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
                            onClick={() => {
                              navigate(`/tecnicos/editar/${tecnico.ci}`);
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
                                        ¿Estás seguro de eliminar este tecnico?
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
                                              (data) => {
                                                cargarTecnicos();
                                                if (data) {
                                                  const successToast =
                                                    toast.success(
                                                      "Tecnico eliminado correctamente"
                                                    );
                                                  setTimeout(() => {
                                                    toast.dismiss(successToast);
                                                  }, 2000);
                                                }
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
        </div>
      </div>
    </div>
  );
}
