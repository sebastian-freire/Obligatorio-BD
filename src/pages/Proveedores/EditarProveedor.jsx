import { useEffect, useState } from "react";
import useProveedores from "../../hooks/UseProveedores";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function EditarProveedor() {
    const params = useParams();
    const navigate = useNavigate();
    const [proveedor, setProveedor] = useState({
        nombre: "",
        contacto: "",
    });

    const {
        fetchProveedor,
        editarProveedor
    } = useProveedores();

    const handleChange = (event) => {
        const { name, value } = event.target;
        setProveedor((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    useEffect(() => {
        fetchProveedor(params.idProveedor).then((data) => {
            if (data) {
                setProveedor(data);
            } else {
                navigate("/proveedores");
            }
        });
    }, [params.idProveedor]);

    return (
        <div className="agregar-cliente-container">
            <h1>Editar Proveedor</h1>
            <input
                type="text"
                placeholder="Nombre"
                name="nombre"
                value={proveedor.nombre}
                maxLength={50}
                onChange={handleChange}
            />
            <br />
            <input
                type="text"
                placeholder="Contacto"
                value={proveedor.contacto}
                name="contacto"
                maxLength={50}
                onChange={handleChange}
            />
            <br />
            <button onClick={() => editarProveedor(params.idProveedor, proveedor)}>Editar Proveedor</button>
        </div>
    );
}
