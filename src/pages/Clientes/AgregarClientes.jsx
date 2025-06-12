import React, { useState } from "react";
import { agregarCliente } from "./Fetchs"; // Adjust the import path as necessary

export default function AgregarCliente() {
    const [nombre, setNombre] = useState("");
    const [direccion, setDireccion] = useState("");
    const [telefono, setTelefono] = useState("");
    const [correo, setCorreo] = useState("");

    return (
        <div className="agregar-cliente-container">
            <h1>Agregar Cliente</h1>
            <input type="text" value={nombre} placeholder="Nombre" name="nombre" onChange={(event) => {
                setNombre(event.target.value);
            }} />
            <br />
            <input type="text" value={direccion} placeholder="Dirección" name="dirrecion" onChange={(event) => {
                setDireccion(event.target.value);
            }} />
            <br />
            <input type="tel" value={telefono} placeholder="Teléfono" name="telefono" onChange={(event) => {
                setTelefono(event.target.value);
            }}/>
            <br />
            <input type="email" value={correo} placeholder="Correo" name="correo" onChange={(event) => {
                setCorreo(event.target.value);
            }}/>
            <br />
            <button onClick={() => {
                agregarCliente(nombre, direccion, telefono, correo);
                setNombre("");
                setDireccion("");
                setTelefono("");
                setCorreo("");
                
            }}>Agregar Cliente</button>
        </div>
    );
}