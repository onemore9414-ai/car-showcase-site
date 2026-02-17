import { UserModel } from '../database/models';

export const usersController = {
  // GET /api/users
  getAll: async () => {
    try {
      // Exclude passwords from result
      const users = await UserModel.find().select('-password').lean();
      // Map _id to id for frontend compatibility
      const mappedUsers = users.map(u => ({ ...u, id: u._id.toString() }));
      return { status: 200, body: mappedUsers };
    } catch (error) {
      console.error('Database Error:', error);
      return { status: 500, body: { message: 'Internal Server Error' } };
    }
  },

  // Auth methods below are deprecated in favor of direct Supabase integration 
  // in services/authService.ts. Keeping endpoints for API compatibility 
  // if accessed directly, but removing mock logic.

  login: async (data: any) => {
    return { status: 410, body: { message: 'Endpoint deprecated. Use Supabase Auth.' } };
  },

  signup: async (data: any) => {
    return { status: 410, body: { message: 'Endpoint deprecated. Use Supabase Auth.' } };
  },

  verify: async (data: any) => {
    return { status: 410, body: { message: 'Endpoint deprecated. Use Supabase Auth.' } };
  },

  resendVerification: async (data: any) => {
    return { status: 410, body: { message: 'Endpoint deprecated. Use Supabase Auth.' } };
  },

  forgotPassword: async (data: any) => {
    return { status: 410, body: { message: 'Endpoint deprecated. Use Supabase Auth.' } };
  },

  resetPassword: async (data: any) => {
    return { status: 410, body: { message: 'Endpoint deprecated. Use Supabase Auth.' } };
  },

  // PUT /api/users (Update Profile) - Still useful for admin updates if needed
  updateProfile: async (data: any) => {
    try {
      const user = await UserModel.findByIdAndUpdate(
        data.id, 
        { 
          name: data.name,
          email: data.email,
          avatar: data.avatar 
        }, 
        { new: true }
      ).select('-password');

      if (!user) return { status: 404, body: { message: 'User not found' } };
      
      return { status: 200, body: { ...user.toObject(), id: user._id.toString() } };
    } catch (error) {
      return { status: 500, body: { message: 'Update failed' } };
    }
  }
};