import React, { useState } from "react";
import MenuButton from "../../components/MenuButton";
import ListaTecnicos from "./ListaTecnicos";
import AgregarTecnico from "./AgregarTecnico";
import EditarTecnico from "./EditarTecnico";
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
        <h1>Técnicos</h1>
        <MenuButton />
      </div>

      <div className="panel-tabs">
        <button
          className={`tab ${pestañaActiva === "lista" ? "active" : ""}`}
          onClick={() => setPestañaActiva("lista")}
        >
          Lista de Técnicos
        </button>
      </div>

      <div className="panel-content">{renderContenido()}</div>
    </div>
  );
}

export default Tecnicos;
