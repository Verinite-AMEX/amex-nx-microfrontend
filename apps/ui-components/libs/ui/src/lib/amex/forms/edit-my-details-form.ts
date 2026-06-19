import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface MyDetailsFormData {
  name: string;
  email: string;
  phone?: string;
}

/**
 * EditMyDetailsForm
 * BTA: logged-in user updates their own profile details.
 * Style: BTA portal — light blue panel header, bordered form
 */
@Component({
  selector: 'amex-edit-my-details-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="emdf">
      <div class="emdf__panel-header">{{ panelTitle }}</div>
      <div class="emdf__body">
        <div class="emdf__field">
          <label class="emdf__label">Name <span class="emdf__req">*</span></label>
          <input class="emdf__input" [(ngModel)]="form.name" placeholder="Enter your name" />
        </div>
        <div class="emdf__field">
          <label class="emdf__label">Email <span class="emdf__req">*</span></label>
          <input class="emdf__input" [(ngModel)]="form.email" type="email" placeholder="Enter your email" />
        </div>
        <div class="emdf__field" *ngIf="showPhone">
          <label class="emdf__label">Phone</label>
          <input class="emdf__input" [(ngModel)]="form.phone" placeholder="Enter your phone number" />
        </div>
        <div class="emdf__actions">
          <button class="emdf__btn emdf__btn--cancel" (click)="cancelClick.emit()">Cancel</button>
          <button class="emdf__btn emdf__btn--save" (click)="saveClick.emit(form)">Save Changes</button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host { display: block; font-family: Arial, sans-serif; }
    .emdf__panel-header {
      background: #b8d8f0; padding: 8px 14px;
      font-size: 13px; font-weight: bold; color: #1a3a6b;
      border: 1px solid #a0c0d8; border-bottom: none;
    }
    .emdf__body {
      border: 1px solid #b0cce0; background: #fff;
      padding: 16px 20px; max-width: 480px;
    }
    .emdf__field { margin-bottom: 14px; }
    .emdf__label { display: block; font-size: 13px; color: #333; margin-bottom: 5px; font-weight: bold; }
    .emdf__req { color: #c62828; }
    .emdf__input {
      width: 100%; box-sizing: border-box; border: 1px solid #aaa;
      padding: 6px 10px; font-size: 13px; font-family: Arial, sans-serif; outline: none;
    }
    .emdf__input:focus { border-color: #006fcf; }
    .emdf__actions { display: flex; gap: 10px; margin-top: 16px; }
    .emdf__btn {
      padding: 6px 20px; font-size: 13px; cursor: pointer;
      border-radius: 2px; font-family: Arial, sans-serif;
    }
    .emdf__btn--cancel {
      background: linear-gradient(to bottom, #f5f5f5, #ddd);
      border: 1px solid #bbb; color: #333;
    }
    .emdf__btn--save {
      background: linear-gradient(to bottom, #5ba3e0, #006fcf);
      border: 1px solid #005fba; color: #fff;
    }
    .emdf__btn--save:hover { background: linear-gradient(to bottom, #4a92cf, #0058a6); }
  `],
})
export class AmexEditMyDetailsFormComponent {
  @Input() panelTitle = 'Edit My Details';
  @Input() showPhone = true;
  @Input() initialData: Partial<MyDetailsFormData> = {};

  form: MyDetailsFormData = { name: '', email: '', phone: '', ...this.initialData };

  @Output() saveClick   = new EventEmitter<MyDetailsFormData>();
  @Output() cancelClick = new EventEmitter<void>();
}
