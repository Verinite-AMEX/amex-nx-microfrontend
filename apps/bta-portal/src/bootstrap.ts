import { platformBrowser } from '@angular/platform-browser';
import { AppModule } from './app/app.module';
import { captureAuthTokenFromUrl } from './app/core/services/token-bridge'; // NEW

captureAuthTokenFromUrl();

platformBrowser()
  .bootstrapModule(AppModule)
  .catch((err: unknown) => console.error(err));
