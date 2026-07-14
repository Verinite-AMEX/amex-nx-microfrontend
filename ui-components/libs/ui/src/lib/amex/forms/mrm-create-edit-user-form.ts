import { Component, Input, Output, EventEmitter, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PanelComponent } from '../../molecules/panel';
import { FormFieldComponent } from '../../molecules/form-field';
import { InputComponent } from '../../atoms/input';
import { SelectComponent } from '../../atoms/select';
import { CheckboxComponent } from '../../atoms/checkbox';
import { ButtonComponent } from '../../atoms/button';

export interface MRMUserData {
  name: string;
  email: string;
  username: string;
  role: string;
  merchantAccess: string[];
}

/**
 * MRMCreateEditUserForm
 * OMS MRM Admin: Create or edit MRM user with role + merchant access list.
 * Source: OMS (MRM User) — OMS card style, purple accent
 */
@Component({
  selector: 'amex-mrm-create-edit-user-form',
  standalone: true,
  imports: [CommonModule, FormsModule, PanelComponent, FormFieldComponent, InputComponent, SelectComponent, CheckboxComponent, ButtonComponent],
  template: `
    <ui-panel [title]="title" variant="accent">
      <ui-form-field class="mrm__field" label="Name" [forId]="id + '-name'" [required]="true">
        <ui-input [id]="id + '-name'" [(ngModel)]="form.name" placeholder="Enter full name"></ui-input>
      </ui-form-field>

      <ui-form-field class="mrm__field" label="Email" [forId]="id + '-email'" [required]="true">
        <ui-input [id]="id + '-email'" type="email" [(ngModel)]="form.email" placeholder="Enter email address"></ui-input>
      </ui-form-field>

      <ui-form-field class="mrm__field" label="Username" [forId]="id + '-username'" [required]="true">
        <ui-input [id]="id + '-username'" [(ngModel)]="form.username" placeholder="Enter username"></ui-input>
      </ui-form-field>

      <ui-form-field class="mrm__field" label="Role" [forId]="id + '-role'">
        <ui-select [id]="id + '-role'" [options]="roleOptions" placeholder="-- Select Role --" [(ngModel)]="form.role"></ui-select>
      </ui-form-field>

      <!-- Merchant access multi-select -->
      <ui-form-field class="mrm__field" label="Merchant Access">
        <div class="mrm__access-list">
          <ui-checkbox *ngFor="let m of merchantOptions"
            [label]="m.label"
            [ngModel]="form.merchantAccess.includes(m.value)"
            (ngModelChange)="toggleMerchant(m.value, $event)">
          </ui-checkbox>
        </div>
      </ui-form-field>

      <div class="mrm__actions">
        <ui-button class="mrm__btn mrm__btn--back" variant="primary" label="Back" (click)="backClick.emit()"></ui-button>
        <ui-button class="mrm__btn mrm__btn--save" variant="primary" label="Save" (click)="saveClick.emit(form)"></ui-button>
      </div>
    </ui-panel>
  `,
  styles: [`
    :host {
      display: block;
      font-family: Arial, sans-serif;
      --panel-title-transform: uppercase;
      --panel-max-width: 480px;
      --input-border: 1px solid #ccc;
      --input-padding: 8px 12px;
      --input-focus-border-color: #7b1fa2;
    }
    .mrm__field { margin-bottom: 14px; }
    .mrm__access-list { border: 1px solid #e0e0e0; border-radius: 3px; padding: 10px 12px; max-height: 160px; overflow-y: auto; display: flex; flex-direction: column; gap: 8px; }
    .mrm__actions { display: flex; gap: 10px; margin-top: 18px; }
    .mrm__btn--back { --btn-bg: #1e3a5f; --btn-color: #fff; --btn-radius: 3px; --btn-padding: 9px 28px; --btn-font-size: 13px; }
    .mrm__btn--save { --btn-bg: #7b1fa2; --btn-color: #fff; --btn-radius: 3px; --btn-padding: 9px 28px; --btn-font-size: 13px; }
  `],
})
export class AmexMRMCreateEditUserFormComponent {
  private static _idCounter = 0;
  @HostBinding('attr.id') @Input() id = `mrm-create-edit-user-form-${++AmexMRMCreateEditUserFormComponent._idCounter}`;

  @Input() title = 'CREATE MRM USER';
  @Input() roleOptions = [
    { value: 'mrm_admin', label: 'MRM Admin' },
    { value: 'mrm_viewer', label: 'MRM Viewer' },
  ];
  @Input() merchantOptions: { value: string; label: string }[] = [
    { value: '9275640241', label: '9275640241 - Main Merchant' },
    { value: '1100286459', label: '1100286459 - Branch A' },
    { value: '1104166483', label: '1104166483 - Branch B' },
  ];
  @Input() form: MRMUserData = { name: '', email: '', username: '', role: '', merchantAccess: [] };

  @Output() saveClick = new EventEmitter<MRMUserData>();
  @Output() backClick = new EventEmitter<void>();

  toggleMerchant(value: string, checked: boolean) {
    this.form.merchantAccess = checked
      ? [...this.form.merchantAccess, value]
      : this.form.merchantAccess.filter(v => v !== value);
  }
}