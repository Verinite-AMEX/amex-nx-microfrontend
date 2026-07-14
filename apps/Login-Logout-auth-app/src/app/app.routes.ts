import { Routes } from '@angular/router';
import { portalAuthGuard } from '@ui-components/ui';
import { LoginPageComponent } from './login-page.component';
import { HomePageComponent } from './home-page.component';
import { ForgotPasswordPageComponent } from './forgot-password-page.component';
export const routes: Routes = [
  { path: 'login', component: LoginPageComponent },
  { path: 'forgot-password', component: ForgotPasswordPageComponent },
  {
    path: 'home',
    component: HomePageComponent,
    canActivate: [portalAuthGuard],
  },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login' },
];
