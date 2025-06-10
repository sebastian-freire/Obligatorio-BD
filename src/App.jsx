
import './App.css'
import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage/LoginPage.jsx"
import { UserProvider } from './context/userContext.jsx';

function App() {
  const currentUser = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null;

  return (
    <UserProvider>
      <Routes>
        <Route path="/*" element={<Navigate replace to="/login" />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </UserProvider>
  );
}

export default App