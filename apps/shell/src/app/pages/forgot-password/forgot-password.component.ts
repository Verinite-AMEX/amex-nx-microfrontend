import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthApiService } from '@amex/shared-services';

@Component({
    selector: 'app-forgot-password',
    template: `
    <amex-forgot-password-form
      portalStyle="onls"
      portalTitle="ONLS Helper Tool"
      [errorMessage]="error"
      (submitIdentifier)="onSubmit($event)"
      (backToLogin)="goToLogin()">
    </amex-forgot-password-form>
  `,
    standalone: false
})

export class ForgotPasswordComponent implements OnInit {

  error = '';

  constructor(
    private authApi: AuthApiService,
    private router: Router,
  ) {}

  ngOnInit(): void {}

  onSubmit(data: { userId: string; emailId: string }): void {

    this.error = '';

    this.authApi
      .forgotPassword(data.userId, data.emailId)
      .subscribe({

        next: () => {
          // success handled inside component
        },

        error: (err) => {

          this.error =
            err.error?.message ??
            'No account found for that User ID and Email ID.';
        },
      });
  }

  goToLogin(): void {
    this.router.navigate(['/login']);
  }
}