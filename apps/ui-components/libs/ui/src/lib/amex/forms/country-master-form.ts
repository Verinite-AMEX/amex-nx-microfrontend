import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface CountryMasterData {
  action: 'addNew' | 'modify';
  countryCode: string;
  countryName: string;
}

/**
 * CountryMasterForm
 * SOC/ROC Country Master — Add New (free text) or Modify (autocomplete name → code auto-fills).
 * Source: SOC/ROC image7/image8 — ONLS portal style, gradient blue Save button
 */
@Component({
  selector: 'amex-country-master-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="cmf">
      <div class="cmf__form">
        <!-- Country Code -->
        <div class="cmf__row">
          <label class="cmf__label" [for]="id + '-country-code'">Country Code <span class="cmf__req">*</span></label>
          <input [id]="id + '-country-code'" class="cmf__input"
            [(ngModel)]="form.countryCode"
            [readonly]="form.action === 'modify'"
            [class.cmf__input--readonly]="form.action === 'modify'"
            placeholder="e.g. 784" />
        </div>

        <!-- Country Name — dropdown on modify, text on add -->
        <div class="cmf__row">
          <label class="cmf__label" [for]="id + '-country-name'">Country Name <span class="cmf__req" *ngIf="form.action === 'addNew'">*</span></label>
          <ng-container *ngIf="form.action === 'addNew'">
            <input [id]="id + '-country-name'" class="cmf__input" [(ngModel)]="form.countryName" placeholder="Enter country name" />
          </ng-container>
          <ng-container *ngIf="form.action === 'modify'">
            <select class="cmf__select" [(ngModel)]="form.countryName" (ngModelChange)="onNameSelect($event)">
              <option value="">-- Select --</option>
              <option *ngFor="let c of countryOptions" [value]="c.name">{{ c.name }}</option>
            </select>
          </ng-container>
        </div>

        <!-- Add New / Modify buttons — exact match to ONLS screenshot -->
        <div class="cmf__actions">
          <button class="cmf__btn cmf__btn--addnew"
            [class.cmf__btn--active]="form.action === 'addNew'"
            (click)="setAction('addNew')">Add New</button>
          <button class="cmf__btn cmf__btn--modify"
            [class.cmf__btn--active]="form.action === 'modify'"
            (click)="setAction('modify')">Modify</button>
          <button class="cmf__btn cmf__btn--save" (click)="saveClick.emit(form)">Save</button>
          <button class="cmf__btn cmf__btn--cancel" (click)="cancelClick.emit()">Cancel</button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host { display: block; font-family: Arial, sans-serif; }
    .cmf__form { display: flex; flex-direction: column; gap: 0; }

    .cmf__row {
      display: flex; align-items: center; gap: 12px;
      padding: 6px 0; font-size: 13px;
    }
    .cmf__label {
      width: 130px; flex-shrink: 0; text-align: right;
      font-size: 13px; color: #333;
    }
    .cmf__req { color: #c62828; margin-left: 2px; }

    .cmf__input {
      border: 1px solid #aaa; padding: 4px 8px;
      font-size: 13px; font-family: Arial, sans-serif;
      width: 200px; outline: none;
    }
    .cmf__input:focus { border-color: #006fcf; }
    .cmf__input--readonly { background: #f0f0f0; color: #888; cursor: not-allowed; }

    .cmf__select {
      border: 1px solid #aaa; padding: 4px 8px;
      font-size: 13px; font-family: Arial, sans-serif;
      width: 200px; background: #fff; outline: none; cursor: pointer;
    }
    .cmf__select:focus { border-color: #006fcf; }

    /* Buttons — gradient blue matching ONLS SOC/ROC screenshots exactly */
    .cmf__actions { display: flex; gap: 6px; padding: 10px 0 4px 142px; flex-wrap: wrap; }
    .cmf__btn {
      padding: 4px 14px; font-size: 13px; cursor: pointer;
      font-family: Arial, sans-serif; border-radius: 2px;
    }
    .cmf__btn--addnew, .cmf__btn--modify, .cmf__btn--save {
      background: linear-gradient(to bottom, #5ba3e0, #006fcf);
      color: #fff; border: 1px solid #005fba;
    }
    .cmf__btn--addnew:hover, .cmf__btn--modify:hover, .cmf__btn--save:hover {
      background: linear-gradient(to bottom, #4a92cf, #0058a6);
    }
    .cmf__btn--active {
      background: linear-gradient(to bottom, #1a4a8a, #003a7a) !important;
      border-color: #002a6a !important;
    }
    .cmf__btn--cancel {
      background: linear-gradient(to bottom, #f5f5f5, #ddd);
      color: #333; border: 1px solid #bbb;
    }
    .cmf__btn--cancel:hover { background: linear-gradient(to bottom, #eee, #ccc); }
  `],
})
export class AmexCountryMasterFormComponent {
  private static _idCounter = 0;
  @HostBinding('attr.id') readonly id = `country-master-form-${++AmexCountryMasterFormComponent._idCounter}`;


  @Input() countryOptions: { name: string; code: string }[] = [
    { name: 'UNITED ARAB EMIRATES', code: '784' },
    { name: 'BAHRAIN', code: '048' },
    { name: 'KUWAIT', code: '414' },
    { name: 'OMAN', code: '512' },
    { name: 'QATAR', code: '634' },
    { name: 'SAUDI ARABIA', code: '682' },
    { name: 'INDIA', code: '356' },
  ];

  form: CountryMasterData = { action: 'addNew', countryCode: '', countryName: '' };

  @Output() saveClick   = new EventEmitter<CountryMasterData>();
  @Output() cancelClick = new EventEmitter<void>();

  setAction(action: 'addNew' | 'modify') {
    this.form.action = action;
    this.form.countryCode = '';
    this.form.countryName = '';
  }

  onNameSelect(name: string) {
    const found = this.countryOptions.find(c => c.name === name);
    if (found) this.form.countryCode = found.code;
  }
}
