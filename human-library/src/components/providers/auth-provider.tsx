"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import type { User, UserRole } from "@/types";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/client";
import { fetchUserById, upsertUser } from "@/lib/users";
import type { LoginInput, RegisterInput } from "@/lib/validations";

interface AuthContextValue {
  user: User | null;
  isLoading: boolean;
  login: (input: LoginInput) => Promise<{ error?: string }>;
  register: (input: RegisterInput) => Promise<{ error?: string }>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const loadProfile = useCallback(async (userId: string) => {
    const profile = await fetchUserById(userId);
    setUser(profile);
    return profile;
  }, []);

  useEffect(() => {
    if (!isSupabaseConfigured()) {
      setIsLoading(false);
      return;
    }

    const supabase = createClient();

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        loadProfile(session.user.id).finally(() => setIsLoading(false));
      } else {
        setIsLoading(false);
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (session?.user) {
        await loadProfile(session.user.id);
      } else {
        setUser(null);
      }
      setIsLoading(false);
    });

    return () => subscription.unsubscribe();
  }, [loadProfile]);

  const login = useCallback(async (input: LoginInput) => {
    if (!isSupabaseConfigured()) {
      return { error: "Supabase is not configured. Add environment variables." };
    }

    const supabase = createClient();
    const { data, error } = await supabase.auth.signInWithPassword({
      email: input.email,
      password: input.password,
    });

    if (error) {
      return { error: error.message };
    }

    if (data.user) {
      const profile = await loadProfile(data.user.id);
      if (!profile) {
        return { error: "Account found but profile is missing. Contact support." };
      }
    }

    return {};
  }, [loadProfile]);

  const register = useCallback(async (input: RegisterInput) => {
    if (!isSupabaseConfigured()) {
      return { error: "Supabase is not configured. Add environment variables." };
    }

    const supabase = createClient();
    const role: UserRole = input.role;

    const { data, error } = await supabase.auth.signUp({
      email: input.email,
      password: input.password,
      options: {
        data: {
          name: input.name,
          role,
        },
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) {
      return { error: error.message };
    }

    if (data.user) {
      const profile = await upsertUser({
        id: data.user.id,
        email: input.email,
        name: input.name,
        role,
      });

      if (profile) {
        setUser(profile);
      } else {
        await loadProfile(data.user.id);
      }

      if (!data.session) {
        return {
          error:
            "Check your email to confirm your account before signing in.",
        };
      }
    }

    return {};
  }, [loadProfile]);

  const logout = useCallback(async () => {
    if (!isSupabaseConfigured()) {
      setUser(null);
      router.push("/");
      return;
    }

    const supabase = createClient();
    await supabase.auth.signOut();
    setUser(null);
    router.push("/");
    router.refresh();
  }, [router]);

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
