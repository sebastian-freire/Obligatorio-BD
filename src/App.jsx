
import './App.css'
import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage/LoginPage.jsx"
import Clientes from './pages/Clientes/Clientes.jsx';
import AgregarCliente from './pages/Clientes/AgregarClientes.jsx';
import MenuPage from './pages/MenuPage/MenuPage.jsx';
import { UserProvider } from './context/userContext.jsx';

function App() {
  const currentUser = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null;

  return (
    <UserProvider>
      <Routes>
        <Route path="/*" element={<Navigate replace to="/login" />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/clientes" element={<Clientes />} />
        <Route path="/menu" element={<MenuPage />} />
        <Route path="/clientes/agregar" element={<AgregarCliente />} />
        <Route path="/clientes/editar/:idCliente" element={<AgregarCliente />} />

      </Routes>
    </UserProvider>
  );
}

export default App