import { useEffect, useState } from "react";
import useInsumos from "../../hooks/UseInsumos";
import "../../styles/sharedStyles.css";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function Insumos() {
    const { fetchInsumos, eliminarInsumo } = useInsumos();
    const navigate = useNavigate();
    const [insumos, setInsumos] = useState([]);
    const [open, setOpen] = useState(null);

    const cargarInsumos = async () => {
        fetchInsumos().then((data) => {
            setInsumos(data);
        });
    };

    useEffect(() => {
        cargarInsumos();
    }, []);

    return (
        <div className="show-container">
            <div className="header">
                <h1>Insumos</h1>
                <button onClick={() => window.location.href = "/insumos/agregar"}>
                    Agregar Insumo
                </button>
            </div>
            <table className="show-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Descripción</th>
                        <th>Tipo</th>
                        <th>Precio Unitario</th>
                        <th>ID Proveedor</th>
                        <th></th>
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
                                        onClick={() => setOpen(open === index ? null : index)}
                                    >
                                        ⋮
                                    </button>
                                    {open === index && (
                                        <div className="dropdown-content">
                                            <button
                                                className="dropdown-item"
                                                onClick={() => {
                                                    navigate(`/insumos/editar/${insumo.id}`)
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
                                                                <p>¿Estás seguro de eliminar este insumo?</p>
                                                                <div className="toast-buttons">
                                                                    <button className="cancel-button" onClick={() => toast.dismiss(t.id)}>Cancelar</button>
                                                                    <button className="delete-button" onClick={() => {
                                                                        toast.remove(t.id);
                                                                        eliminarInsumo(insumo.id).then((data) => {
                                                                            cargarInsumos();
                                                                            if (data) {
                                                                                toast.success("Insumo eliminado correctamente", {
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
