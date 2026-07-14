import { Component, Input, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'amex-amount',
  standalone: true,
  imports: [CommonModule],
  template: `
    <span 
      class="amex-amount" 
      [class.amex-amount--debit]="type === 'debit'" 
      [class.amex-amount--credit]="type === 'credit'"
      [attr.aria-label]="getAriaLabel()"
      [attr.role]="'text'"
      tabindex="0"
    >
      <span class="amex-amount__currency" aria-hidden="true">{{ currency }}</span>
      <span class="amex-amount__value" aria-hidden="true">{{ formattedAmount }}</span>
      <span *ngIf="type === 'credit'" class="amex-amount__cr" aria-hidden="true">CR</span>
      <span class="sr-only">{{ getScreenReaderText() }}</span>
    </span>
  `,
  styles: [`
    .amex-amount {
      display: inline-flex;
      align-items: baseline;
      gap: 3px;
      font-weight: 500;
    }
    .amex-amount__currency {
      font-size: 11px;
      color: #777;
      letter-spacing: 0.04em;
    }
    .amex-amount__value { font-size: 14px; color: #111; }
    .amex-amount--debit .amex-amount__value  { color: #b71c1c; }
    .amex-amount--credit .amex-amount__value { color: #1b5e20; }
    .amex-amount__cr {
      font-size: 10px;
      font-weight: 700;
      color: #1b5e20;
      letter-spacing: 0.05em;
    }
    
    /* Focus styles for keyboard navigation */
    .amex-amount:focus {
      outline: 2px solid #006fcf;
      outline-offset: 2px;
      border-radius: 2px;
    }
    
    /* High contrast mode support */
    @media (prefers-contrast: high) {
      .amex-amount {
        border: 1px solid currentColor;
        padding: 1px;
      }
    }
    
    /* Screen reader only text */
    .sr-only {
      position: absolute;
      width: 1px;
      height: 1px;
      padding: 0;
      margin: -1px;
      overflow: hidden;
      clip: rect(0, 0, 0, 0);
      white-space: nowrap;
      border: 0;
    }
  `],
})
export class AmexAmountComponent {
  private static _idCounter = 0;
  @HostBinding('attr.id') @Input() id = `amount-${++AmexAmountComponent._idCounter}`;


  @Input() amount = 0;
  @Input() currency = 'AED';
  @Input() type: 'debit' | 'credit' | 'neutral' = 'neutral';
  @Input() decimals = 2;

  get formattedAmount(): string {
    return this.amount.toLocaleString('en-US', {
      minimumFractionDigits: this.decimals,
      maximumFractionDigits: this.decimals,
    });
  }

  getAriaLabel(): string {
    return this.getScreenReaderText();
  }

  getScreenReaderText(): string {
    const amountText = `${this.currency} ${this.formattedAmount}`;
    
    switch (this.type) {
      case 'debit':
        return `Debit amount: ${amountText}`;
      case 'credit':
        return `Credit amount: ${amountText}`;
      case 'neutral':
      default:
        return `Amount: ${amountText}`;
    }
  }
}
