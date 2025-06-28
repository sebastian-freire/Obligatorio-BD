import { useEffect, useState } from "react";
import useProveedores from "../../hooks/UseProveedores";
import "../../styles/sharedStyles.css";

export default function Proveedores() {
    const { fetchProveedores, eliminarProveedor } = useProveedores();
    const [open, setOpen] = useState(null);
    const [proveedores, setProveedores] = useState([]);

    const cargarProveedores = async () => {
        fetchProveedores().then((data) => {
            setProveedores(data);
        });
    };

    useEffect(() => {
        cargarProveedores();
    }, []);

    return (
        <div className="show-container">
            <div className="header">
                <h1>Proveedores</h1>
                <button onClick={() => window.location.href = "/proveedores/agregar"}>
                    Agregar Proveedor
                </button>
            </div>
            <table className="show-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Contacto</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {proveedores.map((proveedor, index) => (
                        <tr key={proveedor.id}>
                            <td>{proveedor.id}</td>
                            <td>{proveedor.nombre}</td>
                            <td>{proveedor.contacto}</td>
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
                                                    navigate(`/proveedores/editar/${proveedor.id}`)
                                                }}
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
                                                                <p>¿Estás seguro de eliminar este proveedor?</p>
                                                                <div className="toast-buttons">
                                                                    <button className="cancel-button" onClick={() => toast.dismiss(t.id)}>Cancelar</button>
                                                                    <button className="delete-button" onClick={() => {
                                                                        toast.remove(t.id);
                                                                        eliminarProveedor(proveedor.id).then((data) => {
                                                                            cargarProveedores();
                                                                            if (data) {
                                                                                toast.success("Proveedor eliminado correctamente", {
                                                                                    duration: 2000,
                                                                                });
                                                                            }
                                                                        })
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
    );
}
