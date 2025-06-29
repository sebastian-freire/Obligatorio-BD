import React, { useState } from "react";
import MenuButton from "../../components/MenuButton";
import ListaInsumos from "./ListaInsumos";
import ListaInsumosCostoTotal from "./ListaInsumosCostoTotal";
import ListaInsumosCantidadTotal from "./ListaInsumosCantidadTotal";
import AgregarInsumo from "./AgregarInsumo";
import EditarInsumo from "./EditarInsumo";
import "../../styles/sharedStyles.css";
import "../../styles/panelStyles.css";

function Insumos() {
  const [pestañaActiva, setPestañaActiva] = useState("lista");
  const [insumoIdEditar, setInsumoIdEditar] = useState(null);

  const renderContenido = () => {
    switch (pestañaActiva) {
      case "lista":
        return (
          <ListaInsumos
            onAgregarClick={() => setPestañaActiva("agregar")}
            onEditarClick={(insumoId) => {
              setInsumoIdEditar(insumoId);
              setPestañaActiva("editar");
            }}
          />
        );
      case "agregar":
        return <AgregarInsumo onCancel={() => setPestañaActiva("lista")} />;
      case "editar":
        return (
          <EditarInsumo
            insumoId={insumoIdEditar}
            onCancel={() => {
              setInsumoIdEditar(null);
              setPestañaActiva("lista");
            }}
          />
        );
      case "costoTotal":
        return <ListaInsumosCostoTotal />;
      case "cantidadTotal":
        return <ListaInsumosCantidadTotal />;
      default:
        return (
          <ListaInsumos
            onAgregarClick={() => setPestañaActiva("agregar")}
            onEditarClick={(insumoId) => {
              setInsumoIdEditar(insumoId);
              setPestañaActiva("editar");
            }}
          />
        );
    }
  };

  return (
    <div className="panel-container">
      <div className="panel-header">
        <h1 className="panel-title">Panel de Insumos</h1>
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
            Lista de Insumos
          </button>
          <button
            onClick={() => setPestañaActiva("costoTotal")}
            className={`tab-button ${
              pestañaActiva === "costoTotal" ? "active" : ""
            }`}
          >
            Mayor Costo Total
          </button>
          <button
            onClick={() => setPestañaActiva("cantidadTotal")}
            className={`tab-button ${
              pestañaActiva === "cantidadTotal" ? "active" : ""
            }`}
          >
            Mayor Cantidad Total
          </button>
        </div>
      </div>
      <div className="content-container">{renderContenido()}</div>
    </div>
  );
}

export default Insumos;
