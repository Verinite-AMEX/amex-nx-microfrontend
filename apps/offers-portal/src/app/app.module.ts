import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';

@NgModule({
  imports: [
    BrowserModule,
    AppComponent,
    RouterModule.forRoot([
      { path: '',               redirectTo: 'offers', pathMatch: 'full' },
      { path: 'offers',         loadChildren: () => import('./remote-entry/entry.module').then(m => m.OffersRemoteEntryModule) },
      { path: '**',             redirectTo: 'offers' },
    ]),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
