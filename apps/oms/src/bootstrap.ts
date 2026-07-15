import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { RemoteEntry } from './app/remote-entry/entry';
import { captureAuthTokenFromUrl } from './app/services/token-bridge'; // NEW

captureAuthTokenFromUrl();

bootstrapApplication(RemoteEntry, appConfig).catch((err) => console.error(err));
