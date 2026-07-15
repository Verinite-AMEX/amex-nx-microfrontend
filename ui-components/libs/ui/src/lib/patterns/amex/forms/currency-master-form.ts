import { Component, Input, Output, EventEmitter, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FormFieldComponent } from '../../../composite/form-field';
import { InputComponent } from '../../../primitives/input';
import { SelectComponent, SelectOption } from '../../../primitives/select';
import { ButtonComponent } from '../../../primitives/button';

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
  imports: [CommonModule, FormsModule, FormFieldComponent, InputComponent, SelectComponent, ButtonComponent],
  template: `
    <div class="cumf">
      <div class="cumf__form">

        <ui-form-field class="cumf__row" layout="horizontal" labelWidth="140px" label="Currency Code" [required]="true" [forId]="id + '-currency-code'">
          <ui-input
            [id]="id + '-currency-code'"
            [required]="true"
            [readonly]="form.action === 'modify'"
            [(ngModel)]="form.currencyCode"
            placeholder="e.g. 001">
          </ui-input>
        </ui-form-field>

        <ui-form-field class="cumf__row" layout="horizontal" labelWidth="140px" label="Currency Name" [forId]="id + '-currency-name'">
          <ui-input
            *ngIf="form.action === 'addNew'"
            [id]="id + '-currency-name'"
            [(ngModel)]="form.currencyName"
            placeholder="Enter currency name">
          </ui-input>
          <ui-select
            *ngIf="form.action === 'modify'"
            [id]="id + '-currency-name'"
            [options]="currencySelectOptions"
            placeholder="-- Select --"
            [(ngModel)]="form.currencyName"
            (ngModelChange)="onNameSelect($event)">
          </ui-select>
        </ui-form-field>

        <ui-form-field class="cumf__row" layout="horizontal" labelWidth="140px" label="Short Name" [required]="true" [forId]="id + '-short-name'">
          <ui-input
            [id]="id + '-short-name'"
            [required]="true"
            [readonly]="form.action === 'modify'"
            [(ngModel)]="form.shortName"
            placeholder="e.g. USD">
          </ui-input>
        </ui-form-field>

        <ui-form-field class="cumf__row" layout="horizontal" labelWidth="140px" label="No. of Decimals" [required]="true" [forId]="id + '-no-of-decimals'">
          <ui-input
            [id]="id + '-no-of-decimals'"
            [required]="true"
            [readonly]="form.action === 'modify'"
            [(ngModel)]="form.noOfDecimals"
            placeholder="e.g. 2">
          </ui-input>
        </ui-form-field>

        <div class="cumf__actions">
          <ui-button class="cumf__btn cumf__btn--addnew" variant="primary"
            [style.--btn-bg]="form.action === 'addNew' ? activeGradient : defaultGradient"
            [style.--btn-border]="form.action === 'addNew' ? '1px solid #002a6a' : '1px solid #005fba'"
            label="Add New"
            (click)="setAction('addNew')">
          </ui-button>
          <ui-button class="cumf__btn cumf__btn--modify" variant="primary"
            [style.--btn-bg]="form.action === 'modify' ? activeGradient : defaultGradient"
            [style.--btn-border]="form.action === 'modify' ? '1px solid #002a6a' : '1px solid #005fba'"
            label="Modify"
            (click)="setAction('modify')">
          </ui-button>
          <ui-button class="cumf__btn cumf__btn--save" variant="primary" label="Save" (click)="saveClick.emit(form)"></ui-button>
          <ui-button class="cumf__btn cumf__btn--cancel" variant="secondary" label="Cancel" (click)="cancelClick.emit()"></ui-button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      font-family: Arial, sans-serif;
      --input-border: 1px solid #aaa;
      --input-radius: 0px;
      --input-padding: 4px 8px;
      --input-focus-border-color: #006fcf;
    }
    .cumf__form { display: flex; flex-direction: column; }
    .cumf__row { padding: 6px 0; }

    .cumf__actions { display: flex; gap: 6px; padding: 10px 0 4px 152px; flex-wrap: wrap; }
    .cumf__btn--addnew, .cumf__btn--modify, .cumf__btn--save {
      --btn-color: #fff; --btn-radius: 2px; --btn-padding: 4px 14px; --btn-font-size: 13px;
      --btn-border: 1px solid #005fba;
    }
    .cumf__btn--cancel {
      --btn-bg: linear-gradient(to bottom, #f5f5f5, #ddd);
      --btn-color: #333; --btn-border: 1px solid #bbb;
      --btn-radius: 2px; --btn-padding: 4px 14px; --btn-font-size: 13px;
    }
  `],
})
export class AmexCurrencyMasterFormComponent {
  private static _idCounter = 0;
  @HostBinding('attr.id') @Input() id = `currency-master-form-${++AmexCurrencyMasterFormComponent._idCounter}`;

  @Input() currencyOptions: { name: string; code: string; shortName: string; decimals: string }[] = [
    { name: 'US DOLLAR',      code: '001', shortName: 'USD', decimals: '2' },
    { name: 'UAE DIRHAM',     code: '002', shortName: 'AED', decimals: '2' },
    { name: 'BAHRAINI DINAR', code: '003', shortName: 'BHD', decimals: '3' },
    { name: 'KUWAITI DINAR',  code: '004', shortName: 'KWD', decimals: '3' },
    { name: 'OMANI RIYAL',    code: '005', shortName: 'OMR', decimals: '3' },
  ];

  readonly defaultGradient = 'linear-gradient(to bottom, #5ba3e0, #006fcf)';
  readonly activeGradient = 'linear-gradient(to bottom, #1a4a8a, #003a7a)';

  form: CurrencyMasterData = { action: 'addNew', currencyCode: '', currencyName: '', shortName: '', noOfDecimals: '' };

  @Output() saveClick   = new EventEmitter<CurrencyMasterData>();
  @Output() cancelClick = new EventEmitter<void>();

  get currencySelectOptions(): SelectOption[] {
    return this.currencyOptions.map(c => ({ value: c.name, label: c.name }));
  }

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