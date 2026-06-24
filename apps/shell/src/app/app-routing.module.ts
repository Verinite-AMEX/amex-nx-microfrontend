import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Legacy remotes  → @angular-architects/module-federation
import { loadRemoteModule as loadLegacyRemote } from '@angular-architects/module-federation';
// NX-native remotes → @nx/module-federation/angular
import { loadRemoteModule as loadNxRemote } from '@nx/module-federation/angular';

import { LoginComponent }          from './pages/login/login.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { AuthGuard }               from './core/guards/auth.guard';

const portalFallback = () =>
  import('./pages/portal-error/portal-error.module').then(m => m.PortalErrorModule);

const routes: Routes = [

  { path: 'login',           component: LoginComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: '',                redirectTo: 'misc/priority-pass', pathMatch: 'full' },

  // ── NX-native remotes (expose ./Routes → remoteRoutes) ───────────
  // Loaded via @nx/module-federation/angular loadRemoteModule
  // Remote definitions are registered in main.ts via setRemoteDefinitions

  {
    path: 'account',
    canActivate: [AuthGuard],
    loadChildren: () =>
      loadNxRemote('online-account', './Routes')
        .then((m: any) => m.remoteRoutes)
        .catch(portalFallback),
  },

  {
    path: 'bcrb',
    canActivate: [AuthGuard],
    loadChildren: () =>
      loadNxRemote('bcrb', './Routes')
        .then((m: any) => m.remoteRoutes)
        .catch(portalFallback),
  },

  {
    path: 'statement',
    canActivate: [AuthGuard],
    loadChildren: () =>
      loadNxRemote('statement', './Routes')
        .then((m: any) => m.remoteRoutes)
        .catch(portalFallback),
  },

  {
    path: 'vat-invoice',
    canActivate: [AuthGuard],
    loadChildren: () =>
      loadNxRemote('vat_invoice', './Routes')
        .then((m: any) => m.remoteRoutes)
        .catch(portalFallback),
  },

  // ── Legacy remotes (expose ./Module → named NgModule class) ──────
  // Loaded via @angular-architects/module-federation loadRemoteModule

  {
    path: 'bta',
    canActivate: [AuthGuard],
    loadChildren: () =>
      loadLegacyRemote({ type: 'module', remoteEntry: 'http://localhost:4203/remoteEntry.js', exposedModule: './Module' })
        .then((m: any) => m.BtaRemoteEntryModule)
        .catch(portalFallback),
  },

  {
    path: 'offers',
    canActivate: [AuthGuard],
    loadChildren: () =>
      loadLegacyRemote({ type: 'module', remoteEntry: 'http://localhost:4204/remoteEntry.js', exposedModule: './Module' })
        .then((m: any) => m.OffersRemoteEntryModule)
        .catch(portalFallback),
  },

  {
    path: 'supp',
    canActivate: [AuthGuard],
    loadChildren: () =>
      loadLegacyRemote({ type: 'module', remoteEntry: 'http://localhost:4205/remoteEntry.js', exposedModule: './Module' })
        .then((m: any) => m.SuppRemoteEntryModule)
        .catch(portalFallback),
  },

  {
    path: 'wearables',
    canActivate: [AuthGuard],
    loadChildren: () =>
      loadLegacyRemote({ type: 'module', remoteEntry: 'http://localhost:4206/remoteEntry.js', exposedModule: './Module' })
        .then((m: any) => m.WearablesRemoteEntryModule)
        .catch(portalFallback),
  },

  {
    path: 'pay-with-points',
    canActivate: [AuthGuard],
    loadChildren: () =>
      loadLegacyRemote({ type: 'module', remoteEntry: 'http://localhost:4207/remoteEntry.js', exposedModule: './Module' })
        .then((m: any) => m.PayWithPointsModule)       // ← fixed: was PayWithPointsRemoteEntryModule
        .catch(portalFallback),
  },

  {
    path: 'misc/priority-pass',
    canActivate: [AuthGuard],
    loadChildren: () =>
      loadLegacyRemote({ type: 'module', remoteEntry: 'http://localhost:4209/remoteEntry.js', exposedModule: './Module' })
        .then((m: any) => m.LoungeRemoteEntryModule)
        .catch(portalFallback),
  },

  {
    path: 'misc/digital-wallet',
    canActivate: [AuthGuard],
    loadChildren: () =>
      loadLegacyRemote({ type: 'module', remoteEntry: 'http://localhost:4207/remoteEntry.js', exposedModule: './Module' })
        .then((m: any) => m.PayWithPointsModule)       // ← fixed: was PayWithPointsRemoteEntryModule
        .catch(portalFallback),
  },

  {
    path: 'misc/wearables',
    canActivate: [AuthGuard],
    loadChildren: () =>
      loadLegacyRemote({ type: 'module', remoteEntry: 'http://localhost:4206/remoteEntry.js', exposedModule: './Module' })
        .then((m: any) => m.WearablesRemoteEntryModule)
        .catch(portalFallback),
  },

  {
    path: 'centurion/centurion-2.0',
    canActivate: [AuthGuard],
    loadChildren: () =>
      loadLegacyRemote({ type: 'module', remoteEntry: 'http://localhost:4211/remoteEntry.js', exposedModule: './Module' })
        .then((m: any) => m.CenturionRemoteEntryModule)
        .catch(portalFallback),
  },

  {
    path: 'centurion/cen-lcy-exc',
    canActivate: [AuthGuard],
    loadChildren: () =>
      loadLegacyRemote({ type: 'module', remoteEntry: 'http://localhost:4210/remoteEntry.js', exposedModule: './Module' })
        .then((m: any) => m.CenLcyExcRemoteEntryModule)
        .catch(portalFallback),
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
