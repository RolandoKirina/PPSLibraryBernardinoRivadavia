import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';
import { Outlet } from 'react-router-dom';

const ProtectedRoute = ( { requiredRoles } ) => {
  const { auth } = useContext(AuthContext);
//    if (!auth.isAuthenticated) {
//     return <Navigate to="/login" replace />;
//   }

   if (requiredRoles && !requiredRoles.includes(auth.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

    return <Outlet />;
};

export default ProtectedRoute;