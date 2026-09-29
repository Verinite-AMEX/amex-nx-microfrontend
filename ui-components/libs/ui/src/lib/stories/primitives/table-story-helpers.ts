// libs/ui/src/lib/stories/primitives/table-story-helpers.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent, dlsDefaultSort } from '../../primitives/table';
import { TableHeadComponent } from '../../primitives/table-head';
import { TableBodyComponent } from '../../primitives/table-body';
import { TableRowComponent } from '../../primitives/table-row';
import {
  TableHeaderCellComponent,
  SortDirection,
} from '../../primitives/table-header-cell';
import { TableCellComponent } from '../../primitives/table-cell';

// ---- Sortable (matches DLS's "Example - Sortable Table") ----

interface SortRow {
  date: string;
  description: string;
  amount: string;
}

@Component({
  selector: 'story-sortable-table',
  standalone: true,
  imports: [
    CommonModule,
    TableComponent,
    TableHeadComponent,
    TableBodyComponent,
    TableRowComponent,
    TableHeaderCellComponent,
    TableCellComponent,
  ],
  template: `
    <ui-table [bordered]="true">
      <ui-table-head>
        <ui-table-row>
          <ui-table-header-cell
            [sortable]="true"
            [sortDirection]="sortKey === 'date' ? sortDir : null"
            (sortClick)="sort('date')"
            >Date</ui-table-header-cell
          >
          <ui-table-header-cell
            [sortable]="true"
            [sortDirection]="sortKey === 'description' ? sortDir : null"
            (sortClick)="sort('description')"
            >Description</ui-table-header-cell
          >
          <ui-table-header-cell
            align="right"
            [sortable]="true"
            [sortDirection]="sortKey === 'amount' ? sortDir : null"
            (sortClick)="sort('amount')"
            >Amount</ui-table-header-cell
          >
        </ui-table-row>
      </ui-table-head>
      <ui-table-body>
        <ui-table-row *ngFor="let row of rows">
          <ui-table-cell>{{ row.date }}</ui-table-cell>
          <ui-table-cell>{{ row.description }}</ui-table-cell>
          <ui-table-cell align="right">{{ row.amount }}</ui-table-cell>
        </ui-table-row>
      </ui-table-body>
    </ui-table>
  `,
})
export class StorySortableTableComponent {
  sortKey: keyof SortRow | null = 'description';
  sortDir: SortDirection = 'ascending';

  rows: SortRow[] = [
    { date: 'Jan 05, 2020', description: "SAINSBURY'S ONLINE-GOL LON", amount: '$8.76' },
    { date: 'Mar 16, 2020', description: 'Online Payment', amount: '$300' },
    { date: 'Oct 01, 2020', description: 'Music Enterprise In', amount: '$10.67' },
    { date: 'Mar 15, 2020', description: "Martin's News Shops Wellington", amount: '$32.99' },
    { date: 'Apr 14, 2020', description: 'SWISS Intl Air Lines Basel CH', amount: '$5,000.00' },
  ];

  sort(key: keyof SortRow): void {
    const nextDir: SortDirection =
      this.sortKey === key && this.sortDir === 'ascending'
        ? 'descending'
        : 'ascending';
    this.rows = [...this.rows].sort((a, b) =>
      dlsDefaultSort(a[key], b[key], nextDir)
    );
    this.sortKey = key;
    this.sortDir = nextDir;
  }
}

// ---- Checkable / selectable rows (matches DLS's "Example - Checkbox Table") ----

interface CheckableRow {
  id: string;
  date: string;
  description: string;
  amount: string;
  checked: boolean;
}

