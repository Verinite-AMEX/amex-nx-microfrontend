import { Component ,ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AmexForgotPasswordFormComponent } from '@vn-core-ui-components/ui';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-forgot-password-page',
  standalone: true,
  imports: [AmexForgotPasswordFormComponent],
  template: `
    <amex-forgot-password-form
      portalTitle="Login Page"
      [errorMessage]="errorMessage"
      [success]="success"
      (submitIdentifier)="onSubmit($event)"
      (backToLogin)="goToLogin()">
    </amex-forgot-password-form>
  `,
})
export class ForgotPasswordPageComponent {
  errorMessage = '';
  success = false;
  private returnUrl = '';

  constructor(
    private auth: AuthService,
    private router: Router,
    private route: ActivatedRoute,
     private cdr: ChangeDetectorRef, 
  ) {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '';
  }

onSubmit(data: { userId: string; emailId: string }): void {
  this.errorMessage = '';
  this.success = false;

  this.auth.forgotPassword(data.userId, data.emailId).subscribe({
    next: () => {
      this.success = true;
    },
    error: (err) => {
      this.errorMessage = 'Invalid User ID or Email ID.';
       this.cdr.detectChanges();
    },
  });
}

  goToLogin(): void {
    this.router.navigate(['/login'], {
      queryParams: this.returnUrl ? { returnUrl: this.returnUrl } : {},
    });
  }
}