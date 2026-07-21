// apps/pay-with-points-portal/src/app/remote-entry/entry.module.ts
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from '@amex/shared-services';

@Component({
  selector: 'pay-with-points-entry',
  standalone: false,
  template: '<router-outlet></router-outlet>',
})
export class PayWithPointsEntryComponent {}

const routes: Routes = [
  {
    path: '',
    component: PayWithPointsEntryComponent,
    children: [
      {
        path: '',
        canActivate: [authGuard],
        loadChildren: () =>
          import('../pages/pay-with-points/pay-with-points.module')
            .then(m => m.PayWithPointsModule),
      },
    ],
  },
];

@NgModule({
  declarations: [PayWithPointsEntryComponent],
  imports: [
    RouterModule.forChild(routes),
  ],
})
export class PayWithPointsRemoteEntryModule {}