import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AmexLoginFormComponent } from '@ui-components/ui';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [AmexLoginFormComponent],
  template: `
    <amex-login-form
      portalTitle="SOC & ROC Portal"
      [errorMessage]="errorMessage"
      [showRegister]="true"
      (loginSubmit)="onLogin($event)"
      (registerClick)="goToSignUp()">
    </amex-login-form>
  `
})
export class Login {
  errorMessage: string = '';

  constructor(private router: Router) {}

  onLogin(credentials: { username: string; password: string }): void {
    this.errorMessage = '';
    if (credentials.username === 'admin' && credentials.password === 'admin123') {
      localStorage.setItem('soc_roc_token', 'mock-auth-token');
      localStorage.setItem('soc_roc_user', credentials.username);
      this.router.navigateByUrl('/dashboard');
    } else {
      this.errorMessage = 'Invalid User ID or Password. Please try again.';
    }
  }

  goToSignUp(): void {
    this.router.navigateByUrl('/signup');
  }
}