import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

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
  imports: [CommonModule, FormsModule],
  template: `
    <div class="mrm">
      <div class="mrm__title">{{ title }}</div>
      <div class="mrm__accent"></div>

      <div class="mrm__panel">
        <div class="mrm__field">
          <label class="mrm__label">Name <span class="mrm__req">*</span></label>
          <input class="mrm__input" [(ngModel)]="form.name" placeholder="Enter full name" />
        </div>
        <div class="mrm__field">
          <label class="mrm__label">Email <span class="mrm__req">*</span></label>
          <input class="mrm__input" [(ngModel)]="form.email" type="email" placeholder="Enter email address" />
        </div>
        <div class="mrm__field">
          <label class="mrm__label">Username <span class="mrm__req">*</span></label>
          <input class="mrm__input" [(ngModel)]="form.username" placeholder="Enter username" />
        </div>
        <div class="mrm__field">
          <label class="mrm__label">Role</label>
          <select class="mrm__select" [(ngModel)]="form.role">
            <option value="">-- Select Role --</option>
            <option *ngFor="let r of roleOptions" [value]="r.value">{{ r.label }}</option>
          </select>
        </div>

        <!-- Merchant access multi-select -->
        <div class="mrm__field">
          <label class="mrm__label">Merchant Access</label>
          <div class="mrm__access-list">
            <label *ngFor="let m of merchantOptions" class="mrm__access-item">
              <input type="checkbox"
                [checked]="form.merchantAccess.includes(m.value)"
                (change)="toggleMerchant(m.value, $event)" />
              <span>{{ m.label }}</span>
            </label>
          </div>
        </div>

        <div class="mrm__actions">
          <button class="mrm__btn mrm__btn--back" (click)="backClick.emit()">Back</button>
          <button class="mrm__btn mrm__btn--save" (click)="saveClick.emit(form)">Save</button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host { display: block; font-family: Arial, sans-serif; }
    .mrm__title { font-size: 16px; font-weight: bold; color: #1a3a6b; text-transform: uppercase; padding: 0 0 6px; }
    .mrm__accent { height: 3px; background: #7b1fa2; margin-bottom: 16px; }
    .mrm__panel { background: #fff; border: 1px solid #e0e0e0; border-radius: 3px; padding: 18px 22px; max-width: 480px; }
    .mrm__field { margin-bottom: 14px; }
    .mrm__label { display: block; font-size: 13px; color: #1a3a6b; margin-bottom: 5px; }
    .mrm__req { color: #c62828; }
    .mrm__input { width: 100%; box-sizing: border-box; border: 1px solid #ccc; border-radius: 3px; padding: 8px 12px; font-size: 13px; font-family: Arial, sans-serif; color: #333; outline: none; }
    .mrm__input:focus { border-color: #7b1fa2; }
    .mrm__select { width: 100%; box-sizing: border-box; border: 1px solid #ccc; border-radius: 3px; padding: 8px 12px; font-size: 13px; font-family: Arial, sans-serif; background: #fff; cursor: pointer; outline: none; }
    .mrm__select:focus { border-color: #7b1fa2; }
    .mrm__access-list { border: 1px solid #e0e0e0; border-radius: 3px; padding: 10px 12px; max-height: 160px; overflow-y: auto; display: flex; flex-direction: column; gap: 8px; }
    .mrm__access-item { display: flex; align-items: center; gap: 8px; font-size: 13px; color: #333; cursor: pointer; }
    .mrm__actions { display: flex; gap: 10px; margin-top: 18px; }
    .mrm__btn { padding: 9px 28px; font-size: 13px; font-weight: bold; border: none; border-radius: 3px; cursor: pointer; font-family: Arial, sans-serif; }
    .mrm__btn--back { background: #1e3a5f; color: #fff; }
    .mrm__btn--back:hover { background: #16304f; }
    .mrm__btn--save { background: #7b1fa2; color: #fff; }
    .mrm__btn--save:hover { background: #6a1b9a; }
  `],
})
export class AmexMRMCreateEditUserFormComponent {
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

  toggleMerchant(value: string, event: Event) {
    const checked = (event.target as HTMLInputElement).checked;
    this.form.merchantAccess = checked
      ? [...this.form.merchantAccess, value]
      : this.form.merchantAccess.filter(v => v !== value);
  }
}
