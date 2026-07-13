import { Component, Input, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AmexStatusBadgeComponent, AmexStatus } from '../atoms/status-badge';

export interface AmexAuditEntry {
  timestamp: string;
  user: string;
  userRole?: string;
  action: string;
  details?: string;
  ipAddress?: string;
  status?: AmexStatus;
}

@Component({
  selector: 'amex-audit-trail-row',
  standalone: true,
  imports: [CommonModule, AmexStatusBadgeComponent],
  template: `
    <div class="amex-audit-row">
      <div class="amex-audit-row__time">
        <div class="amex-audit-row__date">{{ datePart }}</div>
        <div class="amex-audit-row__clock">{{ timePart }}</div>
      </div>
      <div class="amex-audit-row__connector">
        <div class="amex-audit-row__dot"></div>
        <div class="amex-audit-row__line"></div>
      </div>
      <div class="amex-audit-row__body">
        <div class="amex-audit-row__action">{{ entry.action }}</div>
        <div class="amex-audit-row__meta">
          <span class="amex-audit-row__user">{{ entry.user }}</span>
          <span *ngIf="entry.userRole" class="amex-audit-row__role">{{ entry.userRole }}</span>
          <span *ngIf="entry.ipAddress" class="amex-audit-row__ip">{{ entry.ipAddress }}</span>
        </div>
        <div *ngIf="entry.details" class="amex-audit-row__details">{{ entry.details }}</div>
      </div>
      <div *ngIf="entry.status" class="amex-audit-row__status">
        <amex-status-badge [status]="entry.status"></amex-status-badge>
      </div>
    </div>
  `,
  styles: [`
    .amex-audit-row {
      display: grid;
      grid-template-columns: 80px 24px 1fr auto;
      gap: 12px;
      align-items: start;
      padding: 8px 0;
    }
    .amex-audit-row__date { font-size: 11px; color: #888; }
    .amex-audit-row__clock { font-size: 12px; font-weight: 600; color: #444; }
    .amex-audit-row__connector { display: flex; flex-direction: column; align-items: center; padding-top: 4px; }
    .amex-audit-row__dot {
      width: 10px; height: 10px;
      border-radius: 50%;
      background: #016FD0;
      flex-shrink: 0;
    }
    .amex-audit-row__line { flex: 1; width: 2px; background: #e0e9ff; margin-top: 2px; min-height: 20px; }
    .amex-audit-row__action { font-size: 13px; font-weight: 600; color: #111; margin-bottom: 4px; }
    .amex-audit-row__meta { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 4px; }
    .amex-audit-row__user { font-size: 12px; color: #016FD0; font-weight: 500; }
    .amex-audit-row__role, .amex-audit-row__ip {
      font-size: 11px; color: #888;
      background: #f5f5f5; padding: 1px 6px; border-radius: 8px;
    }
    .amex-audit-row__details { font-size: 12px; color: #666; }
    .amex-audit-row__status { padding-top: 2px; }
  `],
})
export class AmexAuditTrailRowComponent {
  private static _idCounter = 0;
  @HostBinding('attr.id') readonly id = `audit-trail-row-${++AmexAuditTrailRowComponent._idCounter}`;


  @Input() entry!: AmexAuditEntry;

  get datePart(): string {
    return this.entry.timestamp?.split(' ')[0] ?? '';
  }
  get timePart(): string {
    return this.entry.timestamp?.split(' ')[1] ?? '';
  }
}
