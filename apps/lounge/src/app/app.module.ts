import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    AppComponent,
    RouterModule.forRoot([
      {
        path: '',
        loadComponent: () =>
          import('./pages/priority-pass/lounge-shell-wrapper.component')
            .then(m => m.LoungeShellWrapperComponent),
      },
      { path: '**', redirectTo: '' },
    ]),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
