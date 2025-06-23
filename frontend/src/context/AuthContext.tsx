import React, { createContext, useContext, useState, useEffect } from 'react';
import { logout as logoutApi } from '../api/auth';

// Define the shape of the authentication context
interface AuthContextType {
  isAuthenticated: boolean;
  userEmail: string | null;
  userRole: string | null; // Changed to string for simplicity, assuming single primary role for checks
  userRoles: string[]; // Added for handling multiple roles if needed
  loading: boolean;
  login: (email: string, token: string, roles: string[],userId:number) => void; // Added roles to login
  logout: () => Promise<void>;
}

// Create the context with a default undefined value
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// AuthProvider component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null); // Primary role for quick checks
  const [userRoles, setUserRoles] = useState<string[]>([]); // All roles
  const [loading, setLoading] = useState<boolean>(true); // To indicate if auth state is being loaded

  useEffect(() => {
    // On component mount, try to load auth state from localStorage
    const storedAuth = localStorage.getItem('auth');
    if (storedAuth) {
      try {
        const { email, token, roles } = JSON.parse(storedAuth);
        if (email && token && roles) {
          setIsAuthenticated(true);
          setUserEmail(email);
          setUserRoles(roles);
          // Assuming the first role is the primary one for simplicity in `userRole`
          setUserRole(roles.length > 0 ? roles[0] : null); 
        }
      } catch (e) {
        console.error("Failed to parse stored auth data", e);
        handleLogout(); // Clear invalid data
      }
    }
    setLoading(false); // Authentication state loaded
  }, []);

  const login = (email: string, token: string, roles: string[],userId:number) => {
    setIsAuthenticated(true);
    setUserEmail(email);
    setUserRoles(roles);
    console.log(roles);
    setUserRole(roles.length > 0 ? roles[0] : null); // Set primary role
    // Store auth state (e.g., token, email, roles) in localStorage or sessionStorage
    localStorage.setItem('auth', JSON.stringify({ email, token, roles,userId }));
    localStorage.setItem('token', token); // Store token separately for API calls
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserEmail(null);
    setUserRole(null);
    setUserRoles([]);
    localStorage.removeItem('auth');
    localStorage.removeItem('token');
  };

  const logout = async () => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        await logoutApi(token);
      }
    } catch (error) {
      console.error('Error during logout:', error);
    } finally {
      handleLogout();
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, userEmail, userRole, userRoles, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
