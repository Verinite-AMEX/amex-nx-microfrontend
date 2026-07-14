import { Component, Input, Output, EventEmitter, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FormFieldComponent } from '../../molecules/form-field';
import { InputComponent } from '../../atoms/input';
import { SelectComponent, SelectOption } from '../../atoms/select';
import { ButtonComponent } from '../../atoms/button';

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
  imports: [CommonModule, FormsModule, FormFieldComponent, InputComponent, SelectComponent, ButtonComponent],
  template: `
    <div class="cmf">
      <div class="cmf__form">
        <!-- Country Code -->
        <ui-form-field class="cmf__row" layout="horizontal" labelWidth="130px" label="Country Code" [required]="true" [forId]="id + '-country-code'">
          <ui-input
            [id]="id + '-country-code'"
            [required]="true"
            [readonly]="form.action === 'modify'"
            [(ngModel)]="form.countryCode"
            placeholder="e.g. 784">
          </ui-input>
        </ui-form-field>

        <!-- Country Name — dropdown on modify, text on add -->
        <ui-form-field class="cmf__row" layout="horizontal" labelWidth="130px" label="Country Name" [required]="form.action === 'addNew'" [forId]="id + '-country-name'">
          <ui-input
            *ngIf="form.action === 'addNew'"
            [id]="id + '-country-name'"
            [(ngModel)]="form.countryName"
            placeholder="Enter country name">
          </ui-input>
          <ui-select
            *ngIf="form.action === 'modify'"
            [id]="id + '-country-name'"
            [options]="countrySelectOptions"
            placeholder="-- Select --"
            [(ngModel)]="form.countryName"
            (ngModelChange)="onNameSelect($event)">
          </ui-select>
        </ui-form-field>

        <!-- Add New / Modify buttons — exact match to ONLS screenshot -->
        <div class="cmf__actions">
          <ui-button class="cmf__btn cmf__btn--addnew" variant="primary"
            [style.--btn-bg]="form.action === 'addNew' ? activeGradient : defaultGradient"
            [style.--btn-border]="form.action === 'addNew' ? '1px solid #002a6a' : '1px solid #005fba'"
            label="Add New"
            (click)="setAction('addNew')">
          </ui-button>
          <ui-button class="cmf__btn cmf__btn--modify" variant="primary"
            [style.--btn-bg]="form.action === 'modify' ? activeGradient : defaultGradient"
            [style.--btn-border]="form.action === 'modify' ? '1px solid #002a6a' : '1px solid #005fba'"
            label="Modify"
            (click)="setAction('modify')">
          </ui-button>
          <ui-button class="cmf__btn cmf__btn--save" variant="primary" label="Save" (click)="saveClick.emit(form)"></ui-button>
          <ui-button class="cmf__btn cmf__btn--cancel" variant="secondary" label="Cancel" (click)="cancelClick.emit()"></ui-button>
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
    .cmf__form { display: flex; flex-direction: column; gap: 0; }
    .cmf__row { padding: 6px 0; font-size: 13px; }

    /* Buttons — gradient blue matching ONLS SOC/ROC screenshots exactly */
    .cmf__actions { display: flex; gap: 6px; padding: 10px 0 4px 142px; flex-wrap: wrap; }
    .cmf__btn--addnew, .cmf__btn--modify, .cmf__btn--save {
      --btn-color: #fff; --btn-radius: 2px; --btn-padding: 4px 14px; --btn-font-size: 13px;
      --btn-border: 1px solid #005fba;
    }
    .cmf__btn--cancel {
      --btn-bg: linear-gradient(to bottom, #f5f5f5, #ddd);
      --btn-color: #333; --btn-border: 1px solid #bbb;
      --btn-radius: 2px; --btn-padding: 4px 14px; --btn-font-size: 13px;
    }
  `],
})
export class AmexCountryMasterFormComponent {
  private static _idCounter = 0;
  @HostBinding('attr.id') @Input() id = `country-master-form-${++AmexCountryMasterFormComponent._idCounter}`;

  @Input() countryOptions: { name: string; code: string }[] = [
    { name: 'UNITED ARAB EMIRATES', code: '784' },
    { name: 'BAHRAIN', code: '048' },
    { name: 'KUWAIT', code: '414' },
    { name: 'OMAN', code: '512' },
    { name: 'QATAR', code: '634' },
    { name: 'SAUDI ARABIA', code: '682' },
    { name: 'INDIA', code: '356' },
  ];

  readonly defaultGradient = 'linear-gradient(to bottom, #5ba3e0, #006fcf)';
  readonly activeGradient = 'linear-gradient(to bottom, #1a4a8a, #003a7a)';

  form: CountryMasterData = { action: 'addNew', countryCode: '', countryName: '' };

  @Output() saveClick   = new EventEmitter<CountryMasterData>();
  @Output() cancelClick = new EventEmitter<void>();

  get countrySelectOptions(): SelectOption[] {
    return this.countryOptions.map(c => ({ value: c.name, label: c.name }));
  }

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