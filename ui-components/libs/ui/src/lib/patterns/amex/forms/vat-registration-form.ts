import { Component, Output, EventEmitter, HostBinding, Input } from '@angular/core';
import { PanelComponent } from '../../../composite/panel';
import { ButtonComponent } from '../../../primitives/button';

@Component({
  selector: 'amex-vat-registration-form',
  standalone: true,
  imports: [PanelComponent, ButtonComponent],
  template: `
    <ui-panel title="VAT Registration">
      <p class="vrf__intro">Please provide the VAT registration details in the following steps:</p>

      <div class="vrf__step">
        <ui-button class="vrf__step-btn" variant="primary" label="Upload Certificate"
          (click)="stepClick.emit('upload')"></ui-button>
        <span class="vrf__step-desc">Submit the VAT registration details and certificate</span>
      </div>
      <div class="vrf__step">
        <ui-button class="vrf__step-btn" variant="primary" label="Merchant Registration"
          (click)="stepClick.emit('merchant')"></ui-button>
        <span class="vrf__step-desc">Link the VAT registration number to specific outlets</span>
      </div>
      <div class="vrf__step">
        <ui-button class="vrf__step-btn" variant="primary" label="TAX Invoice Delivery"
          (click)="stepClick.emit('delivery')"></ui-button>
        <span class="vrf__step-desc">Provide frequency and contact details for VAT Invoice Delivery</span>
      </div>

      <div class="vrf__divider-row">
        <span class="vrf__section-sub">Download Tax Invoices</span>
        <div class="vrf__sub-accent"></div>
        <ui-button class="vrf__step-btn" style="margin-top:10px" variant="primary"
          label="Download Tax Invoices" (click)="stepClick.emit('download')"></ui-button>
      </div>

      <div class="vrf__back-row">
        <ui-button class="vrf__btn vrf__btn--back" variant="primary" [label]="'Back'"
          (click)="backClick.emit()"></ui-button>
      </div>
    </ui-panel>
  `,
  styles: [`
    :host {
      --panel-accent-color: #7b1fa2;
      --btn-bg: #1e3a5f; --btn-color: #fff; --btn-radius: 4px;
      --btn-padding: 9px 20px; --btn-font-size: 13px;
    }
    .vrf__intro { font-size: 13px; color: #333; margin: 0 0 20px; }
    .vrf__step { display: flex; align-items: center; gap: 20px; margin-bottom: 16px; }
    .vrf__step-btn { min-width: 180px; text-align: center; }
    .vrf__step-desc { font-size: 13px; color: #555; }
    .vrf__divider-row { border-top: 1px solid #e0e0e0; margin-top: 16px; padding-top: 14px; }
    .vrf__section-sub { font-size: 15px; color: #1a3a6b; font-style: italic; }
    .vrf__sub-accent { height: 3px; background: #7b1fa2; margin: 6px 0 0; }
    .vrf__back-row { display: flex; justify-content: center; margin-top: 20px; }
    .vrf__btn--back { --btn-padding: 9px 32px; --btn-font-size: 14px; }
  `],
})
export class AmexVATRegistrationFormComponent {
  private static _idCounter = 0;
  @HostBinding('attr.id') @Input() id = `vat-registration-form-${++AmexVATRegistrationFormComponent._idCounter}`;

  @Output() stepClick = new EventEmitter<string>();
  @Output() backClick = new EventEmitter<void>();
}