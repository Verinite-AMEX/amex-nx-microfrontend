import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShowcasePageComponent } from '../../showcase-page';
import { VariantSectionComponent } from '../../variant-section';
import { AmexLoginFormComponent } from '@vn-core-ui-components/ui';
import { AmexRegisterFormComponent } from '@vn-core-ui-components/ui';
import { AmexForgotUserIdFormComponent } from '@vn-core-ui-components/ui';
import { AmexForgotPasswordFormComponent } from '@vn-core-ui-components/ui';
import { AmexPasswordExpiryScreenComponent } from '@vn-core-ui-components/ui';
import { AmexChangePasswordFormComponent } from '@vn-core-ui-components/ui';

@Component({
  selector: 'app-amex-authentication-page',
  standalone: true,
  imports: [
    CommonModule, ShowcasePageComponent, VariantSectionComponent,
    AmexLoginFormComponent,
    AmexRegisterFormComponent,
    AmexForgotUserIdFormComponent,
    AmexForgotPasswordFormComponent,
    AmexPasswordExpiryScreenComponent,
    AmexChangePasswordFormComponent,
  ],
  template: `
    <app-showcase-page title="AMEX Authentication" subtitle="6 components — Hub Login, Register, Forgot User ID, Forgot Password, Password Expiry, Change Password">

      <app-variant-section title="1. LoginForm — Hub Login (ONLS style)">
        <amex-login-form portalTitle="" [showRegister]="true" errorMessage=""></amex-login-form>
      </app-variant-section>

      <app-variant-section title="1b. LoginForm — With Error State">
        <amex-login-form portalTitle="Online Merchant Services" [showRegister]="false" errorMessage="Invalid username or password. Please try again."></amex-login-form>
      </app-variant-section>

      <app-variant-section title="2. RegisterForm — New User Registration">
        <amex-register-form portalTitle="" errorMessage="" successMessage=""></amex-register-form>
      </app-variant-section>

      <app-variant-section title="3. ForgotUserIdForm — Recover User ID">
        <amex-forgot-user-id-form portalTitle="" errorMessage=""></amex-forgot-user-id-form>
      </app-variant-section>

      <app-variant-section title="4a. ForgotPasswordForm — ONLS Style">
        <amex-forgot-password-form portalStyle="onls" portalTitle="" errorMessage=""></amex-forgot-password-form>
      </app-variant-section>

      <app-variant-section title="4b. ForgotPasswordForm — OMS Style">
        <amex-forgot-password-form portalStyle="oms" portalTitle="Online Merchant Services" errorMessage=""></amex-forgot-password-form>
      </app-variant-section>

      <app-variant-section title="5. PasswordExpiryScreen — Force Reset at Login (BTA style)">
        <amex-password-expiry-screen portalTitle="Business Travel Accounts" errorMessage="" successMessage=""></amex-password-expiry-screen>
      </app-variant-section>

      <app-variant-section title="6a. ChangePasswordForm — ONLS Style">
        <amex-change-password-form portalStyle="onls" portalTitle="" errorMessage="" successMessage=""></amex-change-password-form>
      </app-variant-section>

      <app-variant-section title="6b. ChangePasswordForm — OMS Style">
        <amex-change-password-form portalStyle="oms" portalTitle="Online Merchant Services" errorMessage="" successMessage=""></amex-change-password-form>
      </app-variant-section>

    </app-showcase-page>
  `
})
export class AmexAuthenticationPageComponent {}
