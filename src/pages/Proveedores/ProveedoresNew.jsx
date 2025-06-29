import React, { useState } from "react";
import MenuButton from "../../components/MenuButton";
import ListaProveedores from "./ListaProveedores";
import AgregarProveedor from "./AgregarProveedor";
import EditarProveedor from "./EditarProveedor";
import "../../styles/sharedStyles.css";
import "../../styles/panelStyles.css";

function Proveedores() {
  const [pestañaActiva, setPestañaActiva] = useState("lista");
  const [proveedorIdEditar, setProveedorIdEditar] = useState(null);

  const renderContenido = () => {
    switch (pestañaActiva) {
      case "lista":
        return (
          <ListaProveedores
            onAgregarClick={() => setPestañaActiva("agregar")}
            onEditarClick={(proveedorId) => {
              setProveedorIdEditar(proveedorId);
              setPestañaActiva("editar");
            }}
          />
        );
      case "agregar":
        return <AgregarProveedor onCancel={() => setPestañaActiva("lista")} />;
      case "editar":
        return (
          <EditarProveedor
            proveedorId={proveedorIdEditar}
            onCancel={() => {
              setProveedorIdEditar(null);
              setPestañaActiva("lista");
            }}
          />
        );
      default:
        return (
          <ListaProveedores
            onAgregarClick={() => setPestañaActiva("agregar")}
            onEditarClick={(proveedorId) => {
              setProveedorIdEditar(proveedorId);
              setPestañaActiva("editar");
            }}
          />
        );
    }
  };

  return (
    <div className="panel-container">
      <div className="panel-header">
        <h1>Proveedores</h1>
        <MenuButton />
      </div>

      <div className="panel-tabs">
        <button
          className={`tab ${pestañaActiva === "lista" ? "active" : ""}`}
          onClick={() => setPestañaActiva("lista")}
        >
          Lista de Proveedores
        </button>
      </div>

      <div className="panel-content">{renderContenido()}</div>
    </div>
  );
}

export default Proveedores;
