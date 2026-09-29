// ============================================================
// FILE: libs/ui/src/lib/primitives/table-row.ts
// ============================================================
import {
  Component,
  Input,
  Output,
  EventEmitter,
  HostBinding,
  OnInit,
  inject,
} from '@angular/core';
import { NgIf } from '@angular/common';
import { TableComponent } from './table';

@Component({
  selector: 'ui-table-row',
  standalone: true,
  imports: [NgIf],
  template: `
    <tr
      [id]="id"
      [attr.aria-selected]="selected ? 'true' : null"
      [attr.tabindex]="clickable ? 0 : null"
      [class.expandable-row]="expandable"
      [style.cursor]="clickable ? 'pointer' : null"
      (click)="clickable && rowClick.emit()"
      (keydown.enter)="clickable && rowClick.emit()"
    >
      <td *ngIf="expandable" class="expand">
        <button
          type="button"
          class="collapsible icon-hover"
          [attr.aria-label]="
            (expanded ? 'Collapse ' : 'Expand ') + expandLabel
          "
          [attr.aria-expanded]="expanded"
          (click)="toggleExpanded($event)"
        >
          <span class="collapsible-caret"></span>
        </button>
      </td>
      <td *ngIf="!expandable && table?.hasExpandableRows" class="expand"></td>
      <ng-content></ng-content>
    </tr>
    <tr *ngIf="expandable" [attr.data-expand-id]="id">
      <td class="expanded-section" [attr.colspan]="expandColspan">
        <div class="accordion-content" [class.display-none]="!expanded">
          <ng-content select="[expandedContent]"></ng-content>
        </div>
      </td>
    </tr>
  `,
  styles: [
    `
      :host {
        display: contents;
      }
    `,
  ],
})
export class TableRowComponent implements OnInit {
  private static _idCounter = 0;
  @HostBinding('attr.id') @Input() id =
    `ui-table-row-${++TableRowComponent._idCounter}`;

  @Input() selected = false;

  /** Registers with the parent ui-table so DLS's `.table-row-link` modifier lands on <table>. */
  @Input() clickable = false;
  @Output() rowClick = new EventEmitter<void>();

  /** Renders DLS's expandable-row toggle + paired content row (`expandable-row` / `data-expand-id` pattern). */
  @Input() expandable = false;
  @Input() expanded = false;
  @Output() expandedChange = new EventEmitter<boolean>();
  /** Accessible label suffix for the expand/collapse button, e.g. the row's description. */
  @Input() expandLabel = '';
  /** colspan for the paired expanded-content row — should match this row's total column count. */
  @Input() expandColspan = 1;

  public table = inject(TableComponent, { optional: true });

  ngOnInit(): void {
    if (this.clickable) {
      this.table?.registerClickableRow();
    }
    if (this.expandable) {
      this.table?.registerExpandableRow();
    }
  }

  toggleExpanded(event: Event): void {
    event.stopPropagation();
    this.expanded = !this.expanded;
    this.expandedChange.emit(this.expanded);
  }
}