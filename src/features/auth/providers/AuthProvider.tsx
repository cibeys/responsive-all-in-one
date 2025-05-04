
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

// Types
interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  isLoading: boolean;
}

// Default admin credentials (for demo purposes only)
const ADMIN_EMAIL = "admin@example.com";
const ADMIN_PASSWORD = "Admin1234";
const ADMIN_USER: User = {
  id: "admin-1",
  email: ADMIN_EMAIL,
  name: "Admin User",
};

// Create context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider component
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check if the user is already logged in on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("admin-user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Failed to parse stored user:", error);
        localStorage.removeItem("admin-user");
      }
    }
    
    // Listen for Supabase auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (session?.user) {
          // Check if the user is using demo credentials or actual Supabase authentication
          if (localStorage.getItem("admin-user")) {
            // Already using demo credentials
          } else {
            // Using Supabase auth
            setUser({
              id: session.user.id,
              email: session.user.email || 'unknown',
              name: session.user.user_metadata?.name || session.user.email?.split('@')[0] || 'User'
            });
          }
        } else {
          // No session, check if using demo credentials
          const storedUser = localStorage.getItem("admin-user");
          if (!storedUser) {
            setUser(null);
          }
        }
      }
    );
    
    setIsLoading(false);
    
    // Cleanup subscription
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Login function - handles both demo credentials and Supabase auth
  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      // First check if using demo credentials
      if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
        setUser(ADMIN_USER);
        localStorage.setItem("admin-user", JSON.stringify(ADMIN_USER));
        setIsLoading(false);
        return true;
      }
      
      // If not using demo credentials, try Supabase auth
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      
      if (error) {
        console.error("Login error:", error);
        setIsLoading(false);
        return false;
      }
      
      if (data.user) {
        setUser({
          id: data.user.id,
          email: data.user.email || 'unknown',
          name: data.user.user_metadata?.name || data.user.email?.split('@')[0] || 'User'
        });
        setIsLoading(false);
        return true;
      }
      
      setIsLoading(false);
      return false;
    } catch (error) {
      console.error("Login error:", error);
      setIsLoading(false);
      return false;
    }
  };

  // Logout function
  const logout = async () => {
    // Check if using demo credentials
    if (localStorage.getItem("admin-user")) {
      localStorage.removeItem("admin-user");
    } else {
      // Using Supabase auth
      try {
        await supabase.auth.signOut();
      } catch (error) {
        console.error("Error signing out with Supabase:", error);
        toast.error("Error signing out");
      }
    }
    
    setUser(null);
  };

  // Context value
  const value = {
    user,
    login,
    logout,
    isLoading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// Custom hook to use the auth context
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
