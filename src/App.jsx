import Clientes from "./pages/Clientes";
import LogIn from "./pages/LogIn/LogIn";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/*" element={<LogIn />} />
      <Route path="/clientes" element={<Clientes />} />
    </Routes>
  );
}

export default App;
