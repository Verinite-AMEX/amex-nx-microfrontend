import { Component, OnInit } from '@angular/core';
import {
  AmexSortableFilterableTableComponent,
  AmexTableColumn,
  AmexSuccessToastComponent,
  AmexErrorToastComponent
} from '@vn-core-ui-components/ui';

@Component({
  selector: 'app-soc-control-report',
  standalone: true,
  imports: [
    AmexSortableFilterableTableComponent,
    AmexSuccessToastComponent,
    AmexErrorToastComponent
  ],
  template: `
    <amex-sortable-filterable-table
      title="SOC / Control Report"
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
export class SocControlReport implements OnInit {
  columns: AmexTableColumn[] = [
    { key: 'socRefNo',     label: 'SOC Ref. No.' },
    { key: 'salesEntity',  label: 'Sales Entity' },
    { key: 'julianDay',    label: 'Julian Day' },
    { key: 'totalCharges', label: 'Total Charges' },
    { key: 'numCharges',   label: 'No. of Charges' },
    { key: 'totalRefunds', label: 'Total Refunds' },
    { key: 'numRefunds',   label: 'No. of Refunds' },
    { key: 'status',       label: 'Status' },
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