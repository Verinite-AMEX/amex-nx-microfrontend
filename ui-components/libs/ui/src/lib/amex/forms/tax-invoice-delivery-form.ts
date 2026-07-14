import { Component, Input, Output, EventEmitter, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PanelComponent } from '../../molecules/panel';
import { FormFieldComponent } from '../../molecules/form-field';
import { InputComponent } from '../../atoms/input';
import { SelectComponent } from '../../atoms/select';
import { ButtonComponent } from '../../atoms/button';

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
  imports: [CommonModule, FormsModule, PanelComponent, FormFieldComponent, InputComponent, SelectComponent, ButtonComponent],
  template: `
    <ui-panel [title]="title" variant="accent">
      <ui-form-field class="tidf__field" label="VAT Registration Number" [forId]="id + '-vat-registration-number'"
        [error]="showError ? 'Invalid entry' : ''">
        <ui-input [id]="id + '-vat-registration-number'"
          [(ngModel)]="form.vatRegistrationNumber"
          placeholder="VAT Registration Number"
          [invalid]="showError">
        </ui-input>
      </ui-form-field>

      <ui-form-field class="tidf__field" label="VAT Registration Country" [forId]="id + '-vat-registration-country'">
        <ui-select [id]="id + '-vat-registration-country'" [options]="countries" [(ngModel)]="form.vatRegistrationCountry"></ui-select>
      </ui-form-field>

      <div class="tidf__actions">
        <ui-button class="tidf__btn tidf__btn--back" variant="primary" label="Back" (click)="backClick.emit()"></ui-button>
        <ui-button class="tidf__btn tidf__btn--search" variant="primary" label="Search" (click)="searchClick.emit(form)"></ui-button>
      </div>
    </ui-panel>
  `,
  styles: [`
    :host {
      display: block;
      font-family: Arial, sans-serif;
      --panel-title-size: 15px;
      --panel-title-style: italic;
      --panel-max-width: 540px;
      --input-border: 1px solid #ccc;
      --input-radius: 3px;
      --input-padding: 8px 12px;
      --input-focus-border-color: #7b1fa2;
    }
    .tidf__field { margin-bottom: 16px; max-width: 320px; }
    .tidf__actions { display: flex; gap: 10px; margin-top: 10px; }
    .tidf__btn--back { --btn-bg: #1e3a5f; --btn-color: #fff; --btn-radius: 3px; --btn-padding: 9px 28px; --btn-font-size: 14px; }
    .tidf__btn--search { --btn-bg: #1e3a5f; --btn-color: #fff; --btn-radius: 3px; --btn-padding: 9px 28px; --btn-font-size: 14px; }
  `],
})
export class AmexTaxInvoiceDeliveryFormComponent {
  private static _idCounter = 0;
  @HostBinding('attr.id') @Input() id = `tax-invoice-delivery-form-${++AmexTaxInvoiceDeliveryFormComponent._idCounter}`;

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