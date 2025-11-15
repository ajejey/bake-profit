'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, AuthResponse } from '@/types/auth';

interface AuthContextType {
  user: User | null;
  token: string | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<AuthResponse>;
  signup: (email: string, password: string, name?: string, businessName?: string) => Promise<AuthResponse>;
  logout: () => void;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Load user from localStorage on mount
  useEffect(() => {
    const storedToken = localStorage.getItem('auth_token');
    const storedUser = localStorage.getItem('auth_user');
    
    if (storedToken && storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setToken(storedToken);
        setUser(parsedUser);
        setLoading(false);
      } catch (error) {
        console.error('Failed to parse stored user:', error);
        // Invalid stored data, clear everything
        localStorage.removeItem('auth_token');
        localStorage.removeItem('auth_user');
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  }, []);

  // Fetch user data from API (only used for refreshUser)
  const fetchUser = async (authToken: string) => {
    try {
      const response = await fetch('/api/auth/me', {
        headers: {
          'Authorization': `Bearer ${authToken}`,
        },
      });

      if (response.ok) {
        const data: AuthResponse = await response.json();
        if (data.success && data.user) {
          setUser(data.user as User);
          localStorage.setItem('auth_user', JSON.stringify(data.user));
        } else {
          // Invalid token, clear it
          localStorage.removeItem('auth_token');
          localStorage.removeItem('auth_user');
          setToken(null);
          setUser(null);
        }
      } else {
        // Invalid token, clear it
        localStorage.removeItem('auth_token');
        localStorage.removeItem('auth_user');
        setToken(null);
        setUser(null);
      }
    } catch (error) {
      console.error('Failed to fetch user:', error);
      localStorage.removeItem('auth_token');
      localStorage.removeItem('auth_user');
      setToken(null);
      setUser(null);
    }
  };

  const login = async (email: string, password: string): Promise<AuthResponse> => {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data: AuthResponse = await response.json();

      if (data.success && data.token && data.user) {
        setToken(data.token);
        setUser(data.user as User);
        localStorage.setItem('auth_token', data.token);
        localStorage.setItem('auth_user', JSON.stringify(data.user));
      }

      return data;
    } catch (error) {
      console.error('Login error:', error);
      return {
        success: false,
        error: 'An error occurred during login',
      };
    }
  };

  const signup = async (
    email: string, 
    password: string, 
    name?: string, 
    businessName?: string
  ): Promise<AuthResponse> => {
    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          email, 
          password, 
          name, 
          business_name: businessName 
        }),
      });

      const data: AuthResponse = await response.json();

      if (data.success && data.token && data.user) {
        setToken(data.token);
        setUser(data.user as User);
        localStorage.setItem('auth_token', data.token);
        localStorage.setItem('auth_user', JSON.stringify(data.user));
      }

      return data;
    } catch (error) {
      console.error('Signup error:', error);
      return {
        success: false,
        error: 'An error occurred during signup',
      };
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('auth_token');
    localStorage.removeItem('auth_user');
    
    // Call logout API (optional, for session cleanup)
    fetch('/api/auth/logout', { method: 'POST' }).catch(console.error);
  };

  const refreshUser = async () => {
    if (token) {
      await fetchUser(token);
    }
  };

  // Decode JWT to get expiration time
  const getTokenExpiration = (jwtToken: string): number | null => {
    try {
      const parts = jwtToken.split('.');
      if (parts.length !== 3) return null;
      const decoded = JSON.parse(atob(parts[1]));
      return decoded.exp ? decoded.exp * 1000 : null; // Convert to milliseconds
    } catch {
      return null;
    }
  };

  // Automatically refresh token before it expires
  useEffect(() => {
    if (!token) return;

    const expirationTime = getTokenExpiration(token);
    if (!expirationTime) return;

    // Refresh 1 minute before expiration
    const timeUntilRefresh = expirationTime - Date.now() - 60 * 1000;
    if (timeUntilRefresh <= 0) {
      // Token already expired or expiring very soon, refresh immediately
      fetch('/api/auth/refresh', { method: 'POST' })
        .then(res => res.json())
        .then((data: AuthResponse) => {
          if (data.success && data.token && data.user) {
            setToken(data.token);
            setUser(data.user as User);
            localStorage.setItem('auth_token', data.token);
            localStorage.setItem('auth_user', JSON.stringify(data.user));
          }
        })
        .catch(err => console.error('Token refresh failed:', err));
      return;
    }

    // Schedule refresh for 1 minute before expiration
    const timeout = setTimeout(() => {
      fetch('/api/auth/refresh', { method: 'POST' })
        .then(res => res.json())
        .then((data: AuthResponse) => {
          if (data.success && data.token && data.user) {
            setToken(data.token);
            setUser(data.user as User);
            localStorage.setItem('auth_token', data.token);
            localStorage.setItem('auth_user', JSON.stringify(data.user));
          } else if (!data.success) {
            // Refresh failed, clear auth
            localStorage.removeItem('auth_token');
            localStorage.removeItem('auth_user');
            setToken(null);
            setUser(null);
          }
        })
        .catch(err => {
          console.error('Token refresh failed:', err);
          // On error, clear auth to force re-login
          localStorage.removeItem('auth_token');
          localStorage.removeItem('auth_user');
          setToken(null);
          setUser(null);
        });
    }, timeUntilRefresh);

    return () => clearTimeout(timeout);
  }, [token]);

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        login,
        signup,
        logout,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
