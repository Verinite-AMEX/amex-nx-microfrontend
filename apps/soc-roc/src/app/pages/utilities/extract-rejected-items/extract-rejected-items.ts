import { Component, OnInit } from '@angular/core';
import {
  AmexRejectionReportTableComponent,
  RejectionReportRow,
  AmexSuccessToastComponent,
  AmexErrorToastComponent
} from '@vn-core-ui-components/ui';
import { Utility } from '../../../core/services/utility';

@Component({
  selector: 'app-extract-rejected-items',
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
export class ExtractRejectedItems implements OnInit {
  // Interface: { seNo, rejectionReason, date, amount }
  records: RejectionReportRow[] = [];
  isLoading: boolean = false;
  status: 'idle' | 'success' | 'error' = 'idle';
  statusMessage: string = '';

  constructor(private utilityService: Utility) {}

  ngOnInit(): void {
    this.loadRejectedItems();
  }

  loadRejectedItems(): void {
    const today = new Date();
    const julianDay = this.getJulianDay(today);
    const dateStr = today.toISOString().split('T')[0];
    this.isLoading = true;
    this.utilityService.extractRejectedItems(dateStr, julianDay, [], true).subscribe({
      next: (data: any) => {
        this.isLoading = false;
        this.records = data ?? [];
        this.status = 'success';
        this.statusMessage = 'Rejected items extracted successfully.';
      },
      error: () => {
        this.isLoading = false;
        this.status = 'error';
        this.statusMessage = 'Extraction failed. Please try again.';
      }
    });
  }

  onExport(): void {}

  onPrint(): void {
    window.print();
  }

  private getJulianDay(date: Date): string {
    const start = new Date(date.getFullYear(), 0, 0);
    const diff = date.getTime() - start.getTime();
    return Math.floor(diff / (1000 * 60 * 60 * 24)).toString();
  }
}