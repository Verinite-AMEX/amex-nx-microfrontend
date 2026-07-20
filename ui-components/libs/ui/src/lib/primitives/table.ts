// atoms/table.ts
import { Component, Input, HostBinding } from '@angular/core';
import { NgIf } from '@angular/common';

@Component({
  selector: 'ui-table',
  standalone: true,
  imports: [NgIf],
  template: `
    <table
      [id]="id"
      class="ui-table"
      [class.ui-table--bordered]="bordered"
      [class.ui-table--striped]="striped"
      [class.ui-table--compact]="compact"
      [attr.aria-label]="ariaLabel || null"
      [attr.aria-labelledby]="ariaLabelledBy || null"
      [attr.aria-describedby]="ariaDescribedBy || null"
    >
      <caption *ngIf="caption" class="ui-table__caption">{{ caption }}</caption>
      <ng-content></ng-content>
    </table>
  `,
  styles: [`
    .ui-table { width: 100%; border-collapse: collapse; font-family: Arial, sans-serif; font-size: 13px; }
    .ui-table__caption { text-align: left; padding: 4px 0; font-size: 12px; color: #666; }
    .ui-table--bordered th, .ui-table--bordered td { border: 1px solid var(--table-border-color, #e0e0e0); }
    .ui-table--striped tbody tr:nth-child(even) { background: var(--table-stripe-bg, #fafafa); }
    .ui-table--compact th, .ui-table--compact td { padding: 4px 8px; }
    :host { display: block; width: 100%; }
  `],
})
export class TableComponent {
  private static _idCounter = 0;
  @HostBinding('attr.id') @Input() id = `ui-table-${++TableComponent._idCounter}`;
  @Input() caption = '';
  @Input() bordered = false;
  @Input() striped = false;
  @Input() compact = false;
  @Input() ariaLabel = '';
  @Input() ariaLabelledBy = '';
  @Input() ariaDescribedBy = '';
}