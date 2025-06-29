import "../../styles/sharedStyles.css";

export default function MenuPage() {
  return (
    <div className="menu-container">
      <h1>Menú Principal</h1>
      <ul>
        <li>
          <a href="/clientes">Clientes</a>
        </li>
        <li>
          <a href="/mantenimientos">Mantenimientos</a>
        </li>
        <li>
          <a href="/insumos">Insumos</a>
        </li>

        <>
          <li>
            <a href="/maquinas">Máquinas</a>
          </li>
          <li>
            <a href="/tecnicos">Técnicos</a>
          </li>
          <li>
            <a href="/proveedores">Proveedores</a>
          </li>
        </>
      </ul>
    </div>
  );
}
