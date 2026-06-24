import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface AuditSummaryEntry {
  user: string;
  actionsCount: number;
  lastAction: string;
  lastActionDate: string;
}

export interface AuditDetailEntry {
  date: string;
  time: string;
  user: string;
  action: string;
  entity: string;
  oldValue?: string;
  newValue?: string;
}

/**
 * AuditTrailSummaryView
 * BTA Audit Trail panel with two tabs: Detailed Report and Summary Report.
 * Year + Month dropdowns → Show Trail → displays corporation info + entries table + Download.
 * Source: BTA Portal (Corporate Admin, Travel Agent Admin, Amex Internal Admin)
 * Style: BTA portal — light-blue "Audit Trail" header, tab buttons, bordered form, blue link text.
 */
@Component({
  selector: 'amex-audit-trail-summary-view',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="atsv">
      <!-- Panel border + header -->
      <div class="atsv__panel">
        <div class="atsv__panel-header">Audit Trail</div>

        <!-- Tabs -->
        <div class="atsv__tabs">
          <button class="atsv__tab" [class.atsv__tab--active]="activeTab === 'detail'"
                  (click)="activeTab = 'detail'">Detailed Report</button>
          <button class="atsv__tab" [class.atsv__tab--active]="activeTab === 'summary'"
                  (click)="activeTab = 'summary'">Summary Report</button>
        </div>
        <div class="atsv__tab-border"></div>

        <div class="atsv__controls">
          <span class="atsv__ctrl-label">View Audit Trail For:</span>
          <select class="atsv__select" [(ngModel)]="selectedYear">
            <option value="">Select</option>
            <option *ngFor="let y of years" [value]="y">{{ y }}</option>
          </select>
          <select class="atsv__select" [(ngModel)]="selectedMonth">
            <option value="">Select</option>
            <option *ngFor="let m of months" [value]="m">{{ m }}</option>
          </select>
          <button class="atsv__show-btn" (click)="onShowTrail()">Show Trail</button>
        </div>

        <!-- Results section -->
        <div *ngIf="showResults" class="atsv__results">
          <div class="atsv__result-info">
            <div class="atsv__info-line">
              Audit Trail For {{ selectedMonth }}/{{ selectedYear }}
            </div>
            <div class="atsv__info-line" *ngIf="corporationName">
              Corporation Name: <span class="atsv__corp-name">{{ corporationName }}</span>
            </div>
            <div class="atsv__info-line" *ngIf="corporationAccountNo">
              Corporation Account No: {{ corporationAccountNo }}
            </div>
          </div>

          <!-- No entries message -->
          <div *ngIf="noEntries" class="atsv__no-entries">
            Audit entries are not found for this search criteria
          </div>

          <!-- Detailed table -->
          <div *ngIf="!noEntries && activeTab === 'detail' && detailEntries.length > 0"
               class="atsv__table-wrap">
            <table class="atsv__table">
              <thead>
                <tr>
                  <th>Date</th><th>Time</th><th>User</th>
                  <th>Action</th><th>Entity</th>
                  <th>Old Value</th><th>New Value</th>
                </tr>
              </thead>
              <tbody>
                <tr *ngFor="let e of detailEntries; let i = index"
                    [class.atsv__row-alt]="i % 2 === 1">
                  <td>{{ e.date }}</td>
                  <td>{{ e.time }}</td>
                  <td>{{ e.user }}</td>
                  <td>{{ e.action }}</td>
                  <td>{{ e.entity }}</td>
                  <td>{{ e.oldValue || '—' }}</td>
                  <td>{{ e.newValue || '—' }}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- Summary table -->
          <div *ngIf="!noEntries && activeTab === 'summary' && summaryEntries.length > 0"
               class="atsv__table-wrap">
            <table class="atsv__table">
              <thead>
                <tr>
                  <th>User</th>
                  <th>Actions Count</th>
                  <th>Last Action</th>
                  <th>Last Action Date</th>
                </tr>
              </thead>
              <tbody>
                <tr *ngFor="let e of summaryEntries; let i = index"
                    [class.atsv__row-alt]="i % 2 === 1">
                  <td>{{ e.user }}</td>
                  <td>{{ e.actionsCount }}</td>
                  <td>{{ e.lastAction }}</td>
                  <td>{{ e.lastActionDate }}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- Download row -->
          <div class="atsv__download-row">
            <select class="atsv__select" [(ngModel)]="downloadFormat">
              <option>PDF</option>
              <option>Excel</option>
              <option>CSV</option>
              <option>RTF</option>
            </select>
            <button class="atsv__dl-btn" (click)="download.emit(downloadFormat)">
              Download Report
            </button>
          </div>
        </div>

      </div>
    </div>
  `,
  styles: [`
    :host { display: block; font-family: Arial, sans-serif; font-size: 12px; }
    .atsv__panel {
      border: 1px solid #a8c8e0;
      background: #fff;
    }
    .atsv__panel-header {
      background: #b8d4ef; color: #1a3c5e;
      font-weight: bold; font-size: 13px;
      padding: 7px 12px; border-bottom: 1px solid #a8c8e0;
    }
    .atsv__tabs {
      display: flex; gap: 0;
      padding: 8px 12px 0;
    }
    .atsv__tab {
      padding: 6px 16px; font-size: 12px; cursor: pointer;
      border: 1px solid #a8c8e0; border-bottom: none;
      background: #e8f4fb; color: #333;
      font-family: Arial, sans-serif;
    }
    .atsv__tab--active {
      background: #006fcf; color: #fff;
      border-color: #006fcf;
    }
    .atsv__tab-border {
      border-bottom: 2px solid #a8c8e0;
      margin: 0 12px;
    }
    .atsv__controls {
      display: flex; align-items: center; gap: 8px;
      padding: 10px 12px;
    }
    .atsv__ctrl-label { font-size: 12px; color: #333; white-space: nowrap; }
    .atsv__select {
      border: 1px solid #aaa; padding: 3px 6px;
      font-size: 12px; font-family: Arial, sans-serif; background: #fff;
    }
    .atsv__show-btn {
      background: #e8e8e8; border: 1px solid #aaa;
      padding: 3px 12px; font-size: 12px; cursor: pointer;
      font-family: Arial, sans-serif;
    }
    .atsv__show-btn:hover { background: #d8d8d8; }
    .atsv__results { padding: 0 12px 12px; }
    .atsv__result-info { margin-bottom: 8px; }
    .atsv__info-line {
      font-size: 12px; color: #006fcf; margin-bottom: 3px;
    }
    .atsv__corp-name { font-weight: bold; }
    .atsv__no-entries {
      font-size: 12px; color: #c00;
      margin-bottom: 8px; padding: 4px 0;
    }
    .atsv__table-wrap { overflow-x: auto; margin-bottom: 10px; }
    .atsv__table {
      border-collapse: collapse; width: 100%; font-size: 11px;
    }
    .atsv__table th {
      background: #b8d4ef; color: #1a3c5e;
      border: 1px solid #a0bcd8; padding: 5px 8px;
      text-align: left; font-weight: bold;
    }
    .atsv__table td {
      border: 1px solid #d0d8e0; padding: 4px 8px;
      color: #1a1a1a;
    }
    .atsv__row-alt td { background: #f0f7ff; }
    .atsv__download-row {
      display: flex; align-items: center; gap: 6px;
      margin-top: 8px;
    }
    .atsv__dl-btn {
      background: #e8e8e8; border: 1px solid #aaa;
      padding: 3px 12px; font-size: 12px; cursor: pointer;
      font-family: Arial, sans-serif;
    }
    .atsv__dl-btn:hover { background: #d8d8d8; }
  `],
})
export class AmexAuditTrailSummaryViewComponent {
  @Input() activeTab: 'detail' | 'summary' = 'detail';
  @Input() years: string[]  = ['2021', '2022', '2023', '2024', '2025'];
  @Input() months: string[] = [
    'January','February','March','April','May','June',
    'July','August','September','October','November','December',
  ];
  @Input() selectedYear  = '';
  @Input() selectedMonth = '';
  @Input() corporationName      = '';
  @Input() corporationAccountNo = '';
  @Input() showResults   = false;
  @Input() noEntries     = false;
  @Input() detailEntries:  AuditDetailEntry[]  = [];
  @Input() summaryEntries: AuditSummaryEntry[] = [];
  downloadFormat = 'PDF';

  @Output() showTrail = new EventEmitter<{ year: string; month: string; tab: string }>();
  @Output() download  = new EventEmitter<string>();

  onShowTrail() {
    this.showResults = true;
    this.showTrail.emit({
      year: this.selectedYear,
      month: this.selectedMonth,
      tab: this.activeTab,
    });
  }
}
