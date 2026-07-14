import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { OffersCatalogueComponent } from './offers-catalogue.component';

const routes: Routes = [
  {
    path: '',
    component: OffersCatalogueComponent,
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    OffersCatalogueComponent,
  ],
})
export class OffersCatalogueModule {}