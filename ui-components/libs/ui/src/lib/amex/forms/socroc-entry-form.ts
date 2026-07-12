import { Component, Input, Output, EventEmitter, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface SOCFormData {
  seNumber: string;
  seName: string;
  date: string;
  currency: string;
  country: string;
  grandTotal: string;
  noOfCharges: string;
  socRefNo: string;
  refund: boolean;
}

export interface ROCFormData {
  cardAccountNo: string;
  hash: string;
  dateOfChange: string;
  balanceSocAmt: string;
  approvalCode: string;
  rejectionCode: string;
  totalAmount: string;
  rocRefNo: string;
}

/**
 * SOCROCEntryForm
 * Two bordered fieldset sections: SOC's and ROC's.
 * Exact match to SOC/ROC image15 — ONLS portal style, 2-col layout, gradient blue buttons.
 */
@Component({
  selector: 'amex-socroc-entry-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="sef">

      <!-- SOC's section — bordered fieldset like screenshot -->
      <fieldset class="sef__fieldset" *ngIf="showSOC">
        <legend class="sef__legend">SOC's</legend>
        <div class="sef__grid">
          <!-- Left column -->
          <div class="sef__col">
            <div class="sef__row">
              <label class="sef__label" [for]="id + '-se-number'">SE Number <span class="sef__req">*</span></label>
              <input [id]="id + '-se-number'" class="sef__input" [(ngModel)]="soc.seNumber" />
            </div>
            <div class="sef__row">
              <label class="sef__label" [for]="id + '-date'">Date <span class="sef__req">*</span></label>
              <div class="sef__date-inputs">
                <input [id]="id + '-date'" class="sef__input sef__input--date" [(ngModel)]="socDay" placeholder="DD" maxlength="2" />
                <input class="sef__input sef__input--date" [(ngModel)]="socMonth" placeholder="MM" maxlength="2" />
                <input class="sef__input sef__input--year" [(ngModel)]="socYear" placeholder="YYYY" maxlength="4" />
              </div>
            </div>
            <div class="sef__row">
              <label class="sef__label" [for]="id + '-grand-total'">Grand Total <span class="sef__req">*</span></label>
              <input [id]="id + '-grand-total'" class="sef__input" [(ngModel)]="soc.grandTotal" />
            </div>
            <div class="sef__row">
              <label class="sef__label" [for]="id + '-no-of-charges'">No. of Charges <span class="sef__req">*</span></label>
              <input [id]="id + '-no-of-charges'" class="sef__input" [(ngModel)]="soc.noOfCharges" />
            </div>
            <div class="sef__row">
              <label class="sef__label" [for]="id + '-soc-ref-no'">SOC Ref. No. <span class="sef__req">*</span></label>
              <input [id]="id + '-soc-ref-no'" class="sef__input sef__input--highlight" [(ngModel)]="soc.socRefNo" />
            </div>
            <div class="sef__row">
              <label class="sef__label" [for]="id + '-refund'">Refund</label>
              <input [id]="id + '-refund'" type="checkbox" [(ngModel)]="soc.refund" class="sef__checkbox" />
            </div>
          </div>
          <!-- Right column -->
          <div class="sef__col">
            <div class="sef__row">
              <label class="sef__label" [for]="id + '-se-name'">SE Name</label>
              <input [id]="id + '-se-name'" class="sef__input sef__input--readonly" [value]="soc.seName" readonly />
            </div>
            <div class="sef__row">
              <label class="sef__label" [for]="id + '-currency'">Currency</label>
              <input [id]="id + '-currency'" class="sef__input sef__input--readonly" [value]="soc.currency" readonly />
            </div>
            <div class="sef__row">
              <label class="sef__label" [for]="id + '-country'">Country</label>
              <input [id]="id + '-country'" class="sef__input sef__input--readonly" [value]="soc.country" readonly />
            </div>
          </div>
        </div>
        <!-- SOC action buttons — Modify, Delete, Print SOC, Cancel -->
        <div class="sef__actions">
          <button class="sef__btn sef__btn--primary" (click)="socAction.emit({action:'modify',soc})">Modify</button>
          <button class="sef__btn sef__btn--danger"  (click)="socAction.emit({action:'delete',soc})">Delete</button>
          <button class="sef__btn sef__btn--primary" (click)="socAction.emit({action:'print',soc})">Print SOC</button>
          <button class="sef__btn sef__btn--cancel"  (click)="socAction.emit({action:'cancel',soc})">Cancel</button>
        </div>
      </fieldset>

      <!-- ROC's section -->
      <fieldset class="sef__fieldset" *ngIf="showROC" style="margin-top:16px">
        <legend class="sef__legend">ROC's</legend>
        <div class="sef__grid">
          <!-- Left column -->
          <div class="sef__col">
            <div class="sef__row">
              <label class="sef__label" [for]="id + '-card-account-no'">Card Account No. <span class="sef__req">*</span></label>
              <input [id]="id + '-card-account-no'" class="sef__input" [(ngModel)]="roc.cardAccountNo" />
            </div>
            <div class="sef__row">
              <label class="sef__label" [for]="id + '-date-of-change'">Date of Change <span class="sef__req">*</span></label>
              <div class="sef__date-inputs">
                <input [id]="id + '-date-of-change'" class="sef__input sef__input--date" [(ngModel)]="rocDay" placeholder="DD" maxlength="2" />
                <input class="sef__input sef__input--date" [(ngModel)]="rocMonth" placeholder="MM" maxlength="2" />
                <input class="sef__input sef__input--year" [(ngModel)]="rocYear" placeholder="YYYY" maxlength="4" />
              </div>
            </div>
            <div class="sef__row">
              <label class="sef__label" [for]="id + '-approval-code'">Approval Code</label>
              <input [id]="id + '-approval-code'" class="sef__input" [(ngModel)]="roc.approvalCode" />
            </div>
            <div class="sef__row">
              <label class="sef__label" [for]="id + '-total-amount'">Total Amount <span class="sef__req">*</span></label>
              <input [id]="id + '-total-amount'" class="sef__input" [(ngModel)]="roc.totalAmount" />
            </div>
            <div class="sef__row">
              <label class="sef__label" [for]="id + '-roc-ref-no'">ROC Ref. No. <span class="sef__req">*</span></label>
              <input [id]="id + '-roc-ref-no'" class="sef__input" [(ngModel)]="roc.rocRefNo" />
            </div>
          </div>
          <!-- Right column -->
          <div class="sef__col">
            <div class="sef__row">
              <label class="sef__label" [for]="id + '-field'">#</label>
              <input [id]="id + '-field'" class="sef__input sef__input--readonly" [value]="roc.hash" readonly />
            </div>
            <div class="sef__row">
              <label class="sef__label" [for]="id + '-balance-soc-amt'">Balance SOC Amt.</label>
              <input [id]="id + '-balance-soc-amt'" class="sef__input sef__input--readonly" [value]="roc.balanceSocAmt" readonly />
            </div>
            <div class="sef__row">
              <label class="sef__label" [for]="id + '-rejection-code'">Rejection Code</label>
              <select [id]="id + '-rejection-code'" class="sef__select" [(ngModel)]="roc.rejectionCode">
                <option value=""></option>
                <option *ngFor="let r of rejectionCodes" [value]="r">{{ r }}</option>
              </select>
            </div>
          </div>
        </div>
        <div class="sef__actions">
          <button class="sef__btn sef__btn--primary" (click)="rocAction.emit({action:'modify',roc})">Modify</button>
          <button class="sef__btn sef__btn--primary" (click)="rocAction.emit({action:'listRocs',roc})">List ROCs</button>
          <button class="sef__btn sef__btn--cancel"  (click)="rocAction.emit({action:'cancel',roc})">Cancel</button>
        </div>
      </fieldset>

    </div>
  `,
  styles: [`
    :host { display: block; font-family: Arial, sans-serif; }

    /* Fieldset — exact match to SOC/ROC image15 bordered sections */
    .sef__fieldset {
      border: 1px solid #ccc; padding: 12px 16px 8px;
      background: #fff; margin: 0;
    }
    .sef__legend {
      font-size: 12px; color: #555; padding: 0 6px;
      font-family: Arial, sans-serif;
    }

    /* 2-column grid layout matching screenshot */
    .sef__grid { display: flex; gap: 24px; }
    .sef__col { flex: 1; display: flex; flex-direction: column; gap: 4px; }

    .sef__row { display: flex; align-items: center; gap: 8px; padding: 3px 0; }
    .sef__label { width: 140px; flex-shrink: 0; font-size: 12px; color: #333; text-align: right; }
    .sef__req { color: #c62828; }

    .sef__input {
      border: 1px solid #bbb; padding: 3px 6px; font-size: 12px;
      font-family: Arial, sans-serif; width: 180px; outline: none;
    }
    .sef__input:focus { border-color: #006fcf; }
    .sef__input--readonly { background: #f0f0f0; color: #888; cursor: not-allowed; }
    /* Blue highlighted input — SOC Ref No in screenshot */
    .sef__input--highlight { border-color: #4a90d9; background: #fff; }

    /* Date input trio — DD MM YYYY */
    .sef__date-inputs { display: flex; gap: 4px; }
    .sef__input--date { width: 36px; text-align: center; }
    .sef__input--year { width: 52px; text-align: center; }

    .sef__checkbox { width: 16px; height: 16px; cursor: pointer; }

    .sef__select {
      border: 1px solid #bbb; padding: 3px 4px; font-size: 12px;
      font-family: Arial, sans-serif; width: 180px; background: #fff; outline: none;
    }

    /* Action buttons — gradient blue matching ONLS exactly */
    .sef__actions { display: flex; gap: 6px; margin-top: 10px; padding-top: 8px; }
    .sef__btn {
      padding: 4px 14px; font-size: 12px; cursor: pointer;
      font-family: Arial, sans-serif; border-radius: 2px;
    }
    .sef__btn--primary {
      background: linear-gradient(to bottom, #5ba3e0, #006fcf);
      color: #fff; border: 1px solid #005fba;
    }
    .sef__btn--primary:hover { background: linear-gradient(to bottom, #4a92cf, #0058a6); }
    .sef__btn--danger {
      background: linear-gradient(to bottom, #f07070, #cc0000);
      color: #fff; border: 1px solid #aa0000;
    }
    .sef__btn--danger:hover { background: linear-gradient(to bottom, #e06060, #bb0000); }
    .sef__btn--cancel {
      background: linear-gradient(to bottom, #f5f5f5, #ddd);
      color: #333; border: 1px solid #bbb;
    }
  `],
})
export class AmexSOCROCEntryFormComponent {
  private static _idCounter = 0;
  @HostBinding('attr.id') readonly id = `socroc-entry-form-${++AmexSOCROCEntryFormComponent._idCounter}`;


  @Input() showSOC = true;
  @Input() showROC = true;
  @Input() rejectionCodes: string[] = ['001 - Invalid', '002 - Duplicate', '003 - Expired'];

  soc: SOCFormData = {
    seNumber: '', seName: '', date: '', currency: '', country: '',
    grandTotal: '', noOfCharges: '', socRefNo: '', refund: false,
  };
  roc: ROCFormData = {
    cardAccountNo: '', hash: '', dateOfChange: '', balanceSocAmt: '',
    approvalCode: '', rejectionCode: '', totalAmount: '', rocRefNo: '',
  };

  socDay = ''; socMonth = ''; socYear = '';
  rocDay = ''; rocMonth = ''; rocYear = '';

  @Output() socAction = new EventEmitter<{ action: string; soc: SOCFormData }>();
  @Output() rocAction = new EventEmitter<{ action: string; roc: ROCFormData }>();
}
