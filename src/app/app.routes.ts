import { Routes } from '@angular/router';
import { LandingComponent } from './pages/landing/landing.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';

export const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'pricing', component: LandingComponent }, // Placeholder - redirects to home
  { path: 'docs', component: LandingComponent }, // Placeholder - redirects to home
  { path: 'about', component: LandingComponent }, // Placeholder - redirects to home
  { path: 'blog', component: LandingComponent }, // Placeholder - redirects to home
  { path: 'careers', component: LandingComponent }, // Placeholder - redirects to home
  { path: 'help', component: LandingComponent }, // Placeholder - redirects to home
  { path: 'contact', component: LandingComponent }, // Placeholder - redirects to home
  { path: 'status', component: LandingComponent }, // Placeholder - redirects to home
  { path: 'terms', component: LandingComponent }, // Placeholder - redirects to home
  { path: 'privacy', component: LandingComponent }, // Placeholder - redirects to home
  { path: '**', redirectTo: '' }
];
