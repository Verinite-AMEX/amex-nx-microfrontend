import { Route } from '@angular/router';
import { authGuard } from '@amex/shared-services';
import { RemoteEntry } from './entry';

export const remoteRoutes: Route[] = [{ path: '', component: RemoteEntry, canActivate: [authGuard] }];