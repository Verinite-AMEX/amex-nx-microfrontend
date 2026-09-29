import {
  Component,
  Input,
  Output,
  EventEmitter,
  HostBinding,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FormFieldComponent } from '../../form-field';
import { SelectComponent, SelectOption } from '../../../primitives/select';
import {
  RadioGroupComponent,
  RadioOption,
} from '../../../primitives/radio-group';
import { InputComponent } from '../../../primitives/input';
import { DateInputComponent } from '../../../primitives/date-input';
import { ButtonComponent } from '../../../primitives/button';

export interface AmexReportTypeOption {
  value: string;
  label: string;
  secondaryFields?: AmexSecondaryField[];
}

export interface AmexSecondaryField {
  key: string;
  label: string;
  type: 'text' | 'date' | 'select';
  options?: { value: string; label: string }[];
}

@Component({
  selector: 'amex-report-type-selector',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    FormFieldComponent,
    SelectComponent,
    RadioGroupComponent,
    InputComponent,
    DateInputComponent,
    ButtonComponent,
  ],
  template: `
    <div class="rts-wrap">
      <!-- Radio mode -->
      <ui-radio-group
        *ngIf="mode === 'radio'"
        class="rts-radios"
        [legend]="label"
        name="reportType"
        [options]="radioOptions"
        [(ngModel)]="selectedValue"
        (ngModelChange)="onSelectByValue()"
      >
      </ui-radio-group>

      <!-- Dropdown mode -->
      <ui-form-field
        *ngIf="mode === 'dropdown'"
        class="rts-dropdown-row"
        [label]="label"
        [forId]="id + '-select'"
      >
        <ui-select
          [id]="id + '-select'"
          [options]="dropdownOptions"
          placeholder="-- Select --"
          [ariaLabel]="label"
          [(ngModel)]="selectedValue"
          (ngModelChange)="onSelectByValue()"
        >
        </ui-select>
      </ui-form-field>

      <!-- Dynamic secondary fields based on selected type -->
      <div
        class="rts-secondary"
        *ngIf="selectedOption?.secondaryFields?.length"
      >
        <ui-form-field
          class="rts-field"
          *ngFor="let field of selectedOption!.secondaryFields"
          [label]="field.label"
          [forId]="id + '-' + field.key"
        >
          <ui-input
            *ngIf="field.type === 'text'"
            [id]="id + '-' + field.key"
            type="text"
            [ariaLabel]="field.label"
            [(ngModel)]="secondaryValues[field.key]"
          >
          </ui-input>

          <ui-date-input
            *ngIf="field.type === 'date'"
            [id]="id + '-' + field.key"
            [ariaLabel]="field.label"
            [(ngModel)]="secondaryValues[field.key]"
          >
          </ui-date-input>

          <ui-select
            *ngIf="field.type === 'select'"
            [id]="id + '-' + field.key"
            [options]="field.options || []"
            placeholder="-- Select --"
            [ariaLabel]="field.label"
            [(ngModel)]="secondaryValues[field.key]"
          >
          </ui-select>
        </ui-form-field>
      </div>

      <div class="rts-actions" *ngIf="showSubmit">
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

      .rts-wrap {
        padding: 8px 0;
      }

      .rts-dropdown-row {
        max-width: 260px;
      }

      .rts-secondary {
        margin-top: 10px;
        padding: 10px 14px;
        background: #f7f8f9;
        border: 1px solid #ecedee;
        border-radius: 4px;
        display: flex;
        flex-wrap: wrap;
        gap: 12px;
      }

      .rts-field {
        min-width: 140px;
      }

      .rts-actions {
        margin-top: 10px;
      }
    `,
  ],
})
export class AmexReportTypeSelectorComponent {
  private static _idCounter = 0;
  @HostBinding('attr.id') @Input() id =
    `report-type-selector-${++AmexReportTypeSelectorComponent._idCounter}`;

  @Input() label = 'Report Type';
  @Input() mode: 'radio' | 'dropdown' = 'dropdown';
  @Input() options: AmexReportTypeOption[] = [];
  @Input() showSubmit = true;
  @Input() buttonLabel = 'Submit';

  @Output() typeSelected = new EventEmitter<{
    type: string;
    fields: Record<string, string>;
  }>();

  selectedValue = '';
  selectedOption: AmexReportTypeOption | null = null;
  secondaryValues: Record<string, string> = {};

  get radioOptions(): RadioOption[] {
    return this.options.map((o) => ({ label: o.label, value: o.value }));
  }

  get dropdownOptions(): SelectOption[] {
    return this.options.map((o) => ({ label: o.label, value: o.value }));
  }

  onSelectByValue() {
    this.selectedOption =
      this.options.find((o) => o.value === this.selectedValue) ?? null;
    this.secondaryValues = {};
  }

  onSubmit() {
    this.typeSelected.emit({
      type: this.selectedValue,
      fields: { ...this.secondaryValues },
    });
  }
}