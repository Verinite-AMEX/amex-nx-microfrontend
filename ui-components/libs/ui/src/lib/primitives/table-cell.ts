// table-cell.ts
import {
  Component,
  Input,
  Output,
  EventEmitter,
  HostBinding,
} from '@angular/core';
import { NgIf } from '@angular/common';

@Component({
  selector: 'ui-table-cell',
  standalone: true,
  imports: [NgIf],
  template: `
    <td
      *ngIf="!checkable"
      [id]="id"
      [attr.colspan]="colspan || null"
      [attr.rowspan]="rowspan || null"
      [class.text-align-right]="align === 'right'"
      [class.text-align-center]="align === 'center'"
      [class.text-nowrap]="nowrap"
    >
      <ng-content></ng-content>
    </td>
    <td *ngIf="checkable" [id]="id" class="checkable">
      <div class="checkbox">
        <input
          [id]="id + '-input'"
          type="checkbox"
          [checked]="checked"
          [indeterminate]="indeterminate"
          [attr.aria-checked]="indeterminate ? 'mixed' : null"
          (change)="onCheckedChange($event)"
        />
        <label [attr.for]="id + '-input'">
          <span class="sr-only">{{ checkboxLabel }}</span>
        </label>
      </div>
    </td>
  `,
  styles: [
    `
      :host {
        display: contents;
      }
    `,
  ],
})
export class TableCellComponent {
  private static _idCounter = 0;
  @HostBinding('attr.id') @Input() id =
    `ui-table-cell-${++TableCellComponent._idCounter}`;
  @Input() align: 'left' | 'center' | 'right' = 'left';
  @Input() colspan?: number;
  @Input() rowspan?: number;
  @Input() nowrap = false;

  /** Renders DLS's checkable-column pattern: `<td class="checkable"><div class="checkbox">...`. Works in both thead and tbody rows, matching DLS's own demo markup. */
  @Input() checkable = false;
  @Input() checked = false;
  @Input() indeterminate = false;
  /** Visually-hidden label for the checkbox, e.g. the row's identifying text, or "Select All" for the header checkbox. */
  @Input() checkboxLabel = '';
  @Output() checkedChange = new EventEmitter<boolean>();

  onCheckedChange(event: Event): void {
    const value = (event.target as HTMLInputElement).checked;
    this.checked = value;
    this.checkedChange.emit(value);
  }
}