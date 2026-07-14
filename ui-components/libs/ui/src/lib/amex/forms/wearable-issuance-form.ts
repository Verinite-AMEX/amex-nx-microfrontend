import { Component, Input, Output, EventEmitter, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CheckboxComponent } from '../../atoms/checkbox';
import { ButtonComponent } from '../../atoms/button';
import { ImageComponent } from '../../atoms/image';

export interface WearableIssuanceData {
  clientCode: string;
  selectedCard: string;
  wearableType: string;
  colorSelected: string;
  wearableName: string;
  tcAccepted: boolean;
}

/**
 * WearableIssuanceForm
 * My Amex Wearable right panel — Wearable Type, Color Selected, Wearable Name,
 * T&C checkbox, Submit button.
 * Source: AEME Wearables (image9) — modern blue style
 */
@Component({
  selector: 'amex-wearable-issuance-form',
  standalone: true,
  imports: [CommonModule, FormsModule, CheckboxComponent, ButtonComponent, ImageComponent],
  template: `
    <div class="wif">
      <div class="wif__header">My Amex Wearable</div>

      <!-- Card info line -->
      <div class="wif__card-info">{{ form.selectedCard }}</div>

      <!-- Details panel -->
      <div class="wif__details">
        <div class="wif__row">
          <span class="wif__detail-label">Wearable Type</span>
          <span class="wif__detail-value">{{ form.wearableType || '—' }}</span>
        </div>
        <div class="wif__row">
          <span class="wif__detail-label">Color Selected</span>
          <span class="wif__color-swatch" *ngIf="form.colorSelected"
            [style.background]="form.colorSelected"></span>
          <span class="wif__detail-value" *ngIf="!form.colorSelected">—</span>
        </div>
        <div class="wif__row">
          <span class="wif__detail-label">Wearable Name</span>
          <span class="wif__detail-value wif__detail-value--link">{{ form.wearableName || '—' }}</span>
        </div>
      </div>

      <!-- Preview image slot -->
      <div class="wif__preview" *ngIf="previewImageUrl">
        <ui-image class="wif__preview-img" [src]="previewImageUrl" alt="Wearable preview" objectFit="contain"></ui-image>
      </div>

      <!-- T&C notice + checkbox -->
      <div class="wif__tc-notice">
        Please make sure you are happy with your selection before submitting.
        Your Wearable selection cannot be edited after submission
      </div>
      <div class="wif__tc-row">
        <ui-checkbox [(ngModel)]="form.tcAccepted">
          <span class="wif__tc-link">Terms &amp; Conditions apply</span>
        </ui-checkbox>
      </div>

      <!-- Submit button — full width blue -->
      <ui-button class="wif__submit-btn" variant="primary" label="Submit"
        [disabled]="!form.tcAccepted"
        [fullWidth]="true"
        (click)="submitClick.emit(form)"></ui-button>
    </div>
  `,
  styles: [`
    :host { display: block; font-family: Arial, sans-serif; max-width: 320px; }
    .wif__header { font-size: 14px; font-weight: bold; color: #1a3a6b; margin-bottom: 4px; }
    .wif__card-info { font-size: 12px; color: #1a3a6b; margin-bottom: 14px; }
    .wif__details { margin-bottom: 12px; }
    .wif__row { display: flex; align-items: center; gap: 10px; margin-bottom: 6px; }
    .wif__detail-label { font-size: 13px; color: #555; width: 120px; flex-shrink: 0; }
    .wif__detail-value { font-size: 13px; color: #1a1a1a; }
    .wif__detail-value--link { color: #1a3a6b; }
    .wif__color-swatch { width: 80px; height: 20px; border-radius: 2px; border: 1px solid #ccc; }
    .wif__preview { display: flex; justify-content: center; margin: 10px 0; }
    .wif__preview-img { width: 100px; height: 100px; }
    .wif__tc-notice { font-size: 11px; color: #555; line-height: 1.4; margin-bottom: 8px; }
    .wif__tc-row { display: flex; align-items: center; gap: 6px; margin-bottom: 12px; }
    .wif__tc-link { color: #1a3a6b; text-decoration: underline; cursor: pointer; }
    .wif__submit-btn {
      --btn-bg: #1a3a6b; --btn-color: #fff; --btn-radius: 3px;
      --btn-padding: 12px 0; --btn-font-size: 14px;
    }
  `],
})
export class AmexWearableIssuanceFormComponent {
  private static _idCounter = 0;
  @HostBinding('attr.id') @Input() id = `wearable-issuance-form-${++AmexWearableIssuanceFormComponent._idCounter}`;

  @Input() form: WearableIssuanceData = {
    clientCode: '', selectedCard: '', wearableType: '',
    colorSelected: '', wearableName: '', tcAccepted: false,
  };
  @Input() previewImageUrl = '';
  @Output() submitClick = new EventEmitter<WearableIssuanceData>();
}