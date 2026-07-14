import { Component, Input, Output, EventEmitter, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FormFieldComponent } from '../../../composite/form-field';
import { InputComponent } from '../../../primitives/input';
import { SelectComponent } from '../../../primitives/select';
import { CheckboxComponent } from '../../../primitives/checkbox';
import { ButtonComponent } from '../../../primitives/button';
import { LabelComponent } from '../../../primitives/label';

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
 *
 * NOTE: <fieldset>/<legend> kept raw — same structural-wrapper exception
 * as algeria-payment-form.ts (no ui-fieldset primitive in the lib).
 */
@Component({
  selector: 'amex-socroc-entry-form',
  standalone: true,
  imports: [CommonModule, FormsModule, FormFieldComponent, InputComponent, SelectComponent, CheckboxComponent, ButtonComponent, LabelComponent],
  template: `
    <div class="sef">

      <!-- SOC's section — bordered fieldset like screenshot -->
      <fieldset class="sef__fieldset" *ngIf="showSOC">
        <legend class="sef__legend">SOC's</legend>
        <div class="sef__grid">
          <!-- Left column -->
          <div class="sef__col">
            <ui-form-field class="sef__row" label="SE Number" [forId]="id + '-se-number'" layout="horizontal" labelWidth="140px" [required]="true">
              <ui-input [id]="id + '-se-number'" class="sef__input" [(ngModel)]="soc.seNumber"></ui-input>
            </ui-form-field>
            <ui-form-field class="sef__row" label="Date" [forId]="id + '-date'" layout="horizontal" labelWidth="140px" [required]="true">
              <div class="sef__date-inputs">
                <ui-input [id]="id + '-date'" class="sef__input sef__input--date" [(ngModel)]="socDay" placeholder="DD" maxlength="2"></ui-input>
                <ui-input class="sef__input sef__input--date" [(ngModel)]="socMonth" placeholder="MM" maxlength="2"></ui-input>
                <ui-input class="sef__input sef__input--year" [(ngModel)]="socYear" placeholder="YYYY" maxlength="4"></ui-input>
              </div>
            </ui-form-field>
            <ui-form-field class="sef__row" label="Grand Total" [forId]="id + '-grand-total'" layout="horizontal" labelWidth="140px" [required]="true">
              <ui-input [id]="id + '-grand-total'" class="sef__input" [(ngModel)]="soc.grandTotal"></ui-input>
            </ui-form-field>
            <ui-form-field class="sef__row" label="No. of Charges" [forId]="id + '-no-of-charges'" layout="horizontal" labelWidth="140px" [required]="true">
              <ui-input [id]="id + '-no-of-charges'" class="sef__input" [(ngModel)]="soc.noOfCharges"></ui-input>
            </ui-form-field>
            <ui-form-field class="sef__row" label="SOC Ref. No." [forId]="id + '-soc-ref-no'" layout="horizontal" labelWidth="140px" [required]="true">
              <ui-input [id]="id + '-soc-ref-no'" class="sef__input sef__input--highlight" [(ngModel)]="soc.socRefNo"></ui-input>
            </ui-form-field>
            <div class="sef__row">
              <ui-label class="sef__label" [forId]="id + '-refund'">Refund</ui-label>
              <ui-checkbox [id]="id + '-refund'" [(ngModel)]="soc.refund"></ui-checkbox>
            </div>
          </div>
          <!-- Right column -->
          <div class="sef__col">
            <ui-form-field class="sef__row" label="SE Name" [forId]="id + '-se-name'" layout="horizontal" labelWidth="140px">
              <ui-input [id]="id + '-se-name'" class="sef__input sef__input--readonly" [ngModel]="soc.seName" [readonly]="true"></ui-input>
            </ui-form-field>
            <ui-form-field class="sef__row" label="Currency" [forId]="id + '-currency'" layout="horizontal" labelWidth="140px">
              <ui-input [id]="id + '-currency'" class="sef__input sef__input--readonly" [ngModel]="soc.currency" [readonly]="true"></ui-input>
            </ui-form-field>
            <ui-form-field class="sef__row" label="Country" [forId]="id + '-country'" layout="horizontal" labelWidth="140px">
              <ui-input [id]="id + '-country'" class="sef__input sef__input--readonly" [ngModel]="soc.country" [readonly]="true"></ui-input>
            </ui-form-field>
          </div>
        </div>
        <!-- SOC action buttons — Modify, Delete, Print SOC, Cancel -->
        <div class="sef__actions">
          <ui-button class="sef__btn sef__btn--primary" variant="secondary" label="Modify"   (click)="socAction.emit({action:'modify',soc})"></ui-button>
          <ui-button class="sef__btn sef__btn--danger"  variant="secondary" label="Delete"   (click)="socAction.emit({action:'delete',soc})"></ui-button>
          <ui-button class="sef__btn sef__btn--primary" variant="secondary" label="Print SOC" (click)="socAction.emit({action:'print',soc})"></ui-button>
          <ui-button class="sef__btn sef__btn--cancel"  variant="secondary" label="Cancel"   (click)="socAction.emit({action:'cancel',soc})"></ui-button>
        </div>
      </fieldset>

      <!-- ROC's section -->
      <fieldset class="sef__fieldset" *ngIf="showROC" style="margin-top:16px">
        <legend class="sef__legend">ROC's</legend>
        <div class="sef__grid">
          <!-- Left column -->
          <div class="sef__col">
            <ui-form-field class="sef__row" label="Card Account No." [forId]="id + '-card-account-no'" layout="horizontal" labelWidth="140px" [required]="true">
              <ui-input [id]="id + '-card-account-no'" class="sef__input" [(ngModel)]="roc.cardAccountNo"></ui-input>
            </ui-form-field>
            <ui-form-field class="sef__row" label="Date of Change" [forId]="id + '-date-of-change'" layout="horizontal" labelWidth="140px" [required]="true">
              <div class="sef__date-inputs">
                <ui-input [id]="id + '-date-of-change'" class="sef__input sef__input--date" [(ngModel)]="rocDay" placeholder="DD" maxlength="2"></ui-input>
                <ui-input class="sef__input sef__input--date" [(ngModel)]="rocMonth" placeholder="MM" maxlength="2"></ui-input>
                <ui-input class="sef__input sef__input--year" [(ngModel)]="rocYear" placeholder="YYYY" maxlength="4"></ui-input>
              </div>
            </ui-form-field>
            <ui-form-field class="sef__row" label="Approval Code" [forId]="id + '-approval-code'" layout="horizontal" labelWidth="140px">
              <ui-input [id]="id + '-approval-code'" class="sef__input" [(ngModel)]="roc.approvalCode"></ui-input>
            </ui-form-field>
            <ui-form-field class="sef__row" label="Total Amount" [forId]="id + '-total-amount'" layout="horizontal" labelWidth="140px" [required]="true">
              <ui-input [id]="id + '-total-amount'" class="sef__input" [(ngModel)]="roc.totalAmount"></ui-input>
            </ui-form-field>
            <ui-form-field class="sef__row" label="ROC Ref. No." [forId]="id + '-roc-ref-no'" layout="horizontal" labelWidth="140px" [required]="true">
              <ui-input [id]="id + '-roc-ref-no'" class="sef__input" [(ngModel)]="roc.rocRefNo"></ui-input>
            </ui-form-field>
          </div>
          <!-- Right column -->
          <div class="sef__col">
            <ui-form-field class="sef__row" label="#" [forId]="id + '-field'" layout="horizontal" labelWidth="140px">
              <ui-input [id]="id + '-field'" class="sef__input sef__input--readonly" [ngModel]="roc.hash" [readonly]="true"></ui-input>
            </ui-form-field>
            <ui-form-field class="sef__row" label="Balance SOC Amt." [forId]="id + '-balance-soc-amt'" layout="horizontal" labelWidth="140px">
              <ui-input [id]="id + '-balance-soc-amt'" class="sef__input sef__input--readonly" [ngModel]="roc.balanceSocAmt" [readonly]="true"></ui-input>
            </ui-form-field>
            <ui-form-field class="sef__row" label="Rejection Code" [forId]="id + '-rejection-code'" layout="horizontal" labelWidth="140px">
              <ui-select [id]="id + '-rejection-code'" class="sef__select" [options]="rejectionCodeOptions" [(ngModel)]="roc.rejectionCode"></ui-select>
            </ui-form-field>
          </div>
        </div>
        <div class="sef__actions">
          <ui-button class="sef__btn sef__btn--primary" variant="secondary" label="Modify"    (click)="rocAction.emit({action:'modify',roc})"></ui-button>
          <ui-button class="sef__btn sef__btn--primary" variant="secondary" label="List ROCs" (click)="rocAction.emit({action:'listRocs',roc})"></ui-button>
          <ui-button class="sef__btn sef__btn--cancel"  variant="secondary" label="Cancel"    (click)="rocAction.emit({action:'cancel',roc})"></ui-button>
        </div>
      </fieldset>

    </div>
  `,
  styles: [`
    :host {
      display: block;
      font-family: Arial, sans-serif;
      --input-border: 1px solid #bbb;
      --input-padding: 3px 6px;
      --input-focus-border-color: #006fcf;
      --label-required-color: #c62828;
    }

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

    .sef__row { padding: 3px 0; }
    .sef__label { width: 140px; flex-shrink: 0; font-size: 12px; color: #333; text-align: right; }

    .sef__input { font-size: 12px; width: 180px; }
    .sef__input--readonly { background: #f0f0f0; color: #888; cursor: not-allowed; }
    /* Blue highlighted input — SOC Ref No in screenshot */
    .sef__input--highlight { border-color: #4a90d9; background: #fff; }

    /* Date input trio — DD MM YYYY */
    .sef__date-inputs { display: flex; gap: 4px; }
    .sef__input--date { width: 36px; text-align: center; }
    .sef__input--year { width: 52px; text-align: center; }

    .sef__select { font-size: 12px; width: 180px; }

    /* Action buttons — gradient blue matching ONLS exactly */
    .sef__actions { display: flex; gap: 6px; margin-top: 10px; padding-top: 8px; }
    .sef__btn--primary {
      --btn-bg: linear-gradient(to bottom, #5ba3e0, #006fcf);
      --btn-color: #fff; --btn-radius: 2px; --btn-padding: 4px 14px; --btn-font-size: 12px;
    }
    .sef__btn--danger {
      --btn-bg: linear-gradient(to bottom, #f07070, #cc0000);
      --btn-color: #fff; --btn-radius: 2px; --btn-padding: 4px 14px; --btn-font-size: 12px;
    }
    .sef__btn--cancel {
      --btn-bg: linear-gradient(to bottom, #f5f5f5, #ddd);
      --btn-color: #333; --btn-radius: 2px; --btn-padding: 4px 14px; --btn-font-size: 12px;
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

  get rejectionCodeOptions() { return this.rejectionCodes.map(r => ({ value: r, label: r })); }
}