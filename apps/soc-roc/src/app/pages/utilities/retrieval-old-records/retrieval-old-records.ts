import { Component, OnInit } from '@angular/core';
import {
  AmexSortableFilterableTableComponent,
  AmexTableColumn,
  AmexSuccessToastComponent,
  AmexErrorToastComponent
} from '@vn-core-ui-components/ui';

@Component({
  selector: 'app-retrieval-old-records',
  standalone: true,
  imports: [
    AmexSortableFilterableTableComponent,
    AmexSuccessToastComponent,
    AmexErrorToastComponent
  ],
  template: `
    <amex-sortable-filterable-table
      title="Retrieval of Old Records & Reports"
      ctaLabel="Retrieve"
      [columns]="columns"
      [rows]="records"
      [actions]="tableActions"
      (ctaClick)="onRetrieve()"
      (actionClick)="onActionClick($event)"
      (sortChange)="onSortChange($event)">
    </amex-sortable-filterable-table>

    @if (status === 'success') {
      <amex-success-toast
        [message]="statusMessage"
        portalStyle="onls"
        [autoDismiss]="true"
        (dismissed)="status = 'idle'">
      </amex-success-toast>
    }

    @if (status === 'error') {
      <amex-error-toast
        [message]="statusMessage"
        portalStyle="onls"
        (dismissed)="status = 'idle'">
      </amex-error-toast>
    }
  `
})
export class RetrievalOldRecords implements OnInit {
  columns: AmexTableColumn[] = [
    { key: 'julianDay',  label: 'Julian Day' },
    { key: 'recordType', label: 'Record Type' },
    { key: 'seNumber',   label: 'SE Number' },
    { key: 'refNo',      label: 'Reference No.' },
    { key: 'date',       label: 'Date' },
    { key: 'amount',     label: 'Amount' },
    { key: 'currency',   label: 'Currency' },
    { key: 'status',     label: 'Status' },
  ];

  tableActions = [
    { id: 'view',  label: 'View',  type: 'primary' },
    { id: 'print', label: 'Print', type: 'secondary' },
  ];

  records: Record<string, any>[] = [];
  status: 'idle' | 'success' | 'error' = 'idle';
  statusMessage: string = '';

  ngOnInit(): void {}

  onRetrieve(): void {
    // TODO: Replace with ReportService API call
    this.records = [];
    this.status = 'success';
    this.statusMessage = 'Old records retrieved successfully.';
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