import { User, AuthResponse } from '../types';
import { api } from './api';
import { DB_KEYS } from '../config/database';

export const authService = {
  // LOGIN
  login: async (email: string, password: string): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>('/auth/login', { email, password });
    
    // Persist session clientside
    localStorage.setItem(DB_KEYS.SESSION, JSON.stringify(response));
    return response;
  },

  // SIGNUP
  signup: async (name: string, email: string, password: string): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>('/auth/signup', { name, email, password });
    
    // If sign up automatically logs in (legacy behavior or no verification), persist session
    if (response.token && response.user) {
        localStorage.setItem(DB_KEYS.SESSION, JSON.stringify(response));
    }
    return response;
  },

  // VERIFY EMAIL
  verifyEmail: async (email: string, code: string): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>('/auth/verify', { email, code });
    
    if (response.token && response.user) {
        localStorage.setItem(DB_KEYS.SESSION, JSON.stringify(response));
    }
    return response;
  },

  // FORGOT PASSWORD
  forgotPassword: async (email: string): Promise<void> => {
    await api.post('/auth/forgot-password', { email });
  },

  // RESET PASSWORD
  resetPassword: async (email: string, code: string, newPassword: string): Promise<void> => {
    await api.post('/auth/reset-password', { email, code, newPassword });
  },

  // LOGOUT
  logout: async (): Promise<void> => {
    // In a real app, we might call api.post('/auth/logout') here
    // For now, we just clear local session
    await new Promise(resolve => setTimeout(resolve, 300));
    localStorage.removeItem(DB_KEYS.SESSION);
  },

  // GET SESSION
  getSession: (): AuthResponse | null => {
    try {
      const stored = localStorage.getItem(DB_KEYS.SESSION);
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  },

  // UPDATE PROFILE
  updateProfile: async (updatedUser: User): Promise<User> => {
    const response = await api.put<User>('/users', updatedUser);

    // Update Local Session Data to match
    const session = JSON.parse(localStorage.getItem(DB_KEYS.SESSION) || '{}');
    if (session.user && session.user.id === response.id) {
        session.user = response;
        localStorage.setItem(DB_KEYS.SESSION, JSON.stringify(session));
    }

    return response;
  }
};