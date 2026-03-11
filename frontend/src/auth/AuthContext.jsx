import { createContext, useState, useContext, useEffect, useCallback } from 'react';
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [auth, setAuth] = useState({
    isAuthenticated: false,
    token: null,
    userId: null,
    name: null,
    role: null
  });

  const logout = useCallback(() => {
    localStorage.removeItem("token");
    setAuth({
      isAuthenticated: false,
      token: null,
      userId: null,
      name: null,
      role: null
    });
  }, []);

  const login = (token) => {
    try {
      const decoded = jwtDecode(token);
      localStorage.setItem("token", token);
      setAuth({
        isAuthenticated: true,
        token,
        userId: decoded.userId,
        name: decoded.fullName,
        role: decoded.role
      });
    } catch (error) {
      console.error("Token inválido al hacer login");
      logout();
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    
    if (token) {
      try {
        const decoded = jwtDecode(token);
        const now = Date.now() / 1000;

        if (decoded.exp < now) {
          console.warn("Sesión expirada");
          logout();
        } else {
          setAuth({
            isAuthenticated: true,
            token,
            userId: decoded.userId,
            name: decoded.fullName,
            role: decoded.role
          });
        }
      } catch (error) {
        console.error("Error decodificando token almacenado");
        logout();
      }
    }
    
    setLoading(false);
  }, [logout]);

  return (
    <AuthContext.Provider value={{ auth, login, logout, loading }}>
      {!loading && children} 
    </AuthContext.Provider>
  );
};