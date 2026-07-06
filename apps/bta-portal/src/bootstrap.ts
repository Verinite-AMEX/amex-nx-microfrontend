import { platformBrowser } from '@angular/platform-browser';
import { AppModule } from './app/app.module';
import { captureAuthTokenFromUrl } from './app/core/services/token-bridge'; // NEW

captureAuthTokenFromUrl(); // NEW — must run before Angular's router does its first navigation

platformBrowser()
  .bootstrapModule(AppModule)
  .catch((err: unknown) => console.error(err));
