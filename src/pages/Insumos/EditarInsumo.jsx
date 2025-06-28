import { useEffect, useState } from "react";
import useInsumos from "../../hooks/UseInsumos";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function EditarInsumo() {
    const params = useParams();
    const navigate = useNavigate();
    const [insumo, setInsumo] = useState({
        descripcion: "",
        tipo: "",
        precio_unitario: "",
        id_proveedor: "",
    });

    const {
        fetchInsumo,
        editarInsumo
    } = useInsumos();

    const handleChange = (event) => {
        const { name, value } = event.target;
        setInsumo((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    useEffect(() => {
        fetchInsumo(params.idInsumo).then((data) => {
            if (data) {
                setInsumo(data);
            } else {
                navigate("/insumos");
            }
        });
    }, [params.idInsumo]);

    return (
        <div className="agregar-cliente-container">
            <h1>Editar Insumo</h1>
            <input
                type="text"
                placeholder="Descripción"
                name="descripcion"
                value={insumo.descripcion}
                maxLength={50}
                onChange={handleChange}
            />
            <br />
            <input
                type="text"
                placeholder="Tipo"
                value={insumo.tipo}
                name="tipo"
                maxLength={50}
                onChange={handleChange}
            />
            <br />
            <input
                type="number"
                placeholder="Precio Unitario"
                value={insumo.precio_unitario}
                name="precio_unitario"
                step="0.01"
                onChange={handleChange}
            />
            <br />
            <input
                type="number"
                placeholder="ID Proveedor"
                value={insumo.id_proveedor}
                name="id_proveedor"
                onChange={handleChange}
            />
            <br />
            <button onClick={() => editarInsumo(params.idInsumo, insumo)}>Editar Insumo</button>
        </div>
    );
}
