import { Component, Input, Output, EventEmitter, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface CurrencyMasterData {
  action: 'addNew' | 'modify';
  currencyCode: string;
  currencyName: string;
  shortName: string;
  noOfDecimals: string;
}

/**
 * CurrencyMasterForm
 * SOC/ROC Currency Master — Add New (free text) or Modify (autocomplete → code/rate auto-fill).
 * Source: SOC/ROC image10 — ONLS portal style, 4 fields (Code, Name, Short Name, Decimals)
 */
@Component({
  selector: 'amex-currency-master-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="cumf">
      <div class="cumf__form">

        <div class="cumf__row">
          <label class="cumf__label" [for]="id + '-currency-code'">Currency Code <span class="cumf__req">*</span></label>
          <input [id]="id + '-currency-code'" class="cumf__input"
            [(ngModel)]="form.currencyCode"
            [readonly]="form.action === 'modify'"
            [class.cumf__input--readonly]="form.action === 'modify'"
            placeholder="e.g. 001" />
        </div>

        <div class="cumf__row">
          <label class="cumf__label" [for]="id + '-currency-name'">Currency Name</label>
          <ng-container *ngIf="form.action === 'addNew'">
            <input [id]="id + '-currency-name'" class="cumf__input" [(ngModel)]="form.currencyName" placeholder="Enter currency name" />
          </ng-container>
          <ng-container *ngIf="form.action === 'modify'">
            <select class="cumf__select" [(ngModel)]="form.currencyName" (ngModelChange)="onNameSelect($event)">
              <option value="">-- Select --</option>
              <option *ngFor="let c of currencyOptions" [value]="c.name">{{ c.name }}</option>
            </select>
          </ng-container>
        </div>

        <div class="cumf__row">
          <label class="cumf__label" [for]="id + '-short-name'">Short Name <span class="cumf__req">*</span></label>
          <input [id]="id + '-short-name'" class="cumf__input"
            [(ngModel)]="form.shortName"
            [readonly]="form.action === 'modify'"
            [class.cumf__input--readonly]="form.action === 'modify'"
            placeholder="e.g. USD" />
        </div>

        <div class="cumf__row">
          <label class="cumf__label" [for]="id + '-no-of-decimals'">No. of Decimals <span class="cumf__req">*</span></label>
          <input [id]="id + '-no-of-decimals'" class="cumf__input"
            [(ngModel)]="form.noOfDecimals"
            [readonly]="form.action === 'modify'"
            [class.cumf__input--readonly]="form.action === 'modify'"
            placeholder="e.g. 2" />
        </div>

        <div class="cumf__actions">
          <button class="cumf__btn cumf__btn--addnew"
            [class.cumf__btn--active]="form.action === 'addNew'"
            (click)="setAction('addNew')">Add New</button>
          <button class="cumf__btn cumf__btn--modify"
            [class.cumf__btn--active]="form.action === 'modify'"
            (click)="setAction('modify')">Modify</button>
          <button class="cumf__btn cumf__btn--save" (click)="saveClick.emit(form)">Save</button>
          <button class="cumf__btn cumf__btn--cancel" (click)="cancelClick.emit()">Cancel</button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host { display: block; font-family: Arial, sans-serif; }
    .cumf__form { display: flex; flex-direction: column; }
    .cumf__row { display: flex; align-items: center; gap: 12px; padding: 6px 0; }
    .cumf__label { width: 140px; flex-shrink: 0; text-align: right; font-size: 13px; color: #333; }
    .cumf__req { color: #c62828; margin-left: 2px; }
    .cumf__input {
      border: 1px solid #aaa; padding: 4px 8px; font-size: 13px;
      font-family: Arial, sans-serif; width: 200px; outline: none;
    }
    .cumf__input:focus { border-color: #006fcf; }
    .cumf__input--readonly { background: #f0f0f0; color: #888; cursor: not-allowed; }
    .cumf__select {
      border: 1px solid #aaa; padding: 4px 8px; font-size: 13px;
      font-family: Arial, sans-serif; width: 200px; background: #fff; outline: none;
    }
    .cumf__select:focus { border-color: #006fcf; }
    .cumf__actions { display: flex; gap: 6px; padding: 10px 0 4px 152px; flex-wrap: wrap; }
    .cumf__btn {
      padding: 4px 14px; font-size: 13px; cursor: pointer;
      font-family: Arial, sans-serif; border-radius: 2px;
    }
    .cumf__btn--addnew, .cumf__btn--modify, .cumf__btn--save {
      background: linear-gradient(to bottom, #5ba3e0, #006fcf);
      color: #fff; border: 1px solid #005fba;
    }
    .cumf__btn--addnew:hover, .cumf__btn--modify:hover, .cumf__btn--save:hover {
      background: linear-gradient(to bottom, #4a92cf, #0058a6);
    }
    .cumf__btn--active {
      background: linear-gradient(to bottom, #1a4a8a, #003a7a) !important;
      border-color: #002a6a !important;
    }
    .cumf__btn--cancel {
      background: linear-gradient(to bottom, #f5f5f5, #ddd);
      color: #333; border: 1px solid #bbb;
    }
  `],
})
export class AmexCurrencyMasterFormComponent {
  private static _idCounter = 0;
  @HostBinding('attr.id') readonly id = `currency-master-form-${++AmexCurrencyMasterFormComponent._idCounter}`;


  @Input() currencyOptions: { name: string; code: string; shortName: string; decimals: string }[] = [
    { name: 'US DOLLAR',      code: '001', shortName: 'USD', decimals: '2' },
    { name: 'UAE DIRHAM',     code: '002', shortName: 'AED', decimals: '2' },
    { name: 'BAHRAINI DINAR', code: '003', shortName: 'BHD', decimals: '3' },
    { name: 'KUWAITI DINAR',  code: '004', shortName: 'KWD', decimals: '3' },
    { name: 'OMANI RIYAL',    code: '005', shortName: 'OMR', decimals: '3' },
  ];

  form: CurrencyMasterData = { action: 'addNew', currencyCode: '', currencyName: '', shortName: '', noOfDecimals: '' };

  @Output() saveClick   = new EventEmitter<CurrencyMasterData>();
  @Output() cancelClick = new EventEmitter<void>();

  setAction(action: 'addNew' | 'modify') {
    this.form.action = action;
    this.form.currencyCode = '';
    this.form.currencyName = '';
    this.form.shortName = '';
    this.form.noOfDecimals = '';
  }

  onNameSelect(name: string) {
    const found = this.currencyOptions.find(c => c.name === name);
    if (found) {
      this.form.currencyCode = found.code;
      this.form.shortName    = found.shortName;
      this.form.noOfDecimals = found.decimals;
    }
  }
}
