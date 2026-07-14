import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { OffersDashboardComponent } from './offers-dashboard.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: OffersDashboardComponent,
      },
    ]),
    OffersDashboardComponent,
  ],
})
export class OffersDashboardModule {}