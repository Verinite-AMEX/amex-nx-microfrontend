import { Routes } from '@angular/router';
import { portalAuthGuard } from '@vn-core-ui-components/ui';
import { LoginPageComponent } from './login-page.component';
import { HomePageComponent } from './home-page.component';

export const routes: Routes = [
  { path: 'login', component: LoginPageComponent },
  {
    path: 'home',
    component: HomePageComponent,
    canActivate: [portalAuthGuard], // redirects to /login if no valid token
  },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login' },
];
