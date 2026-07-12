import { Component, Input, Output, EventEmitter, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface TaxInvoiceDeliveryData {
  vatRegistrationNumber: string;
  vatRegistrationCountry: string;
}

/**
 * TaxInvoiceDeliveryForm
 * OMS: "TAX Invoice Delivery Details" — VAT reg number + country, Back + Search.
 * Source: OMS (image26) — exact layout, OMS style
 */
@Component({
  selector: 'amex-tax-invoice-delivery-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="tidf">
      <div class="tidf__title">{{ title }}</div>
      <div class="tidf__accent"></div>

      <div class="tidf__panel">
        <div class="tidf__field">
          <label class="tidf__label" [for]="id + '-vat-registration-number'">VAT Registration Number</label>
          <input [id]="id + '-vat-registration-number'" class="tidf__input"
            [(ngModel)]="form.vatRegistrationNumber"
            placeholder="VAT Registration Number"
            [class.tidf__input--error]="showError" />
          <span *ngIf="showError" class="tidf__error">Invalid entry</span>
        </div>

        <div class="tidf__field">
          <label class="tidf__label" [for]="id + '-vat-registration-country'">VAT Registration Country</label>
          <select [id]="id + '-vat-registration-country'" class="tidf__select" [(ngModel)]="form.vatRegistrationCountry">
            <option *ngFor="let c of countries" [value]="c.value">{{ c.label }}</option>
          </select>
        </div>

        <div class="tidf__actions">
          <button class="tidf__btn tidf__btn--back" (click)="backClick.emit()">Back</button>
          <button class="tidf__btn tidf__btn--search" (click)="searchClick.emit(form)">Search</button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host { display: block; font-family: Arial, sans-serif; }
    .tidf__title { font-size: 15px; font-weight: bold; color: #1a3a6b; font-style: italic; padding: 0 0 6px; }
    .tidf__accent { height: 3px; background: #7b1fa2; margin-bottom: 14px; }
    .tidf__panel { background: #fff; border: 1px solid #e0e0e0; border-radius: 3px; padding: 20px 24px; max-width: 540px; }
    .tidf__field { display: flex; align-items: flex-start; flex-direction: column; margin-bottom: 16px; }
    .tidf__label { font-size: 13px; color: #1a3a6b; margin-bottom: 6px; }
    .tidf__input {
      width: 320px; border: 1px solid #ccc; border-radius: 3px;
      padding: 8px 12px; font-size: 13px; font-family: Arial, sans-serif; outline: none;
    }
    .tidf__input:focus { border-color: #7b1fa2; }
    .tidf__input--error { border-color: #c62828; border-width: 2px; }
    .tidf__error { font-size: 12px; color: #c62828; margin-top: 3px; }
    .tidf__select {
      width: 320px; border: 1px solid #ccc; border-radius: 3px;
      padding: 8px 12px; font-size: 13px; font-family: Arial, sans-serif;
      background: #fff; cursor: pointer; outline: none;
    }
    .tidf__select:focus { border-color: #7b1fa2; }
    .tidf__actions { display: flex; gap: 10px; margin-top: 10px; }
    .tidf__btn { padding: 9px 28px; font-size: 14px; font-weight: bold; border: none; border-radius: 3px; cursor: pointer; font-family: Arial, sans-serif; }
    .tidf__btn--back   { background: #1e3a5f; color: #fff; }
    .tidf__btn--back:hover { background: #16304f; }
    .tidf__btn--search { background: #1e3a5f; color: #fff; }
    .tidf__btn--search:hover { background: #16304f; }
  `],
})
export class AmexTaxInvoiceDeliveryFormComponent {
  private static _idCounter = 0;
  @HostBinding('attr.id') readonly id = `tax-invoice-delivery-form-${++AmexTaxInvoiceDeliveryFormComponent._idCounter}`;


  @Input() title = 'TAX Invoice Delivery Details';
  @Input() showError = false;
  @Input() countries: { value: string; label: string }[] = [
    { value: 'BH', label: 'Bahrain' },
    { value: 'AE', label: 'United Arab Emirates' },
    { value: 'KW', label: 'Kuwait' },
    { value: 'OM', label: 'Oman' },
    { value: 'QA', label: 'Qatar' },
    { value: 'SA', label: 'Saudi Arabia' },
  ];

  form: TaxInvoiceDeliveryData = { vatRegistrationNumber: '', vatRegistrationCountry: 'BH' };

  @Output() searchClick = new EventEmitter<TaxInvoiceDeliveryData>();
  @Output() backClick   = new EventEmitter<void>();
}
