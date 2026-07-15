import { Component, Input, Output, EventEmitter, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PanelComponent } from '../../../composite/panel';
import { FormFieldComponent } from '../../../composite/form-field';
import { InputComponent } from '../../../primitives/input';
import { SelectComponent } from '../../../primitives/select';
import { ButtonComponent } from '../../../primitives/button';

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
  imports: [CommonModule, FormsModule, PanelComponent, FormFieldComponent, InputComponent, SelectComponent, ButtonComponent],
  template: `
    <ui-panel [title]="title">
      <!-- User ID (read-only in edit mode) -->
      <ui-form-field class="auf__field" *ngIf="showUserId" label="User ID" [forId]="id + '-user-id'">
        <ui-input
          [id]="id + '-user-id'"
          [readonly]="userIdReadonly"
          [(ngModel)]="form.userId"
          placeholder="Enter User ID">
        </ui-input>
      </ui-form-field>

      <!-- User Name -->
      <ui-form-field class="auf__field" label="User Name" [forId]="id + '-user-name'">
        <div class="auf__input-wrap">
          <ui-input [id]="id + '-user-name'" [(ngModel)]="form.userName" placeholder="Enter user name"></ui-input>
          <span class="auf__info-icon" *ngIf="showInfoIcon" title="Username must be unique">&#9432;</span>
        </div>
      </ui-form-field>

      <!-- Email Address -->
      <ui-form-field class="auf__field" label="Email Address" [forId]="id + '-email-address'">
        <ui-input [id]="id + '-email-address'" type="email" [(ngModel)]="form.emailAddress" placeholder="Enter email address"></ui-input>
      </ui-form-field>

      <!-- Password (hidden in edit mode) -->
      <ui-form-field class="auf__field" *ngIf="showPassword" label="Password" [forId]="id + '-password'">
        <ui-input [id]="id + '-password'" type="password" [(ngModel)]="form.password" placeholder="Enter password"></ui-input>
      </ui-form-field>

      <!-- Role dropdown -->
      <ui-form-field class="auf__field" *ngIf="showRole" label="Role" [forId]="id + '-role'">
        <ui-select [id]="id + '-role'" [options]="roleOptions" placeholder="-- Select Role --" [(ngModel)]="form.role"></ui-select>
      </ui-form-field>

      <!-- Status dropdown -->
      <ui-form-field class="auf__field" label="Status" [forId]="id + '-status'">
        <ui-select [id]="id + '-status'" [options]="statusOptions" [(ngModel)]="form.status"></ui-select>
      </ui-form-field>

      <!-- Merchant Account (OMS specific) -->
      <ui-form-field class="auf__field" *ngIf="showMerchantAccount" label="Merchant Account" [forId]="id + '-merchant-account'">
        <ui-input [id]="id + '-merchant-account'" [(ngModel)]="form.merchantAccount" placeholder="Enter merchant account number"></ui-input>
      </ui-form-field>

      <!-- Corporate Account (BTA specific) -->
      <ui-form-field class="auf__field" *ngIf="showCorporateAccount" label="Corporate Account" [forId]="id + '-corporate-account'">
        <ui-input [id]="id + '-corporate-account'" [(ngModel)]="form.corporateAccount" placeholder="Enter corporate account"></ui-input>
      </ui-form-field>

      <!-- Actions — navy Back + purple Submit matching screenshot exactly -->
      <div class="auf__actions">
        <ui-button class="auf__btn auf__btn--back" variant="primary" [label]="backLabel" (click)="backClick.emit()"></ui-button>
        <ui-button class="auf__btn auf__btn--submit" variant="primary" [label]="submitLabel" (click)="submitClick.emit(form)"></ui-button>
      </div>
    </ui-panel>
  `,
  styles: [`
    :host {
      display: block;
      font-family: Arial, sans-serif;
      --panel-accent-color: #7b1fa2;
      --panel-max-width: 460px;
      --input-border: 1px solid #ccc;
      --input-radius: 3px;
      --input-padding: 8px 12px;
      --input-focus-border-color: #7b1fa2;
      --input-focus-shadow: 0 0 0 2px rgba(123,31,162,0.1);
    }

    .auf__field { margin-bottom: 16px; }
    .auf__input-wrap { position: relative; display: flex; align-items: center; }
    .auf__info-icon {
      position: absolute; right: 10px;
      color: #1a7abf; font-size: 16px; cursor: help;
    }

    /* Buttons — navy Back + purple Submit (exact OMS screenshot) */
    .auf__actions { display: flex; gap: 12px; margin-top: 20px; }
    .auf__btn--back {
      --btn-bg: #1e3a5f; --btn-color: #fff; --btn-radius: 3px;
      --btn-padding: 10px 32px; --btn-font-size: 14px;
    }
    .auf__btn--submit {
      --btn-bg: #7b1fa2; --btn-color: #fff; --btn-radius: 3px;
      --btn-padding: 10px 32px; --btn-font-size: 14px;
    }
  `],
})
export class AmexAddUserFormComponent {
  private static _idCounter = 0;
  @HostBinding('attr.id') @Input() id = `add-user-form-${++AmexAddUserFormComponent._idCounter}`;

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

  readonly statusOptions = [
    { value: 'Active', label: 'Active' },
    { value: 'Inactive', label: 'Inactive' },
  ];

  form: AddUserFormData = {
    userId: '', userName: '', emailAddress: '',
    password: '', role: '', status: 'Active',
    merchantAccount: '', corporateAccount: '',
    ...this.initialData,
  };

  @Output() submitClick = new EventEmitter<AddUserFormData>();
  @Output() backClick   = new EventEmitter<void>();
}