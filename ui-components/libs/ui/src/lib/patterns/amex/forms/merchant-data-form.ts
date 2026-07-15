import { Component, Input, Output, EventEmitter, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FormFieldComponent } from '../../../composite/form-field';
import { InputComponent } from '../../../primitives/input';
import { SelectComponent } from '../../../primitives/select';
import { CheckboxComponent } from '../../../primitives/checkbox';
import { ButtonComponent } from '../../../primitives/button';

export interface MerchantFormData {
  merchantName: string;
  merchantNumber: string;
  lastFiveIban: string;
  tradeLicense: string;
  country: string;
  city: string;
  legalStructure: string;
  repName: string;
  repEmail: string;
  repPhone: string;
  termsAccepted: boolean;
}

/**
 * MerchantDataForm
 * OMS: Full merchant record — name, code, IBAN, trade licence, country, city,
 * legal structure, representative info, T&C checkbox.
 * Source: OMS, SOC/ROC — OMS card style, purple accent
 */
@Component({
  selector: 'amex-merchant-data-form',
  standalone: true,
  imports: [CommonModule, FormsModule, FormFieldComponent, InputComponent, SelectComponent, CheckboxComponent, ButtonComponent],
  template: `
    <div class="mdf">
      <div class="mdf__title">{{ title }}</div>
      <div class="mdf__accent"></div>

      <div class="mdf__panel">

        <div class="mdf__section-label">Merchant Information</div>

        <div class="mdf__two-col">
          <ui-form-field class="mdf__field" label="Merchant Name" [forId]="id + '-merchant-name'" [required]="true">
            <ui-input [id]="id + '-merchant-name'" [(ngModel)]="form.merchantName" placeholder="Enter merchant name"></ui-input>
          </ui-form-field>
          <ui-form-field class="mdf__field" label="Merchant Number" [forId]="id + '-merchant-number'" [required]="true">
            <ui-input [id]="id + '-merchant-number'" [(ngModel)]="form.merchantNumber" placeholder="Enter merchant number"></ui-input>
          </ui-form-field>
        </div>

        <div class="mdf__two-col">
          <ui-form-field class="mdf__field" label="Last 5 IBAN Digits" [forId]="id + '-last-5-iban-digits'" [required]="true">
            <ui-input [id]="id + '-last-5-iban-digits'" [(ngModel)]="form.lastFiveIban" maxlength="5" placeholder="XXXXX"></ui-input>
          </ui-form-field>
          <ui-form-field class="mdf__field" label="Trade Licence / CR No." [forId]="id + '-trade-licence-cr-no'">
            <ui-input [id]="id + '-trade-licence-cr-no'" [(ngModel)]="form.tradeLicense" placeholder="Enter trade licence"></ui-input>
          </ui-form-field>
        </div>

        <div class="mdf__two-col">
          <ui-form-field class="mdf__field" label="Country" [forId]="id + '-country'" [required]="true">
            <ui-select [id]="id + '-country'" [options]="countrySelectOptions" placeholder="-- Select Country --" [(ngModel)]="form.country"></ui-select>
          </ui-form-field>
          <ui-form-field class="mdf__field" label="City" [forId]="id + '-city'" [required]="true">
            <ui-select [id]="id + '-city'" [options]="citySelectOptions" placeholder="-- Select City --" [(ngModel)]="form.city"></ui-select>
          </ui-form-field>
        </div>

        <ui-form-field class="mdf__field mdf__field--wide" label="Business Legal Structure" [forId]="id + '-business-legal-structure'" [required]="true">
          <ui-select [id]="id + '-business-legal-structure'" [options]="legalSelectOptions" placeholder="-- Select --" [(ngModel)]="form.legalStructure"></ui-select>
        </ui-form-field>

        <div class="mdf__section-label" style="margin-top:16px">Representative Information</div>

        <div class="mdf__two-col">
          <ui-form-field class="mdf__field" label="Representative Name" [forId]="id + '-representative-name'">
            <ui-input [id]="id + '-representative-name'" [(ngModel)]="form.repName" placeholder="Full name"></ui-input>
          </ui-form-field>
          <ui-form-field class="mdf__field" label="Email" [forId]="id + '-email'">
            <ui-input [id]="id + '-email'" type="email" [(ngModel)]="form.repEmail" placeholder="Email address"></ui-input>
          </ui-form-field>
        </div>

        <ui-form-field class="mdf__field" label="Phone" [forId]="id + '-phone'">
          <ui-input [id]="id + '-phone'" [(ngModel)]="form.repPhone" placeholder="+971 XX XXX XXXX"></ui-input>
        </ui-form-field>

        <!-- T&C checkbox -->
        <div class="mdf__tc-row">
          <ui-checkbox [id]="id + '-tc'" [(ngModel)]="form.termsAccepted">
            <span class="mdf__tc-text">I accept the <span class="mdf__tc-link">Terms &amp; Conditions</span></span>
          </ui-checkbox>
        </div>

        <!-- Buttons -->
        <div class="mdf__actions">
          <ui-button class="mdf__btn mdf__btn--back" variant="primary" [label]="backLabel" (click)="backClick.emit()"></ui-button>
          <ui-button class="mdf__btn mdf__btn--submit" variant="primary" [label]="submitLabel"
            [disabled]="!form.termsAccepted" (click)="submitClick.emit(form)"></ui-button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      font-family: Arial, sans-serif;
      --input-border: 1px solid #ccc;
      --input-padding: 8px 10px;
      --input-focus-border-color: #7b1fa2;
      --label-required-color: #c62828;
    }
    .mdf__title { font-size: 16px; font-weight: bold; color: #1a3a6b; text-transform: uppercase; letter-spacing: 0.5px; padding: 0 0 6px; }
    .mdf__accent { height: 3px; background: #7b1fa2; margin-bottom: 16px; }
    .mdf__panel { background: #fff; border: 1px solid #e0e0e0; border-radius: 3px; padding: 20px 24px; max-width: 680px; }

    .mdf__section-label {
      font-size: 12px; font-weight: bold; color: #7b1fa2;
      text-transform: uppercase; letter-spacing: 0.5px;
      padding-bottom: 6px; border-bottom: 1px solid #e0e0e0;
      margin-bottom: 12px;
    }

    .mdf__two-col { display: flex; gap: 16px; flex-wrap: wrap; }
    .mdf__two-col .mdf__field { flex: 1; min-width: 200px; }

    .mdf__field { margin-bottom: 14px; }
    .mdf__field--wide { max-width: 340px; }

    .mdf__tc-row { display: flex; align-items: center; gap: 8px; margin: 16px 0 4px; }
    .mdf__tc-text { font-size: 13px; color: #333; cursor: pointer; }
    .mdf__tc-link { color: #7b1fa2; text-decoration: underline; cursor: pointer; }

    .mdf__actions { display: flex; gap: 12px; margin-top: 16px; }
    .mdf__btn--back   { --btn-bg: #1e3a5f; --btn-color: #fff; --btn-radius: 3px; --btn-padding: 10px 32px; --btn-font-size: 14px; }
    .mdf__btn--submit { --btn-bg: #7b1fa2; --btn-color: #fff; --btn-radius: 3px; --btn-padding: 10px 32px; --btn-font-size: 14px; }
  `],
})
export class AmexMerchantDataFormComponent {
  private static _idCounter = 0;
  @HostBinding('attr.id') readonly id = `merchant-data-form-${++AmexMerchantDataFormComponent._idCounter}`;

