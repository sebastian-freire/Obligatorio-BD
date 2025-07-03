import { createContext, useContext, useState, useEffect } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const apiUrl = import.meta.env.VITE_API_ENDPOINT;
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = JSON.parse(sessionStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    }
    setLoading(false);
  }, []);

  const getCurrentUser = () => {
    return user || undefined;
  };

  const setCurrentUser = (userData) => {
    const isAdmin =
      userData.es_administrador === 1 || userData.es_administrador === true;
    const userToStore = {
      correo: userData.correo,
      nombre: userData.nombre || userData.correo, // Fallback al correo si no hay nombre
      es_administrador: userData.es_administrador,
      isAdmin: isAdmin
    };
    sessionStorage.setItem("user", JSON.stringify(userToStore));
    setUser(userToStore);
  };

  const login = async (correo, contrasena) => {
    try {
      const res = await fetch(`${apiUrl}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ correo, contrasena })
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error();
      setCurrentUser(data.user);
      return true;
    } catch {
      return false;
    }
  };

  const logout = () => {
    sessionStorage.removeItem("user");
    setUser(null);
  };

  const getAuthHeaders = () => {
    return {
      "Content-Type": "application/json",
      "X-User-Email": user?.correo || ""
    };
  };

  return (
    <UserContext.Provider
      value={{
        user,
        loading,
        getCurrentUser,
        setCurrentUser,
        login,
        logout,
        getAuthHeaders
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
