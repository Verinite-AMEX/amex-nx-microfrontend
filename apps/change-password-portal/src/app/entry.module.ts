// apps/change-password-portal/src/app/entry.module.ts
import { NgModule }     from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { authGuard }    from '@amex/shared-services';

import { ChangePasswordComponent } from './pages/change-password/change-password.component';

@NgModule({
  imports: [
    CommonModule,
    ChangePasswordComponent,
    RouterModule.forChild([
      {
        path:      '',
        component: ChangePasswordComponent,
        canActivate: [authGuard],
      },
    ]),
  ],
})
export class ChangePasswordRemoteEntryModule {}