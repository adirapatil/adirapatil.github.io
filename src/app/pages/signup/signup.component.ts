import { Component, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterLink],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  signupForm: FormGroup;
  showPassword = false;
  showConfirmPassword = false;
  formSubmitted = false;

  constructor(private authService: AuthService, private router: Router, private fb: FormBuilder) {
    console.log('SignupComponent initialized');

    this.signupForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      agreeToTerms: [false, Validators.requiredTrue]
    }, { validators: this.passwordsMatchValidator });

    effect(() => {
      if (this.formSubmitted) {
        console.log('Form submitted, validating...');
      }
    });
  }

  passwordsMatchValidator(form: FormGroup) {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordsMismatch: true };
  }

  onSubmit() {
    if (this.authService.isLoading()) return;

    this.formSubmitted = true;

    if (this.signupForm.invalid) {
      console.log('Validation failed');
      return;
    }

    const { firstName, lastName, email, password } = this.signupForm.value;

    this.authService.signup({
      firstName,
      lastName,
      email,
      password
    }).subscribe({
      next: (response) => {
        console.log('Signup successful:', response);
        this.authService.clearError();
        this.router.navigate(['/']).then(() => console.log('Signup successful:', response));
      },
      error: (error) => {
        console.error('Signup failed:', error);
      }
    });
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPasswordVisibility() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  isLoading() {
    return this.authService.isLoading();
  }

  error() {
    return this.authService.error();
  }

  clearError() {
    this.authService.clearError();
  }
}
