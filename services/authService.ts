import { supabase } from '../lib/supabase';
import { User, AuthResponse } from '../types';

// Helper to map Supabase User to App User
const mapSessionUser = (user: any): User => {
  const metadata = user.user_metadata || {};
  return {
    id: user.id,
    email: user.email || '',
    name: metadata.name || '',
    role: metadata.role || 'user',
    avatar: metadata.avatar || '',
    joinedDate: metadata.joinedDate || user.created_at,
    isVerified: !!user.email_confirmed_at
  };
};

export const authService = {
  // LOGIN: Use Supabase Auth
  login: async (email: string, password: string): Promise<AuthResponse> => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
    
    return {
      user: mapSessionUser(data.user),
      token: data.session?.access_token
    };
  },

  // SIGNUP: Use Supabase Auth
  signup: async (name: string, email: string, password: string): Promise<AuthResponse> => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name,
          role: email.includes('brand.com') || email === 'onemore9414@gmail.com' ? 'admin' : 'user',
          avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=0D8ABC&color=fff`,
          joinedDate: new Date().toISOString(),
        }
      }
    });

    if (error) throw error;

    // If Supabase returns a user but no session, verification is required
    if (data.user && !data.session) {
        return { requiresVerification: true };
    }

    return {
      user: mapSessionUser(data.user),
      token: data.session?.access_token
    };
  },

  // LOGOUT: Use Supabase Auth
  logout: async (): Promise<void> => {
    await supabase.auth.signOut();
  },

  // GET SESSION: Fetch from Supabase
  getSession: async (): Promise<AuthResponse | null> => {
    const { data } = await supabase.auth.getSession();
    if (data.session?.user) {
      return {
        user: mapSessionUser(data.session.user),
        token: data.session.access_token
      };
    }
    return null;
  },

  // UPDATE PROFILE: Use Supabase Auth
  updateProfile: async (updatedUser: Partial<User>): Promise<User> => {
    const { data, error } = await supabase.auth.updateUser({
      email: updatedUser.email,
      data: {
        name: updatedUser.name,
        avatar: updatedUser.avatar,
      }
    });
    
    if (error) throw error;
    return mapSessionUser(data.user);
  },

  // VERIFY EMAIL: Confirm code via Supabase
  verifyEmail: async (email: string, code: string): Promise<AuthResponse> => {
    const { data, error } = await supabase.auth.verifyOtp({
      email,
      token: code,
      type: 'signup'
    });
    if (error) throw error;
    
    return {
      user: mapSessionUser(data.user),
      token: data.session?.access_token
    };
  },

  // RESEND CODE: Trigger via Supabase
  resendVerificationCode: async (email: string): Promise<void> => {
    const { error } = await supabase.auth.resend({
      email,
      type: 'signup'
    });
    if (error) throw error;
  },

  // FORGOT PASSWORD: Init reset flow via Supabase
  forgotPassword: async (email: string): Promise<void> => {
    const { error } = await supabase.auth.resetPasswordForEmail(email);
    if (error) throw error;
  },

  // RESET PASSWORD: Confirm reset via Supabase OTP + Update
  resetPassword: async (email: string, code: string, newPassword: string): Promise<void> => {
    // 1. Verify OTP (Recovery type) to start session
    const { error: verifyError } = await supabase.auth.verifyOtp({
      email,
      token: code,
      type: 'recovery'
    });
    if (verifyError) throw verifyError;

    // 2. Update user password
    const { error: updateError } = await supabase.auth.updateUser({ password: newPassword });
    if (updateError) throw updateError;
  }
};