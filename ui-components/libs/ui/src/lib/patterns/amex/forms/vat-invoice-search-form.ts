import { Component, Input, Output, EventEmitter, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PanelComponent } from '../../../composite/panel';
import { FormFieldComponent } from '../../../composite/form-field';
import { InputComponent } from '../../../primitives/input';
import { ButtonComponent } from '../../../primitives/button';

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
  imports: [CommonModule, FormsModule, PanelComponent, FormFieldComponent, InputComponent, ButtonComponent],
  template: `
    <ui-panel title="VAT Invoice Search" variant="accent">
      <!-- Customer type toggle -->
      <div class="visf__toggle-row">
        <ui-button class="visf__toggle-btn" [class.visf__toggle-btn--active]="form.customerType === 'corporate'"
          variant="secondary" label="Corporate" (click)="form.customerType = 'corporate'"></ui-button>
        <ui-button class="visf__toggle-btn" [class.visf__toggle-btn--active]="form.customerType === 'consumer'"
          variant="secondary" label="Consumer" (click)="form.customerType = 'consumer'"></ui-button>
      </div>

      <!-- Search mode tabs -->
      <div class="visf__mode-tabs">
        <ui-button class="visf__mode-tab" [class.visf__mode-tab--active]="form.searchMode === 'vatReg'"
          variant="secondary" label="VAT Reg No" (click)="form.searchMode = 'vatReg'"></ui-button>
        <ui-button class="visf__mode-tab" [class.visf__mode-tab--active]="form.searchMode === 'invoiceNo'"
          variant="secondary" label="Invoice No" (click)="form.searchMode = 'invoiceNo'"></ui-button>
        <ui-button class="visf__mode-tab" [class.visf__mode-tab--active]="form.searchMode === 'basicControl'"
          variant="secondary" label="Basic Control Account" (click)="form.searchMode = 'basicControl'"></ui-button>
      </div>

      <!-- Dynamic input based on mode -->
      <ui-form-field class="visf__field" [label]="inputLabel" [forId]="id + '-field'" layout="horizontal">
        <ui-input [id]="id + '-field'" [(ngModel)]="form.searchValue" [placeholder]="inputPlaceholder"></ui-input>
      </ui-form-field>

      <div class="visf__actions">
        <ui-button class="visf__btn visf__btn--back" variant="primary" label="Back" (click)="backClick.emit()"></ui-button>
        <ui-button class="visf__btn visf__btn--submit" variant="primary" label="Submit" (click)="submitClick.emit(form)"></ui-button>
      </div>
    </ui-panel>
  `,
  styles: [`
    :host {
      display: block;
      font-family: Arial, sans-serif;
      --panel-max-width: 480px;
      --panel-padding: 18px 22px;
      --input-border: 1px solid #ccc;
      --input-radius: 3px;
      --input-padding: 8px 12px;
      --input-focus-border-color: #7b1fa2;
    }

    /* Customer type toggle — two side-by-side buttons */
    .visf__toggle-row { display: flex; margin-bottom: 16px; border: 1px solid #ccc; border-radius: 4px; overflow: hidden; width: fit-content; }
    .visf__toggle-btn { --btn-bg: #f5f5f5; --btn-color: #555; --btn-radius: 0px; --btn-padding: 7px 24px; --btn-font-size: 13px; }
    .visf__toggle-btn--active { --btn-bg: #1e3a5f; --btn-color: #fff; }

    /* Mode tabs */
    .visf__mode-tabs { display: flex; gap: 2px; margin-bottom: 16px; flex-wrap: wrap; }
    .visf__mode-tab { --btn-bg: #f5f5f5; --btn-color: #555; --btn-radius: 3px; --btn-padding: 6px 14px; --btn-font-size: 12px; }
    .visf__mode-tab--active { --btn-bg: #1e3a5f; --btn-color: #fff; }

    /* Input row */
    .visf__field { margin-bottom: 16px; }

    /* Buttons */
    .visf__actions { display: flex; gap: 10px; }
    .visf__btn--back { --btn-bg: #1e3a5f; --btn-color: #fff; --btn-radius: 3px; --btn-padding: 9px 28px; --btn-font-size: 13px; }
    .visf__btn--submit { --btn-bg: #7b1fa2; --btn-color: #fff; --btn-radius: 3px; --btn-padding: 9px 28px; --btn-font-size: 13px; }
  `],
})
export class AmexVATInvoiceSearchFormComponent {
  private static _idCounter = 0;
  @HostBinding('attr.id') @Input() id = `vat-invoice-search-form-${++AmexVATInvoiceSearchFormComponent._idCounter}`;

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