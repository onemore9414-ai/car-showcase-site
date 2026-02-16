import { User, AuthResponse } from '../types';
import { DB_KEYS } from '../config/database';
import { api } from './api';

export const authService = {
  // LOGIN: Fetch user from API
  login: async (email: string, password: string): Promise<AuthResponse> => {
    try {
      const response = await api.post<AuthResponse>('/auth/login', { email, password });
      
      // Persist Session
      localStorage.setItem(DB_KEYS.SESSION, JSON.stringify(response));
      return response;
    } catch (error: any) {
      console.error('Login error:', error);
      throw error;
    }
  },

  // SIGNUP: Create user via API
  signup: async (name: string, email: string, password: string): Promise<AuthResponse> => {
    try {
      // API handles existence check and email sending
      return await api.post<AuthResponse>('/auth/signup', { name, email, password });
    } catch (error: any) {
      console.error('Signup error:', error);
      throw error;
    }
  },

  // LOGOUT: Clear local session
  logout: async (): Promise<void> => {
    localStorage.removeItem(DB_KEYS.SESSION);
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

  // UPDATE PROFILE: Update via API
  updateProfile: async (updatedUser: User): Promise<User> => {
    try {
      const response = await api.put<User>('/users', updatedUser);
      
      // Update Local Session Data to match
      const session = JSON.parse(localStorage.getItem(DB_KEYS.SESSION) || '{}');
      if (session.user && session.user.id === response.id) {
          session.user = { ...session.user, ...response };
          localStorage.setItem(DB_KEYS.SESSION, JSON.stringify(session));
      }

      return response;
    } catch (error: any) {
      console.error('Update profile error:', error);
      throw error;
    }
  },

  // VERIFY EMAIL: Confirm code via API
  verifyEmail: async (email: string, code: string): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>('/auth/verify', { email, code });
    if (response.user && response.token) {
       localStorage.setItem(DB_KEYS.SESSION, JSON.stringify(response));
    }
    return response;
  },

  // RESEND CODE: Trigger new code generation and email via API
  resendVerificationCode: async (email: string): Promise<void> => {
    await api.post('/auth/resend-verification', { email });
  },

  // FORGOT PASSWORD: Init reset flow via API
  forgotPassword: async (email: string): Promise<void> => {
    await api.post('/auth/forgot-password', { email });
  },

  // RESET PASSWORD: Confirm reset via API
  resetPassword: async (email: string, code: string, newPassword: string): Promise<void> => {
    await api.post('/auth/reset-password', { email, code, newPassword });
  }
};
