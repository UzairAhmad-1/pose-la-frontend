// contexts/AuthContext.tsx
"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { User, userApi } from "../lib/api/user.api";

interface AuthContextType {
  user: User | null;
  authToken: string | null;
  isLoading: boolean;
  login: (token: string, user: User) => void;
  logout: () => void;
  updateUser: (user: User) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [authToken, setAuthToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for stored auth data on mount
    const token = localStorage.getItem("authToken");
    const userData = localStorage.getItem("user");

    if (token) {
      setAuthToken(token);
      const loadUser = async () => {
        try {
          const stored = userData ? JSON.parse(userData) : null;
          let userInfo;

          if (stored && stored.id) {
            // already have user object
            userInfo = stored;
          } else {
            const response = await userApi.getCurrentUser(token);
            userInfo = response.data.user; // ✅ extract nested user
          }

          setUser(userInfo);
          localStorage.setItem("user", JSON.stringify(userInfo));
        } catch (err) {
          console.error("Auth check failed:", err);
          logout();
        } finally {
          setIsLoading(false);
        }
      };

      loadUser();
    } else {
      setIsLoading(false);
    }

    setIsLoading(false);
  }, []);

  const login = (token: string, userData: User) => {
    setAuthToken(token);
    setUser(userData);
    localStorage.setItem("authToken", token);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const logout = () => {
    setAuthToken(null);
    setUser(null);
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
  };

  const updateUser = (userData: User) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  return (
    <AuthContext.Provider
      value={{ user, authToken, isLoading, login, logout, updateUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
