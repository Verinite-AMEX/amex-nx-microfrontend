// libs/ui/src/lib/primitives/spinner.ts
import { Component, Input, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ui-spinner',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      role="progressbar"
      [id]="id"
      aria-valuemin="0"
      aria-valuemax="100"
      [attr.aria-valuenow]="indeterminate ? null : clampedValue"
      [attr.aria-label]="ariaLabel || 'Loading'"
      class="progressCircle"
      [class.progressDeterminate]="!indeterminate"
      [class.progressIndeterminate]="indeterminate"
      [class.progressSm]="size === 'sm'"
      [class.progressLg]="size === 'lg'"
    >
      <svg *ngIf="!indeterminate" role="presentation" aria-hidden="true">
        <circle cx="50%" cy="50%" r="45%" fill="none"></circle>
        <circle
          cx="50%"
          cy="50%"
          r="45%"
          class="countStroke"
          [attr.stroke-dasharray]="dashArray"
        ></circle>
      </svg>
      <div *ngIf="!indeterminate && showValue" class="progressValue percent">
        {{ clampedValue }}
      </div>
    </div>
  `,
})
export class SpinnerComponent {
  private static _idCounter = 0;
  @HostBinding('attr.id') @Input() id =
    `ui-spinner-${++SpinnerComponent._idCounter}`;

  @Input() size: 'sm' | 'default' | 'lg' = 'default';
  @Input() value = 0;
  @Input() indeterminate = true;
  @Input() showValue = false;
  @Input() ariaLabel = '';

  get clampedValue(): number {
    return Math.min(100, Math.max(0, this.value));
  }

  /** Replicates DLS's own precomputed 0-100 stroke-dasharray lookup table (~2.87% per unit, matching its full circumference of 287% at value 100) as a direct calculation instead of 101 hardcoded CSS rules. */
  get dashArray(): string {
    return `${(this.clampedValue * 2.87).toFixed(2)}%, 500`;
  }
}