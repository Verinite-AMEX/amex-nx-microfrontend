import { Injectable } from '@angular/core';
import { AmexPortalAuthUtil } from '@ui-components/ui';

@Injectable({ providedIn: 'root' })
export class WearablesAuthService extends AmexPortalAuthUtil {
  isLoggedIn(): boolean { return this.isAuthenticated(); }
}