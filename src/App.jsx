import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage/LoginPage.jsx";
import MenuPage from "./pages/MenuPage/MenuPage.jsx";
import { Toaster } from "react-hot-toast";
import { UserProvider } from "./context/UserContext.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
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

        {/* Rutas protegidas */}
        <Route
          path="/menu"
          element={
            <ProtectedRoute>
              <MenuPage />
            </ProtectedRoute>
          }
        />

        {/* Rutas Clientes */}
        <Route
          path="/clientes"
          element={
            <ProtectedRoute>
              <Clientes />
            </ProtectedRoute>
          }
        />

        {/* Rutas Máquinas - Solo Administradores */}
        <Route
          path="/maquinas"
          element={
            <ProtectedRoute adminOnly={true}>
              <Maquinas />
            </ProtectedRoute>
          }
        />
        <Route
          path="/maquinas/agregar"
          element={
            <ProtectedRoute adminOnly={true}>
              <AgregarMaquina />
            </ProtectedRoute>
          }
        />
        <Route
          path="/maquinas/editar/:idMaquina"
          element={
            <ProtectedRoute adminOnly={true}>
              <EditarMaquina />
            </ProtectedRoute>
          }
        />

        {/* Rutas Mantenimientos */}
        <Route
          path="/mantenimientos"
          element={
            <ProtectedRoute>
              <Mantenimientos />
            </ProtectedRoute>
          }
        />

        {/* Rutas Proveedores */}
        <Route
          path="/proveedores"
          element={
            <ProtectedRoute adminOnly={true}>
              <Proveedores />
            </ProtectedRoute>
          }
        />
        <Route
          path="/proveedores/agregar"
          element={
            <ProtectedRoute adminOnly={true}>
              <AgregarProveedor />
            </ProtectedRoute>
          }
        />
        <Route
          path="/proveedores/editar/:idProveedor"
          element={
            <ProtectedRoute adminOnly={true}>
              <EditarProveedor />
            </ProtectedRoute>
          }
        />

        {/* Rutas Insumos */}
        <Route
          path="/insumos"
          element={
            <ProtectedRoute>
              <Insumos />
            </ProtectedRoute>
          }
        />

        {/* Rutas Técnicos - Solo Administradores */}
        <Route
          path="/tecnicos"
          element={
            <ProtectedRoute adminOnly={true}>
              <Tecnicos />
            </ProtectedRoute>
          }
        />
        <Route
          path="/tecnicos/agregar"
          element={
            <ProtectedRoute adminOnly={true}>
              <AgregarTecnico />
            </ProtectedRoute>
          }
        />
        <Route
          path="/tecnicos/editar/:ciTecnico"
          element={
            <ProtectedRoute adminOnly={true}>
              <EditarTecnico />
            </ProtectedRoute>
          }
        />
      </Routes>
      <Toaster />
    </UserProvider>
  );
}

export default App;
