import { useEffect, useState } from "react";
import useTecnicos from "../../hooks/UseTecnicos";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function EditarTecnico() {
    const params = useParams();
    const navigate = useNavigate();
    const [tecnico, setTecnico] = useState({
        ci: "",
        nombre: "",
        apellido: "",
        telefono: "",
    });

    const {
        fetchTecnico,
        editarTecnico
    } = useTecnicos();

    const handleChange = (event) => {
        const { name, value } = event.target;
        setTecnico((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    useEffect(() => {
        fetchTecnico(params.ciTecnico).then((data) => {
            if (data) {
                setTecnico(data);
            } else {
                navigate("/tecnicos");
            }
        });
    }, [params.ciTecnico]);

    return (
        <div className="agregar-cliente-container">
            <h1>Editar Técnico</h1>
            <input
                type="text"
                placeholder="Cédula de Identidad"
                name="ci"
                value={tecnico.ci}
                maxLength={8}
                onChange={handleChange}
                disabled
            />
            <br />
            <input
                type="text"
                placeholder="Nombre"
                name="nombre"
                value={tecnico.nombre}
                maxLength={50}
                onChange={handleChange}
            />
            <br />
            <input
                type="text"
                placeholder="Apellido"
                value={tecnico.apellido}
                name="apellido"
                maxLength={50}
                onChange={handleChange}
            />
            <br />
            <input
                type="tel"
                placeholder="Teléfono"
                value={tecnico.telefono}
                name="telefono"
                maxLength={50}
                onChange={handleChange}
            />
            <br />
            <button onClick={() => editarTecnico(params.ciTecnico, tecnico)}>Editar Técnico</button>
        </div>
    );
}
