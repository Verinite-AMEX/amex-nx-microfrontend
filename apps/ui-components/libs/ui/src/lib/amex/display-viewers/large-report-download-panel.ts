import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface LargeReportRow {
  documentId: string | number;
  reportType: string;
  fileName:   string;
  format:     string;
  status:     string;
}

/**
 * LargeReportDownloadPanel
 * BTA Large Reports panel: BTA Number dropdown, Report Type radios (Memo/Monthly),
 * Download Type radios (Statement/Report), Report Format radios (PDF/Excel/CSV),
 * Generate Report button, results table with Download links.
 * Source: BTA Portal
 * Style: Blue panel header, radio groups, results table.
 */
@Component({
  selector: 'amex-large-report-download-panel',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="lrdp">
      <div class="lrdp__header">BTA Large Reports</div>
      <div class="lrdp__body">

        <!-- BTA Number -->
        <div class="lrdp__row">
          <label class="lrdp__label">Select a BTA Number:</label>
          <select class="lrdp__select" [(ngModel)]="selectedBta">
            <option *ngFor="let b of btaNumbers" [value]="b">{{ b }}</option>
          </select>
        </div>

        <!-- Report Type -->
        <div class="lrdp__row">
          <label class="lrdp__label">Report Type:</label>
          <span class="lrdp__radios">
            <label class="lrdp__radio-lbl" *ngFor="let rt of reportTypes">
              <input type="radio" [name]="'rt'" [(ngModel)]="selectedReportType" [value]="rt" />
              {{ rt }}
            </label>
          </span>
        </div>

        <!-- Download Type -->
        <div class="lrdp__row">
          <label class="lrdp__label">Download Type:</label>
          <span class="lrdp__radios">
            <label class="lrdp__radio-lbl" *ngFor="let dt of downloadTypes">
              <input type="radio" [name]="'dt'" [(ngModel)]="selectedDownloadType" [value]="dt" />
              {{ dt }}
            </label>
          </span>
        </div>

        <!-- Report Format -->
        <div class="lrdp__row">
          <label class="lrdp__label">Report Format:</label>
          <span class="lrdp__radios">
            <label class="lrdp__radio-lbl" *ngFor="let fmt of reportFormats">
              <input type="radio" [name]="'fmt'" [(ngModel)]="selectedFormat" [value]="fmt" />
              {{ fmt }}
            </label>
          </span>
        </div>

        <!-- Generate button -->
        <div class="lrdp__row">
          <span class="lrdp__label"></span>
          <button class="lrdp__gen-btn"
            (click)="generate.emit({ bta: selectedBta, reportType: selectedReportType, downloadType: selectedDownloadType, format: selectedFormat })">
            Generate Report
          </button>
        </div>

        <!-- Results table -->
        <div *ngIf="results && results.length > 0" class="lrdp__results">
          <table class="lrdp__table">
            <thead>
              <tr>
                <th>Document Id</th>
                <th>Report Type</th>
                <th>File Name</th>
                <th>Format</th>
                <th>Status</th>
                <th>Download Link</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let r of results; let i = index" [class.lrdp__row-alt]="i % 2 === 1">
                <td>{{ r.documentId }}</td>
                <td>{{ r.reportType }}</td>
                <td>{{ r.fileName }}</td>
                <td>{{ r.format }}</td>
                <td>{{ r.status }}</td>
                <td>
                  <span *ngIf="r.status === 'Ready To Download'"
                        class="lrdp__dl-link"
                        (click)="downloadReport.emit(r)">Download</span>
                  <span *ngIf="r.status !== 'Ready To Download'" class="lrdp__status-wait">{{ r.status }}</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

      </div>
    </div>
  `,
  styles: [`
    :host { display: block; font-family: Arial, sans-serif; font-size: 12px; }

    .lrdp {
      border: 2px solid #7ab3d4;
      background: #fff;
      max-width: 800px;
    }

    .lrdp__header {
      background: #b8d4ef;
      color: #1a3c5e;
      font-weight: bold;
      font-size: 13px;
      padding: 8px 12px;
      border-bottom: 1px solid #7ab3d4;
    }

    .lrdp__body { padding: 14px 16px; }

    .lrdp__row {
      display: flex;
      align-items: center;
      gap: 10px;
      margin-bottom: 10px;
    }

    .lrdp__label {
      font-size: 12px;
      color: #333;
      min-width: 130px;
      flex-shrink: 0;
    }

    .lrdp__select {
      border: 1px solid #aaa;
      padding: 3px 6px;
      font-size: 12px;
      font-family: Arial, sans-serif;
      min-width: 260px;
    }

    .lrdp__radios {
      display: flex;
      gap: 14px;
      flex-wrap: wrap;
    }

    .lrdp__radio-lbl {
      display: flex;
      align-items: center;
      gap: 4px;
      font-size: 12px;
      color: #333;
      cursor: pointer;
    }

    .lrdp__gen-btn {
      background: #e8e8e8;
      border: 1px solid #aaa;
      padding: 4px 14px;
      font-size: 12px;
      font-family: Arial, sans-serif;
      cursor: pointer;
    }
    .lrdp__gen-btn:hover { background: #d8d8d8; }

    /* Results table */
    .lrdp__results { margin-top: 8px; }
    .lrdp__table {
      width: 100%;
      border-collapse: collapse;
      font-size: 12px;
    }
    .lrdp__table th {
      background: #d4e8f8;
      border: 1px solid #b0cce0;
      padding: 6px 8px;
      text-align: left;
      font-weight: bold;
      color: #1a1a1a;
    }
    .lrdp__table td {
      border: 1px solid #d0e4f0;
      padding: 5px 8px;
      color: #333;
    }
    .lrdp__row-alt td { background: #f0f8ff; }
    .lrdp__dl-link {
      color: #006fcf;
      cursor: pointer;
      text-decoration: underline;
    }
    .lrdp__dl-link:hover { color: #0050a0; }
    .lrdp__status-wait { color: #888; }
  `],
})
export class AmexLargeReportDownloadPanelComponent {
  @Input() btaNumbers       = ['BTACLIENTBAH001-3744XXXXXXX5229'];
  @Input() reportTypes      = ['Memo', 'Monthly'];
  @Input() downloadTypes    = ['Statement', 'Report'];
  @Input() reportFormats    = ['PDF', 'Excel', 'CSV'];
  @Input() results: LargeReportRow[] = [];

  selectedBta          = '';
  selectedReportType   = 'Memo';
  selectedDownloadType = 'Statement';
  selectedFormat       = 'PDF';

  @Output() generate      = new EventEmitter<{ bta: string; reportType: string; downloadType: string; format: string }>();
  @Output() downloadReport = new EventEmitter<LargeReportRow>();
}
