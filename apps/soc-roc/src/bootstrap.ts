import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { captureAuthTokenFromUrl } from './app/core/utils/token-bridge'; // NEW

captureAuthTokenFromUrl(); // NEW — must run before Angular bootstraps/navigates

bootstrapApplication(AppComponent, appConfig).catch((err) => console.error(err));