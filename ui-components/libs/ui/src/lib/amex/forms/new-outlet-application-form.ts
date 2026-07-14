import { Component, Input, Output, EventEmitter, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FormFieldComponent } from '../../molecules/form-field';
import { InputComponent } from '../../atoms/input';
import { SelectComponent } from '../../atoms/select';
import { ButtonComponent } from '../../atoms/button';

/* ─────────────────────────────────────────────────────────────────
   NewOutletApplicationForm
   OMS Sub-User: Add a new outlet under their merchant account.
   Source: OMS (Sub Users) — OMS white card, purple accent, navy/purple buttons
   ───────────────────────────────────────────────────────────────── */
export interface NewOutletData {
  outletName: string;
  location: string;
  businessType: string;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
}

@Component({
  selector: 'amex-new-outlet-application-form',
  standalone: true,
  imports: [CommonModule, FormsModule, FormFieldComponent, InputComponent, SelectComponent, ButtonComponent],
  template: `
    <div class="noaf">
      <div class="noaf__title">Add New Outlet</div>
      <div class="noaf__accent"></div>
      <div class="noaf__panel">
        <ui-form-field class="noaf__field" label="Outlet Name" [forId]="id + '-outlet-name'" [required]="true">
          <ui-input [id]="id + '-outlet-name'" [(ngModel)]="form.outletName" placeholder="Enter outlet name"></ui-input>
        </ui-form-field>

        <ui-form-field class="noaf__field" label="Location" [forId]="id + '-location'" [required]="true">
          <ui-input [id]="id + '-location'" [(ngModel)]="form.location" placeholder="Enter location / address"></ui-input>
        </ui-form-field>

        <ui-form-field class="noaf__field" label="Business Type" [forId]="id + '-business-type'" [required]="true">
          <ui-select [id]="id + '-business-type'" [options]="businessTypeOptions" placeholder="-- Select --" [(ngModel)]="form.businessType"></ui-select>
        </ui-form-field>

        <div class="noaf__section-title">Contact Details</div>

        <ui-form-field class="noaf__field" label="Contact Name" [forId]="id + '-contact-name'">
          <ui-input [id]="id + '-contact-name'" [(ngModel)]="form.contactName" placeholder="Enter contact name"></ui-input>
        </ui-form-field>

        <ui-form-field class="noaf__field" label="Contact Email" [forId]="id + '-contact-email'">
          <ui-input [id]="id + '-contact-email'" type="email" [(ngModel)]="form.contactEmail" placeholder="Enter email"></ui-input>
        </ui-form-field>

        <ui-form-field class="noaf__field" label="Contact Phone" [forId]="id + '-contact-phone'">
          <ui-input [id]="id + '-contact-phone'" [(ngModel)]="form.contactPhone" placeholder="Enter phone number"></ui-input>
        </ui-form-field>

        <div class="noaf__actions">
          <ui-button class="noaf__btn noaf__btn--back" variant="primary" label="Back" (click)="backClick.emit()"></ui-button>
          <ui-button class="noaf__btn noaf__btn--submit" variant="primary" label="Submit" (click)="submitClick.emit(form)"></ui-button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      font-family: Arial, sans-serif;
      --input-border: 1px solid #ccc;
      --input-padding: 8px 12px;
      --input-focus-border-color: #7b1fa2;
    }
    .noaf__title { font-size: 15px; font-weight: bold; color: #1a3a6b; padding: 0 0 6px; text-transform: uppercase; }
    .noaf__accent { height: 3px; background: #7b1fa2; margin-bottom: 14px; }
    .noaf__panel { background: #fff; border: 1px solid #e0e0e0; border-radius: 3px; padding: 18px 22px; max-width: 480px; }
    .noaf__field { margin-bottom: 14px; }
    .noaf__section-title { font-size: 13px; font-weight: bold; color: #555; margin: 16px 0 10px; border-top: 1px solid #f0f0f0; padding-top: 12px; }
    .noaf__actions { display: flex; gap: 10px; margin-top: 18px; }
    .noaf__btn--back   { --btn-bg: #1e3a5f; --btn-color: #fff; --btn-radius: 3px; --btn-padding: 9px 28px; --btn-font-size: 13px; }
    .noaf__btn--submit { --btn-bg: #7b1fa2; --btn-color: #fff; --btn-radius: 3px; --btn-padding: 9px 28px; --btn-font-size: 13px; }
  `],
})
export class AmexNewOutletApplicationFormComponent {
  private static _idCounter = 0;
  @HostBinding('attr.id') readonly id = `new-outlet-application-form-${++AmexNewOutletApplicationFormComponent._idCounter}`;

  @Input() businessTypes = ['Retail', 'Restaurant', 'Hotel', 'Supermarket', 'Petrol Station', 'Other'];
  form: NewOutletData = { outletName: '', location: '', businessType: '', contactName: '', contactEmail: '', contactPhone: '' };
  @Output() submitClick = new EventEmitter<NewOutletData>();
  @Output() backClick   = new EventEmitter<void>();

  get businessTypeOptions() { return this.businessTypes.map(t => ({ value: t, label: t })); }
}