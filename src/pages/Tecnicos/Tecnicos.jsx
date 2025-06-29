import { useEffect, useState } from "react";
import useTecnicos from "../../hooks/UseTecnicos";
import "../../styles/sharedStyles.css";

export default function Tecnicos() {
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
    }, []);

    return (
        <div className="show-container">
            <div className="header">
                <h1>Técnicos</h1>
                <button onClick={() => window.location.href = "/tecnicos/agregar"}>
                    Agregar Técnico
                </button>
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
                                                onClick={() => {
                                                    navigate(`/tecnicos/editar/${tecnico.ci}`)
                                                }}
                                            >
                                                Editar
                                            </button>
                                            <button
                                                onClick={() => {
                                                    setOpen(null);
                                                    toast.custom((t) => {
                                                        return (
                                                            <div key={t.id} className="toast-custom">
                                                                <p>¿Estás seguro de eliminar este tecnico?</p>
                                                                <div className="toast-buttons">
                                                                    <button className="cancel-button" onClick={() => toast.dismiss(t.id)}>Cancelar</button>
                                                                    <button className="delete-button" onClick={() => {
                                                                        toast.remove(t.id);
                                                                        eliminarTecnico(tecnico.ci).then((data) => {
                                                                            cargarTecnicos();
                                                                            if (data) {
                                                                                toast.success("Tecnico eliminado correctamente", {
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
