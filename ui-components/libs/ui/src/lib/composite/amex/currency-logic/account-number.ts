import { Component, Input, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'amex-account-number',
  standalone: true,
  imports: [CommonModule],
  template: `
    <span class="amex-acct" [class.amex-acct--mono]="mono">
      <ng-container *ngIf="masked; else full">
        <span class="amex-acct__mask">•••• •••• ••••</span>
        <span class="amex-acct__last">{{ lastFour }}</span>
      </ng-container>
      <ng-template #full>{{ formattedNumber }}</ng-template>
    </span>
  `,
  styles: [`
    .amex-acct {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      font-size: 14px;
      color: #333;
    }
    .amex-acct--mono {
      font-family: 'Courier New', monospace;
      letter-spacing: 0.05em;
    }
    .amex-acct__mask { color: #999; letter-spacing: 0.1em; }
    .amex-acct__last { font-weight: 600; color: #111; }
  `],
})
export class AmexAccountNumberComponent {
  private static _idCounter = 0;
  @HostBinding('attr.id') @Input() id = `account-number-${++AmexAccountNumberComponent._idCounter}`;


  /** Full 15 or 16-digit card number or account number */
  @Input() number = '';
  /** Show only last 4 digits with mask */
  @Input() masked = true;
  /** Monospace font for readability */
  @Input() mono = true;

  get lastFour(): string {
    return this.number.slice(-4);
  }

  get formattedNumber(): string {
    const n = this.number.replace(/\s/g, '');
    // AMEX: 4-6-5 format; others: 4-4-4-4
    if (n.length === 15) {
      return `${n.slice(0,4)} ${n.slice(4,10)} ${n.slice(10)}`;
    }
    return n.replace(/(.{4})/g, '$1 ').trim();
  }
}
