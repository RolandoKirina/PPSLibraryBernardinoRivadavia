import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';
import { Outlet } from 'react-router-dom';

const ProtectedRoute = ({ requiredRoles }) => {
  const { auth, loading } = useContext(AuthContext);

  if (loading) return null;

  if (!auth.isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRoles === 'any') {
    return <Outlet />;
  }

  if (requiredRoles && !requiredRoles.includes(auth.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;