@Component({
  selector: 'story-checkable-table',
  standalone: true,
  imports: [
    CommonModule,
    TableComponent,
    TableHeadComponent,
    TableBodyComponent,
    TableRowComponent,
    TableHeaderCellComponent,
    TableCellComponent,
  ],
  template: `
    <ui-table [bordered]="true">
      <ui-table-head>
        <ui-table-row>
          <ui-table-cell
            [checkable]="true"
            [checked]="allChecked"
            [indeterminate]="someChecked"
            checkboxLabel="Select All"
            (checkedChange)="toggleAll($event)"
          ></ui-table-cell>
          <ui-table-header-cell>Date</ui-table-header-cell>
          <ui-table-header-cell>Description</ui-table-header-cell>
          <ui-table-header-cell align="right">Amount</ui-table-header-cell>
        </ui-table-row>
      </ui-table-head>
      <ui-table-body>
        <ui-table-row *ngFor="let row of rows" [selected]="row.checked">
          <ui-table-cell
            [checkable]="true"
            [checked]="row.checked"
            [checkboxLabel]="row.description"
            (checkedChange)="row.checked = $event"
          ></ui-table-cell>
          <ui-table-cell>{{ row.date }}</ui-table-cell>
          <ui-table-cell>{{ row.description }}</ui-table-cell>
          <ui-table-cell align="right">{{ row.amount }}</ui-table-cell>
        </ui-table-row>
      </ui-table-body>
    </ui-table>
  `,
})
export class StoryCheckableTableComponent {
  rows: CheckableRow[] = [
    { id: 'r1', date: 'Jan 05, 2020', description: "SAINSBURY'S ONLINE-GOL LON", amount: '$8.76', checked: true },
    { id: 'r2', date: 'Mar 16, 2020', description: 'Online Payment', amount: '$300.00', checked: false },
    { id: 'r3', date: 'Oct 01, 2020', description: 'Music Enterprise In', amount: '$10.67', checked: false },
  ];

  get allChecked(): boolean {
    return this.rows.every((r) => r.checked);
  }
  get someChecked(): boolean {
    return this.rows.some((r) => r.checked) && !this.allChecked;
  }

  toggleAll(checked: boolean): void {
    this.rows.forEach((r) => (r.checked = checked));
  }
}

// ---- Expandable rows (matches DLS's "Example - Expandable Table") ----

interface ExpandableRow {
  id: string;
  date: string;
  description: string;
  amount: string;
  expanded: boolean;
  detail: string;
}

@Component({
  selector: 'story-expandable-table',
  standalone: true,
  imports: [
    CommonModule,
    TableComponent,
    TableHeadComponent,
    TableBodyComponent,
    TableRowComponent,
    TableHeaderCellComponent,
    TableCellComponent,
  ],
  template: `
    <ui-table [bordered]="true">
      <ui-table-head>
        <ui-table-row>
          <ui-table-header-cell [expandColumn]="true"></ui-table-header-cell>
          <ui-table-header-cell>Date</ui-table-header-cell>
          <ui-table-header-cell>Description</ui-table-header-cell>
          <ui-table-header-cell align="right">Amount</ui-table-header-cell>
        </ui-table-row>
      </ui-table-head>
      <ui-table-body>
        <ng-container *ngFor="let row of rows">
          <ui-table-row
            [expandable]="true"
            [expanded]="row.expanded"
            [expandLabel]="row.description"
            [expandColspan]="4"
            (expandedChange)="row.expanded = $event"
          >
            <ui-table-cell>{{ row.date }}</ui-table-cell>
            <ui-table-cell>{{ row.description }}</ui-table-cell>
            <ui-table-cell align="right">{{ row.amount }}</ui-table-cell>
            <p expandedContent>{{ row.detail }}</p>
          </ui-table-row>
        </ng-container>
      </ui-table-body>
    </ui-table>
  `,
})
export class StoryExpandableTableComponent {
  rows: ExpandableRow[] = [
    {
      id: 'sains-row1',
      date: 'Jan 05, 2020',
      description: "SAINSBURY'S ONLINE-GOL LON",
      amount: '$8.76',
      expanded: false,
      detail: "SAINSBURY'S ONLINE-GOL LON expanded",
    },
    {
      id: 'martinnews-row1',
      date: 'Mar 15, 2020',
      description: "Martin's News Shops Wellington",
      amount: '$32.99',
      expanded: false,
      detail: "Martin's News Shops Wellington expanded",
    },
  ];
}