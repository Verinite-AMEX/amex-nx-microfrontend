import { Component, OnInit } from '@angular/core';
import {
  AmexSortableFilterableTableComponent,
  AmexTableColumn,
  AmexSuccessToastComponent,
  AmexErrorToastComponent
} from '@vn-core-ui-components/ui';

@Component({
  selector: 'app-details-by-currency',
  standalone: true,
  imports: [
    AmexSortableFilterableTableComponent,
    AmexSuccessToastComponent,
    AmexErrorToastComponent
  ],
  template: `
    <amex-sortable-filterable-table
      title="Details by Currency"
      ctaLabel="Search"
      [columns]="columns"
      [rows]="records"
      [actions]="tableActions"
      (ctaClick)="onSearch()"
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
export class DetailsByCurrency implements OnInit {
  columns: AmexTableColumn[] = [
    { key: 'currency',     label: 'Currency' },
    { key: 'totalCharges', label: 'Total Charges' },
    { key: 'numCharges',   label: 'No. of Charges' },
    { key: 'totalRefunds', label: 'Total Refunds' },
    { key: 'numRefunds',   label: 'No. of Refunds' },
    { key: 'netAmount',    label: 'Net Amount' },
  ];

  tableActions = [
    { id: 'print', label: 'Print', type: 'secondary' },
  ];

  records: Record<string, any>[] = [];
  status: 'idle' | 'success' | 'error' = 'idle';
  statusMessage: string = '';

  ngOnInit(): void {
    this.onSearch();
  }

  onSearch(): void {
    this.status = 'idle';
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