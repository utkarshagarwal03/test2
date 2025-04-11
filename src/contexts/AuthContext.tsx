
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from "@/components/ui/use-toast";

type User = {
  id: string;
  name: string;
  email: string;
  role: 'doctor' | 'patient' | 'admin';
};

type AuthContextType = {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Check if user is stored in localStorage
    const storedUser = localStorage.getItem('healthcareUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      // In a real app, you'd validate credentials against a backend
      // For demo purposes, we'll use some hardcoded values with Indian names
      if (email === 'doctor@example.com' && password === 'password') {
        const doctorUser: User = {
          id: '1',
          name: 'Dr. Aanya Sharma',
          email: 'doctor@example.com',
          role: 'doctor'
        };
        setUser(doctorUser);
        localStorage.setItem('healthcareUser', JSON.stringify(doctorUser));
        toast({
          title: "Login successful",
          description: `Welcome back, Dr. Aanya Sharma`,
        });
      } else if (email === 'patient@example.com' && password === 'password') {
        const patientUser: User = {
          id: '2',
          name: 'Arjun Patel',
          email: 'patient@example.com',
          role: 'patient'
        };
        setUser(patientUser);
        localStorage.setItem('healthcareUser', JSON.stringify(patientUser));
        toast({
          title: "Login successful",
          description: `Welcome back, Arjun Patel`,
        });
      } else {
        toast({
          title: "Login failed",
          description: "Invalid email or password",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Login error",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
      console.error('Login error:', error);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('healthcareUser');
    toast({
      title: "Logged out",
      description: "You have been successfully logged out",
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
