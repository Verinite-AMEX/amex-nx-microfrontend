import { Component, Input, Output, EventEmitter, HostBinding } from '@angular/core';
import { NgIf, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LabelComponent } from '../../../primitives/label';
import { SelectComponent, SelectOption } from '../../../primitives/select';
import { ButtonComponent } from '../../../primitives/button';
import { TableComponent } from '../../../primitives/table';
import { TableHeadComponent } from '../../../primitives/table-head';
import { TableBodyComponent } from '../../../primitives/table-body';
import { TableRowComponent } from '../../../primitives/table-row';
import { TableHeaderCellComponent } from '../../../primitives/table-header-cell';
import { TableCellComponent } from '../../../primitives/table-cell';

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
 *
 * NOTE: tab-button active state (no bottom border, so it visually merges into
 * the content panel below) is reproduced via a --btn-border CSS var swap on
 * the active class, not a hand-rolled selector — see flag below.
 */
@Component({
  selector: 'amex-audit-trail-summary-view',
  standalone: true,
  imports: [
    NgIf, NgFor, FormsModule,
    LabelComponent, SelectComponent, ButtonComponent,
    TableComponent, TableHeadComponent, TableBodyComponent, TableRowComponent,
    TableHeaderCellComponent, TableCellComponent,
  ],
  template: `
    <div class="atsv">
      <!-- Panel border + header -->
      <div class="atsv__panel">
        <div class="atsv__panel-header">Audit Trail</div>

        <!-- Tabs -->
        <div class="atsv__tabs">
          <ui-button class="atsv__tab" [class.atsv__tab--active]="activeTab === 'detail'"
                     variant="secondary" label="Detailed Report" (click)="activeTab = 'detail'"></ui-button>
          <ui-button class="atsv__tab" [class.atsv__tab--active]="activeTab === 'summary'"
                     variant="secondary" label="Summary Report" (click)="activeTab = 'summary'"></ui-button>
        </div>
        <div class="atsv__tab-border"></div>

        <div class="atsv__controls">
          <ui-label class="atsv__ctrl-label">View Audit Trail For:</ui-label>
          <ui-select class="atsv__select" [options]="yearOptions" placeholder="Select" [(ngModel)]="selectedYear"></ui-select>
          <ui-select class="atsv__select" [options]="monthOptions" placeholder="Select" [(ngModel)]="selectedMonth"></ui-select>
          <ui-button class="atsv__show-btn" variant="secondary" label="Show Trail" (click)="onShowTrail()"></ui-button>
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
            <ui-table class="atsv__table" [bordered]="true">
              <ui-table-head>
                <ui-table-row [header]="true">
                  <ui-table-header-cell>Date</ui-table-header-cell>
                  <ui-table-header-cell>Time</ui-table-header-cell>
                  <ui-table-header-cell>User</ui-table-header-cell>
                  <ui-table-header-cell>Action</ui-table-header-cell>
                  <ui-table-header-cell>Entity</ui-table-header-cell>
                  <ui-table-header-cell>Old Value</ui-table-header-cell>
                  <ui-table-header-cell>New Value</ui-table-header-cell>
                </ui-table-row>
              </ui-table-head>
              <ui-table-body>
                <ui-table-row *ngFor="let e of detailEntries; let i = index"
                    [class.atsv__row-alt]="i % 2 === 1" [hoverable]="false">
                  <ui-table-cell>{{ e.date }}</ui-table-cell>
                  <ui-table-cell>{{ e.time }}</ui-table-cell>
                  <ui-table-cell>{{ e.user }}</ui-table-cell>
                  <ui-table-cell>{{ e.action }}</ui-table-cell>
                  <ui-table-cell>{{ e.entity }}</ui-table-cell>
                  <ui-table-cell>{{ e.oldValue || '—' }}</ui-table-cell>
                  <ui-table-cell>{{ e.newValue || '—' }}</ui-table-cell>
                </ui-table-row>
              </ui-table-body>
            </ui-table>
          </div>

          <!-- Summary table -->
          <div *ngIf="!noEntries && activeTab === 'summary' && summaryEntries.length > 0"
               class="atsv__table-wrap">
            <ui-table class="atsv__table" [bordered]="true">
              <ui-table-head>
                <ui-table-row [header]="true">
                  <ui-table-header-cell>User</ui-table-header-cell>
                  <ui-table-header-cell>Actions Count</ui-table-header-cell>
                  <ui-table-header-cell>Last Action</ui-table-header-cell>
                  <ui-table-header-cell>Last Action Date</ui-table-header-cell>
                </ui-table-row>
              </ui-table-head>
              <ui-table-body>
                <ui-table-row *ngFor="let e of summaryEntries; let i = index"
                    [class.atsv__row-alt]="i % 2 === 1" [hoverable]="false">
                  <ui-table-cell>{{ e.user }}</ui-table-cell>
                  <ui-table-cell>{{ e.actionsCount }}</ui-table-cell>
                  <ui-table-cell>{{ e.lastAction }}</ui-table-cell>
                  <ui-table-cell>{{ e.lastActionDate }}</ui-table-cell>
                </ui-table-row>
              </ui-table-body>
            </ui-table>
          </div>

          <!-- Download row -->
          <div class="atsv__download-row">
            <ui-select class="atsv__select" [options]="downloadFormatOptions" [(ngModel)]="downloadFormat"></ui-select>
            <ui-button class="atsv__dl-btn" variant="secondary" label="Download Report" (click)="download.emit(downloadFormat)"></ui-button>
          </div>
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
      --btn-bg: #e8e8e8;
      --btn-bg-hover: #d8d8d8;
      --btn-color: #333;
      --btn-border: 1px solid #aaa;
      --btn-radius: 0px;
      --btn-padding: 3px 12px;
      --btn-font-size: 12px;
      --table-header-bg: #b8d4ef;
      --table-header-border: 1px solid #a0bcd8;
      --table-border-color: #d0d8e0;
      --table-cell-padding: 4px 8px;
      --table-cell-color: #1a1a1a;
    }
    .atsv__panel { border: 1px solid #a8c8e0; background: #fff; }
    .atsv__panel-header {
      background: #b8d4ef; color: #1a3c5e;
      font-weight: bold; font-size: 13px;
      padding: 7px 12px; border-bottom: 1px solid #a8c8e0;
    }
    .atsv__tabs { display: flex; gap: 0; padding: 8px 12px 0; }
    .atsv__tab {
      --btn-bg: #e8f4fb; --btn-color: #333;
      --btn-border: 1px solid #a8c8e0; --btn-border-bottom-color: #a8c8e0;
      --btn-radius: 0px; --btn-padding: 6px 16px; --btn-font-size: 12px;
    }
    .atsv__tab--active {
      --btn-bg: #006fcf; --btn-color: #fff;
      --btn-border: 1px solid #006fcf;
    }
    .atsv__tab-border { border-bottom: 2px solid #a8c8e0; margin: 0 12px; }
    .atsv__controls { display: flex; align-items: center; gap: 8px; padding: 10px 12px; }
    .atsv__ctrl-label { white-space: nowrap; }
    .atsv__select {}
    .atsv__show-btn {}
    .atsv__results { padding: 0 12px 12px; }
    .atsv__result-info { margin-bottom: 8px; }
    .atsv__info-line { font-size: 12px; color: #006fcf; margin-bottom: 3px; }
    .atsv__corp-name { font-weight: bold; }
    .atsv__no-entries { font-size: 12px; color: #c00; margin-bottom: 8px; padding: 4px 0; }
    .atsv__table-wrap { overflow-x: auto; margin-bottom: 10px; }
    .atsv__table ::ng-deep .ui-table { font-size: 11px; }
    .atsv__row-alt ::ng-deep .ui-td { background: #f0f7ff; }
    .atsv__download-row { display: flex; align-items: center; gap: 6px; margin-top: 8px; }
    .atsv__dl-btn {}
  `],
})
export class AmexAuditTrailSummaryViewComponent {
  private static _idCounter = 0;
  @HostBinding('attr.id') @Input() id = `audit-trail-summary-view-${++AmexAuditTrailSummaryViewComponent._idCounter}`;

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
  @Input() downloadFormats: string[] = ['PDF', 'Excel', 'CSV', 'RTF'];
  downloadFormat = 'PDF';

  @Output() showTrail = new EventEmitter<{ year: string; month: string; tab: string }>();
  @Output() download  = new EventEmitter<string>();

  get yearOptions(): SelectOption[] { return this.years.map(y => ({ value: y, label: y })); }
  get monthOptions(): SelectOption[] { return this.months.map(m => ({ value: m, label: m })); }
  get downloadFormatOptions(): SelectOption[] { return this.downloadFormats.map(f => ({ value: f, label: f })); }

  onShowTrail() {
    this.showResults = true;
    this.showTrail.emit({
      year: this.selectedYear,
      month: this.selectedMonth,
      tab: this.activeTab,
    });
  }
}