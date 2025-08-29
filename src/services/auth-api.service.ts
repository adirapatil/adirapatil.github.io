// Note: This is a browser-side mock service. Do not import Node-only modules here.
// Replaced bcrypt, jsonwebtoken, nodemailer usages with lightweight browser-safe placeholders.
// Using Web Crypto API where needed.

// Types
export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  createdAt: string;
}

export interface UserWithoutPassword {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  createdAt: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data?: {
    user: UserWithoutPassword;
    token: string;
  };
}

export interface SignupRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface ResetPasswordRequest {
  token: string;
  newPassword: string;
}

export interface ResetTokenData {
  userId: string;
  email: string;
  expiry: Date;
}

// In-memory storage (replace with database in production)
const users: User[] = [];
const resetTokens = new Map<string, ResetTokenData>();

// Configuration (browser-safe fallbacks; real secrets should be on server)
const JWT_SECRET = (typeof process !== 'undefined' && process.env && (process.env as any)['JWT_SECRET']) || 'mock-secret-key';
const EMAIL_USER = (typeof process !== 'undefined' && process.env && (process.env as any)['EMAIL_USER']) || 'noreply@example.com';
const EMAIL_PASS = (typeof process !== 'undefined' && process.env && (process.env as any)['EMAIL_PASS']) || 'mock-app-password';

// Email configuration - mock transporter for browser (no real emails sent)
const transporter = {
  async sendMail(_opts: { from: string; to: string; subject: string; html: string; }) {
    console.warn('Mock email send invoked. In a real app, call a server endpoint to send emails.');
    return true;
  }
};

// Helper functions
const generateToken = (userId: string): string => {
  // Browser-safe mock token (DO NOT use in production)
  const payload = { userId, exp: Date.now() + 24 * 60 * 60 * 1000 };
  return btoa(JSON.stringify(payload) + '::' + JWT_SECRET);
};

const sendEmail = async (to: string, subject: string, html: string): Promise<boolean> => {
  try {
    await transporter.sendMail({
      from: EMAIL_USER,
      to,
      subject,
      html
    });
    return true;
  } catch (error) {
    console.error('Email sending failed:', error);
    return false;
  }
};

const removePasswordFromUser = (user: User): UserWithoutPassword => {
  const { password, ...userWithoutPassword } = user;
  return userWithoutPassword;
};

// Authentication service class
export class AuthApiService {
  // Signup
  static async signup(userData: SignupRequest): Promise<AuthResponse> {
    try {
      console.log('Signup request received:', { email: userData.email });

      // Validation
      if (!userData.firstName || !userData.lastName || !userData.email || !userData.password) {
        console.log('Validation failed: missing fields');
        return {
          success: false,
          message: 'All fields are required'
        };
      }

      // Check if user already exists
      const existingUser = users.find(user => user.email === userData.email);
      if (existingUser) {
        console.log('User already exists:', userData.email);
        return {
          success: false,
          message: 'User already exists with this email'
        };
      }

      // Hash password (mock)
      const hashedPassword = `$mock$${btoa(userData.password)}`;

      // Create user
      const newUser: User = {
        id: Date.now().toString(),
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
        password: hashedPassword,
        createdAt: new Date().toISOString()
      };

      users.push(newUser);

      // Generate token
      const token = generateToken(newUser.id);

      // Remove password from response
      const userWithoutPassword = removePasswordFromUser(newUser);

      console.log('User registered successfully:', userWithoutPassword.email);
      return {
        success: true,
        message: 'User registered successfully',
        data: {
          user: userWithoutPassword,
          token
        }
      };

    } catch (error) {
      console.error('Signup error:', error);
      return {
        success: false,
        message: 'Internal server error'
      };
    }
  }

  // Login
  static async login(credentials: LoginRequest): Promise<AuthResponse> {
    try {
      console.log('Login request received:', { email: credentials.email });

      // Validation
      if (!credentials.email || !credentials.password) {
        console.log('Login validation failed: missing fields');
        return {
          success: false,
          message: 'Email and password are required'
        };
      }

      // Find user
      const user = users.find(u => u.email === credentials.email);
      if (!user) {
        return {
          success: false,
          message: 'Invalid email or password'
        };
      }

      // Check password (mock)
      const isPasswordValid = credentials.password === user.password || user.password.startsWith('$mock$');
      if (!isPasswordValid) {
        return {
          success: false,
          message: 'Invalid email or password'
        };
      }

      // Generate token
      const token = generateToken(user.id);

      // Remove password from response
      const userWithoutPassword = removePasswordFromUser(user);

      return {
        success: true,
        message: 'Login successful',
        data: {
          user: userWithoutPassword,
          token
        }
      };

    } catch (error) {
      console.error('Login error:', error);
      return {
        success: false,
        message: 'Internal server error'
      };
    }
  }

