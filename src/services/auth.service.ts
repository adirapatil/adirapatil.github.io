import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

export interface User {
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
    user: User;
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

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly API_URL = 'http://localhost:4000/api/auth';

  // Signals for reactive state management
  public currentUser = signal<User | null>(null);
  public isAuthenticated = signal(false);
  public isLoading = signal(false);
  public error = signal<string | null>(null);

  constructor(private http: HttpClient) {
    this.checkAuthStatus();
  }

  // Check if user is already authenticated
  private checkAuthStatus(): void {
    const token = this.getToken();
    if (token) {
      this.verifyToken().subscribe({
        next: (response) => {
          if (response.success && response.data) {
            this.currentUser.set(response.data.user);
            this.isAuthenticated.set(true);
          } else {
            this.logout();
          }
        },
        error: () => {
          this.logout();
        }
      });
    }
  }

  // Signup
  signup(userData: SignupRequest): Observable<AuthResponse> {
    this.isLoading.set(true);
    this.error.set(null);

    return this.http.post<AuthResponse>(`${this.API_URL}/signup`, userData, {
      headers: { 'Content-Type': 'application/json' }
    }).pipe(
      tap(response => {
        if (response.success && response.data) {
          this.setToken(response.data.token);
          this.currentUser.set(response.data.user);
          this.isAuthenticated.set(true);
        }
        this.isLoading.set(false);
      }),
      catchError(error => {
        this.isLoading.set(false);
        this.error.set(error.error?.message || 'Signup failed');
        throw error;
      })
    );
  }

  // Login
  login(credentials: LoginRequest): Observable<AuthResponse> {
    this.isLoading.set(true);
    this.error.set(null);

    return this.http.post<AuthResponse>(`${this.API_URL}/login`, credentials, {
      headers: { 'Content-Type': 'application/json' }
    }).pipe(
      tap(response => {
        if (response.success && response.data) {
          this.setToken(response.data.token);
          this.currentUser.set(response.data.user);
          this.isAuthenticated.set(true);
        }
        this.isLoading.set(false);
      }),
      catchError(error => {
        this.isLoading.set(false);
        this.error.set(error.error?.message || 'Login failed');
        throw error;
      })
    );
  }

  // Forgot password
  forgotPassword(email: string): Observable<AuthResponse> {
    this.isLoading.set(true);
    this.error.set(null);

    return this.http.post<AuthResponse>(`${this.API_URL}/forgot-password`, { email }, {
      headers: { 'Content-Type': 'application/json' }
    }).pipe(
      tap(() => {
        this.isLoading.set(false);
      }),
      catchError(error => {
        this.isLoading.set(false);
        this.error.set(error.error?.message || 'Failed to send reset email');
        throw error;
      })
    );
  }

  // Reset password
  resetPassword(token: string, newPassword: string): Observable<AuthResponse> {
    this.isLoading.set(true);
    this.error.set(null);

    return this.http.post<AuthResponse>(`${this.API_URL}/reset-password`, {
      token,
      newPassword
    }, {
      headers: { 'Content-Type': 'application/json' }
    }).pipe(
      tap(() => {
        this.isLoading.set(false);
      }),
      catchError(error => {
        this.isLoading.set(false);
        this.error.set(error.error?.message || 'Failed to reset password');
        throw error;
      })
    );
  }

  // Verify token
  verifyToken(): Observable<AuthResponse> {
    const token = this.getToken();
    const headers: { [key: string]: string } = { 'Content-Type': 'application/json' };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    return this.http.get<AuthResponse>(`${this.API_URL}/verify-token`, { headers });
  }

  // Logout
  logout(): void {
    this.removeToken();
    this.currentUser.set(null);
    this.isAuthenticated.set(false);
    this.error.set(null);
  }

  // Token management
  private setToken(token: string): void {
    if (typeof window === 'undefined' || typeof localStorage === 'undefined') return;
    try {
      localStorage.setItem('auth_token', token);
    } catch (_) {
      // Ignore storage errors in non-browser/SSR
    }
  }

  private getToken(): string | null {
    if (typeof window === 'undefined' || typeof localStorage === 'undefined') return null;
    try {
      return localStorage.getItem('auth_token');
    } catch (_) {
      return null;
    }
  }

  private removeToken(): void {
    if (typeof window === 'undefined' || typeof localStorage === 'undefined') return;
    try {
      localStorage.removeItem('auth_token');
    } catch (_) {
      // Ignore
    }
  }

  // Get auth headers for API calls
  getAuthHeaders(): { [key: string]: string } {
    const token = this.getToken();
    const headers: { [key: string]: string } = { 'Content-Type': 'application/json' };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    return headers;
  }

  // Clear error
  clearError(): void {
    this.error.set(null);
  }

  // Test server connectivity
  testConnection(): Observable<any> {
    return this.http.get('http://localhost:4000/api/test', {
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
