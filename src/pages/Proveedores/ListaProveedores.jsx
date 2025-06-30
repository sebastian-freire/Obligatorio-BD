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
  }, []);

  const handleEliminar = async (proveedorId) => {
    if (
      window.confirm("¿Estás seguro de que quieres eliminar este proveedor?")
    ) {
      try {
        await eliminarProveedor(proveedorId);
        toast.success("Proveedor eliminado correctamente");
        cargarProveedores();
      } catch (error) {
        console.error("Error eliminando proveedor:", error);
        toast.error("Error al eliminar el proveedor");
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
            <th></th>
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
                <td>
                  <div className="dropdown">
                    <button
                      className="dots-button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setOpen(open === proveedor.id ? null : proveedor.id);
                      }}
                    >
                      ⋮
                    </button>
                    {open === proveedor.id && (
                      <div className="dropdown-content">
                        <button onClick={() => onEditarClick(proveedor.id)}>
                          Editar
                        </button>
                        <button
                          className="delete-button"
                          onClick={() => handleEliminar(proveedor.id)}
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
