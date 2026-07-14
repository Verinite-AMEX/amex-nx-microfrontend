import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { OffersPromotionsComponent } from './offers-promotions.component';

const routes: Routes = [
  {
    path: '',
    component: OffersPromotionsComponent,
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    OffersPromotionsComponent,
  ],
})
export class OffersPromotionsModule {}