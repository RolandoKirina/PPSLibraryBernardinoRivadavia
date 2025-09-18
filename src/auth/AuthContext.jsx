import { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {


  const [auth, setAuth] = useState({
        isAuthenticated: false,
        role: null,
        name: null,
  });


  const login = (userData) => setAuth(
    {isAuthenticated:true,
    ...userData,
  });

   const logout = () => setAuth({
    isAuthenticated: false,
    role: null,
    name: null,
  });


    return (
        
         /*Envuelve a todos los componentes hijos ({children}), dándoles acceso a ese contexto.*/
    <AuthContext.Provider value={{ auth, login, logout }}>

       
      {children}
    </AuthContext.Provider>
  );
}