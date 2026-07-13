import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AmexBCRBReportsTableComponent } from '@ui-components/ui';
import { BcrbSidebarComponent } from '../sidebar/bcrb-sidebar.component';
import { BcrbReportDownloadComponent } from '../report-download/bcrb-report-download.component';
import { BcrbMockService } from '../../services/bcrb-mock.service';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'bcrb-reports',
  standalone: true,
  imports: [
    CommonModule,
    AmexBCRBReportsTableComponent,
    BcrbSidebarComponent,
    BcrbReportDownloadComponent
  ],
  templateUrl: './bcrb-reports.component.html',
  styles: [`
    .layout {
      display: flex;
      height: 100%;
    }

    .sidebar {
      width: 260px;
      border-right: 1px solid #ccc;
      background: #f5f5f5;
    }

    .content {
      flex: 1;
      padding: 20px;
      background: white;
    }
  `]
})
export class BcrbReportsComponent implements OnInit {

  username = 'ssharaf_onlshelper';
  rows: any[] = [];

  // eslint-disable-next-line @angular-eslint/prefer-inject
  constructor(private mockService: BcrbMockService) {}

  ngOnInit() {
    this.mockService.reports$.subscribe((data) => {
      this.rows = data.map(r => ({
        serialNo: r.id,
        processId: r.processId,
        fileName: r.fileName,
        reportCreationTime: r.createdAt,
        processingStatus: r.status
      }));
    });
  }
  currentView: 'reports' | 'sidebar' = 'reports';
  selectedMenu = '';

  handleClick(event: any) {
    const text = event.target?.innerText?.trim();

    if (text === 'Request New Report +') {
      this.onRequestNewReport();
    }
  }

  onRequestNewReport() {
    this.currentView = 'sidebar';
  }

  onSidebarSelect(menuId: string) {
    this.selectedMenu = menuId;
  }

  onSubmitRequest(reportType: string) {
    this.mockService.createReport(reportType);
    this.currentView = 'reports';
    this.selectedMenu = '';
  }
}
