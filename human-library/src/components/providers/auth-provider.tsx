"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import type { User } from "@/types";
import {
  clearSession,
  getSession,
  loginUser,
  registerUser,
  saveSession,
} from "@/lib/auth";
import type { LoginInput, RegisterInput } from "@/lib/validations";

interface AuthContextValue {
  user: User | null;
  isLoading: boolean;
  login: (input: LoginInput) => Promise<{ error?: string }>;
  register: (input: RegisterInput) => Promise<{ error?: string }>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const session = getSession();
    setUser(session?.user ?? null);
    setIsLoading(false);
  }, []);

  const login = useCallback(async (input: LoginInput) => {
    const result = loginUser(input.email, input.password);
    if ("error" in result) return { error: result.error };
    saveSession(result.session);
    setUser(result.session.user);
    return {};
  }, []);

  const register = useCallback(async (input: RegisterInput) => {
    const result = registerUser(input);
    if ("error" in result) return { error: result.error };
    const sessionResult = loginUser(input.email, input.password);
    if ("session" in sessionResult) {
      saveSession(sessionResult.session);
      setUser(sessionResult.session.user);
    }
    return {};
  }, []);

  const logout = useCallback(() => {
    clearSession();
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, isLoading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
