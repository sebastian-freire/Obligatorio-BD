import toast from "react-hot-toast";
import { useState } from "react";
import useProveedores from "../../hooks/UseProveedores";

export default function AgregarProveedor() {
    const [nuevoProveedor, setNuevoProveedor] = useState({
        nombre: "",
        contacto: "",
    });
    const {
        agregarProveedor
    } = useProveedores();

    const handleChange = (event) => {
        const { name, value } = event.target;
        setNuevoProveedor((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    return (
        <div className="agregar-cliente-container">
            <h1>Agregar Proveedor</h1>
            <input
                type="text"
                value={nuevoProveedor.nombre}
                placeholder="Nombre"
                name="nombre"
                maxLength={50}
                onChange={handleChange}
            />
            <br />
            <input
                type="text"
                value={nuevoProveedor.contacto}
                placeholder="Contacto"
                name="contacto"
                maxLength={50}
                onChange={handleChange}
            />
            <br />
            <button
                onClick={() => {
                    if (
                        !nuevoProveedor.nombre ||
                        !nuevoProveedor.contacto
                    ) {
                        toast.error("Por favor, complete todos los campos.");
                        return;
                    }
                    agregarProveedor(nuevoProveedor);
                }}
            >
                Agregar Proveedor
            </button>
        </div>
    );
}
