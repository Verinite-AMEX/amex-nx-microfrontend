import { Component, Input, Output, EventEmitter, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FormFieldComponent } from '../../molecules/form-field';
import { InputComponent } from '../../atoms/input';
import { ButtonComponent } from '../../atoms/button';

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
  imports: [CommonModule, FormsModule, FormFieldComponent, InputComponent, ButtonComponent],
  template: `
    <div class="emdf">
      <div class="emdf__panel-header">{{ panelTitle }}</div>
      <div class="emdf__body">
        <ui-form-field class="emdf__field" label="Name" [required]="true" [forId]="id + '-name'">
          <ui-input [id]="id + '-name'" [required]="true" [(ngModel)]="form.name" placeholder="Enter your name"></ui-input>
        </ui-form-field>
        <ui-form-field class="emdf__field" label="Email" [required]="true" [forId]="id + '-email'">
          <ui-input [id]="id + '-email'" type="email" [required]="true" [(ngModel)]="form.email" placeholder="Enter your email"></ui-input>
        </ui-form-field>
        <ui-form-field class="emdf__field" *ngIf="showPhone" label="Phone" [forId]="id + '-phone'">
          <ui-input [id]="id + '-phone'" [(ngModel)]="form.phone" placeholder="Enter your phone number"></ui-input>
        </ui-form-field>
        <div class="emdf__actions">
          <ui-button class="emdf__btn emdf__btn--cancel" variant="secondary" label="Cancel" (click)="cancelClick.emit()"></ui-button>
          <ui-button class="emdf__btn emdf__btn--save" variant="primary" label="Save Changes" (click)="saveClick.emit(form)"></ui-button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      font-family: Arial, sans-serif;
      --input-border: 1px solid #aaa;
      --input-radius: 0px;
      --input-padding: 6px 10px;
      --input-focus-border-color: #006fcf;
    }
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
    .emdf__actions { display: flex; gap: 10px; margin-top: 16px; }
    .emdf__btn--cancel {
      --btn-bg: linear-gradient(to bottom, #f5f5f5, #ddd);
      --btn-color: #333; --btn-border: 1px solid #bbb;
      --btn-radius: 2px; --btn-padding: 6px 20px; --btn-font-size: 13px;
    }
    .emdf__btn--save {
      --btn-bg: linear-gradient(to bottom, #5ba3e0, #006fcf);
      --btn-color: #fff; --btn-border: 1px solid #005fba;
      --btn-radius: 2px; --btn-padding: 6px 20px; --btn-font-size: 13px;
    }
  `],
})
export class AmexEditMyDetailsFormComponent {
  private static _idCounter = 0;
  @HostBinding('attr.id') @Input() id = `edit-my-details-form-${++AmexEditMyDetailsFormComponent._idCounter}`;

  @Input() panelTitle = 'Edit My Details';
  @Input() showPhone = true;
  @Input() initialData: Partial<MyDetailsFormData> = {};

  form: MyDetailsFormData = { name: '', email: '', phone: '', ...this.initialData };

  @Output() saveClick   = new EventEmitter<MyDetailsFormData>();
  @Output() cancelClick = new EventEmitter<void>();
}