import React, { createContext, useContext, useState, useEffect } from 'react';

// Define the shape of the authentication context
interface AuthContextType {
  isAuthenticated: boolean;
  userEmail: string | null;
  userRole: string | null; // Changed to string for simplicity, assuming single primary role for checks
  userRoles: string[]; // Added for handling multiple roles if needed
  loading: boolean;
  login: (email: string, token: string, roles: string[]) => void; // Added roles to login
  logout: () => void;
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
    // On component mount, try to load auth state from localStorage or sessionStorage
    const storedAuth = localStorage.getItem('auth'); // Or sessionStorage
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
        logout(); // Clear invalid data
      }
    }
    setLoading(false); // Authentication state loaded
  }, []);

  const login = (email: string, token: string, roles: string[]) => {
    setIsAuthenticated(true);
    setUserEmail(email);
    setUserRoles(roles);
    console.log(roles);
    setUserRole(roles.length > 0 ? roles[0] : null); // Set primary role
    // Store auth state (e.g., token, email, roles) in localStorage or sessionStorage
    localStorage.setItem('auth', JSON.stringify({ email, token, roles }));
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUserEmail(null);
    setUserRole(null);
    setUserRoles([]);
    localStorage.removeItem('auth'); // Clear stored auth state
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
