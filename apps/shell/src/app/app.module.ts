import { NgModule, CUSTOM_ELEMENTS_SCHEMA, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { firstValueFrom } from 'rxjs';

import { AppRoutingModule }  from './app-routing.module';
import { AppComponent }      from './app.component';
import { LoginComponent }    from './pages/login/login.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';

import { errorInterceptor }  from './core/interceptors/error.interceptor';

import { AmexPortalAuthUtil } from '@ui-components/ui';
import {
  authTokenInterceptor,
  loadingInterceptor,
  retryInterceptor,
  API_BASE_URL,
  LOGIN_APP_URL,
  AuthApiService,
} from '@amex/shared-services';

import { environment } from '../environments/environment';

// ── Amex Shell Components ──────────────────────────────────────────────
import { AmexPageShellComponent }         from '@ui-components/ui';
import { AmexTopNavBarComponent }         from '@ui-components/ui';
import { AmexTabBarComponent }            from '@ui-components/ui';
import { AmexLogoutConfirmationComponent } from '@ui-components/ui';

// ── Amex Auth Components ───────────────────────────────────────────────
import { AmexLoginFormComponent }          from '@ui-components/ui';
import { AmexForgotPasswordFormComponent } from '@ui-components/ui';
import { AmexRegisterFormComponent }       from '@ui-components/ui';

// ── VN-Core UI Components ──────────────────────────────────────────────
import { CardComponent }      from '@ui-components/ui';
import { FormFieldComponent } from '@ui-components/ui';
import { ButtonComponent }    from '@ui-components/ui';
import { AlertComponent }     from '@ui-components/ui';

/**
 * Runs once, before the router does its first navigation.
 * Hydrates SessionService / AmexPortalAuthUtil from the HTTP-only
 * cookie (via /api/auth/session) so guards see the correct
 * logged-in state on refresh.
 */
function initializeAuth(authApi: AuthApiService) {
  return () => firstValueFrom(authApi.validateSession());
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ForgotPasswordComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule,

    // ── Shell Chrome ──────────────────────────────────────────────
    AmexPageShellComponent,
    AmexTopNavBarComponent,
    AmexTabBarComponent,
    AmexLogoutConfirmationComponent,

    // ── Auth Forms (vn-core standalone components) ─────────────────
    AmexLoginFormComponent,
    AmexForgotPasswordFormComponent,
    AmexRegisterFormComponent,

    // ── VN-Core UI Components ──────────────────────────────────────
    CardComponent,
    FormFieldComponent,
    ButtonComponent,
    AlertComponent,
  ],
  providers: [
    { provide: API_BASE_URL, useValue: environment.apiBaseUrl },

    // Shell hosts the single login page for the whole portal suite —
    // every shared authGuard/roleGuard redirect (shell's own routes
    // AND any of the 12 sub-portals hit standalone on their own port)
    // lands here. Standalone-only apps (bta-portal, oms, soc-roc)
    // don't override this, so they keep going to the default
    // Login-Logout-auth-app (localhost:4216) untouched.
    { provide: LOGIN_APP_URL, useValue: 'http://localhost:4200/login' },

    provideHttpClient(
      withInterceptors([authTokenInterceptor, errorInterceptor, loadingInterceptor, retryInterceptor])
    ),

    {
      provide: APP_INITIALIZER,
      useFactory: initializeAuth,
      deps: [AuthApiService],
      multi: true,
    },

    // Workaround: AmexPortalAuthUtil (in @ui-components/ui) lacks its own
    // @Injectable decorator in the published package. authGuard/roleGuard
    // (and AuthApiService, which extends it) inject it directly, so provide
    // it explicitly here until the ui-components package is rebuilt/
    // republished with the decorator added.
    { provide: AmexPortalAuthUtil, useClass: AmexPortalAuthUtil },
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}