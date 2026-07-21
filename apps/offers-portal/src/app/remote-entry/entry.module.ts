import { NgModule, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from '@amex/shared-services';

@Component({
  selector: 'offers-entry',
  standalone: false,
  template: `<router-outlet></router-outlet>`,
})
export class OffersEntryComponent {}

const routes: Routes = [
  {
    path: '',
    component: OffersEntryComponent,
    children: [
      {
        path: '',
        canActivate: [authGuard],
        loadChildren: () =>
          import('../pages/offers/offers-catalogue.module').then(m => m.OffersCatalogueModule),
      },
      {
        path: 'benefits',
        canActivate: [authGuard],
        loadChildren: () =>
          import('../pages/benefits/offers-benefits.module').then(m => m.OffersBenefitsModule),
      },
    ],
  },
];

@NgModule({
  declarations: [OffersEntryComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class OffersRemoteEntryModule {}