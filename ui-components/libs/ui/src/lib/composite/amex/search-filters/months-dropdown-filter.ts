import { Component, Input, Output, EventEmitter, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FormFieldComponent } from '../../form-field';
import { SelectComponent, SelectOption } from '../../../primitives/select';
import { ButtonComponent } from '../../../primitives/button';

/**
 * AmexMonthsDropdownFilterComponent
 * Dropdown to select number of months for Settlement & Submissions data.
 * Source: OMS Portal — Settlement and Submissions (all roles).
 */
@Component({
  selector: 'amex-months-dropdown-filter',
  standalone: true,
  imports: [CommonModule, FormsModule, FormFieldComponent, SelectComponent, ButtonComponent],
  template: `
    <div class="mdf-wrap">
      <div class="mdf-row">
        <ui-form-field class="mdf-field" [label]="label" [hint]="hint" [forId]="id + '-field'">
          <ui-select [id]="id + '-field'" [options]="monthSelectOptions" [ariaLabel]="label" [(ngModel)]="selectedMonths"></ui-select>
        </ui-form-field>
        <ui-button variant="primary" size="sm" [label]="buttonLabel" (click)="onSubmit()"></ui-button>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      font-family: Arial, sans-serif;
      --btn-bg: linear-gradient(to bottom, #2a84e0, #1462b8);
      --btn-color: #fff;
      --btn-border: 1px solid #1050a0;
      --btn-radius: 2px;
      --btn-padding: 4px 14px;
      --btn-font-size: 12px;
    }

    .mdf-wrap { padding: 8px 0; }

    .mdf-row {
      display: flex;
      align-items: flex-end;
      gap: 8px;
      flex-wrap: wrap;
    }

    .mdf-field { width: 150px; }
  `],
})
export class AmexMonthsDropdownFilterComponent {
  private static _idCounter = 0;
  @HostBinding('attr.id') @Input() id = `months-dropdown-filter-${++AmexMonthsDropdownFilterComponent._idCounter}`;

  @Input() label = 'Select Months';
  @Input() buttonLabel = 'Submit';
  @Input() hint = '';
  @Input() monthOptions: number[] = [1, 2, 3, 6, 12];

  @Output() monthsSelected = new EventEmitter<number>();

  selectedMonths = 1;

  get monthSelectOptions(): SelectOption[] {
    return this.monthOptions.map(m => ({ value: m, label: `${m} ${m === 1 ? 'Month' : 'Months'}` }));
  }

  onSubmit() {
    this.monthsSelected.emit(Number(this.selectedMonths));
  }
}