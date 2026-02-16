
import { UserModel } from '../database/models';
import { emailProvider } from './emailProvider';

// Browser-compatible mock for password hashing
// In a real app, use the Web Crypto API or a proper library. 
// For this mock backend, we'll use a simple prefix to simulate hashing.
const mockHash = {
  hash: async (password: string) => `hashed_${password}`,
  compare: async (password: string, hash: string) => hash === `hashed_${password}`
};

// Browser-compatible mock for JWT
const mockJwt = {
  sign: (payload: any) => {
    // Create a fake token string
    const header = btoa(JSON.stringify({ alg: "HS256", typ: "JWT" }));
    const body = btoa(JSON.stringify(payload));
    const signature = "mock_signature_" + Date.now();
    return `${header}.${body}.${signature}`;
  }
};

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

  // POST /api/auth/login
  login: async (data: any) => {
    const { email, password } = data;
    
    try {
      const user = await UserModel.findOne({ email: email.toLowerCase() });
      
      if (!user) {
        return { status: 401, body: { message: 'Invalid credentials' } };
      }

      const isMatch = await mockHash.compare(password, user.password || '');
      
      if (!isMatch) {
        return { status: 401, body: { message: 'Invalid credentials' } };
      }

      if (user.isVerified === false) {
        return { status: 403, body: { message: 'Email not verified. Please verify your account.' } };
      }

      // Generate mock JWT
      const token = mockJwt.sign({ id: user._id, email: user.email, role: user.role });

      const userObj = user.toObject();
      delete userObj.password;
      delete userObj.verificationCode;
      
      return { 
        status: 200, 
        body: { 
          user: { ...userObj, id: user._id.toString() }, 
          token 
        } 
      };
    } catch (error) {
      console.error('Login Error:', error);
      return { status: 500, body: { message: 'Login failed' } };
    }
  },

  // POST /api/auth/signup
  signup: async (data: any) => {
    const { name, email, password } = data;
    
    try {
      const existingUser = await UserModel.findOne({ email: email.toLowerCase() });
      if (existingUser) {
        return { status: 409, body: { message: 'Email already exists' } };
      }

      const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
      const hashedPassword = await mockHash.hash(password);

      // Send Real Email
      await emailProvider.sendVerificationEmail(email, verificationCode);

      const newUser = await UserModel.create({
        name,
        email: email.toLowerCase(),
        password: hashedPassword,
        role: email.includes('admin') ? 'admin' : 'user',
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=0D8ABC&color=fff`,
        isVerified: false,
        verificationCode
      });

      return { status: 200, body: { requiresVerification: true, email } };
    } catch (error) {
      console.error('Signup Error:', error);
      return { status: 500, body: { message: 'Signup failed' } };
    }
  },

  // POST /api/auth/verify
  verify: async (data: any) => {
    const { email, code } = data;
    
    try {
      const user = await UserModel.findOne({ email: email.toLowerCase() });
      
      if (!user) {
        return { status: 404, body: { message: 'User not found' } };
      }
      
      if (user.verificationCode !== code) {
        return { status: 400, body: { message: 'Invalid verification code' } };
      }
      
      user.isVerified = true;
      user.verificationCode = undefined;
      await user.save();
      
      const token = mockJwt.sign({ id: user._id, email: user.email, role: user.role });

      const userObj = user.toObject();
      delete userObj.password;

      return { 
        status: 200, 
        body: { 
          user: { ...userObj, id: user._id.toString() }, 
          token 
        } 
      };
    } catch (error) {
      return { status: 500, body: { message: 'Verification failed' } };
    }
  },

  // POST /api/auth/resend-verification
  resendVerification: async (data: any) => {
    const { email } = data;
    
    try {
      const user = await UserModel.findOne({ email: email.toLowerCase() });

      if (!user) {
        return { status: 404, body: { message: 'User not found' } };
      }

      if (user.isVerified) {
          return { status: 400, body: { message: 'User already verified' } };
      }

      const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
      
      await emailProvider.sendVerificationEmail(email, verificationCode);

      user.verificationCode = verificationCode;
      await user.save();

      return { status: 200, body: { message: 'Verification code resent' } };
    } catch (error) {
      return { status: 500, body: { message: 'Failed to resend code' } };
    }
  },

  // POST /api/auth/forgot-password
  forgotPassword: async (data: any) => {
    const { email } = data;
    
    try {
      const user = await UserModel.findOne({ email: email.toLowerCase() });

      if (!user) {
        // Return 404 for UX in this context, or 200 for security to prevent enumeration
        return { status: 404, body: { message: 'No account found with this email' } }; 
      }

      const resetCode = Math.floor(100000 + Math.random() * 900000).toString();
      
      await emailProvider.sendPasswordResetEmail(email, resetCode);

      user.resetCode = resetCode;
      await user.save();

      return { status: 200, body: { message: 'Reset code sent' } };
    } catch (error) {
      return { status: 500, body: { message: 'Failed to process request' } };
    }
  },

  // POST /api/auth/reset-password
  resetPassword: async (data: any) => {
    const { email, code, newPassword } = data;
    
    try {
      const user = await UserModel.findOne({ email: email.toLowerCase() });

      if (!user) {
        return { status: 404, body: { message: 'User not found' } };
      }

      if (user.resetCode !== code) {
        return { status: 400, body: { message: 'Invalid reset code' } };
      }

      const hashedPassword = await mockHash.hash(newPassword);

      user.password = hashedPassword;
      user.resetCode = undefined;
      await user.save();

      return { status: 200, body: { message: 'Password updated successfully' } };
    } catch (error) {
      return { status: 500, body: { message: 'Failed to reset password' } };
    }
  },

  // PUT /api/users (Update Profile)
  updateProfile: async (data: any) => {
    try {
      // Find user by ID
      if (data.email) {
        const conflict = await UserModel.findOne({ 
          email: data.email.toLowerCase(), 
          _id: { $ne: data.id } // Not equal to current user ID
        });
        if (conflict) return { status: 409, body: { message: 'Email already taken' } };
      }

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
      console.error('Update Profile Error:', error);
      return { status: 500, body: { message: 'Update failed' } };
    }
  }
};
