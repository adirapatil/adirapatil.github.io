import { Component, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm: FormGroup;
  showPassword = false;
  formSubmitted = false;

  constructor(private authService: AuthService, private router: Router, private fb: FormBuilder) {
    console.log('LoginComponent initialized');

    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      rememberMe: [false]
    });

    // Set up effects for form validation
    effect(() => {
      if (this.formSubmitted) {
        console.log('Form submitted, validating...');
      }
    });
  }

  onSubmit() {
    if (this.authService.isLoading()) return;

    this.formSubmitted = true;

    if (this.loginForm.invalid) {
      console.log('Validation failed');
      return;
    }

    const { email, password } = this.loginForm.value;

    this.authService.login({
      email,
      password
    }).subscribe({
      next: (response) => {
        console.log('Login successful:', response);
        this.authService.clearError();
        // Redirect to dashboard or home page
        this.router.navigate(['/']).then(() => console.log('Login successful:', response));
      },
      error: (error) => {
        console.error('Login failed:', error);
      }
    });
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  onEmailInput(event: any) {
    console.log('Email input:', event.target.value);
  }

  onEmailFocus() {
    console.log('Email input focused');
  }

  // Loading state accessor
  isLoading() {
    return this.authService.isLoading();
  }

  // Error accessor
  error() {
    return this.authService.error();
  }

  // Clear error
  clearError() {
    this.authService.clearError();
  }
}
