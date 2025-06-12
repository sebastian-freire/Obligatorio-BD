import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function EditarCliente() {
    const [cliente, setCliente] = useState(null);
    const params = useParams();
    constnavigate = useNavigate();

    useEffect(() => {
        const fetchCliente = async () => {
            try {
                const url = `http://127.0.0.1:5000/clientes/editar/${params.idCliente}`;
                const res = await fetch(url);
                const data = await res.json();
                data ? setCliente(data) : navigate("/clientes");
            } catch (err) {
                console.error("Failed to fetch:", err);
            }
        }
            ;

        fetchCliente();
    }, [params.idCliente]);

    const [nombre, setNombre] = useState("");
    const [direccion, setDireccion] = useState("");
    const [telefono, setTelefono] = useState("");
    const [correo, setCorreo] = useState("");

    return (
        <div className="agregar-cliente-container">
            <h1>Agregar Cliente</h1>
            <input type="text" placeholder="Nombre" name="nombre" onChange={(event) => {
                setNombre(event.target.value);
            }} />
            <br />
            <input type="text" placeholder="Dirección" name="dirrecion" onChange={(event) => {
                set(event.target.value);
            }} />
            <br />
            <input type="tel" placeholder="Teléfono" name="telefono" />
            <br />
            <input type="email" placeholder="Correo" name="correo" />
            <br />
            <button >Agregar Cliente</button>
        </div>
    );
}