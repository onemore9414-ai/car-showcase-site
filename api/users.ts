
import { Database } from '../database/storage';
import { User } from '../types';

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
      const token = `mock-jwt-${Date.now()}-${user.id}`;
      return { status: 200, body: { user, token } };
    }
    return { status: 401, body: { message: 'Invalid credentials' } };
  },

  // POST /api/auth/signup
  signup: (data: any) => {
    const { name, email, password } = data;
    const users = Database.read<User[]>('users');
    
    if (users.find(u => u.email.toLowerCase() === email.toLowerCase())) {
      return { status: 409, body: { message: 'Email already exists' } };
    }

    const newUser: User = {
      id: `user-${Date.now()}`,
      name,
      email,
      role: email.includes('admin') ? 'admin' : 'user',
      joinedDate: new Date().toISOString(),
      avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=0D8ABC&color=fff`
    };

    users.push(newUser);
    Database.write('users', users);
    
    const token = `mock-jwt-${Date.now()}-${newUser.id}`;
    return { status: 201, body: { user: newUser, token } };
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
