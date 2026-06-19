import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AmexStatusBadgeComponent, AmexStatus } from '../atoms/status-badge';

export type AmexUserRole =
  | 'master-admin'
  | 'sub-admin'
  | 'user'
  | 'mrm'
  | 'vat-user'
  | 'travel-agent'
  | 'internal-admin';

export interface AmexUser {
  id: string;
  name: string;
  email: string;
  role: AmexUserRole;
  status: AmexStatus;
  lastLogin?: string;
  accountNumber?: string;
}

@Component({
  selector: 'amex-user-row',
  standalone: true,
  imports: [CommonModule, AmexStatusBadgeComponent],
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
        <button class="amex-user-row__btn" (click)="edit.emit(user)">Edit</button>
        <button class="amex-user-row__btn" (click)="resetPassword.emit(user)">Reset Pwd</button>
        <button *ngIf="user.status === 'active'" class="amex-user-row__btn amex-user-row__btn--warn" (click)="toggleStatus.emit(user)">Lock</button>
        <button *ngIf="user.status !== 'active'" class="amex-user-row__btn amex-user-row__btn--ok" (click)="toggleStatus.emit(user)">Unlock</button>
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
    .amex-user-row__btn {
      padding: 4px 10px; border-radius: 4px; font-size: 12px;
      border: 1px solid #d0d0d0; background: #fff; cursor: pointer;
    }
    .amex-user-row__btn:hover { background: #f5f5f5; }
    .amex-user-row__btn--warn { color: #c62828; border-color: #f5c6c6; }
    .amex-user-row__btn--ok  { color: #2e7d32; border-color: #c8e6c9; }
  `],
})
export class AmexUserRowComponent {
  @Input() user!: AmexUser;
  @Output() edit = new EventEmitter<AmexUser>();
  @Output() resetPassword = new EventEmitter<AmexUser>();
  @Output() toggleStatus = new EventEmitter<AmexUser>();

  get initials(): string {
    return this.user?.name?.split(' ').map(w => w[0]).slice(0, 2).join('').toUpperCase() ?? '??';
  }

  get roleLabel(): string {
    const map: Record<AmexUserRole, string> = {
      'master-admin': 'Master Admin',
      'sub-admin': 'Sub Admin',
      'user': 'User',
      'mrm': 'MRM',
      'vat-user': 'VAT User',
      'travel-agent': 'Travel Agent',
      'internal-admin': 'Internal Admin',
    };
    return map[this.user?.role] ?? this.user?.role;
  }
}
