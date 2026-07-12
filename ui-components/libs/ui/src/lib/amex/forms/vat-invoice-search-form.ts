import { Component, Input, Output, EventEmitter, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface VATInvoiceSearchData {
  customerType: 'corporate' | 'consumer';
  searchMode: 'vatReg' | 'invoiceNo' | 'basicControl';
  searchValue: string;
}

/**
 * VATInvoiceSearchForm
 * VAT Invoice portal: Corporate/Consumer toggle + 3 input mode tabs.
 * Source: VAT Invoice, OMS VAT Invoices
 * Style: OMS white card + purple accent + navy/purple buttons
 */
@Component({
  selector: 'amex-vat-invoice-search-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="visf">
      <div class="visf__title">VAT Invoice Search</div>
      <div class="visf__accent"></div>

      <div class="visf__panel">
        <!-- Customer type toggle -->
        <div class="visf__toggle-row">
          <button class="visf__toggle-btn"
            [class.visf__toggle-btn--active]="form.customerType === 'corporate'"
            (click)="form.customerType = 'corporate'">Corporate</button>
          <button class="visf__toggle-btn"
            [class.visf__toggle-btn--active]="form.customerType === 'consumer'"
            (click)="form.customerType = 'consumer'">Consumer</button>
        </div>

        <!-- Search mode tabs -->
        <div class="visf__mode-tabs">
          <button class="visf__mode-tab"
            [class.visf__mode-tab--active]="form.searchMode === 'vatReg'"
            (click)="form.searchMode = 'vatReg'">VAT Reg No</button>
          <button class="visf__mode-tab"
            [class.visf__mode-tab--active]="form.searchMode === 'invoiceNo'"
            (click)="form.searchMode = 'invoiceNo'">Invoice No</button>
          <button class="visf__mode-tab"
            [class.visf__mode-tab--active]="form.searchMode === 'basicControl'"
            (click)="form.searchMode = 'basicControl'">Basic Control Account</button>
        </div>

        <!-- Dynamic input label based on mode -->
        <div class="visf__input-row">
          <label class="visf__label" [for]="id + '-field'">{{ inputLabel }}</label>
          <input [id]="id + '-field'" class="visf__input" [(ngModel)]="form.searchValue"
            [placeholder]="inputPlaceholder" />
        </div>

        <div class="visf__actions">
          <button class="visf__btn visf__btn--back" (click)="backClick.emit()">Back</button>
          <button class="visf__btn visf__btn--submit" (click)="submitClick.emit(form)">Submit</button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host { display: block; font-family: Arial, sans-serif; }
    .visf__title { font-size: 15px; font-weight: bold; color: #1a3a6b; padding: 0 0 6px; }
    .visf__accent { height: 3px; background: #7b1fa2; margin-bottom: 14px; }
    .visf__panel { background: #fff; border: 1px solid #e0e0e0; border-radius: 3px; padding: 18px 22px; max-width: 480px; }

    /* Customer type toggle — two side-by-side buttons */
    .visf__toggle-row { display: flex; margin-bottom: 16px; border: 1px solid #ccc; border-radius: 4px; overflow: hidden; width: fit-content; }
    .visf__toggle-btn { padding: 7px 24px; font-size: 13px; border: none; cursor: pointer; background: #f5f5f5; color: #555; font-family: Arial, sans-serif; }
    .visf__toggle-btn--active { background: #1e3a5f; color: #fff; }

    /* Mode tabs */
    .visf__mode-tabs { display: flex; gap: 2px; margin-bottom: 16px; flex-wrap: wrap; }
    .visf__mode-tab { padding: 6px 14px; font-size: 12px; border: 1px solid #ccc; background: #f5f5f5; color: #555; cursor: pointer; font-family: Arial, sans-serif; border-radius: 3px; }
    .visf__mode-tab--active { background: #1e3a5f; color: #fff; border-color: #1e3a5f; }

    /* Input row */
    .visf__input-row { display: flex; align-items: center; gap: 12px; margin-bottom: 16px; }
    .visf__label { font-size: 13px; color: #1a3a6b; white-space: nowrap; min-width: 120px; }
    .visf__input { flex: 1; border: 1px solid #ccc; border-radius: 3px; padding: 8px 12px; font-size: 13px; font-family: Arial, sans-serif; outline: none; }
    .visf__input:focus { border-color: #7b1fa2; }

    /* Buttons */
    .visf__actions { display: flex; gap: 10px; }
    .visf__btn { padding: 9px 28px; font-size: 13px; font-weight: bold; border: none; border-radius: 3px; cursor: pointer; font-family: Arial, sans-serif; }
    .visf__btn--back   { background: #1e3a5f; color: #fff; }
    .visf__btn--back:hover { background: #16304f; }
    .visf__btn--submit { background: #7b1fa2; color: #fff; }
    .visf__btn--submit:hover { background: #6a1b9a; }
  `],
})
export class AmexVATInvoiceSearchFormComponent {
  private static _idCounter = 0;
  @HostBinding('attr.id') readonly id = `vat-invoice-search-form-${++AmexVATInvoiceSearchFormComponent._idCounter}`;


  form: VATInvoiceSearchData = { customerType: 'corporate', searchMode: 'vatReg', searchValue: '' };

  get inputLabel(): string {
    return { vatReg: 'VAT Reg No', invoiceNo: 'Invoice No', basicControl: 'Basic Control Account' }[this.form.searchMode];
  }
  get inputPlaceholder(): string {
    return { vatReg: 'Enter VAT Registration Number', invoiceNo: 'Enter Invoice Number', basicControl: 'Enter Basic Control Account' }[this.form.searchMode];
  }

  @Output() submitClick = new EventEmitter<VATInvoiceSearchData>();
  @Output() backClick   = new EventEmitter<void>();
}
