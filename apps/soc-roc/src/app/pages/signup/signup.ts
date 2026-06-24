import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AmexRegisterFormComponent } from '@vn-core-ui-components/ui';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [AmexRegisterFormComponent],
  template: `
    <amex-register-form
      portalTitle="SOC & ROC Portal"
      [errorMessage]="errorMessage"
      [successMessage]="successMessage"
      (registerSubmit)="onRegister($event)"
      (cancel)="onCancel()">
    </amex-register-form>
  `
})
export class Signup {
  errorMessage: string = '';
  successMessage: string = '';

  constructor(private router: Router) {}

  onRegister(data: { password: string; confirmPassword: string; lastName: string }): void {
    this.errorMessage = '';
    // TODO: Replace with actual signup API call
    this.successMessage = 'Registration successful!';
    setTimeout(() => this.router.navigateByUrl('/login'), 1000);
  }

  onCancel(): void {
    this.router.navigateByUrl('/login');
  }
}