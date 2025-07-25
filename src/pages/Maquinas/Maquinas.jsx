import React, { useState } from "react";
import MenuButton from "../../components/MenuButton";
import ListaMaquinas from "./ListaMaquinas";
import AgregarMaquina from "./AgregarMaquina";
import EditarMaquina from "./EditarMaquina";
import "../../styles/sharedStyles.css";
import "../../styles/panelStyles.css";
import AgregarConsumo from "./AgregarConsumo";

function Maquinas() {
  const [pestañaActiva, setPestañaActiva] = useState("lista");
  const [maquinaIdEditar, setMaquinaIdEditar] = useState(null);
  const [maquinaIdConsumo, setMaquinaIdConsumo] = useState(null);

  const renderContenido = () => {
    switch (pestañaActiva) {
      case "lista":
        return (
          <ListaMaquinas
            onAgregarClick={() => setPestañaActiva("agregar")}
            onEditarClick={(maquinaId) => {
              setMaquinaIdEditar(maquinaId);
              setPestañaActiva("editar");
            }}
            onConsumoClick={(maquinaId) => {
              setMaquinaIdConsumo(maquinaId);
              setPestañaActiva("consumo");
            }}
          />
        );
      case "agregar":
        return <AgregarMaquina onCancel={() => setPestañaActiva("lista")} />;
      case "editar":
        return (
          <EditarMaquina
            maquinaId={maquinaIdEditar}
            onCancel={() => {
              setMaquinaIdEditar(null);
              setPestañaActiva("lista");
            }}
          />
        );
      case "consumo":
        return (
          <AgregarConsumo
            maquinaId={maquinaIdConsumo}
            onCancel={() => {
              setPestañaActiva("lista");
            }}
          />
        );
      default:
        return (
          <ListaMaquinas
            onAgregarClick={() => setPestañaActiva("agregar")}
            onEditarClick={(maquinaId) => {
              setMaquinaIdEditar(maquinaId);
              setPestañaActiva("editar");
            }}
            onConsumoClick={(maquinaId) => {
              setMaquinaIdConsumo(maquinaId);
              setPestañaActiva("consumo");
            }}
          />
        );
    }
  };

  return (
    <div className="panel-container">
      <div className="panel-header">
        <h1 className="panel-title">Panel de Máquinas</h1>
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
            Lista de Máquinas
          </button>
        </div>
      </div>
      <div className="content-container">{renderContenido()}</div>
    </div>
  );
}

export default Maquinas;
