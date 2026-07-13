import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LoungePriorityPassComponent } from './lounge-priority-pass.component';

@NgModule({
  imports: [
    CommonModule,
    LoungePriorityPassComponent,
    RouterModule.forChild([{ path: '', component: LoungePriorityPassComponent }]),
  ],
})
export class LoungePriorityPassModule {}
