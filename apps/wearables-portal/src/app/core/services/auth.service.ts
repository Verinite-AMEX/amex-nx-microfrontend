import { Injectable } from '@angular/core';
import { AmexPortalAuthUtil } from '@vn-core-ui-components/ui';

@Injectable({ providedIn: 'root' })
export class WearablesAuthService extends AmexPortalAuthUtil {
  // Cross-tab logout sync is already handled — AmexPageComponent.ngOnInit()
  // calls this.authAdapter.listenToStorageEvents(this.destroyRef) on the
  // AMEX_PORTAL_AUTH_ADAPTER (= this service via useExisting), which is
  // inherited from AmexPortalAuthUtil. No need to duplicate it here.

  isLoggedIn(): boolean { return this.isAuthenticated(); }
}