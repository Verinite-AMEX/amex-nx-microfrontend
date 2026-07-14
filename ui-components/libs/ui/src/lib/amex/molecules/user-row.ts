import { Component, Input, Output, EventEmitter, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AmexStatusBadgeComponent, AmexStatus } from '../atoms/status-badge';
import { ButtonComponent } from '../../atoms/button';

export type AmexUserRole =
  | 'master-admin'
  | 'sub-admin'
  | 'user'
  | 'mrm'
  | 'vat-user'
  | 'travel-agent'
  | 'internal-admin';

export type AmexUserRowButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';
export type AmexUserRowButtonSize = 'sm' | 'md' | 'lg';

export interface AmexUser {
  id: string;
  name: string;
  email: string;
  role: AmexUserRole;
  status: AmexStatus;
  lastLogin?: string;
  accountNumber?: string;
}

const DEFAULT_ROLE_LABELS: Record<AmexUserRole, string> = {
  'master-admin': 'Master Admin',
  'sub-admin': 'Sub Admin',
  'user': 'User',
  'mrm': 'MRM',
  'vat-user': 'VAT User',
  'travel-agent': 'Travel Agent',
  'internal-admin': 'Internal Admin',
};

@Component({
  selector: 'amex-user-row',
  standalone: true,
  imports: [CommonModule, AmexStatusBadgeComponent, ButtonComponent],
  template: `
    <div class="amex-user-row">
      <div class="amex-user-row__avatar">{{ initials }}</div>
      <div class="amex-user-row__info">
        <div class="amex-user-row__name">{{ user.name }}</div>
        <div class="amex-user-row__email">{{ user.email }}</div>
      </div>
      <div class="amex-user-row__role">{{ roleLabel }}</div>
      <amex-status-badge [status]="user.status"></amex-status-badge>
      <div *ngIf="user.lastLogin" class="amex-user-row__login">{{ user.lastLogin }}</div>
      <div class="amex-user-row__actions">
        <ui-button
          *ngIf="showEdit"
          [id]="id + '-edit'"
          [label]="editLabel"
          [variant]="editVariant"
          [size]="buttonSize"
          [disabled]="disabled"
          [ariaLabel]="editAriaLabel || (editLabel + ' ' + user.name)"
          (click)="edit.emit(user)">
        </ui-button>
        <ui-button
          *ngIf="showResetPassword"
          [id]="id + '-reset-password'"
          [label]="resetPasswordLabel"
          [variant]="resetPasswordVariant"
          [size]="buttonSize"
          [disabled]="disabled"
          [ariaLabel]="resetPasswordAriaLabel || (resetPasswordLabel + ' ' + user.name)"
          (click)="resetPassword.emit(user)">
        </ui-button>
        <ui-button
          *ngIf="showToggleStatus && user.status === activeStatus"
          [id]="id + '-lock'"
          [label]="lockLabel"
          [variant]="lockVariant"
          [size]="buttonSize"
          [disabled]="disabled"
          [ariaLabel]="lockAriaLabel || (lockLabel + ' ' + user.name)"
          (click)="toggleStatus.emit(user)">
        </ui-button>
        <ui-button
          *ngIf="showToggleStatus && user.status !== activeStatus"
          [id]="id + '-unlock'"
          [label]="unlockLabel"
          [variant]="unlockVariant"
          [size]="buttonSize"
          [disabled]="disabled"
          [ariaLabel]="unlockAriaLabel || (unlockLabel + ' ' + user.name)"
          (click)="toggleStatus.emit(user)">
        </ui-button>
      </div>
    </div>
  `,
  styles: [`
    .amex-user-row {
      display: grid;
      grid-template-columns: 40px 1fr 130px auto auto auto;
      align-items: center;
      gap: 12px;
      padding: 10px 14px;
      border-bottom: 1px solid #f0f0f0;
      background: #fff;
    }
    .amex-user-row:hover { background: #fafbff; }
    .amex-user-row__avatar {
      width: 36px; height: 36px;
      border-radius: 50%;
      background: #016FD0;
      color: #fff;
      font-size: 13px; font-weight: 700;
      display: flex; align-items: center; justify-content: center;
      flex-shrink: 0;
    }
    .amex-user-row__name { font-size: 13px; font-weight: 600; color: #111; }
    .amex-user-row__email { font-size: 12px; color: #888; }
    .amex-user-row__role {
      font-size: 12px; color: #555;
      background: #f0f4ff;
      padding: 3px 10px; border-radius: 10px;
      white-space: nowrap;
    }
    .amex-user-row__login { font-size: 11px; color: #aaa; white-space: nowrap; }
    .amex-user-row__actions { display: flex; gap: 6px; }
  `],
})
export class AmexUserRowComponent {
  private static _idCounter = 0;

  /** Overridable so parent tables/screens can supply a stable id for aria-* wiring; falls back to an auto-generated one. */
  @HostBinding('attr.id') @Input() id = `amex-user-row-${++AmexUserRowComponent._idCounter}`;

  @Input() user!: AmexUser;
  @Input() disabled = false;

  /** Which status value counts as "active" for the Lock/Unlock toggle — configurable, not assumed elsewhere. */
  @Input() activeStatus: AmexStatus = 'active';

  /** Per-action visibility toggles. */
  @Input() showEdit = true;
  @Input() showResetPassword = true;
  @Input() showToggleStatus = true;

  /** Fully configurable action button copy, styling and a11y — nothing hardcoded. */
  @Input() editLabel = 'Edit';
  @Input() resetPasswordLabel = 'Reset Pwd';
  @Input() lockLabel = 'Lock';
  @Input() unlockLabel = 'Unlock';

  @Input() editVariant: AmexUserRowButtonVariant = 'ghost';
  @Input() resetPasswordVariant: AmexUserRowButtonVariant = 'ghost';
  @Input() lockVariant: AmexUserRowButtonVariant = 'danger';
  @Input() unlockVariant: AmexUserRowButtonVariant = 'secondary';
  @Input() buttonSize: AmexUserRowButtonSize = 'sm';

  @Input() editAriaLabel = '';
  @Input() resetPasswordAriaLabel = '';
  @Input() lockAriaLabel = '';
  @Input() unlockAriaLabel = '';

  /** Optional override/extension of the built-in role→label map, merged over the defaults. */
  @Input() roleLabels: Partial<Record<AmexUserRole, string>> = {};

  @Output() edit = new EventEmitter<AmexUser>();
  @Output() resetPassword = new EventEmitter<AmexUser>();
  @Output() toggleStatus = new EventEmitter<AmexUser>();

  get initials(): string {
    return this.user?.name?.split(' ').map(w => w[0]).slice(0, 2).join('').toUpperCase() ?? '??';
  }

  get roleLabel(): string {
    const role = this.user?.role;
    return this.roleLabels[role] ?? DEFAULT_ROLE_LABELS[role] ?? role;
  }
}