import { NgModule }        from '@angular/core';
import { BrowserModule }   from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule }    from '@angular/router';
import { AppComponent }    from './app.component';
import { AuthInterceptor } from './core/interceptors/auth.interceptor';

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    AppComponent,
    RouterModule.forRoot(
      [
        {
          path: '',
          loadComponent: () =>
            import('./wearables/wearables-shell-wrapper.component')
              .then(m => m.WearablesShellWrapperComponent),
        },
        { path: '**', redirectTo: '' },
      ],
      { bindToComponentInputs: true } // Angular 16+ — lets route data bind as @Input
    ),
  ],
  providers: [
    {
      provide:  HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi:    true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}