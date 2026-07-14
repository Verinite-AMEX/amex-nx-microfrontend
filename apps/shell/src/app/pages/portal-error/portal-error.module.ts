import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PortalErrorComponent } from './portal-error.component';

@NgModule({
  imports: [
    PortalErrorComponent,
    RouterModule.forChild([
      {
        path: '',
        component: PortalErrorComponent,
      },
    ]),
  ],
})
export class PortalErrorModule {}