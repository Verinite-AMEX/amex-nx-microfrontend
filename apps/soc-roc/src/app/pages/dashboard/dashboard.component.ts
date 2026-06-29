import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AmexPortalHomeTilesComponent, AmexPortalTile } from '@vn-core-ui-components/ui';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [AmexPortalHomeTilesComponent],
  template: `
    <amex-portal-home-tiles
      portalTitle="SOC & ROC Portal"
      [tiles]="tiles"
      (tileClick)="onTileClick($event)"
      (logout)="onLogout()">
    </amex-portal-home-tiles>
  `
})
export class Dashboard {
  tiles: AmexPortalTile[] = [
    { id: 'soc-roc-transactions',  label: "SOC's & ROC's",          icon: '', enabled: true },
    { id: 'file-formation-upload', label: 'File Formation & Upload', icon: '', enabled: true },
    { id: 'merchant-data',         label: 'Merchant Data',           icon: '', enabled: true },
    { id: 'retrieval',             label: 'Retrieval',               icon: '', enabled: true },
    { id: 'algeria-payment',       label: 'Algeria Payment',         icon: '', enabled: true },
    { id: 'payment-register',      label: 'Payment Register',        icon: '', enabled: true },
    { id: 'reports',               label: 'Reports',                 icon: '', enabled: true },
  ];

  constructor(private router: Router) {}

  onTileClick(tileId: string): void {
    const routeMap: Record<string, string> = {
      'soc-roc-transactions':  '/soc-roc-transactions/soc-roc-transactions',
      'file-formation-upload': '/utilities/file-formation-upload',
      'merchant-data':         '/merchant-data/merchant-data',   // ← இது மட்டும் மாறுது
      'retrieval':             '/retrieval',
      'algeria-payment':       '/algeria-payment',
      'payment-register':      '/payment-register',
      'reports':               '/reports/details-by-currency',
    };
    if (routeMap[tileId]) {
      this.router.navigateByUrl(routeMap[tileId]);
    }
  }

  onLogout(): void {
    localStorage.removeItem('soc_roc_token');
    localStorage.removeItem('soc_roc_user');
    this.router.navigateByUrl('/login');
  }
}