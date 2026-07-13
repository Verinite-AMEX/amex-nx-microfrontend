import { Component,ChangeDetectorRef  } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AmexLoginFormComponent, LoginCredentials } from '@ui-components/ui';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [AmexLoginFormComponent],
  template: `
    <amex-login-form
      portalTitle="Login Page"
      [errorMessage]="errorMessage"
      (loginSubmit)="onLoginSubmit($event)"
      (forgotPassword)="onForgotPassword()">
    </amex-login-form>
  `,
})
export class LoginPageComponent {
  errorMessage = '';
  private returnUrl = '';

  constructor(
    private auth: AuthService,
    private router: Router,
    private route: ActivatedRoute,
     private cdr: ChangeDetectorRef, 
  ) {
    // reads ?returnUrl=http://localhost:4201 sent by OMS/soc-roc/bta etc.
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '';
  }

  onLoginSubmit(creds: LoginCredentials): void {
    this.auth.login(creds.username, creds.password).subscribe({
      next: (result) => {
        this.auth.onLoginSuccess(result); // ADD THIS — saves token to localStorage

        if (this.returnUrl) {
          const redirectUrl =
            decodeURIComponent(this.returnUrl) +
            '?token=' +
            encodeURIComponent(result.accessToken);

          window.location.href = redirectUrl;
        } else {
          this.router.navigate(['/home']);
        }
      },
      error: (err) => {
        this.errorMessage = err.error?.message ?? 'Invalid User ID or Password.';
         this.cdr.detectChanges();
      },
    });
  }

  onForgotPassword(): void {
    this.router.navigate(['/forgot-password'], {
      queryParams: this.returnUrl ? { returnUrl: this.returnUrl } : {},
    });
  }
}