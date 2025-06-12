import { useUser } from "../../context/userContext";

export default function MenuPage() {
    const { getCurrentUser } = useUser

    return (
        <div className="menu-container">
            <h1>Menú Principal</h1>
            <ul>
                <li><a href="/clientes">Clientes</a></li>
                <li><a href="/mantenimientos">Mantenimientos</a></li>
                <li><a href="/insumos">Insumos</a></li>
                {getCurrentUser().es_administrador  && 
                <>
                <li><a href="/maquinas">Máquinas</a></li>
                <li><a href="/tecnicos">Técnicos</a></li>
                <li><a href="/proveedores">Proveedores</a></li>
                </>
                }
            </ul>
        </div>
    ); 
}