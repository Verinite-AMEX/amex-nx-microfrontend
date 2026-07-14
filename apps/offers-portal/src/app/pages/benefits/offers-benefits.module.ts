import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { OffersBenefitsComponent } from './offers-benefits.component';

@NgModule({
  imports: [
    OffersBenefitsComponent,
    RouterModule.forChild([
      {
        path: '',
        component: OffersBenefitsComponent
      }
    ])
  ]
})
export class OffersBenefitsModule {}