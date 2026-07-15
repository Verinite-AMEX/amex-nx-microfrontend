import { Component, Input, Output, EventEmitter, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PanelComponent } from '../../../composite/panel';
import { FormFieldComponent } from '../../../composite/form-field';
import { InputComponent } from '../../../primitives/input';
import { SelectComponent } from '../../../primitives/select';
import { ButtonComponent } from '../../../primitives/button';
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
  imports: [CommonModule, FormsModule, PanelComponent, FormFieldComponent, InputComponent, SelectComponent, ButtonComponent],
  template: `
    <ui-panel [title]="title">
      <ui-form-field class="euf__field" *ngIf="data.userId" label="User ID" [forId]="id + '-user-id'">
        <ui-input [id]="id + '-user-id'" [readonly]="true" [ngModel]="data.userId"></ui-input>
      </ui-form-field>

      <ui-form-field class="euf__field" label="User Name" [forId]="id + '-user-name'">
        <ui-input [id]="id + '-user-name'" [(ngModel)]="data.userName"></ui-input>
      </ui-form-field>

      <ui-form-field class="euf__field" label="Email Address" [forId]="id + '-email-address'">
        <ui-input [id]="id + '-email-address'" type="email" [(ngModel)]="data.emailAddress"></ui-input>
      </ui-form-field>

      <ui-form-field class="euf__field" *ngIf="showRole" label="Role" [forId]="id + '-role'">
        <ui-select [id]="id + '-role'" [options]="roleOptions" [(ngModel)]="data.role"></ui-select>
      </ui-form-field>

      <ui-form-field class="euf__field" label="Status" [forId]="id + '-status'">
        <ui-select [id]="id + '-status'" [options]="statusOptions" [(ngModel)]="data.status"></ui-select>
      </ui-form-field>

      <ui-form-field class="euf__field" *ngIf="showMerchantAccount" label="Merchant Account" [forId]="id + '-merchant-account'">
        <ui-input [id]="id + '-merchant-account'" [(ngModel)]="data.merchantAccount"></ui-input>
      </ui-form-field>

      <div class="euf__actions">
        <ui-button class="euf__btn euf__btn--cancel" variant="primary" [label]="cancelLabel" (click)="cancelClick.emit()"></ui-button>
        <ui-button class="euf__btn euf__btn--update" variant="primary" [label]="updateLabel" (click)="updateClick.emit(data)"></ui-button>
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
    }
    .euf__field { margin-bottom: 16px; }
    .euf__actions { display: flex; gap: 12px; margin-top: 20px; }
    .euf__btn--cancel {
      --btn-bg: #1e3a5f; --btn-color: #fff; --btn-radius: 3px;
      --btn-padding: 10px 32px; --btn-font-size: 14px;
    }
    .euf__btn--update {
      --btn-bg: #7b1fa2; --btn-color: #fff; --btn-radius: 3px;
      --btn-padding: 10px 32px; --btn-font-size: 14px;
    }
  `],
})
export class AmexEditUserFormComponent {
  private static _idCounter = 0;
  @HostBinding('attr.id') @Input() id = `edit-user-form-${++AmexEditUserFormComponent._idCounter}`;

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

  readonly statusOptions = [
    { value: 'Active', label: 'Active' },
    { value: 'Inactive', label: 'Inactive' },
  ];

  @Output() updateClick = new EventEmitter<AddUserFormData>();
  @Output() cancelClick = new EventEmitter<void>();
}