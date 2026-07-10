import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AmexTopNavBarComponent } from '@ui-components/ui';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'bcrb-header',
  standalone: true,
  imports: [CommonModule, AmexTopNavBarComponent],
  templateUrl: './bcrb-header.component.html',
})
export class BcrbHeaderComponent {

  portalTitle = 'BCRB Reports';
  username = 'ssharaf_onlshelper';

  onLogout() {
    console.log('Logout clicked');

    // future-safe logout logic
    localStorage.clear();
    window.location.reload();
  }
}