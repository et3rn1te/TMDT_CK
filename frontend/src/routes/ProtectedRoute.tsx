import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Make sure AuthContext provides userRoles and loading

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: string[]; 
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, allowedRoles }) => {
  // Destructure isAuthenticated, userRoles (plural), and loading from useAuth()
  const { isAuthenticated, userRoles, loading } = useAuth(); 

  // Show a loading indicator while authentication status is being determined
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500"></div>
        <p className="ml-4 text-gray-700">Đang tải...</p>
      </div>
    );
  }

  // If not authenticated, redirect to login page
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // If allowedRoles are specified, check if the user has at least one of the allowed roles
  // If allowedRoles is not specified, then any authenticated user can access the route.
  if (allowedRoles && allowedRoles.length > 0) {
    // Check if there's any intersection between user's roles and allowed roles
    const hasRequiredRole = userRoles.some(role => allowedRoles.includes(role));

    if (!hasRequiredRole) {
      // If authenticated but not authorized, redirect to a forbidden page (e.g., /403)
      return <Navigate to="/403" replace />;
    }
  }

  // If authenticated and authorized (or no specific roles required), render the children components
  return <>{children}</>;
};

export default ProtectedRoute;
