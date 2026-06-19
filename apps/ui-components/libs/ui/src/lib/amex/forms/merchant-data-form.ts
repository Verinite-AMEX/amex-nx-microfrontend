import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

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
  imports: [CommonModule, FormsModule],
  template: `
    <div class="mdf">
      <div class="mdf__title">{{ title }}</div>
      <div class="mdf__accent"></div>

      <div class="mdf__panel">

        <div class="mdf__section-label">Merchant Information</div>

        <div class="mdf__two-col">
          <div class="mdf__field">
            <label class="mdf__label">Merchant Name <span class="mdf__req">*</span></label>
            <input class="mdf__input" [(ngModel)]="form.merchantName" placeholder="Enter merchant name" />
          </div>
          <div class="mdf__field">
            <label class="mdf__label">Merchant Number <span class="mdf__req">*</span></label>
            <input class="mdf__input" [(ngModel)]="form.merchantNumber" placeholder="Enter merchant number" />
          </div>
        </div>

        <div class="mdf__two-col">
          <div class="mdf__field">
            <label class="mdf__label">Last 5 IBAN Digits <span class="mdf__req">*</span></label>
            <input class="mdf__input" [(ngModel)]="form.lastFiveIban" maxlength="5" placeholder="XXXXX" />
          </div>
          <div class="mdf__field">
            <label class="mdf__label">Trade Licence / CR No.</label>
            <input class="mdf__input" [(ngModel)]="form.tradeLicense" placeholder="Enter trade licence" />
          </div>
        </div>

        <div class="mdf__two-col">
          <div class="mdf__field">
            <label class="mdf__label">Country <span class="mdf__req">*</span></label>
            <select class="mdf__select" [(ngModel)]="form.country">
              <option value="">-- Select Country --</option>
              <option *ngFor="let c of countryOptions" [value]="c">{{ c }}</option>
            </select>
          </div>
          <div class="mdf__field">
            <label class="mdf__label">City <span class="mdf__req">*</span></label>
            <select class="mdf__select" [(ngModel)]="form.city">
              <option value="">-- Select City --</option>
              <option *ngFor="let c of cityOptions" [value]="c">{{ c }}</option>
            </select>
          </div>
        </div>

        <div class="mdf__field">
          <label class="mdf__label">Business Legal Structure <span class="mdf__req">*</span></label>
          <select class="mdf__select mdf__select--wide" [(ngModel)]="form.legalStructure">
            <option value="">-- Select --</option>
            <option *ngFor="let l of legalOptions" [value]="l">{{ l }}</option>
          </select>
        </div>

        <div class="mdf__section-label" style="margin-top:16px">Representative Information</div>

        <div class="mdf__two-col">
          <div class="mdf__field">
            <label class="mdf__label">Representative Name</label>
            <input class="mdf__input" [(ngModel)]="form.repName" placeholder="Full name" />
          </div>
          <div class="mdf__field">
            <label class="mdf__label">Email</label>
            <input class="mdf__input" [(ngModel)]="form.repEmail" type="email" placeholder="Email address" />
          </div>
        </div>

        <div class="mdf__field">
          <label class="mdf__label">Phone</label>
          <input class="mdf__input" [(ngModel)]="form.repPhone" placeholder="+971 XX XXX XXXX" />
        </div>

        <!-- T&C checkbox -->
        <div class="mdf__tc-row">
          <input type="checkbox" [(ngModel)]="form.termsAccepted" id="mdf-tc" class="mdf__checkbox" />
          <label for="mdf-tc" class="mdf__tc-label">
            I accept the <span class="mdf__tc-link">Terms &amp; Conditions</span>
          </label>
        </div>

        <!-- Buttons -->
        <div class="mdf__actions">
          <button class="mdf__btn mdf__btn--back" (click)="backClick.emit()">{{ backLabel }}</button>
          <button class="mdf__btn mdf__btn--submit"
            [disabled]="!form.termsAccepted"
            (click)="submitClick.emit(form)">{{ submitLabel }}</button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host { display: block; font-family: Arial, sans-serif; }
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
    .mdf__label { display: block; font-size: 13px; color: #333; margin-bottom: 5px; }
    .mdf__req { color: #c62828; }
    .mdf__input {
      width: 100%; box-sizing: border-box;
      border: 1px solid #ccc; border-radius: 3px;
      padding: 8px 10px; font-size: 13px;
      font-family: Arial, sans-serif; outline: none;
    }
    .mdf__input:focus { border-color: #7b1fa2; }
    .mdf__select {
      width: 100%; box-sizing: border-box;
      border: 1px solid #ccc; border-radius: 3px;
      padding: 8px 10px; font-size: 13px;
      font-family: Arial, sans-serif; background: #fff; outline: none;
    }
    .mdf__select:focus { border-color: #7b1fa2; }
    .mdf__select--wide { max-width: 340px; }

    .mdf__tc-row { display: flex; align-items: center; gap: 8px; margin: 16px 0 4px; }
    .mdf__checkbox { width: 16px; height: 16px; cursor: pointer; }
    .mdf__tc-label { font-size: 13px; color: #333; cursor: pointer; }
    .mdf__tc-link { color: #7b1fa2; text-decoration: underline; cursor: pointer; }

    .mdf__actions { display: flex; gap: 12px; margin-top: 16px; }
    .mdf__btn { padding: 10px 32px; font-size: 14px; font-weight: bold; border: none; border-radius: 3px; cursor: pointer; font-family: Arial, sans-serif; }
    .mdf__btn--back   { background: #1e3a5f; color: #fff; }
    .mdf__btn--back:hover { background: #16304f; }
    .mdf__btn--submit { background: #7b1fa2; color: #fff; }
    .mdf__btn--submit:hover:not([disabled]) { background: #6a1b9a; }
    .mdf__btn--submit[disabled] { opacity: 0.45; cursor: not-allowed; }
  `],
})
export class AmexMerchantDataFormComponent {
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
}
