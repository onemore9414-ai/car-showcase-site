
import { User, AuthResponse } from '../types';
import { DB_KEYS } from '../config/database';
import { supabase } from '../lib/supabase';

export const authService = {
  // LOGIN: Fetch user from Supabase 'users' table
  login: async (email: string, password: string): Promise<AuthResponse> => {
    try {
      // 1. Query user by email
      const { data: user, error } = await supabase
        .from('users')
        .select('*')
        .eq('email', email)
        .maybeSingle();

      if (error) {
        throw new Error(error.message);
      }

      if (!user) {
        throw new Error('Invalid credentials');
      }

      // 2. Verify password
      // Note: In a real production app with Supabase Auth, use supabase.auth.signInWithPassword.
      // Here we compare against the 'users' table column as requested.
      if (user.password !== password) {
        throw new Error('Invalid credentials');
      }

      // 3. Create Session Object (remove sensitive data)
      const sessionUser = { ...user };
      delete sessionUser.password;

      const response: AuthResponse = {
        user: sessionUser,
        token: 'session-token-' + Date.now(), // Client-side session token
      };

      // 4. Persist Session
      localStorage.setItem(DB_KEYS.SESSION, JSON.stringify(response));
      return response;
    } catch (error: any) {
      console.error('Login error:', error);
      throw error;
    }
  },

  // SIGNUP: Insert user into Supabase 'users' table
  signup: async (name: string, email: string, password: string): Promise<AuthResponse> => {
    try {
      // 1. Check for existing user
      const { data: existing } = await supabase
        .from('users')
        .select('email')
        .eq('email', email)
        .maybeSingle();

      if (existing) {
        throw new Error('Email already exists');
      }

      // 2. Prepare User Data
      const newUser = {
        name,
        email,
        password, // Stored in table as requested
        role: email.toLowerCase().includes('admin') ? 'admin' : 'user',
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=0D8ABC&color=fff`,
        joinedDate: new Date().toISOString(),
        isVerified: true // Auto-verify for direct DB integration
      };

      // 3. Insert into Supabase
      const { data, error } = await supabase
        .from('users')
        .insert([newUser])
        .select()
        .single();

      if (error) {
        throw new Error(error.message);
      }

      // 4. Return success
      return { 
        message: 'Account created successfully',
        requiresVerification: false // Skip mock verification step
      };
    } catch (error: any) {
      console.error('Signup error:', error);
      throw error;
    }
  },

  // LOGOUT: Clear local session
  logout: async (): Promise<void> => {
    localStorage.removeItem(DB_KEYS.SESSION);
    // Optional: supabase.auth.signOut() if using Supabase Auth service
  },

  // GET SESSION: Read from local storage
  getSession: (): AuthResponse | null => {
    try {
      const stored = localStorage.getItem(DB_KEYS.SESSION);
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  },

  // UPDATE PROFILE: Update Supabase 'users' table
  updateProfile: async (updatedUser: User): Promise<User> => {
    try {
      const { id, ...updates } = updatedUser;
      
      const { data, error } = await supabase
        .from('users')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw new Error(error.message);

      // Update Local Session Data to match
      const session = JSON.parse(localStorage.getItem(DB_KEYS.SESSION) || '{}');
      if (session.user && session.user.id === id) {
          session.user = { ...session.user, ...data };
          // Ensure password isn't stored in session if returned
          delete session.user.password;
          localStorage.setItem(DB_KEYS.SESSION, JSON.stringify(session));
      }

      return data;
    } catch (error: any) {
      console.error('Update profile error:', error);
      throw error;
    }
  },

  // STUBS: Legacy mock features not supported by simple table auth
  verifyEmail: async (email: string, code: string): Promise<AuthResponse> => {
    return { message: 'Verified' };
  },

  resendVerificationCode: async (email: string): Promise<void> => {
    // No-op
  },

  forgotPassword: async (email: string): Promise<void> => {
    // No-op
  },

  resetPassword: async (email: string, code: string, newPassword: string): Promise<void> => {
    // No-op
  }
};
