import { Component, Input, HostBinding } from '@angular/core';
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

/**
 * DLS's .badgeStatus (css/badge.css) only ships 4 semantic colors
 * (see site/components/badges → "Status Badges" → States):
 *   Green  .dlsColorSuccessBg   -> Active
 *   Yellow .dlsColorAttentionBg -> Suspended / Pending / In Progress
 *   Grey   .dlsColorNeutralBg   -> Off / Inactive
 *   Red    .dlsColorWarningBg   -> Error
 * Every AmexStatus below is mapped onto one of these 4 DLS colors.
 */
const DLS_STATUS_COLOR_CLASS: Record<AmexStatus, string> = {
  approved: 'dlsColorSuccessBg',
  active: 'dlsColorSuccessBg',
  completed: 'dlsColorSuccessBg',
  pending: 'dlsColorAttentionBg',
  processing: 'dlsColorAttentionBg',
  draft: 'dlsColorNeutralBg',
  inactive: 'dlsColorNeutralBg',
  rejected: 'dlsColorWarningBg',
  expired: 'dlsColorWarningBg',
  locked: 'dlsColorWarningBg',
};

@Component({
  selector: 'amex-status-badge',
  standalone: true,
  imports: [CommonModule],
  template: `
    <span
      class="flexInline focusDark"
      role="status"
      [attr.aria-label]="getAriaLabel()"
      [attr.aria-live]="status === 'processing' ? 'polite' : null"
      tabindex="0"
    >
      <span
        class="badge badgeStatus"
        [ngClass]="colorClass"
        aria-hidden="true"
      ></span>
      <span class="body1 dlsGray06">{{ label || statusLabel }}</span>
    </span>
  `,
})
export class AmexStatusBadgeComponent {
  private static _idCounter = 0;
  @HostBinding('attr.id') @Input() id =
    `status-badge-${++AmexStatusBadgeComponent._idCounter}`;

  @Input() status: AmexStatus = 'pending';
  @Input() label = '';

  get colorClass(): string {
    return DLS_STATUS_COLOR_CLASS[this.status];
  }

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