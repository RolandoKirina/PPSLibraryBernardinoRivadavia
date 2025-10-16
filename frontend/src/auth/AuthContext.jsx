import { createContext, useState, useContext } from 'react';

export const AuthContext = createContext();

//creo un hook para no tener que hacer usecontext(authcontext) siempre
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({children}) => {


  const [auth, setAuth] = useState({
        isAuthenticated: false,
        role: "admin",
        name: null,
        
  });


  const login = (userData) => setAuth(
    {isAuthenticated:true,
    ...userData,
  });


   const logout = () => setAuth({
    isAuthenticated: false,
    role: "admin",
    name: null,
  });


    return (
        
         /*Envuelve a todos los componentes hijos ({children}), dándoles acceso a ese contexto.*/
    <AuthContext.Provider value={{ auth, login, logout}}>

       
      {children}
    </AuthContext.Provider>
  );
}