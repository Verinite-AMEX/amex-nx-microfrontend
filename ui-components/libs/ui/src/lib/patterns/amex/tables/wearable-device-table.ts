import { Component, Input, Output, EventEmitter, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../../../primitives/button';
import { TableComponent } from '../../../primitives/table';
import { TableHeadComponent } from '../../../primitives/table-head';
import { TableHeaderCellComponent } from '../../../primitives/table-header-cell';
import { TableBodyComponent } from '../../../primitives/table-body';
import { TableRowComponent } from '../../../primitives/table-row';
import { TableCellComponent } from '../../../primitives/table-cell';

export interface WearableDeviceRow {
  deviceType: string;   /* 'Bracelet' | 'Band' | 'Ring' */
  status: string;       /* 'Active' | 'Inactive' | 'Issued' */
  cardLinked?: string;
  issueDate?: string;
}

/**
 * WearableDeviceTable
 * Lists wearable devices for a client. Claim/Issue/View actions per row.
 * Source: AEME Wearables (image7/image8)
 * Style: Modern ONLS blue header, white table
 */
@Component({
  selector: 'amex-wearable-device-table',
  standalone: true,
  imports: [
    CommonModule, ButtonComponent, TableComponent, TableHeadComponent, TableHeaderCellComponent,
    TableBodyComponent, TableRowComponent, TableCellComponent,
  ],
  template: `
    <div class="wdt">
      <div class="wdt__header">
        <span class="wdt__title">{{ title }}</span>
        <div class="wdt__divider"></div>
      </div>

      <!-- Device type icon tabs — matches Wearables image8 (Bracelet/Band/Ring) -->
      <div class="wdt__type-tabs" *ngIf="showTypeTabs">
        <ui-button *ngFor="let t of deviceTypes"
          class="wdt__type-tab"
          [class.wdt__type-tab--active]="activeType === t.id"
          [label]="t.label"
          variant="ghost"
          [size]="'sm'"
          (click)="activeType = t.id; typeChange.emit(t.id)">
          <span slot="icon-start" class="wdt__type-icon">{{ t.icon }}</span>
        </ui-button>
      </div>

      <ui-table class="wdt__table" [bordered]="true">
        <ui-table-head>
          <ui-table-row [header]="true" [hoverable]="false">
            <ui-table-header-cell>Device Type</ui-table-header-cell>
            <ui-table-header-cell>Status</ui-table-header-cell>
            <ui-table-header-cell>Card Linked</ui-table-header-cell>
            <ui-table-header-cell>Issue Date</ui-table-header-cell>
            <ui-table-header-cell class="wdt__th--actions">Actions</ui-table-header-cell>
          </ui-table-row>
        </ui-table-head>
        <ui-table-body>
          <ui-table-row *ngFor="let row of rows" [hoverable]="true">
            <ui-table-cell>{{ row.deviceType }}</ui-table-cell>
            <ui-table-cell>
              <span class="wdt__status"
                [class.wdt__status--active]="row.status === 'Active' || row.status === 'Issued'"
                [class.wdt__status--inactive]="row.status === 'Inactive'">
                {{ row.status }}
              </span>
            </ui-table-cell>
            <ui-table-cell>{{ row.cardLinked || '—' }}</ui-table-cell>
            <ui-table-cell>{{ row.issueDate || '—' }}</ui-table-cell>
            <ui-table-cell class="wdt__td--actions">
              <ui-button class="wdt__btn wdt__btn--view" label="View" variant="primary" [size]="'sm'" (click)="actionClick.emit({action:'view',row})"></ui-button>
              <ui-button class="wdt__btn wdt__btn--issue" label="Issue" variant="primary" [size]="'sm'" (click)="actionClick.emit({action:'issue',row})"
                *ngIf="row.status !== 'Issued'"></ui-button>
              <ui-button class="wdt__btn wdt__btn--claim" label="Claim" variant="primary" [size]="'sm'" (click)="actionClick.emit({action:'claim',row})"
                *ngIf="row.status === 'Issued'"></ui-button>
            </ui-table-cell>
          </ui-table-row>
          <ui-table-row *ngIf="!rows.length" [hoverable]="false">
            <ui-table-cell [colspan]="5" [align]="'center'" class="wdt__empty">No wearable devices found.</ui-table-cell>
          </ui-table-row>
        </ui-table-body>
      </ui-table>
    </div>
  `,
  styles: [`
    :host { display: block; font-family: Arial, sans-serif; }
    .wdt__header { padding: 4px 0 8px; }
    .wdt__title { font-size: 16px; font-weight: bold; color: #1a3a6b; }
    .wdt__divider { height: 2px; background: #1a3a6b; margin-top: 6px; }

    /* Type tabs — Bracelet / Band / Ring with icons */
    .wdt__type-tabs { display: flex; gap: 32px; padding: 14px 0 10px; }
    .wdt__type-tab {
      --btn-flex-direction: column; --btn-bg: transparent; --btn-color: #555;
      --btn-font-weight: bold; --btn-border-bottom-color: transparent; border-bottom: 2px solid transparent;
    }
    .wdt__type-tab--active { --btn-color: #1a3a6b; border-bottom-color: #1a3a6b; }
    .wdt__type-icon { font-size: 22px; }

    .wdt__th--actions { text-align: center; }
    .wdt__td--actions { text-align: center; white-space: nowrap; }
    .wdt__status--active   { color: #2e7d32; font-weight: bold; }
    .wdt__status--inactive { color: #c62828; }
    .wdt__btn { --btn-radius: 3px; margin: 2px; }
    .wdt__btn--view, .wdt__btn--issue { --btn-bg: #1976d2; --btn-color: #fff; }
    .wdt__btn--view:hover, .wdt__btn--issue:hover { --btn-bg: #1565c0; }
    .wdt__btn--claim { --btn-bg: #2e7d32; --btn-color: #fff; }
    .wdt__btn--claim:hover { --btn-bg: #1b5e20; }
    .wdt__empty { color: #888; font-size: 13px; padding: 24px 0; }
  `],
})
export class AmexWearableDeviceTableComponent {
  private static _idCounter = 0;
  @HostBinding('attr.id') @Input() id = `wearable-device-table-${++AmexWearableDeviceTableComponent._idCounter}`;

  @Input() title = 'Wearable Devices';
  @Input() rows: WearableDeviceRow[] = [];
  @Input() showTypeTabs = true;
  @Input() deviceTypes = [
    { id: 'bracelet', label: 'Bracelet', icon: '📿' },
    { id: 'band',     label: 'Band',     icon: '⌚' },
    { id: 'ring',     label: 'Ring',     icon: '💍' },
  ];
  activeType = 'bracelet';
  @Output() actionClick = new EventEmitter<{ action: string; row: WearableDeviceRow }>();
  @Output() typeChange  = new EventEmitter<string>();
}