import { Component, Input, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';

export type AmexCardType =
  | 'centurion'
  | 'platinum'
  | 'gold'
  | 'green'
  | 'corporate'
  | 'bta'
  | 'supplementary';

@Component({
  selector: 'amex-card-badge',
  standalone: true,
  imports: [CommonModule],
  template: `
    <span [ngClass]="['amex-card-badge', 'amex-card-badge--' + type]">
      {{ label || typeLabel }}
    </span>
  `,
  styles: [`
    .amex-card-badge {
      display: inline-block;
      padding: 2px 10px;
      border-radius: 12px;
      font-size: 11px;
      font-weight: 700;
      letter-spacing: 0.04em;
      text-transform: uppercase;
    }
    .amex-card-badge--centurion { background: #1a1a1a; color: #d4af37; }
    .amex-card-badge--platinum  { background: #e5e5e5; color: #3a3a3a; }
    .amex-card-badge--gold      { background: #c9a84c; color: #fff; }
    .amex-card-badge--green     { background: #2e7d32; color: #fff; }
    .amex-card-badge--corporate { background: #1565c0; color: #fff; }
    .amex-card-badge--bta       { background: #6a1b9a; color: #fff; }
    .amex-card-badge--supplementary { background: #f5f5f5; color: #555; border: 1px solid #ccc; }
  `],
})
export class AmexCardBadgeComponent {
  private static _idCounter = 0;
  @HostBinding('attr.id') readonly id = `card-badge-${++AmexCardBadgeComponent._idCounter}`;


  @Input() type: AmexCardType = 'green';
  @Input() label = '';

  get typeLabel(): string {
    const map: Record<AmexCardType, string> = {
      centurion: 'Centurion',
      platinum: 'Platinum',
      gold: 'Gold',
      green: 'Green',
      corporate: 'Corporate',
      bta: 'BTA',
      supplementary: 'Supplementary',
    };
    return map[this.type];
  }
}
