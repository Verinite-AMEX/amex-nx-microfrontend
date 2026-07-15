import { Component, Input, Output, EventEmitter, HostBinding } from '@angular/core';
import { NgIf, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LabelComponent } from '../../../primitives/label';
import { SelectComponent, SelectOption } from '../../../primitives/select';
import { RadioGroupComponent, RadioOption } from '../../../primitives/radio-group';
import { ButtonComponent } from '../../../primitives/button';
import { TableComponent } from '../../../primitives/table';
import { TableHeadComponent } from '../../../primitives/table-head';
import { TableBodyComponent } from '../../../primitives/table-body';
import { TableRowComponent } from '../../../primitives/table-row';
import { TableHeaderCellComponent } from '../../../primitives/table-header-cell';
import { TableCellComponent } from '../../../primitives/table-cell';

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
 *
 * NOTE: row label sits to the LEFT of each radio group (flex row), not above it
 * like ui-radio-group's built-in legend — so the visual label uses <ui-label>
 * standalone and the radio-group's own legend is left empty with an aria-label
 * instead, to keep the original row layout exactly.
 */
@Component({
  selector: 'amex-large-report-download-panel',
  standalone: true,
  imports: [
    NgIf, NgFor, FormsModule,
    LabelComponent, SelectComponent, RadioGroupComponent, ButtonComponent,
    TableComponent, TableHeadComponent, TableBodyComponent, TableRowComponent,
    TableHeaderCellComponent, TableCellComponent,
  ],
  template: `
    <div class="lrdp">
      <div class="lrdp__header">BTA Large Reports</div>
      <div class="lrdp__body">

        <!-- BTA Number -->
        <div class="lrdp__row">
          <ui-label class="lrdp__label" [forId]="id + '-bta-number'">Select a BTA Number:</ui-label>
          <ui-select class="lrdp__select" [id]="id + '-bta-number'" [options]="btaOptions" [(ngModel)]="selectedBta"></ui-select>
        </div>

        <!-- Report Type -->
        <div class="lrdp__row">
          <ui-label class="lrdp__label">Report Type:</ui-label>
          <ui-radio-group class="lrdp__radios" name="rt" orientation="horizontal"
            ariaLabel="Report Type" [options]="reportTypeOptions" [(ngModel)]="selectedReportType"></ui-radio-group>
        </div>

        <!-- Download Type -->
        <div class="lrdp__row">
          <ui-label class="lrdp__label">Download Type:</ui-label>
          <ui-radio-group class="lrdp__radios" name="dt" orientation="horizontal"
            ariaLabel="Download Type" [options]="downloadTypeOptions" [(ngModel)]="selectedDownloadType"></ui-radio-group>
        </div>

        <!-- Report Format -->
        <div class="lrdp__row">
          <ui-label class="lrdp__label">Report Format:</ui-label>
          <ui-radio-group class="lrdp__radios" name="fmt" orientation="horizontal"
            ariaLabel="Report Format" [options]="reportFormatOptions" [(ngModel)]="selectedFormat"></ui-radio-group>
        </div>

        <!-- Generate button -->
        <div class="lrdp__row">
          <span class="lrdp__label"></span>
          <ui-button class="lrdp__gen-btn" variant="secondary" label="Generate Report"
            (click)="generate.emit({ bta: selectedBta, reportType: selectedReportType, downloadType: selectedDownloadType, format: selectedFormat })"></ui-button>
        </div>

        <!-- Results table -->
        <div *ngIf="results && results.length > 0" class="lrdp__results">
          <ui-table class="lrdp__table" [bordered]="true">
            <ui-table-head>
              <ui-table-row [header]="true">
                <ui-table-header-cell>Document Id</ui-table-header-cell>
                <ui-table-header-cell>Report Type</ui-table-header-cell>
                <ui-table-header-cell>File Name</ui-table-header-cell>
                <ui-table-header-cell>Format</ui-table-header-cell>
                <ui-table-header-cell>Status</ui-table-header-cell>
                <ui-table-header-cell>Download Link</ui-table-header-cell>
              </ui-table-row>
            </ui-table-head>
            <ui-table-body>
              <ui-table-row *ngFor="let r of results; let i = index" [class.lrdp__row-alt]="i % 2 === 1" [hoverable]="false">
                <ui-table-cell>{{ r.documentId }}</ui-table-cell>
                <ui-table-cell>{{ r.reportType }}</ui-table-cell>
                <ui-table-cell>{{ r.fileName }}</ui-table-cell>
                <ui-table-cell>{{ r.format }}</ui-table-cell>
                <ui-table-cell>{{ r.status }}</ui-table-cell>
                <ui-table-cell>
                  <span *ngIf="r.status === 'Ready To Download'"
                        class="lrdp__dl-link"
                        (click)="downloadReport.emit(r)">Download</span>
                  <span *ngIf="r.status !== 'Ready To Download'" class="lrdp__status-wait">{{ r.status }}</span>
                </ui-table-cell>
              </ui-table-row>
            </ui-table-body>
          </ui-table>
        </div>

      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block; font-family: Arial, sans-serif; font-size: 12px;
      --label-font-size: 12px;
      --label-font-weight: normal;
      --label-color: #333;
      --select-padding: 3px 32px 3px 6px;
      --select-font-size: 12px;
      --select-border: 1px solid #aaa;
      --select-radius: 0px;
      --radio-legend-size: 0px;
      --btn-bg: #e8e8e8;
      --btn-bg-hover: #d8d8d8;
      --btn-color: #333;
      --btn-border: 1px solid #aaa;
      --btn-radius: 0px;
      --btn-padding: 4px 14px;
      --btn-font-size: 12px;
      --table-header-bg: #d4e8f8;
      --table-header-border: 1px solid #b0cce0;
      --table-border-color: #d0e4f0;
      --table-cell-padding: 5px 8px;
      --table-cell-color: #333;
    }

    .lrdp { border: 2px solid #7ab3d4; background: #fff; max-width: 800px; }

    .lrdp__header {
      background: #b8d4ef; color: #1a3c5e; font-weight: bold;
      font-size: 13px; padding: 8px 12px; border-bottom: 1px solid #7ab3d4;
    }

    .lrdp__body { padding: 14px 16px; }

    .lrdp__row { display: flex; align-items: center; gap: 10px; margin-bottom: 10px; }

    .lrdp__label { min-width: 130px; flex-shrink: 0; }

    .lrdp__select { min-width: 260px; }

    .lrdp__radios { display: flex; }
    .lrdp__radios ::ng-deep .radio-group.horizontal { gap: 14px; }
    .lrdp__radios ::ng-deep .radio-label ::ng-deep .ui-label { font-size: 12px; }

    .lrdp__gen-btn {}

    /* Results table */
    .lrdp__results { margin-top: 8px; }
    .lrdp__table ::ng-deep .ui-table { font-size: 12px; }
    .lrdp__row-alt ::ng-deep .ui-td { background: #f0f8ff; }
    .lrdp__dl-link { color: #006fcf; cursor: pointer; text-decoration: underline; }
    .lrdp__dl-link:hover { color: #0050a0; }
    .lrdp__status-wait { color: #888; }
  `],
})
export class AmexLargeReportDownloadPanelComponent {
  private static _idCounter = 0;
  @HostBinding('attr.id') @Input() id = `large-report-download-panel-${++AmexLargeReportDownloadPanelComponent._idCounter}`;

  @Input() btaNumbers    = ['BTACLIENTBAH001-3744XXXXXXX5229'];
  @Input() reportTypes   = ['Memo', 'Monthly'];
  @Input() downloadTypes = ['Statement', 'Report'];
  @Input() reportFormats = ['PDF', 'Excel', 'CSV'];
  @Input() results: LargeReportRow[] = [];

  selectedBta          = '';
  selectedReportType   = 'Memo';
  selectedDownloadType = 'Statement';
  selectedFormat       = 'PDF';

  @Output() generate       = new EventEmitter<{ bta: string; reportType: string; downloadType: string; format: string }>();
  @Output() downloadReport = new EventEmitter<LargeReportRow>();

  get btaOptions(): SelectOption[] { return this.btaNumbers.map(b => ({ value: b, label: b })); }
  get reportTypeOptions(): RadioOption[] { return this.reportTypes.map(v => ({ value: v, label: v })); }
  get downloadTypeOptions(): RadioOption[] { return this.downloadTypes.map(v => ({ value: v, label: v })); }
  get reportFormatOptions(): RadioOption[] { return this.reportFormats.map(v => ({ value: v, label: v })); }
}