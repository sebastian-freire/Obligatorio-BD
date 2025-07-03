import React, { useState } from "react";
import MenuButton from "../../components/MenuButton";
import ListaClientes from "./ListaClientes";
import ListaClientesMasMaquinas from "./ListaClientesMasMaquinas";
import ListaCobroMensual from "./ListaCobroMensual";
import AgregarCliente from "./AgregarClientes";
import EditarCliente from "./EditarCliente";
import "../../styles/sharedStyles.css";
import "../../styles/panelStyles.css";

function Clientes() {
  const [pestañaActiva, setPestañaActiva] = useState("lista");
  const [clienteIdEditar, setClienteIdEditar] = useState(null);

  const renderContenido = () => {
    switch (pestañaActiva) {
      case "lista":
        return (
          <ListaClientes
            onAgregarClick={() => setPestañaActiva("agregar")}
            onEditarClick={(clienteId) => {
              setClienteIdEditar(clienteId);
              setPestañaActiva("editar");
            }}
          />
        );
      case "agregar":
        return <AgregarCliente onCancel={() => setPestañaActiva("lista")} />;
      case "editar":
        return (
          <EditarCliente
            clienteId={clienteIdEditar}
            onCancel={() => {
              setClienteIdEditar(null);
              setPestañaActiva("lista");
            }}
          />
        );
      case "topMaquinas":
        return <ListaClientesMasMaquinas />;
      case "cobroMensual":
        return <ListaCobroMensual />;
      default:
        return (
          <ListaClientes
            onAgregarClick={() => setPestañaActiva("agregar")}
            onEditarClick={(clienteId) => {
              setClienteIdEditar(clienteId);
              setPestañaActiva("editar");
            }}
          />
        );
    }
  };

  return (
    <div className="panel-container">
      <div className="panel-header">
        <h1 className="panel-title">Panel de Clientes</h1>
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
            Lista de Clientes
          </button>
          <button
            onClick={() => setPestañaActiva("topMaquinas")}
            className={`tab-button ${
              pestañaActiva === "topMaquinas" ? "active" : ""
            }`}
          >
            Top Clientes - Máquinas
          </button>
          <button
            onClick={() => setPestañaActiva("cobroMensual")}
            className={`tab-button ${
              pestañaActiva === "cobroMensual" ? "active" : ""
            }`}
          >
            Cobro Mensual
          </button>
        </div>
      </div>
      <div className="content-container">{renderContenido()}</div>
    </div>
  );
}

export default Clientes;
