import { Component, Input, Output, EventEmitter, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FormFieldComponent } from '../../../composite/form-field';
import { InputComponent } from '../../../primitives/input';
import { SelectComponent } from '../../../primitives/select';
import { ButtonComponent } from '../../../primitives/button';

/* ─────────────────────────────────────────────────────────────────
   AlgeriaPaymentForm
   SOC/ROC Algeria Payment — Julian Day, Year, Exchange Rate,
   Reference No, SE Type, View Report button.
   Source: SOC/ROC (image38) — ONLS portal style

   NOTE: <fieldset>/<legend> kept as raw structural elements — same
   category as <table>, a semantic grouping wrapper with no
   ui-fieldset primitive in the lib, not an interactive form control.
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
  imports: [CommonModule, FormsModule, FormFieldComponent, InputComponent, SelectComponent, ButtonComponent],
  template: `
    <div class="apf">
      <fieldset class="apf__fieldset">
        <legend class="apf__legend">View Report</legend>

        <ui-form-field class="apf__field" label="Julian Day" [forId]="id + '-julian-day'"
          layout="horizontal" labelWidth="120px" [required]="true">
          <ui-input [id]="id + '-julian-day'" [(ngModel)]="form.julianDay" placeholder="e.g. 268"></ui-input>
        </ui-form-field>

        <ui-form-field class="apf__field" label="Year" [forId]="id + '-year'"
          layout="horizontal" labelWidth="120px" [required]="true">
          <ui-select [id]="id + '-year'" [options]="yearOptions" [(ngModel)]="form.year"></ui-select>
        </ui-form-field>

        <ui-form-field class="apf__field" label="Exchange Rate" [forId]="id + '-exchange-rate'"
          layout="horizontal" labelWidth="120px">
          <ui-input [id]="id + '-exchange-rate'" [(ngModel)]="form.exchangeRate"></ui-input>
        </ui-form-field>

        <ui-form-field class="apf__field" label="Reference No." [forId]="id + '-reference-no'"
          layout="horizontal" labelWidth="120px">
          <ui-input [id]="id + '-reference-no'" [(ngModel)]="form.referenceNo"></ui-input>
        </ui-form-field>

        <ui-form-field class="apf__field" label="SE Type" [forId]="id + '-se-type'"
          layout="horizontal" labelWidth="120px" [required]="true">
          <ui-input [id]="id + '-se-type'" [(ngModel)]="form.seType"></ui-input>
        </ui-form-field>

        <div class="apf__actions">
          <ui-button class="apf__btn apf__btn--view" variant="secondary" label="View Report" (click)="viewReport.emit(form)"></ui-button>
        </div>
      </fieldset>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      font-family: Arial, sans-serif;
      --input-border: 1px solid #aaa;
      --input-padding: 4px 8px;
      --input-focus-border-color: #006fcf;
    }
    .apf__fieldset {
      border: 1px solid #aaa; padding: 12px 16px 14px;
      background: #fff; max-width: 380px;
    }
    .apf__legend { font-size: 12px; color: #555; padding: 0 6px; }
    .apf__field { margin-bottom: 10px; }
    .apf__actions { margin-top: 10px; }
    .apf__btn--view {
      --btn-bg: linear-gradient(to bottom, #5ba3e0, #006fcf);
      --btn-color: #fff; --btn-border: 1px solid #005fba;
      --btn-radius: 2px; --btn-padding: 5px 18px; --btn-font-size: 13px;
    }
  `],
})
export class AmexAlgeriaPaymentFormComponent {
  private static _idCounter = 0;
  @HostBinding('attr.id') @Input() id = `algeria-payment-form-${++AmexAlgeriaPaymentFormComponent._idCounter}`;

  @Input() years = ['2024', '2023', '2022', '2021'];
  form: AlgeriaPaymentData = { julianDay: '', year: '2024', exchangeRate: '1', referenceNo: '1', seType: '' };
  @Output() viewReport = new EventEmitter<AlgeriaPaymentData>();

  get yearOptions() { return this.years.map(y => ({ value: y, label: y })); }
}