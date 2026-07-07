import { Routes } from '@angular/router';
import { portalAuthGuard } from '@vn-core-ui-components/ui';
import { LoginPageComponent } from './login-page.component';
import { HomePageComponent } from './home-page.component';
import { ForgotPasswordPageComponent } from './forgot-password-page.component'; // NEW
export const routes: Routes = [
  { path: 'login', component: LoginPageComponent },
  { path: 'forgot-password', component: ForgotPasswordPageComponent }, // NEW
  {
    path: 'home',
    component: HomePageComponent,
    canActivate: [portalAuthGuard], // redirects to /login if no valid token
  },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login' },
];
