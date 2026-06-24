import { Component, OnInit } from '@angular/core';
import {
  AmexRejectionReportTableComponent,
  RejectionReportRow,
  AmexSuccessToastComponent,
  AmexErrorToastComponent
} from '@vn-core-ui-components/ui';

@Component({
  selector: 'app-consolidated-rejection-report',
  standalone: true,
  imports: [
    AmexRejectionReportTableComponent,
    AmexSuccessToastComponent,
    AmexErrorToastComponent
  ],
  template: `
    <amex-rejection-report-table
      [rows]="records"
      (exportClick)="onExport()"
      (printClick)="onPrint()">
    </amex-rejection-report-table>

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
export class ConsolidatedRejectionReport implements OnInit {
  // Interface: { seNo, rejectionReason, date, amount }
  records: RejectionReportRow[] = [];
  status: 'idle' | 'success' | 'error' = 'idle';
  statusMessage: string = '';

  ngOnInit(): void {
    // TODO: Replace with ReportService API call
    this.records = [];
  }

  onExport(): void {}

  onPrint(): void {
    window.print();
  }
}