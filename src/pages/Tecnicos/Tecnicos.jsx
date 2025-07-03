import React, { useState } from "react";
import MenuButton from "../../components/MenuButton";
import ListaTecnicos from "./ListaTecnicos";
import AgregarTecnico from "./AgregarTecnico";
import EditarTecnico from "./EditarTecnico";
import ListaTecnicosMantenimientos from "./ListaTecnicosMantenimientos";
import "../../styles/sharedStyles.css";
import "../../styles/panelStyles.css";

function Tecnicos() {
  const [pestañaActiva, setPestañaActiva] = useState("lista");
  const [tecnicoIdEditar, setTecnicoIdEditar] = useState(null);

  const renderContenido = () => {
    switch (pestañaActiva) {
      case "lista":
        return (
          <ListaTecnicos
            onAgregarClick={() => setPestañaActiva("agregar")}
            onEditarClick={(tecnicoId) => {
              setTecnicoIdEditar(tecnicoId);
              setPestañaActiva("editar");
            }}
          />
        );
      case "agregar":
        return <AgregarTecnico onCancel={() => setPestañaActiva("lista")} />;
      case "editar":
        return (
          <EditarTecnico
            tecnicoId={tecnicoIdEditar}
            onCancel={() => {
              setTecnicoIdEditar(null);
              setPestañaActiva("lista");
            }}
          />
        );
      case "mantenimientos":
        return <ListaTecnicosMantenimientos />;
      default:
        return (
          <ListaTecnicos
            onAgregarClick={() => setPestañaActiva("agregar")}
            onEditarClick={(tecnicoId) => {
              setTecnicoIdEditar(tecnicoId);
              setPestañaActiva("editar");
            }}
          />
        );
    }
  };

  return (
    <div className="panel-container">
      <div className="panel-header">
        <h1 className="panel-title">Panel de Técnicos</h1>
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
            Lista de Técnicos
          </button>
          <button
            onClick={() => setPestañaActiva("mantenimientos")}
            className={`tab-button ${
              pestañaActiva === "mantenimientos" ? "active" : ""
            }`}
          >
            Técnicos más mantenimientos
          </button>
        </div>
      </div>
      <div className="content-container">{renderContenido()}</div>
    </div>
  );
}

export default Tecnicos;
