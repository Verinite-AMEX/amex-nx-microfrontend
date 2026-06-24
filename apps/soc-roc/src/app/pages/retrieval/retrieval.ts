import { Component } from '@angular/core';
import { AmexSortableFilterableTableComponent, AmexTableColumn } from '@vn-core-ui-components/ui';

@Component({
  selector: 'app-retrieval',
  standalone: true,
  imports: [AmexSortableFilterableTableComponent],
  template: `
    <amex-sortable-filterable-table
      title="Retrieval"
      ctaLabel="Retrieve"
      [columns]="columns"
      [rows]="records"
      [actions]="tableActions"
      (ctaClick)="onRetrieve()"
      (actionClick)="onActionClick($event)"
      (sortChange)="onSortChange($event)">
    </amex-sortable-filterable-table>
  `
})
export class Retrieval {
  columns: AmexTableColumn[] = [
    { key: 'julianDay',  label: 'Julian Day' },
    { key: 'batchNo',   label: 'Batch No.' },
    { key: 'socRefNo',  label: 'SOC Ref. No.' },
    { key: 'country',   label: 'Country' },
    { key: 'currency',  label: 'Currency' },
    { key: 'seNo',      label: 'SE No.' },
    { key: 'cardNo',    label: 'Card No.' },
    { key: 'rocRef',    label: 'ROC Ref.' },
    { key: 'date',      label: 'Date' },
    { key: 'amount',    label: 'Amount' },
  ];

  tableActions = [
    { id: 'view',  label: 'View',  type: 'primary' },
    { id: 'print', label: 'Print', type: 'secondary' },
  ];

  records: Record<string, any>[] = [];

  onRetrieve(): void {
    // TODO: Replace with ReportService API call
    this.records = [];
  }

  onActionClick(event: { action: string; row: any }): void {
    if (event.action === 'print') {
      window.print();
    }
  }

  onSortChange(event: { key: string; dir: any }): void {
    console.log('Sort:', event);
  }
}