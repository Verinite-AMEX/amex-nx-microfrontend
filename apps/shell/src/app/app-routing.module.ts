import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { loadRemoteModule } from '@angular-architects/module-federation';

import { LoginComponent } from './pages/login/login.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { AuthGuard } from './core/guards/auth.guard';

const portalFallback = () =>
  import('./pages/portal-error/portal-error.module').then(m => m.PortalErrorModule);

const routes: Routes = [

  { path: 'login', component: LoginComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: '', redirectTo: 'misc/priority-pass', pathMatch: 'full' },

  // ── Online Account Services (port 4202) ──────────────────────────
  {
    path: 'account',
    canActivate: [AuthGuard],
    loadChildren: () =>
      loadRemoteModule({ type: 'module', remoteEntry: 'http://localhost:4202/remoteEntry.js', exposedModule: './Routes' })
        .then(m => m.remoteRoutes).catch(portalFallback),
  },

  // ── BCRB Report Portal (port 4208) ───────────────────────────────
  {
    path: 'bcrb',
    canActivate: [AuthGuard],
    loadChildren: () =>
      loadRemoteModule({ type: 'module', remoteEntry: 'http://localhost:4208/remoteEntry.js', exposedModule: './Routes' })
        .then(m => m.remoteRoutes).catch(portalFallback),
  },

  // ── BTA Portal (port 4203) ────────────────────────────────────────
  {
    path: 'bta',
    canActivate: [AuthGuard],
    loadChildren: () =>
      loadRemoteModule({ type: 'module', remoteEntry: 'http://localhost:4203/remoteEntry.js', exposedModule: './Module' })
        .then(m => m.BtaRemoteEntryModule).catch(portalFallback),
  },

  // ── AEME Offers & Benefits (port 4204) ───────────────────────────
  {
    path: 'offers',
    canActivate: [AuthGuard],
    loadChildren: () =>
      loadRemoteModule({ type: 'module', remoteEntry: 'http://localhost:4204/remoteEntry.js', exposedModule: './Module' })
        .then(m => m.OffersRemoteEntryModule).catch(portalFallback),
  },

  // ── Supplementary Access helper Portal (port 4205) ───────────────
  {
    path: 'supp',
    canActivate: [AuthGuard],
    loadChildren: () =>
      loadRemoteModule({
        type:          'module',
        remoteEntry:   'http://localhost:4205/remoteEntry.js',
        exposedModule: './Module',
      })
        .then(m => m.SuppRemoteEntryModule)
        .catch(portalFallback),
  },

  // ── Pay With Points (port 4207) ───────────────────────────────────
  {
    path: 'pay-with-points',
    canActivate: [AuthGuard],
    loadChildren: () =>
      loadRemoteModule({
        type: 'module',
        remoteEntry: 'http://localhost:4207/remoteEntry.js',
        exposedModule: './Module',
      })
        .then(m => m.PayWithPointsRemoteEntryModule)
        .catch(portalFallback),
  },

  // ── Misc sub-pages ────────────────────────────────────────────────
  {
    path: 'misc/digital-wallet',
    canActivate: [AuthGuard],
    loadChildren: () =>
      loadRemoteModule({ type: 'module', remoteEntry: 'http://localhost:4207/remoteEntry.js', exposedModule: './Module' })
        .then(m => m.PayWithPointsRemoteEntryModule).catch(portalFallback),
  },
  {
    path: 'misc/wearables',
    canActivate: [AuthGuard],
    loadChildren: () =>
      loadRemoteModule({ type: 'module', remoteEntry: 'http://localhost:4206/remoteEntry.js', exposedModule: './Module' })
        .then(m => m.WearablesRemoteEntryModule).catch(portalFallback),
  },

  // ── AMEX Wearables (port 4206) ───────────────────────────────────
  {
    path: 'wearables',
    canActivate: [AuthGuard],
    loadChildren: () =>
      loadRemoteModule({
        type: 'module',
        remoteEntry: 'http://localhost:4206/remoteEntry.js',
        exposedModule: './Module',
      })
        .then(m => m.WearablesRemoteEntryModule)
        .catch(portalFallback),
  },

  // ── Lounge / Priority Pass (port 4209) ───────────────────────────
  {
    path: 'misc/priority-pass',
    canActivate: [AuthGuard],
    loadChildren: () =>
      loadRemoteModule({
        type: 'module',
        remoteEntry: 'http://localhost:4209/remoteEntry.js',
        exposedModule: './Module',
      })
        .then(m => m.LoungeRemoteEntryModule)
        .catch(portalFallback),
  },

  // ── Centurion 2.0 (port 4211) ────────────────────────────────────
  {
    path: 'centurion/centurion-2.0',
    canActivate: [AuthGuard],
    loadChildren: () =>
      loadRemoteModule({
        type: 'module',
        remoteEntry: 'http://localhost:4211/remoteEntry.js',
        exposedModule: './Module',
      })
        .then(m => m.CenturionRemoteEntryModule)  // ← FIX: Added module extraction
        .catch(portalFallback),
  },

  // ── Centurion LCY EXC (port 4210) ────────────────────────────────
  {
    path: 'centurion/cen-lcy-exc',
    canActivate: [AuthGuard],
    loadChildren: () =>
      loadRemoteModule({
        type: 'module',
        remoteEntry: 'http://localhost:4210/remoteEntry.js',
        exposedModule: './Module',
      })
        .then(m => m.CenLcyExcRemoteEntryModule)
        .catch(portalFallback),
  },

  // { path: '**', redirectTo: 'bta' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule],
})
export class AppRoutingModule { }