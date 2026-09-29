import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  HostBinding,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FormFieldComponent } from '../../form-field';
import { SelectComponent, SelectOption } from '../../../primitives/select';
import { ButtonComponent } from '../../../primitives/button';

export interface AmexMonthYear {
  year: number;
  month: number;
}

@Component({
  selector: 'amex-month-year-selector',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    FormFieldComponent,
    SelectComponent,
    ButtonComponent,
  ],
  template: `
    <div class="mys-wrap">
      <div class="mys-row">
        <ui-form-field class="mys-field" label="Year" [forId]="id + '-year'">
          <ui-select
            [id]="id + '-year'"
            [options]="yearOptions"
            ariaLabel="Year"
            [(ngModel)]="selectedYear"
          ></ui-select>
        </ui-form-field>
        <ui-form-field class="mys-field" label="Month" [forId]="id + '-month'">
          <ui-select
            [id]="id + '-month'"
            [options]="monthOptions"
            ariaLabel="Month"
            [(ngModel)]="selectedMonth"
          ></ui-select>
        </ui-form-field>
        <ui-button
          variant="primary"
          size="sm"
          [label]="buttonLabel"
          (click)="onSubmit()"
        ></ui-button>
      </div>
    </div>
  `,
  styles: [
    // --btn-* vars removed — confirmed dead now that button.ts uses DLS's
    // real ngClass-based styling, not CSS variables. font-family removed so
    // DLS's global typography cascades normally.
    `
      :host {
        display: block;
      }

      .mys-wrap {
        padding: 8px 0;
      }

      .mys-row {
        display: flex;
        align-items: flex-end;
        gap: 10px;
        flex-wrap: wrap;
      }

      .mys-field {
        width: 140px;
      }
    `,
  ],
})
export class AmexMonthYearSelectorComponent implements OnInit {
  private static _idCounter = 0;
  @HostBinding('attr.id') @Input() id =
    `month-year-selector-${++AmexMonthYearSelectorComponent._idCounter}`;

  @Input() buttonLabel = 'Submit';
  @Input() startYear = 2020;
  @Input() endYear = new Date().getFullYear();

  @Output() selected = new EventEmitter<AmexMonthYear>();

  yearOptions: SelectOption[] = [];
  selectedYear: number = new Date().getFullYear();
  selectedMonth: number = new Date().getMonth() + 1;

  monthOptions: SelectOption[] = [
    { value: 1, label: 'January' },
    { value: 2, label: 'February' },
    { value: 3, label: 'March' },
    { value: 4, label: 'April' },
    { value: 5, label: 'May' },
    { value: 6, label: 'June' },
    { value: 7, label: 'July' },
    { value: 8, label: 'August' },
    { value: 9, label: 'September' },
    { value: 10, label: 'October' },
    { value: 11, label: 'November' },
    { value: 12, label: 'December' },
  ];

  ngOnInit() {
    const years: SelectOption[] = [];
    for (let y = this.endYear; y >= this.startYear; y--) {
      years.push({ value: y, label: String(y) });
    }
    this.yearOptions = years;
  }

  onSubmit() {
    this.selected.emit({
      year: Number(this.selectedYear),
      month: Number(this.selectedMonth),
    });
  }
}