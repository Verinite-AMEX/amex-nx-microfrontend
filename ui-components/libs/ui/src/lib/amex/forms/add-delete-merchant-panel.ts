import { Component, Input, Output, EventEmitter, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FormFieldComponent } from '../../molecules/form-field';
import { InputComponent } from '../../atoms/input';
import { RadioGroupComponent } from '../../atoms/radio-group';
import { ButtonComponent } from '../../atoms/button';

export interface MerchantOption { merchantNo: string; label: string; }

/**
 * AddDeleteMerchantPanel
 * OMS two-mode panel: Add a new merchant account OR Delete an existing one.
 * Source: OMS (image15) — OMS card style, navy/purple buttons
 */
@Component({
  selector: 'amex-add-delete-merchant-panel',
  standalone: true,
  imports: [CommonModule, FormsModule, FormFieldComponent, InputComponent, RadioGroupComponent, ButtonComponent],
  template: `
    <div class="admp">
      <!-- Mode tabs -->
      <div class="admp__tabs">
        <ui-button class="admp__tab" [class.admp__tab--active]="mode==='add'"
          variant="secondary" label="Add a Merchant Account" (click)="mode='add'"></ui-button>
        <ui-button class="admp__tab" [class.admp__tab--active]="mode==='delete'"
          variant="secondary" label="Delete a Merchant Account" (click)="mode='delete'"></ui-button>
      </div>
      <div class="admp__accent"></div>

      <!-- Add mode -->
      <div class="admp__panel" *ngIf="mode === 'add'">
        <div class="admp__title">{{ addTitle }}</div>
        <ui-form-field class="admp__field" label="Primary Merchant Number" [forId]="id + '-primary-merchant-number'" [required]="true">
          <ui-input [id]="id + '-primary-merchant-number'" [(ngModel)]="merchantNo" placeholder="Enter merchant number"></ui-input>
        </ui-form-field>
        <ui-form-field class="admp__field" label="Last 5 Digits of IBAN" [forId]="id + '-last-5-digits-of-iban'" [required]="true">
          <ui-input [id]="id + '-last-5-digits-of-iban'" [(ngModel)]="lastFiveIban" placeholder="XXXXX"></ui-input>
        </ui-form-field>
        <div class="admp__actions">
          <ui-button class="admp__btn admp__btn--back" variant="primary" label="Back" (click)="backClick.emit()"></ui-button>
          <ui-button class="admp__btn admp__btn--submit" variant="primary" label="Submit" (click)="addClick.emit({merchantNo, lastFiveIban})"></ui-button>
        </div>
      </div>

      <!-- Delete mode -->
      <div class="admp__panel" *ngIf="mode === 'delete'">
        <div class="admp__title">{{ deleteTitle }}</div>
        <div class="admp__field">
          <ui-radio-group name="delMerchant" legend="Select Merchant to Delete" [options]="deleteOptions" [(ngModel)]="selectedMerchantNo"></ui-radio-group>
          <div *ngIf="!merchantOptions.length" class="admp__empty">No merchant accounts found.</div>
        </div>
        <div class="admp__actions">
          <ui-button class="admp__btn admp__btn--back" variant="primary" label="Back" (click)="backClick.emit()"></ui-button>
          <ui-button class="admp__btn admp__btn--delete" variant="primary" label="Delete"
            [disabled]="!selectedMerchantNo" (click)="deleteClick.emit(selectedMerchantNo)"></ui-button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      font-family: Arial, sans-serif;
      --input-border: 1px solid #ccc;
      --input-padding: 8px 10px;
      --input-focus-border-color: #7b1fa2;
      --radio-legend-size: 13px;
      --radio-legend-weight: normal;
      --radio-legend-color: #333;
    }
    .admp__tabs { display: flex; gap: 0; border-bottom: none; }
    .admp__tab {
      --btn-bg: #f5f5f5;
      --btn-color: #555;
      --btn-radius: 3px 3px 0 0;
      --btn-padding: 9px 20px;
      --btn-font-size: 13px;
      --btn-border: 1px solid #ccc;
      margin-right: 3px;
    }
    .admp__tab--active {
      --btn-bg: #fff;
      --btn-color: #7b1fa2;
      --btn-border-bottom-color: #fff;
      font-weight: bold;
    }
    .admp__accent { height: 3px; background: #7b1fa2; }
    .admp__panel { background: #fff; border: 1px solid #e0e0e0; padding: 20px 24px; max-width: 480px; }
    .admp__title { font-size: 14px; font-weight: bold; color: #1a3a6b; margin-bottom: 16px; }
    .admp__field { margin-bottom: 14px; }
    .admp__empty { font-size: 13px; color: #888; padding: 8px 0; }
    .admp__actions { display: flex; gap: 12px; margin-top: 16px; }
    .admp__btn--back { --btn-bg: #1e3a5f; --btn-color: #fff; --btn-radius: 3px; --btn-padding: 9px 28px; --btn-font-size: 14px; }
    .admp__btn--submit { --btn-bg: #7b1fa2; --btn-color: #fff; --btn-radius: 3px; --btn-padding: 9px 28px; --btn-font-size: 14px; }
    .admp__btn--delete { --btn-bg: #c62828; --btn-color: #fff; --btn-radius: 3px; --btn-padding: 9px 28px; --btn-font-size: 14px; }
  `],
})
export class AmexAddDeleteMerchantPanelComponent {
  private static _idCounter = 0;
  @HostBinding('attr.id') @Input() id = `add-delete-merchant-panel-${++AmexAddDeleteMerchantPanelComponent._idCounter}`;

  @Input() addTitle = 'Add a Merchant Account';
  @Input() deleteTitle = 'Delete an existing Merchant Account';
  @Input() merchantOptions: MerchantOption[] = [];
  mode: 'add' | 'delete' = 'add';
  merchantNo = '';
  lastFiveIban = '';
  selectedMerchantNo = '';
  @Output() addClick    = new EventEmitter<{ merchantNo: string; lastFiveIban: string }>();
  @Output() deleteClick = new EventEmitter<string>();
  @Output() backClick   = new EventEmitter<void>();

  get deleteOptions() {
    return this.merchantOptions.map(m => ({ value: m.merchantNo, label: `${m.label} (${m.merchantNo})` }));
  }
}