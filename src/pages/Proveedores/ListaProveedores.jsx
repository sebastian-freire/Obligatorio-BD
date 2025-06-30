import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import useProveedores from "../../hooks/UseProveedores";
import "../../styles/sharedStyles.css";

function ListaProveedores({ onAgregarClick, onEditarClick }) {
  const [proveedores, setProveedores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(null);
  const { fetchProveedores, eliminarProveedor } = useProveedores();

  const cargarProveedores = async () => {
    setLoading(true);
    try {
      const data = await fetchProveedores();
      setProveedores(data || []);
    } catch (error) {
      console.error("Error cargando proveedores:", error);
      toast.error("Error al cargar la lista de proveedores");
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
    cargarProveedores();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDropdownClick = (e, proveedorId) => {
    e.stopPropagation(); // Evitar que se cierre inmediatamente
    setOpen(open === proveedorId ? null : proveedorId);
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
        <p>Cargando proveedores...</p>
      </div>
    );
  }

  return (
    <div className="show-container">
      <div className="header">
        <h1>Lista de Proveedores</h1>
        <button onClick={onAgregarClick}>Agregar Proveedor</button>
      </div>

      <table className="show-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Contacto</th>
            <th>✏️</th>
          </tr>
        </thead>
        <tbody>
          {proveedores.length === 0 ? (
            <tr>
              <td colSpan="4" style={{ textAlign: "center", padding: "40px" }}>
                No hay proveedores registrados
              </td>
            </tr>
          ) : (
            proveedores.map((proveedor) => (
              <tr key={proveedor.id}>
                <td>{proveedor.id}</td>
                <td>{proveedor.nombre}</td>
                <td>{proveedor.contacto}</td>
                <td style={{ position: "relative" }}>
                  <div className="dropdown">
                    <button
                      className="dots-button"
                      onClick={(e) => handleDropdownClick(e, proveedor.id)}
                    >
                      ⋮
                    </button>
                    {open === proveedor.id && (
                      <div className="dropdown-content">
                        <button
                          className="dropdown-item"
                          onClick={() => {
                            setOpen(null);
                            if (onEditarClick) onEditarClick(proveedor.id);
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
                                      ¿Estás seguro de eliminar este proveedor?
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
                                          eliminarProveedor(proveedor.id).then(
                                            (data) => {
                                              cargarProveedores();
                                              if (data) {
                                                const successToast =
                                                  toast.success(
                                                    "Proveedor eliminado correctamente"
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
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default ListaProveedores;
