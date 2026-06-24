import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AddUserFormData } from './add-user-form';

/**
 * EditUserForm
 * Pre-filled edit form for existing users.
 * OMS: userId + userName + email + status + Update/Cancel
 * BTA: all fields including role, corporate account
 * Source: OMS, BTA — same OMS card style as AddUserForm
 */
@Component({
  selector: 'amex-edit-user-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="euf">
      <div class="euf__title">{{ title }}</div>
      <div class="euf__accent"></div>

      <div class="euf__panel">
        <div class="euf__field" *ngIf="data.userId">
          <label class="euf__label">User ID</label>
          <input class="euf__input euf__input--readonly" [value]="data.userId" readonly />
        </div>

        <div class="euf__field">
          <label class="euf__label">User Name</label>
          <input class="euf__input" [(ngModel)]="data.userName" />
        </div>

        <div class="euf__field">
          <label class="euf__label">Email Address</label>
          <input class="euf__input" [(ngModel)]="data.emailAddress" type="email" />
        </div>

        <div class="euf__field" *ngIf="showRole">
          <label class="euf__label">Role</label>
          <select class="euf__select" [(ngModel)]="data.role">
            <option *ngFor="let r of roleOptions" [value]="r.value">{{ r.label }}</option>
          </select>
        </div>

        <div class="euf__field">
          <label class="euf__label">Status</label>
          <select class="euf__select" [(ngModel)]="data.status">
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>

        <div class="euf__field" *ngIf="showMerchantAccount">
          <label class="euf__label">Merchant Account</label>
          <input class="euf__input" [(ngModel)]="data.merchantAccount" />
        </div>

        <div class="euf__actions">
          <button class="euf__btn euf__btn--cancel" (click)="cancelClick.emit()">{{ cancelLabel }}</button>
          <button class="euf__btn euf__btn--update" (click)="updateClick.emit(data)">{{ updateLabel }}</button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host { display: block; font-family: Arial, sans-serif; }
    .euf__title { font-size: 16px; font-weight: bold; color: #1a3a6b; text-transform: uppercase; letter-spacing: 0.5px; padding: 0 0 6px; }
    .euf__accent { height: 3px; background: #7b1fa2; margin-bottom: 16px; }
    .euf__panel { background: #fff; border: 1px solid #e0e0e0; border-radius: 3px; padding: 20px 24px; max-width: 460px; }
    .euf__field { margin-bottom: 16px; }
    .euf__label { display: block; font-size: 13px; color: #1a3a6b; margin-bottom: 6px; }
    .euf__input {
      width: 100%; box-sizing: border-box; border: 1px solid #ccc; border-radius: 3px;
      padding: 8px 12px; font-size: 13px; font-family: Arial, sans-serif; color: #333; outline: none;
    }
    .euf__input:focus { border-color: #7b1fa2; }
    .euf__input--readonly { background: #f5f5f5; color: #888; cursor: not-allowed; }
    .euf__select {
      width: 100%; box-sizing: border-box; border: 1px solid #ccc; border-radius: 3px;
      padding: 8px 12px; font-size: 13px; font-family: Arial, sans-serif; color: #333;
      background: #fff; cursor: pointer; outline: none;
    }
    .euf__select:focus { border-color: #7b1fa2; }
    .euf__actions { display: flex; gap: 12px; margin-top: 20px; }
    .euf__btn { padding: 10px 32px; font-size: 14px; font-weight: bold; border: none; border-radius: 3px; cursor: pointer; font-family: Arial, sans-serif; min-width: 120px; }
    .euf__btn--cancel { background: #1e3a5f; color: #fff; }
    .euf__btn--cancel:hover { background: #16304f; }
    .euf__btn--update { background: #7b1fa2; color: #fff; }
    .euf__btn--update:hover { background: #6a1b9a; }
  `],
})
export class AmexEditUserFormComponent {
  @Input() title = 'EDIT USER';
  @Input() showRole = false;
  @Input() showMerchantAccount = false;
  @Input() cancelLabel = 'Back';
  @Input() updateLabel = 'Submit';
  @Input() roleOptions: { value: string; label: string }[] = [
    { value: 'Active', label: 'Active' },
    { value: 'Inactive', label: 'Inactive' },
  ];
  @Input() data: AddUserFormData = {
    userId: '', userName: '', emailAddress: '',
    role: '', status: 'Active',
  };
  @Output() updateClick = new EventEmitter<AddUserFormData>();
  @Output() cancelClick = new EventEmitter<void>();
}
