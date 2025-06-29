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
    try {
      const data = await fetchTecnicos();
      setTecnicos(data || []);
    } catch (error) {
      console.error("Error cargando técnicos:", error);
      toast.error("Error al cargar la lista de técnicos");
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
    cargarTecnicos();
  }, []);

  const handleEliminar = async (tecnicoCI) => {
    if (window.confirm("¿Estás seguro de que quieres eliminar este técnico?")) {
      try {
        await eliminarTecnico(tecnicoCI);
        toast.success("Técnico eliminado correctamente");
        cargarTecnicos();
      } catch (error) {
        console.error("Error eliminando técnico:", error);
        toast.error("Error al eliminar el técnico");
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
            <th></th>
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
                <td>
                  <div className="dropdown">
                    <button
                      className="dots-button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setOpen(open === tecnico.ci ? null : tecnico.ci);
                      }}
                    >
                      ⋮
                    </button>
                    {open === tecnico.ci && (
                      <div className="dropdown-content">
                        <button onClick={() => onEditarClick(tecnico.ci)}>
                          Editar
                        </button>
                        <button
                          className="delete-button"
                          onClick={() => handleEliminar(tecnico.ci)}
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
