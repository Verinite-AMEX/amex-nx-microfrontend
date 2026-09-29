// libs/ui/src/lib/primitives/progress-bar.ts
import { Component, Input, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ui-progress-bar',
  standalone: true,
  imports: [CommonModule],
  template: `
    <span *ngIf="label" class="linearTrackerLabel">{{ label }}</span>
    <div
      role="progressbar"
      [id]="id"
      aria-valuemin="0"
      [attr.aria-valuemax]="max"
      [attr.aria-valuenow]="indeterminate ? null : clampedValue"
      [attr.aria-label]="ariaLabel || null"
      class="progressBar"
      [class.progressIndeterminate]="indeterminate"
    >
      <div
        class="progressTrack"
        [style.width.%]="indeterminate ? null : percent"
      ></div>
    </div>
  `,
})
export class ProgressBarComponent {
  private static _idCounter = 0;
  @HostBinding('attr.id') @Input() id =
    `ui-progress-bar-${++ProgressBarComponent._idCounter}`;

  @Input() value = 0;
  @Input() max = 100;
  @Input() label = '';
  @Input() indeterminate = false;
  @Input() ariaLabel = '';

  get clampedValue(): number {
    return Math.min(this.max, Math.max(0, this.value));
  }

  get percent(): number {
    return this.max > 0 ? (this.clampedValue / this.max) * 100 : 0;
  }
}