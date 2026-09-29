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
import { ButtonComponent } from '../../../primitives/button';

export interface AmexDropdownOption {
  value: string;
  label: string;
}

@Component({
  selector: 'amex-dropdown-filter',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    FormFieldComponent,
    SelectComponent,
    ButtonComponent,
  ],
  template: `
    <div class="df-wrap">
      <div class="df-row">
        <ui-form-field class="df-field" [label]="label" [forId]="id + '-field'">
          <ui-select
            [id]="id + '-field'"
            [options]="selectOptions"
            [placeholder]="placeholder"
            [ariaLabel]="label"
            [(ngModel)]="selectedValue"
          >
          </ui-select>
        </ui-form-field>
        <ui-button
          variant="primary"
          size="sm"
          [label]="buttonLabel"
          (click)="onApply()"
        ></ui-button>
        <ui-button
          *ngIf="selectedValue"
          class="df-reset"
          variant="ghost"
          size="sm"
          label="Reset"
          (click)="onReset()"
        ></ui-button>
      </div>
    </div>
  `,
  styles: [
    // The --btn-* CSS custom properties here used to skin the inner
    // <ui-button>, but button.ts has since been migrated to DLS's real
    // classes (ngClass, not CSS variables) — verified these vars are now
    // completely inert, so removed rather than leaving dead code that implies
    // intended styling that isn't actually happening. <ui-button>'s own
    // variant/size inputs already produce the correct DLS look on their own.
    //
    // font-family removed so DLS's global typography cascades in normally,
    // same as every other migrated component.
    //
    // DLS does have a `.filter` component family (filter.css), but it's a
    // full floating popover panel (open/close button, header with
    // back/reset/close actions, scrollable menu) — a fundamentally different
    // UX pattern from this component's always-visible inline select+buttons
    // row. Forcing this into that popover pattern would change the actual
    // behavior, not just the styling, so it wasn't used here. Flagging in
    // case an actual popover-style filter is wanted elsewhere later.
    `
      :host {
        display: block;
      }

      .df-wrap {
        padding: 8px 0;
      }

      .df-row {
        display: flex;
        align-items: flex-end;
        gap: 8px;
        flex-wrap: wrap;
      }

      .df-field {
        min-width: 160px;
      }
    `,
  ],
})
export class AmexDropdownFilterComponent {
  private static _idCounter = 0;
  @HostBinding('attr.id') @Input() id =
    `dropdown-filter-${++AmexDropdownFilterComponent._idCounter}`;

  @Input() label = 'Filter';
  @Input() placeholder = '-- Select --';
  @Input() buttonLabel = 'Apply';
  @Input() options: AmexDropdownOption[] = [];

  @Output() filterApplied = new EventEmitter<string>();
  @Output() filterReset = new EventEmitter<void>();

  selectedValue = '';

  get selectOptions(): SelectOption[] {
    return this.options.map((o) => ({ label: o.label, value: o.value }));
  }

  onApply() {
    this.filterApplied.emit(this.selectedValue as string);
  }

  onReset() {
    this.selectedValue = '';
    this.filterReset.emit();
  }
}