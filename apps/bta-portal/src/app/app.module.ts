import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import {
  AmexTopNavBarComponent,
  AmexTabBarComponent,
  AmexSidebarMenuComponent,
  AmexLogoutConfirmationComponent,
} from '@ui-components/ui';

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    AppComponent,
    AmexTopNavBarComponent,
    AmexTabBarComponent,
    AmexSidebarMenuComponent,
    AmexLogoutConfirmationComponent,
    RouterModule.forRoot([
      { path: '',    redirectTo: 'bta', pathMatch: 'full' },
      { path: 'bta', loadChildren: () => import('./remote-entry/entry.module').then(m => m.BtaRemoteEntryModule) },
      { path: '**',  redirectTo: 'bta' },
    ]),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}