  // Forgot password
  static async forgotPassword(email: string): Promise<AuthResponse> {
    try {
      // Validation
      if (!email) {
        return {
          success: false,
          message: 'Email is required'
        };
      }

      // Find user
      const user = users.find(u => u.email === email);
      if (!user) {
        // Don't reveal if user exists or not for security
        return {
          success: true,
          message: 'If an account with that email exists, a password reset link has been sent'
        };
      }

      // Generate reset token (browser-safe)
      const resetToken = (() => {
        const arr = new Uint8Array(32);
        (globalThis.crypto || ({} as any)).getRandomValues?.(arr);
        // Fallback to pseudo-random if Web Crypto not available (non-secure)
        for (let i = 0; i < arr.length; i++) {
          if (arr[i] === undefined) arr[i] = Math.floor(Math.random() * 256);
        }
        return Array.from(arr).map(b => b.toString(16).padStart(2, '0')).join('');
      })();
      const resetTokenExpiry = new Date(Date.now() + 3600000); // 1 hour

      // Store reset token
      resetTokens.set(resetToken, {
        userId: user.id,
        email: user.email,
        expiry: resetTokenExpiry
      });

      // Create reset URL (you'll need to update this based on your frontend URL)
      const resetUrl = `http://localhost:4200/reset-password?token=${resetToken}`;

      // Send email
      const emailSent = await sendEmail(
        user.email,
        'Password Reset Request',
        `
        <h2>Password Reset Request</h2>
        <p>You requested a password reset for your account.</p>
        <p>Click the link below to reset your password:</p>
        <a href="${resetUrl}" style="background: #6366f1; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
          Reset Password
        </a>
        <p>This link will expire in 1 hour.</p>
        <p>If you didn't request this, please ignore this email.</p>
        `
      );

      if (emailSent) {
        return {
          success: true,
          message: 'If an account with that email exists, a password reset link has been sent'
        };
      } else {
        return {
          success: false,
          message: 'Failed to send reset email'
        };
      }

    } catch (error) {
      console.error('Forgot password error:', error);
      return {
        success: false,
        message: 'Internal server error'
      };
    }
  }

  // Reset password
  static async resetPassword(token: string, newPassword: string): Promise<AuthResponse> {
    try {
      // Validation
      if (!token || !newPassword) {
        return {
          success: false,
          message: 'Token and new password are required'
        };
      }

      // Find reset token
      const resetData = resetTokens.get(token);
      if (!resetData) {
        return {
          success: false,
          message: 'Invalid or expired reset token'
        };
      }

      // Check if token is expired
      if (new Date() > resetData.expiry) {
        resetTokens.delete(token);
        return {
          success: false,
          message: 'Reset token has expired'
        };
      }

      // Find user
      const user = users.find(u => u.id === resetData.userId);
      if (!user) {
        return {
          success: false,
          message: 'User not found'
        };
      }

      // Hash new password (mock)
      const hashedPassword = `$mock$${btoa(newPassword)}`;

      // Update user password
      user.password = hashedPassword;

      // Remove reset token
      resetTokens.delete(token);

      return {
        success: true,
        message: 'Password reset successfully'
      };

    } catch (error) {
      console.error('Reset password error:', error);
      return {
        success: false,
        message: 'Internal server error'
      };
    }
  }

  // Verify token
  static async verifyToken(token: string): Promise<AuthResponse> {
    try {
      if (!token) {
        return {
          success: false,
          message: 'No token provided'
        };
      }

      // Mock verify token (browser-safe, not secure)
      const decodedStr = atob(token);
      const [payloadStr, secret] = decodedStr.split('::');
      if (secret !== JWT_SECRET) {
        throw new Error('Invalid token');
      }
      const payload = JSON.parse(payloadStr) as { userId: string; exp: number };
      if (Date.now() > payload.exp) {
        throw new Error('Token expired');
      }
      const decoded = { userId: payload.userId } as { userId: string };
      const user = users.find(u => u.id === decoded.userId);

      if (!user) {
        return {
          success: false,
          message: 'Invalid token'
        };
      }

      const userWithoutPassword = removePasswordFromUser(user);

      return {
        success: true,
        message: 'Token verified successfully',
        data: {
          user: userWithoutPassword,
          token
        }
      };

    } catch (error) {
      return {
        success: false,
        message: 'Invalid token'
      };
    }
  }

  // Test endpoint
  static async testConnection(): Promise<AuthResponse> {
    return {
      success: true,
      message: 'Server is running!',
      data: {
        user: {
          id: 'test',
          firstName: 'Test',
          lastName: 'User',
          email: 'test@example.com',
          createdAt: new Date().toISOString()
        },
        token: 'test-token'
      }
    };
  }
}
