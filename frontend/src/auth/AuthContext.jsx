import { createContext, useState, useContext, useEffect } from 'react';
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext();

//creo un hook para no tener que hacer usecontext(authcontext) siempre
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

  const login = (token) => {
    localStorage.setItem("token", token);
    const decoded = jwtDecode(token);

    setAuth({
      isAuthenticated: true,
      token,
      userId: decoded.userId,
      name: decoded.fullName,
      role: decoded.role
    })
  }

  const logout = () => {
    localStorage.removeItem("token");
    setAuth({
      isAuthenticated: false,
      token: null,
      userId: null,
      name: null,
      role: null
    })
  }

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);

        const now = Date.now() / 1000;

        if (decoded.exp < now) {
          logout();
        }

        setAuth({
          isAuthenticated: true,
          token,
          userId: decoded.userId,
          name: decoded.fullName,
          role: decoded.role
        })
      }
      catch (error) {
        logout();
      }
    }
    setLoading(false);
  }, []);

  return (

    /*Envuelve a todos los componentes hijos ({children}), dándoles acceso a ese contexto.*/
    <AuthContext.Provider value={{ auth, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}