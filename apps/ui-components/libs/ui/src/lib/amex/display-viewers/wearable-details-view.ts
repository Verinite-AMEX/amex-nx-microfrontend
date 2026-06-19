import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface WearableDevice {
  clientCode:  string;
  deviceType:  string;   // 'Ring' | 'Bracelet' | 'Band' | 'Watch'
  status:      string;   // 'Issued' | 'Pending' | 'Cancelled'
  issueDate?:  string;
  cardLinked?: string;
  serialNo?:   string;
}

/**
 * WearableDetailsView
 * Shows issued wearable device information after client number lookup.
 * Matches AMEX Wearables portal: "Enter Client Number" → big blue header, white bordered table.
 * Source: AEME Wearables
 * Style: ONLS Helper — bold blue header, details in bordered panel.
 */
@Component({
  selector: 'amex-wearable-details-view',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="wdv">
      <!-- Section header bar -->
      <div class="wdv__section-header">AMEX Wearables</div>

      <!-- Client Number search -->
      <div class="wdv__search">
        <div class="wdv__search-title">Enter Client Number</div>
        <div class="wdv__search-divider"></div>
        <div class="wdv__search-row">
          <input class="wdv__input" [(ngModel)]="clientInput"
                 placeholder="eg. 12345" />
          <button class="wdv__enter-btn" (click)="search.emit(clientInput)">Enter</button>
        </div>
      </div>

      <!-- Device details panel -->
      <div *ngIf="device" class="wdv__panel">
        <div class="wdv__panel-header">Wearable Device Details</div>
        <div class="wdv__detail-body">
          <table class="wdv__table">
            <tr>
              <td class="wdv__td-label">Client Code</td>
              <td class="wdv__td-value">{{ device.clientCode }}</td>
            </tr>
            <tr>
              <td class="wdv__td-label">Device Type</td>
              <td class="wdv__td-value">{{ device.deviceType }}</td>
            </tr>
            <tr>
              <td class="wdv__td-label">Status</td>
              <td class="wdv__td-value">
                <span [class.wdv__status--issued]="device.status === 'Issued'"
                      [class.wdv__status--pending]="device.status === 'Pending'"
                      [class.wdv__status--cancelled]="device.status === 'Cancelled'">
                  {{ device.status }}
                </span>
              </td>
            </tr>
            <tr *ngIf="device.issueDate">
              <td class="wdv__td-label">Issue Date</td>
              <td class="wdv__td-value">{{ device.issueDate }}</td>
            </tr>
            <tr *ngIf="device.cardLinked">
              <td class="wdv__td-label">Card Linked</td>
              <td class="wdv__td-value">{{ device.cardLinked }}</td>
            </tr>
            <tr *ngIf="device.serialNo">
              <td class="wdv__td-label">Serial No</td>
              <td class="wdv__td-value">{{ device.serialNo }}</td>
            </tr>
          </table>

          <!-- Actions -->
          <div class="wdv__actions">
            <button class="wdv__action-btn wdv__action-btn--primary"
                    (click)="issueNew.emit(device)">Issue New Wearable</button>
            <button class="wdv__action-btn"
                    (click)="viewHistory.emit(device)">View History</button>
          </div>
        </div>
      </div>

      <!-- Multiple devices list -->
      <div *ngIf="devices && devices.length > 1" class="wdv__devices-list">
        <div class="wdv__panel-header">All Devices ({{ devices.length }})</div>
        <table class="wdv__list-table">
          <thead>
            <tr>
              <th>Device Type</th>
              <th>Status</th>
              <th>Issue Date</th>
              <th>Card Linked</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let d of devices; let i = index" [class.wdv__row-alt]="i % 2 === 1">
              <td>{{ d.deviceType }}</td>
              <td>
                <span [class.wdv__status--issued]="d.status === 'Issued'"
                      [class.wdv__status--pending]="d.status === 'Pending'"
                      [class.wdv__status--cancelled]="d.status === 'Cancelled'">
                  {{ d.status }}
                </span>
              </td>
              <td>{{ d.issueDate || '—' }}</td>
              <td>{{ d.cardLinked || '—' }}</td>
              <td>
                <span class="wdv__tbl-link" (click)="viewHistory.emit(d)">View</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Empty state -->
      <div *ngIf="!device && !(devices && devices.length)" class="wdv__empty">
        Enter a client number above to view wearable device details.
      </div>

      <div class="wdv__copyright">Copyright &copy; 2009 American Express Company</div>
    </div>
  `,
  styles: [`
    :host { display: block; font-family: Arial, sans-serif; font-size: 12px; }

    .wdv { background: #fff; max-width: 800px; }

    .wdv__section-header {
      background: #006fcf; color: #fff; font-size: 13px; font-weight: bold;
      padding: 8px 16px;
    }

    .wdv__search {
      padding: 20px 24px; border-bottom: 1px solid #ddd;
    }
    .wdv__search-title {
      font-size: 18px; font-weight: bold; color: #1a1a1a; margin-bottom: 8px;
    }
    .wdv__search-divider {
      height: 2px; background: #006fcf; margin-bottom: 14px;
    }
    .wdv__search-row { display: flex; gap: 0; }
    .wdv__input {
      border: 1px solid #ccc; padding: 6px 10px; font-size: 13px;
      font-family: Arial, sans-serif; width: 280px;
    }
    .wdv__enter-btn {
      background: #e8e8e8; border: 1px solid #aaa; border-left: none;
      padding: 6px 20px; font-size: 13px; font-family: Arial, sans-serif; cursor: pointer;
    }
    .wdv__enter-btn:hover { background: #d8d8d8; }

    /* Device panel */
    .wdv__panel { margin: 16px; border: 1px solid #b0cce0; }
    .wdv__panel-header {
      background: #b8d4ef; color: #1a3c5e; font-weight: bold; font-size: 13px;
      padding: 7px 12px; border-bottom: 1px solid #a0bcd8;
    }
    .wdv__detail-body { padding: 14px; }

    .wdv__table { border-collapse: collapse; width: 100%; max-width: 480px; }
    .wdv__table tr { border-bottom: 1px solid #e0ecf8; }
    .wdv__td-label {
      padding: 7px 12px; font-size: 12px; color: #555; font-weight: bold;
      background: #f0f8ff; width: 140px;
    }
    .wdv__td-value { padding: 7px 12px; font-size: 12px; color: #1a1a1a; }

    .wdv__status--issued    { color: #2e7d32; font-weight: bold; }
    .wdv__status--pending   { color: #e65100; font-weight: bold; }
    .wdv__status--cancelled { color: #c62828; font-weight: bold; }

    /* Actions */
    .wdv__actions { display: flex; gap: 8px; margin-top: 14px; }
    .wdv__action-btn {
      background: #e8e8e8; border: 1px solid #aaa; padding: 5px 14px;
      font-size: 12px; font-family: Arial, sans-serif; cursor: pointer;
    }
    .wdv__action-btn--primary {
      background: linear-gradient(to bottom, #5ba3e0, #006fcf);
      color: #fff; border-color: #005fba;
    }
    .wdv__action-btn--primary:hover { background: linear-gradient(to bottom, #4a92cf, #0058a6); }
    .wdv__action-btn:not(.wdv__action-btn--primary):hover { background: #d8d8d8; }

    /* Devices list */
    .wdv__devices-list { margin: 16px; border: 1px solid #b0cce0; }
    .wdv__list-table {
      width: 100%; border-collapse: collapse; font-size: 12px;
    }
    .wdv__list-table th {
      background: #d4e8f8; border: 1px solid #b0cce0;
      padding: 6px 8px; text-align: left; font-weight: bold;
    }
    .wdv__list-table td { border: 1px solid #d0e4f0; padding: 5px 8px; color: #333; }
    .wdv__row-alt td { background: #f0f8ff; }
    .wdv__tbl-link { color: #006fcf; cursor: pointer; text-decoration: underline; }

    .wdv__empty { padding: 24px 16px; font-size: 13px; color: #888; }
    .wdv__copyright {
      font-size: 11px; color: #888; text-align: right;
      padding: 8px 16px; border-top: 1px solid #e0e0e0;
    }
  `],
})
export class AmexWearableDetailsViewComponent {
  @Input() device:  WearableDevice | null = null;
  @Input() devices: WearableDevice[] = [];
  clientInput = '';

  @Output() search      = new EventEmitter<string>();
  @Output() issueNew    = new EventEmitter<WearableDevice>();
  @Output() viewHistory = new EventEmitter<WearableDevice>();
}
