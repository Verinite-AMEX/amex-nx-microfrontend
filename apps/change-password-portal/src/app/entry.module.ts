import { NgModule }     from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { ChangePasswordComponent } from './pages/change-password/change-password.component';

@NgModule({
  imports: [
    CommonModule,
    ChangePasswordComponent,
    RouterModule.forChild([
      {
        path:      '',
        component: ChangePasswordComponent,
      },
    ]),
  ],
})
export class ChangePasswordRemoteEntryModule {}