  @Input() title = 'MERCHANT DETAILS';
  @Input() backLabel = 'Back';
  @Input() submitLabel = 'Submit';
  @Input() countryOptions = ['United Arab Emirates', 'Bahrain', 'Kuwait', 'Oman', 'Qatar', 'Saudi Arabia'];
  @Input() cityOptions = ['Dubai', 'Abu Dhabi', 'Sharjah', 'Manama', 'Kuwait City', 'Muscat'];
  @Input() legalOptions = ['Limited Liability Company', 'Joint Stock Company', 'Sole Proprietorship', 'Partnership', 'Branch of Foreign Company'];
  @Input() initialData: Partial<MerchantFormData> = {};

  form: MerchantFormData = {
    merchantName: '', merchantNumber: '', lastFiveIban: '',
    tradeLicense: '', country: '', city: '', legalStructure: '',
    repName: '', repEmail: '', repPhone: '', termsAccepted: false,
    ...this.initialData,
  };

  @Output() submitClick = new EventEmitter<MerchantFormData>();
  @Output() backClick   = new EventEmitter<void>();

  get countrySelectOptions() { return this.countryOptions.map(c => ({ value: c, label: c })); }
  get citySelectOptions()    { return this.cityOptions.map(c => ({ value: c, label: c })); }
  get legalSelectOptions()   { return this.legalOptions.map(l => ({ value: l, label: l })); }
}