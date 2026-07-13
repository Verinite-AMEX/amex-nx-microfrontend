import { Component, Input, Output, EventEmitter, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface AddUserFormData {
  userId?: string;
  userName: string;
  emailAddress: string;
  password?: string;
  role: string;
  status: string;
  merchantAccount?: string;
  corporateAccount?: string;
}

/**
 * AddUserForm
 * OMS style: vertical stacked inputs, label above each field, navy Back + purple Submit buttons.
 * BTA style: same layout with extra Corporate/Agent Account field.
 * Source: OMS (image42 EDIT MRM USER), BTA
 */
@Component({
  selector: 'amex-add-user-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="auf">
      <!-- Title + purple accent line — matches OMS image42 exactly -->
      <div class="auf__title">{{ title }}</div>
      <div class="auf__accent"></div>

      <div class="auf__panel">
        <!-- User ID (read-only in edit mode) -->
        <div class="auf__field" *ngIf="showUserId">
          <label class="auf__label" [for]="id + '-user-id'">User ID</label>
          <input [id]="id + '-user-id'" class="auf__input"
            [class.auf__input--readonly]="userIdReadonly"
            [(ngModel)]="form.userId"
            [readonly]="userIdReadonly"
            placeholder="Enter User ID" />
        </div>

        <!-- User Name -->
        <div class="auf__field">
          <label class="auf__label" [for]="id + '-user-name'">User Name</label>
          <div class="auf__input-wrap">
            <input [id]="id + '-user-name'" class="auf__input" [(ngModel)]="form.userName" placeholder="Enter user name" />
            <span class="auf__info-icon" *ngIf="showInfoIcon" title="Username must be unique">&#9432;</span>
          </div>
        </div>

        <!-- Email Address -->
        <div class="auf__field">
          <label class="auf__label" [for]="id + '-email-address'">Email Address</label>
          <input [id]="id + '-email-address'" class="auf__input" [(ngModel)]="form.emailAddress" type="email" placeholder="Enter email address" />
        </div>

        <!-- Password (hidden in edit mode) -->
        <div class="auf__field" *ngIf="showPassword">
          <label class="auf__label" [for]="id + '-password'">Password</label>
          <input [id]="id + '-password'" class="auf__input" [(ngModel)]="form.password" type="password" placeholder="Enter password" />
        </div>

        <!-- Role dropdown -->
        <div class="auf__field" *ngIf="showRole">
          <label class="auf__label" [for]="id + '-role'">Role</label>
          <select [id]="id + '-role'" class="auf__select" [(ngModel)]="form.role">
            <option value="">-- Select Role --</option>
            <option *ngFor="let r of roleOptions" [value]="r.value">{{ r.label }}</option>
          </select>
        </div>

        <!-- Status dropdown -->
        <div class="auf__field">
          <label class="auf__label" [for]="id + '-status'">Status</label>
          <select [id]="id + '-status'" class="auf__select" [(ngModel)]="form.status">
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>

        <!-- Merchant Account (OMS specific) -->
        <div class="auf__field" *ngIf="showMerchantAccount">
          <label class="auf__label" [for]="id + '-merchant-account'">Merchant Account</label>
          <input [id]="id + '-merchant-account'" class="auf__input" [(ngModel)]="form.merchantAccount" placeholder="Enter merchant account number" />
        </div>

        <!-- Corporate Account (BTA specific) -->
        <div class="auf__field" *ngIf="showCorporateAccount">
          <label class="auf__label" [for]="id + '-corporate-account'">Corporate Account</label>
          <input [id]="id + '-corporate-account'" class="auf__input" [(ngModel)]="form.corporateAccount" placeholder="Enter corporate account" />
        </div>

        <!-- Actions — navy Back + purple Submit matching screenshot exactly -->
        <div class="auf__actions">
          <button class="auf__btn auf__btn--back" (click)="backClick.emit()">{{ backLabel }}</button>
          <button class="auf__btn auf__btn--submit" (click)="submitClick.emit(form)">{{ submitLabel }}</button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host { display: block; font-family: Arial, sans-serif; }

    /* Title + purple accent — exact OMS image42 */
    .auf__title {
      font-size: 16px; font-weight: bold; color: #1a3a6b;
      text-transform: uppercase; letter-spacing: 0.5px;
      padding: 0 0 6px;
    }
    .auf__accent { height: 3px; background: #7b1fa2; margin-bottom: 16px; }

    /* White card panel */
    .auf__panel {
      background: #fff;
      border: 1px solid #e0e0e0;
      border-radius: 3px;
      padding: 20px 24px;
      max-width: 460px;
    }

    /* Field layout — label above input */
    .auf__field { margin-bottom: 16px; }
    .auf__label {
      display: block; font-size: 13px; color: #1a3a6b;
      margin-bottom: 6px; font-weight: normal;
    }
    .auf__input-wrap { position: relative; display: flex; align-items: center; }
    .auf__input {
      width: 100%; box-sizing: border-box;
      border: 1px solid #ccc; border-radius: 3px;
      padding: 8px 12px; font-size: 13px;
      font-family: Arial, sans-serif; color: #333;
      outline: none;
    }
    .auf__input:focus { border-color: #7b1fa2; box-shadow: 0 0 0 2px rgba(123,31,162,0.1); }
    .auf__input--readonly { background: #f5f5f5; color: #888; cursor: not-allowed; }
    .auf__info-icon {
      position: absolute; right: 10px;
      color: #1a7abf; font-size: 16px; cursor: help;
    }
    .auf__select {
      width: 100%; box-sizing: border-box;
      border: 1px solid #ccc; border-radius: 3px;
      padding: 8px 12px; font-size: 13px;
      font-family: Arial, sans-serif; color: #333;
      background: #fff; outline: none; cursor: pointer;
    }
    .auf__select:focus { border-color: #7b1fa2; }

    /* Buttons — navy Back + purple Submit (exact OMS screenshot) */
    .auf__actions { display: flex; gap: 12px; margin-top: 20px; }
    .auf__btn {
      padding: 10px 32px; font-size: 14px; font-weight: bold;
      border: none; border-radius: 3px; cursor: pointer;
      font-family: Arial, sans-serif; min-width: 120px;
    }
    .auf__btn--back   { background: #1e3a5f; color: #fff; }
    .auf__btn--back:hover { background: #16304f; }
    .auf__btn--submit { background: #7b1fa2; color: #fff; }
    .auf__btn--submit:hover { background: #6a1b9a; }
  `],
})
export class AmexAddUserFormComponent {
  private static _idCounter = 0;
  @HostBinding('attr.id') readonly id = `add-user-form-${++AmexAddUserFormComponent._idCounter}`;


  @Input() title = 'CREATE USER';
  @Input() showUserId = false;
  @Input() userIdReadonly = false;
  @Input() showPassword = true;
  @Input() showRole = true;
  @Input() showInfoIcon = true;
  @Input() showMerchantAccount = false;
  @Input() showCorporateAccount = false;
  @Input() backLabel = 'Back';
  @Input() submitLabel = 'Submit';
  @Input() roleOptions: { value: string; label: string }[] = [
    { value: 'admin',   label: 'Admin' },
    { value: 'viewer',  label: 'Viewer' },
    { value: 'editor',  label: 'Editor' },
    { value: 'mrm',     label: 'MRM User' },
  ];
  @Input() initialData: Partial<AddUserFormData> = {};

  form: AddUserFormData = {
    userId: '', userName: '', emailAddress: '',
    password: '', role: '', status: 'Active',
    merchantAccount: '', corporateAccount: '',
    ...this.initialData,
  };

  @Output() submitClick = new EventEmitter<AddUserFormData>();
  @Output() backClick   = new EventEmitter<void>();
}
