import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage/LoginPage.jsx";
import MenuPage from "./pages/MenuPage/MenuPage.jsx";
import { Toaster } from "react-hot-toast";
import { UserProvider } from "./context/UserContext.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import Clientes from "./pages/Clientes/Clientes.jsx";
import Maquinas from "./pages/Maquinas/Maquinas.jsx";
import Mantenimientos from "./pages/Mantenimiento/Mantenimientos.jsx";
import Proveedores from "./pages/Proveedores/Proveedores.jsx";
import Insumos from "./pages/Insumos/Insumos.jsx";
import Tecnicos from "./pages/Tecnicos/Tecnicos.jsx";

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
      </Routes>
      <Toaster />
    </UserProvider>
  );
}

export default App;
