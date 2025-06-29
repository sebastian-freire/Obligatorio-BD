import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import useClientes from "../../hooks/UseClientes";
import "../../styles/sharedStyles.css";

function ListaClientes({ onAgregarClick, onEditarClick }) {
  const apiUrl = import.meta.env.VITE_API_ENDPOINT;
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(null);
  const { eliminarCliente } = useClientes();

  const cargarClientes = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${apiUrl}/clientes`);
      if (!res.ok) throw new Error("Error al cargar clientes");
      const data = await res.json();
      setClientes(data);
    } catch (error) {
      console.error("Error cargando clientes:", error);
      toast.error("Error al cargar la lista de clientes");
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
    cargarClientes();
  }, []);

  const handleDropdownClick = (e, index) => {
    e.stopPropagation(); // Evitar que se cierre inmediatamente
    setOpen(open === index ? null : index);
  };

  return (
    <div className="show-container">
      <div className="header">
        <h1>Clientes</h1>
        <div>
          <button onClick={onAgregarClick}>Agregar Cliente</button>
        </div>
      </div>
      {loading ? (
        <p>Cargando...</p>
      ) : (
        <table className="show-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Teléfono</th>
              <th>Correo</th>
              <th>Dirección</th>
              <th>✏️</th>
            </tr>
          </thead>
          <tbody>
            {clientes.map((cliente, index) => (
              <tr key={cliente.id}>
                <td>{cliente.id}</td>
                <td>{cliente.nombre}</td>
                <td>{cliente.telefono}</td>
                <td>{cliente.correo}</td>
                <td>{cliente.direccion}</td>
                <td style={{ position: "relative" }}>
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
                            if (onEditarClick) onEditarClick(cliente.id);
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
                                      ¿Estás seguro de eliminar este cliente?
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
                                          eliminarCliente(cliente.id).then(
                                            (data) => {
                                              cargarClientes();
                                              if (data) {
                                                const successToast =
                                                  toast.success(
                                                    "Cliente eliminado correctamente"
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
      )}
    </div>
  );
}

export default ListaClientes;
