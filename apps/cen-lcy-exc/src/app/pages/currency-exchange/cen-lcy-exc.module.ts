import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CenLcyExcComponent } from './cen-lcy-exc.component';

@NgModule({
  imports: [
    CommonModule,
    CenLcyExcComponent,
    RouterModule.forChild([{ path: '', component: CenLcyExcComponent }]),
  ],
})
export class CenLcyExcModule {}
