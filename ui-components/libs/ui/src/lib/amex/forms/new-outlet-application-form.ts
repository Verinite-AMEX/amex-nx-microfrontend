import { Component, Input, Output, EventEmitter, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

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
  imports: [CommonModule, FormsModule],
  template: `
    <div class="noaf">
      <div class="noaf__title">Add New Outlet</div>
      <div class="noaf__accent"></div>
      <div class="noaf__panel">
        <div class="noaf__field">
          <label class="noaf__label" [for]="id + '-outlet-name'">Outlet Name <span class="noaf__req">*</span></label>
          <input [id]="id + '-outlet-name'" class="noaf__input" [(ngModel)]="form.outletName" placeholder="Enter outlet name" />
        </div>
        <div class="noaf__field">
          <label class="noaf__label" [for]="id + '-location'">Location <span class="noaf__req">*</span></label>
          <input [id]="id + '-location'" class="noaf__input" [(ngModel)]="form.location" placeholder="Enter location / address" />
        </div>
        <div class="noaf__field">
          <label class="noaf__label" [for]="id + '-business-type'">Business Type <span class="noaf__req">*</span></label>
          <select [id]="id + '-business-type'" class="noaf__select" [(ngModel)]="form.businessType">
            <option value="">-- Select --</option>
            <option *ngFor="let t of businessTypes" [value]="t">{{ t }}</option>
          </select>
        </div>
        <div class="noaf__section-title">Contact Details</div>
        <div class="noaf__field">
          <label class="noaf__label" [for]="id + '-contact-name'">Contact Name</label>
          <input [id]="id + '-contact-name'" class="noaf__input" [(ngModel)]="form.contactName" placeholder="Enter contact name" />
        </div>
        <div class="noaf__field">
          <label class="noaf__label" [for]="id + '-contact-email'">Contact Email</label>
          <input [id]="id + '-contact-email'" class="noaf__input" [(ngModel)]="form.contactEmail" type="email" placeholder="Enter email" />
        </div>
        <div class="noaf__field">
          <label class="noaf__label" [for]="id + '-contact-phone'">Contact Phone</label>
          <input [id]="id + '-contact-phone'" class="noaf__input" [(ngModel)]="form.contactPhone" placeholder="Enter phone number" />
        </div>
        <div class="noaf__actions">
          <button class="noaf__btn noaf__btn--back" (click)="backClick.emit()">Back</button>
          <button class="noaf__btn noaf__btn--submit" (click)="submitClick.emit(form)">Submit</button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host { display: block; font-family: Arial, sans-serif; }
    .noaf__title { font-size: 15px; font-weight: bold; color: #1a3a6b; padding: 0 0 6px; text-transform: uppercase; }
    .noaf__accent { height: 3px; background: #7b1fa2; margin-bottom: 14px; }
    .noaf__panel { background: #fff; border: 1px solid #e0e0e0; border-radius: 3px; padding: 18px 22px; max-width: 480px; }
    .noaf__field { margin-bottom: 14px; }
    .noaf__label { display: block; font-size: 13px; color: #1a3a6b; margin-bottom: 5px; }
    .noaf__req { color: #c62828; }
    .noaf__section-title { font-size: 13px; font-weight: bold; color: #555; margin: 16px 0 10px; border-top: 1px solid #f0f0f0; padding-top: 12px; }
    .noaf__input { width: 100%; box-sizing: border-box; border: 1px solid #ccc; border-radius: 3px; padding: 8px 12px; font-size: 13px; font-family: Arial, sans-serif; color: #333; outline: none; }
    .noaf__input:focus { border-color: #7b1fa2; }
    .noaf__select { width: 100%; box-sizing: border-box; border: 1px solid #ccc; border-radius: 3px; padding: 8px 12px; font-size: 13px; font-family: Arial, sans-serif; background: #fff; cursor: pointer; outline: none; }
    .noaf__select:focus { border-color: #7b1fa2; }
    .noaf__actions { display: flex; gap: 10px; margin-top: 18px; }
    .noaf__btn { padding: 9px 28px; font-size: 13px; font-weight: bold; border: none; border-radius: 3px; cursor: pointer; font-family: Arial, sans-serif; }
    .noaf__btn--back   { background: #1e3a5f; color: #fff; }
    .noaf__btn--back:hover { background: #16304f; }
    .noaf__btn--submit { background: #7b1fa2; color: #fff; }
    .noaf__btn--submit:hover { background: #6a1b9a; }
  `],
})
export class AmexNewOutletApplicationFormComponent {
  private static _idCounter = 0;
  @HostBinding('attr.id') readonly id = `new-outlet-application-form-${++AmexNewOutletApplicationFormComponent._idCounter}`;


  @Input() businessTypes = ['Retail', 'Restaurant', 'Hotel', 'Supermarket', 'Petrol Station', 'Other'];
  form: NewOutletData = { outletName: '', location: '', businessType: '', contactName: '', contactEmail: '', contactPhone: '' };
  @Output() submitClick = new EventEmitter<NewOutletData>();
  @Output() backClick   = new EventEmitter<void>();
}
