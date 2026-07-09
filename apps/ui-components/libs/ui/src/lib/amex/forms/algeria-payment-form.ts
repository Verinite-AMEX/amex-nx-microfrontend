import { Component, Input, Output, EventEmitter, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

/* ─────────────────────────────────────────────────────────────────
   AlgeriaPaymentForm
   SOC/ROC Algeria Payment — Julian Day, Year, Exchange Rate,
   Reference No, SE Type, View Report button.
   Source: SOC/ROC (image38) — ONLS portal style
   ───────────────────────────────────────────────────────────────── */
export interface AlgeriaPaymentData {
  julianDay: string;
  year: string;
  exchangeRate: string;
  referenceNo: string;
  seType: string;
}

@Component({
  selector: 'amex-algeria-payment-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="apf">
      <!-- Fieldset-style bordered panel — matches SOC/ROC image38 -->
      <fieldset class="apf__fieldset">
        <legend class="apf__legend">View Report</legend>

        <div class="apf__row">
          <label class="apf__label" [for]="id + '-julian-day'">Julian Day <span class="apf__req">*</span></label>
          <input [id]="id + '-julian-day'" class="apf__input" [(ngModel)]="form.julianDay" placeholder="e.g. 268" />
        </div>
        <div class="apf__row">
          <label class="apf__label" [for]="id + '-year'">Year <span class="apf__req">*</span></label>
          <select [id]="id + '-year'" class="apf__select" [(ngModel)]="form.year">
            <option *ngFor="let y of years" [value]="y">{{ y }}</option>
          </select>
        </div>
        <div class="apf__row">
          <label class="apf__label" [for]="id + '-exchange-rate'">Exchange Rate</label>
          <input [id]="id + '-exchange-rate'" class="apf__input" [(ngModel)]="form.exchangeRate" />
        </div>
        <div class="apf__row">
          <label class="apf__label" [for]="id + '-reference-no'">Reference No.</label>
          <input [id]="id + '-reference-no'" class="apf__input" [(ngModel)]="form.referenceNo" />
        </div>
        <div class="apf__row">
          <label class="apf__label" [for]="id + '-se-type'">SE Type <span class="apf__req">*</span></label>
          <input [id]="id + '-se-type'" class="apf__input" [(ngModel)]="form.seType" />
        </div>

        <div class="apf__actions">
          <button class="apf__btn apf__btn--view" (click)="viewReport.emit(form)">View Report</button>
        </div>
      </fieldset>
    </div>
  `,
  styles: [`
    :host { display: block; font-family: Arial, sans-serif; }
    .apf__fieldset {
      border: 1px solid #aaa; padding: 12px 16px 14px;
      background: #fff; max-width: 380px;
    }
    .apf__legend { font-size: 12px; color: #555; padding: 0 6px; }
    .apf__row { display: flex; align-items: center; margin-bottom: 10px; gap: 8px; }
    .apf__label { width: 120px; flex-shrink: 0; font-size: 12px; color: #333; font-weight: bold; }
    .apf__req { color: #c62828; }
    .apf__input {
      border: 1px solid #aaa; padding: 4px 8px; font-size: 12px;
      font-family: Arial, sans-serif; width: 180px; outline: none;
    }
    .apf__input:focus { border-color: #006fcf; }
    .apf__select {
      border: 1px solid #aaa; padding: 4px 8px; font-size: 12px;
      font-family: Arial, sans-serif; width: 180px; background: #fff; cursor: pointer;
    }
    .apf__actions { margin-top: 10px; }
    .apf__btn {
      padding: 5px 18px; font-size: 13px; cursor: pointer;
      font-family: Arial, sans-serif; border-radius: 2px;
    }
    .apf__btn--view {
      background: linear-gradient(to bottom, #5ba3e0, #006fcf);
      color: #fff; border: 1px solid #005fba;
    }
    .apf__btn--view:hover { background: linear-gradient(to bottom, #4a92cf, #0058a6); }
  `],
})
export class AmexAlgeriaPaymentFormComponent {
  private static _idCounter = 0;
  @HostBinding('attr.id') readonly id = `algeria-payment-form-${++AmexAlgeriaPaymentFormComponent._idCounter}`;


  @Input() years = ['2024', '2023', '2022', '2021'];
  form: AlgeriaPaymentData = { julianDay: '', year: '2024', exchangeRate: '1', referenceNo: '1', seType: '' };
  @Output() viewReport = new EventEmitter<AlgeriaPaymentData>();
}
