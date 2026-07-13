import { Component, EventEmitter, Output, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AmexReportDownloadButtonComponent } from '@ui-components/ui';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'bcrb-report-download',
  standalone: true,
  imports: [CommonModule, AmexReportDownloadButtonComponent],
  templateUrl: './bcrb-report-download.component.html',
  styles: [`
    .report-title {
      text-align: center;
      font-weight: bold;
      font-size: 14px;
      color: #333;
      margin-bottom: 10px;
    }
  `]
})
export class BcrbReportDownloadComponent {
  @Input() reportType = '';
  @Output() backToReports = new EventEmitter<void>();
  @Output() submitRequest = new EventEmitter<string>();

  config = {
    formats: ['excel'] as any,
    submitLabel: 'Submit Request',
    showBack: true,
    backLabel: 'Back to main page'
  };
  get title(): string {
    switch (this.reportType) {
      case 'cons-monthly':
        return 'Consumer Monthly Audit Report (REP-001)';
      case 'corp-monthly':
        return 'Corporate Monthly Audit Report (REP-002)';
      case 'cons-data':
        return 'Consumer Data Audit Report (REP-003)';
      case 'corp-data':
        return 'Corporate Data Audit Report (REP-004)';
      case 'cons-full':
        return 'Consumer Full Report (REP-005)';
      case 'corp-full':
        return 'Corporate Full Report (REP-006)';
      case 'cons-history':
        return 'Consumer History Report (REP-007)';
      case 'corp-history':
        return 'Corporate History Report (REP-008)';
      default:
        return 'Report';
    }
  }
  download(event: any) {
    console.log('Submit clicked for:', this.reportType);
    this.submitRequest.emit(this.reportType);
  }
  back(event: any) {
    console.log('Back clicked');
    this.backToReports.emit();
  }
}
