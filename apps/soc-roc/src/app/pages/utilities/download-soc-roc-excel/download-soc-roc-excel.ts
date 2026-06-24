import { Component } from '@angular/core';
import {
  AmexFileUploadFormComponent,
  AmexSortableFilterableTableComponent,
  AmexTableColumn,
  AmexSuccessToastComponent,
  AmexErrorToastComponent
} from '@vn-core-ui-components/ui';

@Component({
  selector: 'app-download-soc-roc-excel',
  standalone: true,
  imports: [
    AmexFileUploadFormComponent,
    AmexSortableFilterableTableComponent,
    AmexSuccessToastComponent,
    AmexErrorToastComponent
  ],
  template: `
    <amex-file-upload-form
      title="Download SOC & ROC Details from Excel"
      fileLabel="Choose Excel File"
      submitLabel="Refresh Data"
      acceptedTypes=".xlsx,.xls"
      [errorMessage]="errorMessage"
      (submitClick)="onRefreshData($event)">
    </amex-file-upload-form>

    @if (tableData.length > 0) {
      <amex-sortable-filterable-table
        title="SOC & ROC Excel Data"
        ctaLabel="Upload to Server"
        [columns]="columns"
        [rows]="tableData"
        [actions]="[]"
        (ctaClick)="onUploadToServer()">
      </amex-sortable-filterable-table>
    }

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
export class DownloadSocRocExcel {
  errorMessage: string = '';
  tableData: Record<string, any>[] = [];
  status: 'idle' | 'success' | 'error' = 'idle';
  statusMessage: string = '';

  columns: AmexTableColumn[] = [
    { key: 'SE Number',      label: 'SE Number' },
    { key: 'SOC Reference',  label: 'SOC Reference' },
    { key: 'ROC Reference',  label: 'ROC Reference' },
    { key: 'Amount',         label: 'Amount' },
    { key: 'Currency',       label: 'Currency' },
    { key: 'Date',           label: 'Date' },
  ];

  onRefreshData(file: File | null): void {
    if (!file) {
      this.errorMessage = 'Please select an Excel file.';
      return;
    }
    this.errorMessage = '';
    // TODO: Replace with actual Excel parsing / API call
    this.tableData = [
      { 'SE Number': '100001', 'SOC Reference': 'SOC-001', 'ROC Reference': 'ROC-001', 'Amount': '1500.00', 'Currency': 'USD', 'Date': '2024-09-26' },
      { 'SE Number': '100002', 'SOC Reference': 'SOC-002', 'ROC Reference': 'ROC-002', 'Amount': '2300.00', 'Currency': 'AED', 'Date': '2024-09-26' },
    ];
    this.status = 'success';
    this.statusMessage = 'Data refreshed from Excel successfully.';
  }

  onUploadToServer(): void {
    if (this.tableData.length === 0) {
      this.status = 'error';
      this.statusMessage = 'Please refresh data from Excel before uploading.';
      return;
    }
    // TODO: Replace with actual API call
    this.status = 'success';
    this.statusMessage = 'Data uploaded to server successfully.';
  }
}