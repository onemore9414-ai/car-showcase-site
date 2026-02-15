import { Database } from '../database/storage';
import { User } from '../types';
import { emailProvider } from './emailProvider';

export const usersController = {
  // GET /api/users
  getAll: () => {
    const users = Database.read<User[]>('users');
    return { status: 200, body: users };
  },

  // POST /api/auth/login
  login: (data: any) => {
    const { email, password } = data;
    const users = Database.read<User[]>('users');
    const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    
    // Mock authentication: accept any password if user exists
    if (user && password) {
      if (user.isVerified === false) {
        return { status: 403, body: { message: 'Email not verified. Please verify your account.' } };
      }

      const token = `mock-jwt-${Date.now()}-${user.id}`;
      return { status: 200, body: { user, token } };
    }
    return { status: 401, body: { message: 'Invalid credentials' } };
  },

  // POST /api/auth/signup
  signup: async (data: any) => {
    const { name, email, password } = data;
    const users = Database.read<User[]>('users');
    
    if (users.find(u => u.email.toLowerCase() === email.toLowerCase())) {
      return { status: 409, body: { message: 'Email already exists' } };
    }

    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
    
    // Send Real Email
    await emailProvider.sendVerificationEmail(email, verificationCode);

    const newUser: User = {
      id: `user-${Date.now()}`,
      name,
      email,
      role: email.includes('admin') ? 'admin' : 'user',
      joinedDate: new Date().toISOString(),
      avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=0D8ABC&color=fff`,
      isVerified: false
    };

    // Store code internally in mock DB
    (newUser as any).verificationCode = verificationCode;

    users.push(newUser);
    Database.write('users', users);
    
    // Return requiresVerification signal instead of token
    return { status: 200, body: { requiresVerification: true, email } };
  },

  // POST /api/auth/verify
  verify: (data: any) => {
    const { email, code } = data;
    const users = Database.read<User[]>('users');
    const userIndex = users.findIndex(u => u.email.toLowerCase() === email.toLowerCase());
    
    if (userIndex === -1) {
      return { status: 404, body: { message: 'User not found' } };
    }
    
    const user = users[userIndex];
    
    // Validate code
    if ((user as any).verificationCode !== code) {
      return { status: 400, body: { message: 'Invalid verification code' } };
    }
    
    // Verify user
    user.isVerified = true;
    delete (user as any).verificationCode;
    users[userIndex] = user;
    Database.write('users', users);
    
    const token = `mock-jwt-${Date.now()}-${user.id}`;
    return { status: 200, body: { user, token } };
  },

  // POST /api/auth/resend-verification
  resendVerification: async (data: any) => {
    const { email } = data;
    const users = Database.read<User[]>('users');
    const userIndex = users.findIndex(u => u.email.toLowerCase() === email.toLowerCase());

    if (userIndex === -1) {
      return { status: 404, body: { message: 'User not found' } };
    }

    const user = users[userIndex];
    if (user.isVerified) {
        return { status: 400, body: { message: 'User already verified' } };
    }

    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
    
    // Send Real Email
    await emailProvider.sendVerificationEmail(email, verificationCode);

    (user as any).verificationCode = verificationCode;
    users[userIndex] = user;
    Database.write('users', users);

    return { status: 200, body: { message: 'Verification code resent' } };
  },

  // POST /api/auth/forgot-password
  forgotPassword: async (data: any) => {
    const { email } = data;
    const users = Database.read<User[]>('users');
    const userIndex = users.findIndex(u => u.email.toLowerCase() === email.toLowerCase());

    // For security in a real app we might not want to reveal if user exists, 
    // but for this mock we will return 404 to be helpful.
    if (userIndex === -1) {
      return { status: 404, body: { message: 'No account found with this email' } }; 
    }

    const resetCode = Math.floor(100000 + Math.random() * 900000).toString();
    
    // Send Real Email
    await emailProvider.sendPasswordResetEmail(email, resetCode);

    const user = users[userIndex];
    (user as any).resetCode = resetCode;
    users[userIndex] = user;
    Database.write('users', users);

    return { status: 200, body: { message: 'Reset code sent' } };
  },

  // POST /api/auth/reset-password
  resetPassword: (data: any) => {
    const { email, code, newPassword } = data;
    const users = Database.read<User[]>('users');
    const userIndex = users.findIndex(u => u.email.toLowerCase() === email.toLowerCase());

    if (userIndex === -1) {
      return { status: 404, body: { message: 'User not found' } };
    }

    const user = users[userIndex];
    if ((user as any).resetCode !== code) {
      return { status: 400, body: { message: 'Invalid reset code' } };
    }

    // In this mock, we don't strictly validate/store the password since login accepts any,
    // but we simulate the update process.
    delete (user as any).resetCode;
    users[userIndex] = user;
    Database.write('users', users);

    return { status: 200, body: { message: 'Password updated successfully' } };
  },

  // PUT /api/users (Update Profile)
  updateProfile: (data: any) => {
    const users = Database.read<User[]>('users');
    const index = users.findIndex(u => u.id === data.id);
    if (index === -1) return { status: 404, body: { message: 'User not found' } };

    // Check email conflict
    const conflict = users.find(u => u.email.toLowerCase() === data.email.toLowerCase() && u.id !== data.id);
    if (conflict) return { status: 409, body: { message: 'Email already taken' } };

    const updatedUser = { ...users[index], ...data };
    users[index] = updatedUser;
    
    Database.write('users', users);
    
    return { status: 200, body: updatedUser };
  }
};
