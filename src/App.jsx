import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage/LoginPage.jsx";
import MenuPage from "./pages/MenuPage/MenuPage.jsx";
import { Toaster } from "react-hot-toast";
import { UserProvider } from "./context/userContext.jsx";
import { Clientes, AgregarCliente, EditarCliente } from "./pages/Clientes";
import { Maquinas, AgregarMaquina, EditarMaquina } from "./pages/Maquinas";
import {
  Mantenimientos,
  AgregarMantenimientos,
  EditarMantenimiento
} from "./pages/Mantenimiento";
import {
  Proveedores,
  AgregarProveedor,
  EditarProveedor
} from "./pages/Proveedores";
import { Insumos, AgregarInsumo, EditarInsumo } from "./pages/Insumos";
import { Tecnicos, AgregarTecnico, EditarTecnico } from "./pages/Tecnicos";

function App() {
  return (
    <UserProvider>
      <Routes>
        <Route path="/*" element={<Navigate replace to="/login" />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/menu" element={<MenuPage />} />

        {/* Rutas Clientes */}
        <Route path="/clientes" element={<Clientes />} />
        <Route path="/clientes/agregar" element={<AgregarCliente />} />
        <Route path="/clientes/editar/:idCliente" element={<EditarCliente />} />

        {/* Rutas Máquinas */}
        <Route path="/maquinas" element={<Maquinas />} />
        <Route path="/maquinas/agregar" element={<AgregarMaquina />} />
        <Route path="/maquinas/editar/:idMaquina" element={<EditarMaquina />} />

        {/* Rutas Mantenimientos */}
        <Route path="/mantenimientos" element={<Mantenimientos />} />
        <Route
          path="/mantenimientos/agregar"
          element={<AgregarMantenimientos />}
        />
        <Route
          path="/mantenimientos/editar/:idMantenimiento"
          element={<EditarMantenimiento />}
        />

        {/* Rutas Proveedores */}
        <Route path="/proveedores" element={<Proveedores />} />
        <Route path="/proveedores/agregar" element={<AgregarProveedor />} />
        <Route
          path="/proveedores/editar/:idProveedor"
          element={<EditarProveedor />}
        />

        {/* Rutas Insumos */}
        <Route path="/insumos" element={<Insumos />} />
        <Route path="/insumos/agregar" element={<AgregarInsumo />} />
        <Route path="/insumos/editar/:idInsumo" element={<EditarInsumo />} />

        {/* Rutas Técnicos */}
        <Route path="/tecnicos" element={<Tecnicos />} />
        <Route path="/tecnicos/agregar" element={<AgregarTecnico />} />
        <Route path="/tecnicos/editar/:ciTecnico" element={<EditarTecnico />} />
      </Routes>
      <Toaster />
    </UserProvider>
  );
}

export default App;
