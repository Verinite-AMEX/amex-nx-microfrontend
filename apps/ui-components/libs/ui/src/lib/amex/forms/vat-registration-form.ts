import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

/**
 * VATRegistrationForm
 * OMS VAT Registration — 3-step button panel:
 * Upload Certificate | Merchant Registration | TAX Invoice Delivery
 * Source: OMS (image23) — OMS style, navy step buttons, purple accent
 */
@Component({
  selector: 'amex-vat-registration-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="vrf">
      <div class="vrf__title">VAT Registration</div>
      <div class="vrf__accent"></div>

      <div class="vrf__panel">
        <p class="vrf__intro">Please provide the VAT registration details in the following steps:</p>

        <!-- Step buttons — matches image23 exactly -->
        <div class="vrf__step">
          <button class="vrf__step-btn" (click)="stepClick.emit('upload')">Upload Certificate</button>
          <span class="vrf__step-desc">Submit the VAT registration details and certificate</span>
        </div>
        <div class="vrf__step">
          <button class="vrf__step-btn" (click)="stepClick.emit('merchant')">Merchant Registration</button>
          <span class="vrf__step-desc">Link the VAT registration number to specific outlets</span>
        </div>
        <div class="vrf__step">
          <button class="vrf__step-btn" (click)="stepClick.emit('delivery')">TAX Invoice Delivery</button>
          <span class="vrf__step-desc">Provide frequency and contact details for VAT Invoice Delivery</span>
        </div>

        <div class="vrf__divider-row">
          <span class="vrf__section-sub">Download Tax Invoices</span>
          <div class="vrf__sub-accent"></div>
          <button class="vrf__step-btn" style="margin-top:10px"
            (click)="stepClick.emit('download')">Download Tax Invoices</button>
        </div>

        <div class="vrf__back-row">
          <button class="vrf__btn vrf__btn--back" (click)="backClick.emit()">Back</button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host { display: block; font-family: Arial, sans-serif; }
    .vrf__title { font-size: 15px; font-weight: bold; color: #1a3a6b; padding: 0 0 6px; }
    .vrf__accent { height: 3px; background: #7b1fa2; margin-bottom: 14px; }
    .vrf__panel { background: #fff; border: 1px solid #e0e0e0; border-radius: 3px; padding: 20px 24px; }
    .vrf__intro { font-size: 13px; color: #333; margin: 0 0 20px; }

    .vrf__step { display: flex; align-items: center; gap: 20px; margin-bottom: 16px; }
    .vrf__step-btn {
      background: #1e3a5f; color: #fff; border: none;
      padding: 9px 20px; font-size: 13px; font-weight: bold;
      cursor: pointer; border-radius: 4px; min-width: 180px;
      font-family: Arial, sans-serif; text-align: center;
    }
    .vrf__step-btn:hover { background: #16304f; }
    .vrf__step-desc { font-size: 13px; color: #555; }

    .vrf__divider-row { border-top: 1px solid #e0e0e0; margin-top: 16px; padding-top: 14px; }
    .vrf__section-sub { font-size: 15px; color: #1a3a6b; font-style: italic; }
    .vrf__sub-accent { height: 3px; background: #7b1fa2; margin: 6px 0 0; }

    .vrf__back-row { display: flex; justify-content: center; margin-top: 20px; }
    .vrf__btn { padding: 9px 32px; font-size: 14px; font-weight: bold; border: none; border-radius: 3px; cursor: pointer; font-family: Arial, sans-serif; }
    .vrf__btn--back { background: #1e3a5f; color: #fff; }
    .vrf__btn--back:hover { background: #16304f; }
  `],
})
export class AmexVATRegistrationFormComponent {
  @Output() stepClick = new EventEmitter<string>();
  @Output() backClick = new EventEmitter<void>();
}
