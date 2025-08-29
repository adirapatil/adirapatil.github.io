import { Component, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterLink],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss'
})
export class ForgotPasswordComponent {
  forgotForm: FormGroup;
  formSubmitted = false;
  emailSent = false;

  constructor(private authService: AuthService, private fb: FormBuilder) {
    console.log('ForgotPasswordComponent initialized');

    this.forgotForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });

    effect(() => {
      if (this.formSubmitted) {
        console.log('Form submitted, validating...');
      }
    });
  }

  onSubmit() {
    if (this.authService.isLoading()) return;

    this.formSubmitted = true;

    if (this.forgotForm.invalid) {
      console.log('Validation failed');
      return;
    }

    const { email } = this.forgotForm.value;

    this.authService.forgotPassword(email).subscribe({
      next: (response) => {
        console.log('Forgot password response:', response);
        this.emailSent = true;
      },
      error: (error) => {
        console.error('Forgot password failed:', error);
      }
    });
  }

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
