import { Component, Input, Output, EventEmitter, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InputComponent } from '../../../primitives/input';
import { ButtonComponent } from '../../../primitives/button';
import { TableComponent } from '../../../primitives/table';
import { TableHeadComponent } from '../../../primitives/table-head';
import { TableHeaderCellComponent } from '../../../primitives/table-header-cell';
import { TableBodyComponent } from '../../../primitives/table-body';
import { TableRowComponent } from '../../../primitives/table-row';
import { TableCellComponent } from '../../../primitives/table-cell';

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
  imports: [
    CommonModule, FormsModule, InputComponent, ButtonComponent,
    TableComponent, TableHeadComponent, TableHeaderCellComponent, TableBodyComponent, TableRowComponent, TableCellComponent,
  ],
  template: `
    <div class="wdv">
      <!-- Section header bar -->
      <div class="wdv__section-header">AMEX Wearables</div>

      <!-- Client Number search -->
      <div class="wdv__search">
        <div class="wdv__search-title">Enter Client Number</div>
        <div class="wdv__search-divider"></div>
        <div class="wdv__search-row">
          <ui-input class="wdv__input" [(ngModel)]="clientInput"
                 placeholder="eg. 12345"></ui-input>
          <ui-button class="wdv__enter-btn" variant="secondary" label="Enter" (click)="search.emit(clientInput)"></ui-button>
        </div>
      </div>

      <!-- Device details panel -->
      <div *ngIf="device" class="wdv__panel">
        <div class="wdv__panel-header">Wearable Device Details</div>
        <div class="wdv__detail-body">
          <ui-table class="wdv__table">
            <ui-table-body>
              <ui-table-row [hoverable]="false">
                <ui-table-cell class="wdv__td-label">Client Code</ui-table-cell>
                <ui-table-cell class="wdv__td-value">{{ device.clientCode }}</ui-table-cell>
              </ui-table-row>
              <ui-table-row [hoverable]="false">
                <ui-table-cell class="wdv__td-label">Device Type</ui-table-cell>
                <ui-table-cell class="wdv__td-value">{{ device.deviceType }}</ui-table-cell>
              </ui-table-row>
              <ui-table-row [hoverable]="false">
                <ui-table-cell class="wdv__td-label">Status</ui-table-cell>
                <ui-table-cell class="wdv__td-value">
                  <span [class.wdv__status--issued]="device.status === 'Issued'"
                        [class.wdv__status--pending]="device.status === 'Pending'"
                        [class.wdv__status--cancelled]="device.status === 'Cancelled'">
                    {{ device.status }}
                  </span>
                </ui-table-cell>
              </ui-table-row>
              <ui-table-row *ngIf="device.issueDate" [hoverable]="false">
                <ui-table-cell class="wdv__td-label">Issue Date</ui-table-cell>
                <ui-table-cell class="wdv__td-value">{{ device.issueDate }}</ui-table-cell>
              </ui-table-row>
              <ui-table-row *ngIf="device.cardLinked" [hoverable]="false">
                <ui-table-cell class="wdv__td-label">Card Linked</ui-table-cell>
                <ui-table-cell class="wdv__td-value">{{ device.cardLinked }}</ui-table-cell>
              </ui-table-row>
              <ui-table-row *ngIf="device.serialNo" [hoverable]="false">
                <ui-table-cell class="wdv__td-label">Serial No</ui-table-cell>
                <ui-table-cell class="wdv__td-value">{{ device.serialNo }}</ui-table-cell>
              </ui-table-row>
            </ui-table-body>
          </ui-table>

          <!-- Actions -->
          <div class="wdv__actions">
            <ui-button class="wdv__action-btn wdv__action-btn--primary"
                    variant="secondary" label="Issue New Wearable"
                    (click)="issueNew.emit(device)"></ui-button>
            <ui-button class="wdv__action-btn"
                    variant="secondary" label="View History"
                    (click)="viewHistory.emit(device)"></ui-button>
          </div>
        </div>
      </div>

      <!-- Multiple devices list -->
      <div *ngIf="devices && devices.length > 1" class="wdv__devices-list">
        <div class="wdv__panel-header">All Devices ({{ devices.length }})</div>
        <ui-table class="wdv__list-table">
          <ui-table-head>
            <ui-table-row [header]="true" [hoverable]="false">
              <ui-table-header-cell class="wdv__th">Device Type</ui-table-header-cell>
              <ui-table-header-cell class="wdv__th">Status</ui-table-header-cell>
              <ui-table-header-cell class="wdv__th">Issue Date</ui-table-header-cell>
              <ui-table-header-cell class="wdv__th">Card Linked</ui-table-header-cell>
              <ui-table-header-cell class="wdv__th">Actions</ui-table-header-cell>
            </ui-table-row>
          </ui-table-head>
          <ui-table-body>
            <ui-table-row *ngFor="let d of devices; let i = index" [hoverable]="false" [class.wdv__row-alt]="i % 2 === 1">
              <ui-table-cell class="wdv__td">{{ d.deviceType }}</ui-table-cell>
              <ui-table-cell class="wdv__td">
                <span [class.wdv__status--issued]="d.status === 'Issued'"
                      [class.wdv__status--pending]="d.status === 'Pending'"
                      [class.wdv__status--cancelled]="d.status === 'Cancelled'">
                  {{ d.status }}
                </span>
              </ui-table-cell>
              <ui-table-cell class="wdv__td">{{ d.issueDate || '—' }}</ui-table-cell>
              <ui-table-cell class="wdv__td">{{ d.cardLinked || '—' }}</ui-table-cell>
              <ui-table-cell class="wdv__td">
                <span class="wdv__tbl-link" (click)="viewHistory.emit(d)">View</span>
              </ui-table-cell>
            </ui-table-row>
          </ui-table-body>
        </ui-table>
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
      --input-border: 1px solid #ccc;
      --input-padding: 6px 10px;
      width: 280px;
      font-size: 13px;
    }
    .wdv__enter-btn {
      --btn-bg: #e8e8e8;
      --btn-color: #333;
      --btn-border: 1px solid #aaa;
      --btn-radius: 0;
      --btn-padding: 6px 20px;
      --btn-font-size: 13px;
      --btn-bg-hover: #d8d8d8;
      border-left: none;
    }

    /* Device panel */
    .wdv__panel { margin: 16px; border: 1px solid #b0cce0; }
    .wdv__panel-header {
      background: #b8d4ef; color: #1a3c5e; font-weight: bold; font-size: 13px;
      padding: 7px 12px; border-bottom: 1px solid #a0bcd8;
    }
    .wdv__detail-body { padding: 14px; }

    .wdv__table { max-width: 480px; }
    .wdv__td-label {
      --table-cell-padding: 7px 12px;
      --table-cell-color: #555;
      --table-cell-font-weight: bold;
      background: #f0f8ff; width: 140px;
    }
    .wdv__td-value { --table-cell-padding: 7px 12px; --table-cell-color: #1a1a1a; }

    .wdv__status--issued    { color: #2e7d32; font-weight: bold; }
    .wdv__status--pending   { color: #e65100; font-weight: bold; }
    .wdv__status--cancelled { color: #c62828; font-weight: bold; }

    /* Actions */
    .wdv__actions { display: flex; gap: 8px; margin-top: 14px; }
    .wdv__action-btn {
      --btn-bg: #e8e8e8;
      --btn-color: #333;
      --btn-border: 1px solid #aaa;
      --btn-radius: 0;
      --btn-padding: 5px 14px;
      --btn-font-size: 12px;
      --btn-bg-hover: #d8d8d8;
    }
    .wdv__action-btn--primary {
      --btn-bg: linear-gradient(to bottom, #5ba3e0, #006fcf);
      --btn-color: #fff;
      --btn-border: 1px solid #005fba;
      --btn-bg-hover: linear-gradient(to bottom, #4a92cf, #0058a6);
    }

    /* Devices list */
    .wdv__devices-list { margin: 16px; border: 1px solid #b0cce0; }
    .wdv__list-table { font-size: 12px; }
    .wdv__th {
      --table-header-bg: #d4e8f8;
      --table-header-border: 1px solid #b0cce0;
      padding: 6px 8px;
    }
    .wdv__td {
      --table-cell-border: 1px solid #d0e4f0;
      --table-cell-padding: 5px 8px;
      --table-cell-color: #333;
    }
    .wdv__row-alt .wdv__td { --table-cell-bg: #f0f8ff; }
    .wdv__tbl-link { color: #006fcf; cursor: pointer; text-decoration: underline; }

    .wdv__empty { padding: 24px 16px; font-size: 13px; color: #888; }
    .wdv__copyright {
      font-size: 11px; color: #888; text-align: right;
      padding: 8px 16px; border-top: 1px solid #e0e0e0;
    }
  `],
})
export class AmexWearableDetailsViewComponent {
  private static _idCounter = 0;
  @HostBinding('attr.id') @Input() id = `wearable-details-view-${++AmexWearableDetailsViewComponent._idCounter}`;

  @Input() device:  WearableDevice | null = null;
  @Input() devices: WearableDevice[] = [];
  clientInput = '';

  @Output() search      = new EventEmitter<string>();
  @Output() issueNew    = new EventEmitter<WearableDevice>();
  @Output() viewHistory = new EventEmitter<WearableDevice>();
}