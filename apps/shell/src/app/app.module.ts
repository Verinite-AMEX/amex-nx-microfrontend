import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AppRoutingModule }  from './app-routing.module';
import { AppComponent }      from './app.component';
import { LoginComponent }    from './pages/login/login.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';

import { AuthInterceptor }   from './core/interceptors/auth.interceptor';
import { ErrorInterceptor }  from './core/interceptors/error.interceptor';

import { AmexPageShellComponent }         from '@vn-core-ui-components/ui';
import { AmexTopNavBarComponent }         from '@vn-core-ui-components/ui';
import { AmexTabBarComponent }            from '@vn-core-ui-components/ui';
import { AmexLogoutConfirmationComponent } from '@vn-core-ui-components/ui';

import { AmexLoginFormComponent }          from '@vn-core-ui-components/ui';
import { AmexForgotPasswordFormComponent } from '@vn-core-ui-components/ui';
import { AmexRegisterFormComponent }       from '@vn-core-ui-components/ui';

import { CardComponent }      from '@vn-core-ui-components/ui';
import { FormFieldComponent } from '@vn-core-ui-components/ui';
import { ButtonComponent }    from '@vn-core-ui-components/ui';
import { AlertComponent }     from '@vn-core-ui-components/ui';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ForgotPasswordComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule,

    AmexPageShellComponent,
    AmexTopNavBarComponent,
    AmexTabBarComponent,
    AmexLogoutConfirmationComponent,

    AmexLoginFormComponent,
    AmexForgotPasswordFormComponent,
    AmexRegisterFormComponent,

    CardComponent,
    FormFieldComponent,
    ButtonComponent,
    AlertComponent,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor,  multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}