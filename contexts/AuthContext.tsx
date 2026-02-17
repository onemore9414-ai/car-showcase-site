import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import type { User as SupabaseUser } from "@supabase/supabase-js";
import { AuthResponse } from "../types";
import { supabase } from "../lib/supabase";
import { User } from "../types"; // your local User type

// ---------------- Helper Mapper ----------------
function mapSupabaseUser(su: SupabaseUser): User {
  return {
    id: su.id,
    email: su.email ?? "",
    name: su.user_metadata?.name ?? "",
    joinedDate: su.created_at ?? "",
    role: su.user_metadata?.role ?? "user", // default role if missing
  };
}

// ---------------- Context Interface ----------------
interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<AuthResponse>;
  verifyEmail: (email: string, code: string) => Promise<void>;
  resendVerificationCode: (email: string) => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
  resetPassword: (email: string, code: string, newPassword: string) => Promise<void>;
  logout: () => Promise<void>;
  updateProfile: (data: Partial<User>) => Promise<void>;
  error: string | null;
}

// ---------------- Context ----------------
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // ---------------- Initialize Session ----------------
  useEffect(() => {
    const getSession = async () => {
      try {
        const { data } = await supabase.auth.getSession();
        if (data.session) {
          setUser(data.session.user ? mapSupabaseUser(data.session.user) : null);
          setToken(data.session.access_token);
        }
      } catch (e) {
        console.error("Session init error", e);
      } finally {
        setIsLoading(false);
      }
    };
    getSession();
  }, []);

  // ---------------- Login ----------------
  const login = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      setUser(data.user ? mapSupabaseUser(data.user) : null);
      setToken(data.session?.access_token ?? null);
    } catch (err: any) {
      setError(err.message || "Login failed");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // ---------------- Signup ----------------
  const signup = async (name: string, email: string, password: string): Promise<AuthResponse> => {
    setIsLoading(true);
    setError(null);
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { name } },
      });
      if (error) throw error;
      return {
        user: data.user ? mapSupabaseUser(data.user) : null,
        token: data.session?.access_token ?? null,
      };
    } catch (err: any) {
      setError(err.message || "Signup failed");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // ---------------- Verify Email ----------------
  const verifyEmail = async (email: string, code: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await supabase.auth.verifyOtp({ email, token: code, type: "signup" });
      if (response.error) throw response.error;
      if (response.data.user && response.data.session) {
        setUser(mapSupabaseUser(response.data.user));
        setToken(response.data.session.access_token);
      }
    } catch (err: any) {
      setError(err.message || "Verification failed");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // ---------------- Resend Verification ----------------
  const resendVerificationCode = async (email: string) => {
    setError(null);
    try {
      const { error } = await supabase.auth.resend({ type: "signup", email });
      if (error) throw error;
    } catch (err: any) {
      setError(err.message || "Failed to resend code");
      throw err;
    }
  };

  // ---------------- Forgot Password ----------------
  const forgotPassword = async (email: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: window.location.origin + "/reset-password",
      });
      if (error) throw error;
    } catch (err: any) {
      setError(err.message || "Failed to send reset code");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // ---------------- Reset Password ----------------
  const resetPassword = async (email: string, code: string, newPassword: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const { error } = await supabase.auth.verifyOtp({ email, token: code, type: "recovery" });
      if (error) throw error;
      const { error: updateError } = await supabase.auth.updateUser({ password: newPassword });
      if (updateError) throw updateError;
    } catch (err: any) {
      setError(err.message || "Failed to reset password");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // ---------------- Logout ----------------
  const logout = async () => {
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      setUser(null);
      setToken(null);
    } catch (err: any) {
      console.error("Logout error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  // ---------------- Update Profile ----------------
  const updateProfile = async (data: Partial<User>) => {
    if (!user) return;
    setIsLoading(true);
    setError(null);
    try {
      const { data: updated, error } = await supabase.auth.updateUser({ data });
      if (error) throw error;
      if (updated.user) setUser(mapSupabaseUser(updated.user));
    } catch (err: any) {
      setError(err.message || "Failed to update profile");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!user,
        isLoading,
        login,
        signup,
        verifyEmail,
        resendVerificationCode,
        forgotPassword,
        resetPassword,
        logout,
        updateProfile,
        error,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};