import React, { useState } from "react";
import MenuButton from "../../components/MenuButton";
import ListaMantenimientos from "./ListaMantenimientos";
import AgregarMantenimientos from "./AgregarMantenimientos";
import EditarMantenimiento from "./EditarMantenimiento";
import "../../styles/sharedStyles.css";
import "../../styles/panelStyles.css";

function Mantenimientos() {
  const [pestañaActiva, setPestañaActiva] = useState("lista");
  const [mantenimientoIdEditar, setMantenimientoIdEditar] = useState(null);

  const renderContenido = () => {
    switch (pestañaActiva) {
      case "lista":
        return (
          <ListaMantenimientos
            onAgregarClick={() => setPestañaActiva("agregar")}
            onEditarClick={(mantenimientoId) => {
              setMantenimientoIdEditar(mantenimientoId);
              setPestañaActiva("editar");
            }}
          />
        );
      case "agregar":
        return (
          <AgregarMantenimientos onCancel={() => setPestañaActiva("lista")} />
        );
      case "editar":
        return (
          <EditarMantenimiento
            mantenimientoId={mantenimientoIdEditar}
            onCancel={() => {
              setMantenimientoIdEditar(null);
              setPestañaActiva("lista");
            }}
          />
        );
      default:
        return (
          <ListaMantenimientos
            onAgregarClick={() => setPestañaActiva("agregar")}
            onEditarClick={(mantenimientoId) => {
              setMantenimientoIdEditar(mantenimientoId);
              setPestañaActiva("editar");
            }}
          />
        );
    }
  };

  return (
    <div className="panel-container">
      <div className="panel-header">
        <h1 className="panel-title">Panel de Mantenimientos</h1>
        <div className="panel-menu-button">
          <MenuButton />
        </div>
      </div>

      <div className="tabs-container">
        <div className="tabs-wrapper">
          <button
            onClick={() => setPestañaActiva("lista")}
            className={`tab-button ${
              pestañaActiva === "lista" ? "active" : ""
            }`}
          >
            Lista de Mantenimientos
          </button>
        </div>
      </div>
      <div className="content-container">{renderContenido()}</div>
    </div>
  );
}

export default Mantenimientos;
