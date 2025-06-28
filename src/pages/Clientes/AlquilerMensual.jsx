import React, { use } from 'react';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import useMaquinas from '../../hooks/UseMaquinas';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

export default function AlquilerMensual() {
    const params = useParams();
    const navigate = useNavigate();
    const { fetchMaquinasCliente } = useMaquinas();
    const [maquinas, setMaquinas] = useState([]);
    const [loading, setLoading] = useState(true);

    const cargarMaquinas = async () => {
        const data = await fetchMaquinasCliente(params.idCliente);
        if (data) {
            setMaquinas(data);
        } else {
            toast.remove();
            toast.error("No se encontraron máquinas para este cliente.");
            navigate("/clientes");
        }
    };

    useEffect(() => {
        cargarMaquinas();
    }, [params.idCliente]);

    const location = useLocation();
    const { nombre } = location.state || { nombre: "Cliente Desconocido" };
    return (
        <div style={{ padding: 32 }}>
            <h1>Lista de Clientes</h1>
            {loading ? (
                <p>Cargando...</p>
            ) : (
                <>
                    <h1>Alquiler Mensual: {nombre}</h1>
                    <table border="1" cellPadding="8">
                        <thead>
                            <tr>
                                <th>ID Maquina</th>
                                <th>Ubicación</th>
                                <th>Teléfono</th>
                                <th>Correo</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {maquinas.map((maquina) => (
                                <tr key={maquina.id}>
                                    <td>{maquina.id}</td>
                                    <td>{maquina.direccion}</td>
                                    <td>{maquina.costo_alquiler_mensual}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </>
            )}
        </div>
    );
}