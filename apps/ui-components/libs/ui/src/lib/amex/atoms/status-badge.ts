import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

export type AmexStatus =
  | 'approved'
  | 'rejected'
  | 'pending'
  | 'draft'
  | 'active'
  | 'inactive'
  | 'processing'
  | 'completed'
  | 'expired'
  | 'locked';

@Component({
  selector: 'amex-status-badge',
  standalone: true,
  imports: [CommonModule],
  template: `
    <span 
      [ngClass]="['amex-status', 'amex-status--' + status]"
      [attr.aria-label]="getAriaLabel()"
      [attr.role]="'status'"
      [attr.aria-live]="status === 'processing' ? 'polite' : null"
      tabindex="0"
    >
      <span class="amex-status__dot" aria-hidden="true"></span>
      <span class="amex-status__text">{{ label || statusLabel }}</span>
    </span>
  `,
  styles: [`
    .amex-status {
      display: inline-flex;
      align-items: center;
      gap: 5px;
      padding: 3px 10px;
      border-radius: 12px;
      font-size: 12px;
      font-weight: 500;
    }
    .amex-status__dot {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      flex-shrink: 0;
    }
    .amex-status--approved   { background: #e8f5e9; color: #1b5e20; }
    .amex-status--approved .amex-status__dot   { background: #2e7d32; }
    .amex-status--rejected   { background: #ffebee; color: #b71c1c; }
    .amex-status--rejected .amex-status__dot   { background: #c62828; }
    .amex-status--pending    { background: #fff8e1; color: #f57c00; }
    .amex-status--pending .amex-status__dot    { background: #f57f17; }
    .amex-status--draft      { background: #f3f4f6; color: #4b5563; }
    .amex-status--draft .amex-status__dot      { background: #9ca3af; }
    .amex-status--active     { background: #e3f2fd; color: #0d47a1; }
    .amex-status--active .amex-status__dot     { background: #1565c0; }
    .amex-status--inactive   { background: #f5f5f5; color: #616161; }
    .amex-status--inactive .amex-status__dot   { background: #9e9e9e; }
    .amex-status--processing { background: #e8eaf6; color: #283593; }
    .amex-status--processing .amex-status__dot { background: #3949ab; }
    .amex-status--completed  { background: #e0f2f1; color: #004d40; }
    .amex-status--completed .amex-status__dot  { background: #00695c; }
    .amex-status--expired    { background: #fce4ec; color: #880e4f; }
    .amex-status--expired .amex-status__dot    { background: #ad1457; }
    .amex-status--locked     { background: #efebe9; color: #3e2723; }
    .amex-status--locked .amex-status__dot     { background: #6d4c41; }
    
    /* Focus styles for keyboard navigation */
    .amex-status:focus {
      outline: 2px solid #006fcf;
      outline-offset: 2px;
    }
    
    /* High contrast mode support */
    @media (prefers-contrast: high) {
      .amex-status {
        border: 1px solid currentColor;
      }
    }
  `],
})
export class AmexStatusBadgeComponent {
  @Input() status: AmexStatus = 'pending';
  @Input() label = '';

  get statusLabel(): string {
    const map: Record<AmexStatus, string> = {
      approved: 'Approved',
      rejected: 'Rejected',
      pending: 'Pending',
      draft: 'Draft',
      active: 'Active',
      inactive: 'Inactive',
      processing: 'Processing',
      completed: 'Completed',
      expired: 'Expired',
      locked: 'Locked',
    };
    return map[this.status];
  }

  getAriaLabel(): string {
    const labelText = this.label || this.statusLabel;
    const statusDescription = this.getStatusDescription();
    return `${labelText}. Status: ${statusDescription}`;
  }

  private getStatusDescription(): string {
    const descriptions: Record<AmexStatus, string> = {
      approved: 'Request has been approved',
      rejected: 'Request has been rejected',
      pending: 'Request is pending review',
      draft: 'Request is in draft status',
      active: 'Account is currently active',
      inactive: 'Account is currently inactive',
      processing: 'Request is being processed',
      completed: 'Request has been completed',
      expired: 'Request has expired',
      locked: 'Account is currently locked',
    };
    return descriptions[this.status];
  }
}
