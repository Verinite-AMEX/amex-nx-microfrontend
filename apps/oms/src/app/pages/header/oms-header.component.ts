import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AmexTopNavBarComponent } from '@ui-components/ui';
import { AuthApiService, EnvironmentService } from '@amex/shared-services';

@Component({
  selector: 'oms-header',
  standalone: true,
  imports: [
    CommonModule,
    AmexTopNavBarComponent
  ],
  templateUrl: './oms-header.component.html',
})
export class OmsHeaderComponent {

  omsServiceName = 'Merchant Services';

  private readonly authApi = inject(AuthApiService);
  private readonly environmentService = inject(EnvironmentService);

  onLogout(): void {
    this.authApi.performLogout().subscribe({
      next: () => this.redirectToLogin(),
      error: () => this.redirectToLogin(),
    });
  }

  private redirectToLogin(): void {
    const returnUrl = encodeURIComponent(window.location.origin + '/');
    window.location.href = `${this.environmentService.getLoginAppUrl()}?returnUrl=${returnUrl}`;
  }
}