import { Component, Input, Output, EventEmitter, OnChanges, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';

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
  imports: [CommonModule],
  template: `
    <div class="wdt">
      <div class="wdt__header">
        <span class="wdt__title">{{ title }}</span>
        <div class="wdt__divider"></div>
      </div>

      <!-- Device type icon tabs — matches Wearables image8 (Bracelet/Band/Ring) -->
      <div class="wdt__type-tabs" *ngIf="showTypeTabs">
        <div *ngFor="let t of deviceTypes"
          class="wdt__type-tab"
          [class.wdt__type-tab--active]="activeType === t.id"
          (click)="activeType = t.id; typeChange.emit(t.id)">
          <span class="wdt__type-icon">{{ t.icon }}</span>
          <span class="wdt__type-label">{{ t.label }}</span>
        </div>
      </div>

      <table class="wdt__table">
        <thead>
          <tr class="wdt__head-row">
            <th class="wdt__th" scope="col">Device Type</th>
            <th class="wdt__th" scope="col">Status</th>
            <th class="wdt__th" scope="col">Card Linked</th>
            <th class="wdt__th" scope="col">Issue Date</th>
            <th class="wdt__th wdt__th--actions" scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let row of rows" class="wdt__row">
            <td class="wdt__td">{{ row.deviceType }}</td>
            <td class="wdt__td">
              <span class="wdt__status"
                [class.wdt__status--active]="row.status === 'Active' || row.status === 'Issued'"
                [class.wdt__status--inactive]="row.status === 'Inactive'">
                {{ row.status }}
              </span>
            </td>
            <td class="wdt__td">{{ row.cardLinked || '—' }}</td>
            <td class="wdt__td">{{ row.issueDate || '—' }}</td>
            <td class="wdt__td wdt__td--actions">
              <button class="wdt__btn wdt__btn--view"  (click)="actionClick.emit({action:'view',row})">View</button>
              <button class="wdt__btn wdt__btn--issue" (click)="actionClick.emit({action:'issue',row})"
                *ngIf="row.status !== 'Issued'">Issue</button>
              <button class="wdt__btn wdt__btn--claim" (click)="actionClick.emit({action:'claim',row})"
                *ngIf="row.status === 'Issued'">Claim</button>
            </td>
          </tr>
          <tr *ngIf="!rows.length">
            <td colspan="5" class="wdt__empty">No wearable devices found.</td>
          </tr>
        </tbody>
      </table>
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
      display: flex; flex-direction: column; align-items: center; gap: 4px;
      cursor: pointer; padding: 4px 12px; border-bottom: 2px solid transparent;
      color: #555;
    }
    .wdt__type-tab--active { color: #1a3a6b; border-bottom-color: #1a3a6b; }
    .wdt__type-icon { font-size: 22px; }
    .wdt__type-label { font-size: 12px; font-weight: bold; }

    .wdt__table { width: 100%; border-collapse: collapse; font-size: 13px; }
    .wdt__head-row { background: #d6eaf8; }
    .wdt__th {
      padding: 8px 12px; text-align: left; font-size: 12px;
      font-weight: bold; color: #1a3a6b; border: 1px solid #b8d4ea;
    }
    .wdt__th--actions { text-align: center; }
    .wdt__row { border-bottom: 1px solid #e8eef4; }
    .wdt__row:hover { background: #f5f9ff; }
    .wdt__td { padding: 9px 12px; border: 1px solid #e8eef4; font-size: 13px; color: #333; }
    .wdt__td--actions { text-align: center; white-space: nowrap; }
    .wdt__status--active   { color: #2e7d32; font-weight: bold; }
    .wdt__status--inactive { color: #c62828; }
    .wdt__btn {
      border: none; padding: 4px 12px; font-size: 12px; font-weight: bold;
      cursor: pointer; border-radius: 3px; margin: 2px; font-family: Arial, sans-serif;
    }
    .wdt__btn--view  { background: #1976d2; color: #fff; }
    .wdt__btn--view:hover { background: #1565c0; }
    .wdt__btn--issue { background: #1976d2; color: #fff; }
    .wdt__btn--issue:hover { background: #1565c0; }
    .wdt__btn--claim { background: #2e7d32; color: #fff; }
    .wdt__btn--claim:hover { background: #1b5e20; }
    .wdt__empty { text-align: center; padding: 24px; color: #888; font-size: 13px; }
  `],
})
export class AmexWearableDeviceTableComponent {
  private static _idCounter = 0;
  @HostBinding('attr.id') readonly id = `wearable-device-table-${++AmexWearableDeviceTableComponent._idCounter}`;


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
