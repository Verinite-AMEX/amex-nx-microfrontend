import { Component, OnInit } from '@angular/core';
import {
  AmexReportDownloadButtonComponent,
  ReportFormat,
  AmexSuccessToastComponent,
  AmexErrorToastComponent
} from '@vn-core-ui-components/ui';

@Component({
  selector: 'app-download-multiple-se',
  standalone: true,
  imports: [
    AmexReportDownloadButtonComponent,
    AmexSuccessToastComponent,
    AmexErrorToastComponent
  ],
  template: `
    <amex-report-download-button
      [config]="downloadConfig"
      (download)="onDownload($event)"
      (back)="onBack()">
    </amex-report-download-button>

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
export class DownloadMultipleSe implements OnInit {
  // ReportFormat = 'excel' | 'pdf' | 'csv' | 'rtf'
  downloadConfig = {
    label: "Download Multiple SE's",
    formats: ['excel', 'csv'] as ReportFormat[],
    submitLabel: 'Download',
    showBack: true
  };

  status: 'idle' | 'success' | 'error' = 'idle';
  statusMessage: string = '';

  ngOnInit(): void {}

  onDownload(format: ReportFormat): void {
    // TODO: Replace with actual API download call using julianDay + seNumbers
    this.status = 'success';
    this.statusMessage = `Multiple SE data downloaded as ${format} successfully.`;
  }

  onBack(): void {
    // TODO: navigate back
  }
}