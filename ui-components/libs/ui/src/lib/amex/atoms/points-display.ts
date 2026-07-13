import { Component, Input, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'amex-points-display',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="amex-points" [class.amex-points--compact]="compact">
      <span class="amex-points__value">{{ formattedPoints }}</span>
      <span class="amex-points__label">{{ label }}</span>
    </div>
  `,
  styles: [`
    .amex-points {
      display: inline-flex;
      flex-direction: column;
      align-items: flex-start;
    }
    .amex-points--compact {
      flex-direction: row;
      align-items: center;
      gap: 6px;
    }
    .amex-points__value {
      font-size: 22px;
      font-weight: 700;
      color: #016FD0;
      line-height: 1;
    }
    .amex-points--compact .amex-points__value { font-size: 15px; }
    .amex-points__label {
      font-size: 11px;
      color: #777;
      text-transform: uppercase;
      letter-spacing: 0.04em;
      margin-top: 2px;
    }
    .amex-points--compact .amex-points__label { margin-top: 0; font-size: 11px; }
  `],
})
export class AmexPointsDisplayComponent {
  private static _idCounter = 0;
  @HostBinding('attr.id') readonly id = `points-display-${++AmexPointsDisplayComponent._idCounter}`;


  @Input() points = 0;
  @Input() label = 'Membership Rewards Points';
  @Input() compact = false;

  get formattedPoints(): string {
    return this.points.toLocaleString('en-US');
  }
}
