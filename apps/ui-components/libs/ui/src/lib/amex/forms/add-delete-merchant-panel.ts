import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface MerchantOption { merchantNo: string; label: string; }

/**
 * AddDeleteMerchantPanel
 * OMS two-mode panel: Add a new merchant account OR Delete an existing one.
 * Source: OMS (image15) — OMS card style, navy/purple buttons
 */
@Component({
  selector: 'amex-add-delete-merchant-panel',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="admp">
      <!-- Mode tabs -->
      <div class="admp__tabs">
        <button class="admp__tab" [class.admp__tab--active]="mode==='add'" (click)="mode='add'">
          Add a Merchant Account
        </button>
        <button class="admp__tab" [class.admp__tab--active]="mode==='delete'" (click)="mode='delete'">
          Delete a Merchant Account
        </button>
      </div>
      <div class="admp__accent"></div>

      <!-- Add mode -->
      <div class="admp__panel" *ngIf="mode === 'add'">
        <div class="admp__title">{{ addTitle }}</div>
        <div class="admp__field">
          <label class="admp__label">Primary Merchant Number <span class="admp__req">*</span></label>
          <input class="admp__input" [(ngModel)]="merchantNo" placeholder="Enter merchant number" />
        </div>
        <div class="admp__field">
          <label class="admp__label">Last 5 Digits of IBAN <span class="admp__req">*</span></label>
          <input class="admp__input" [(ngModel)]="lastFiveIban" maxlength="5" placeholder="XXXXX" />
        </div>
        <div class="admp__actions">
          <button class="admp__btn admp__btn--back" (click)="backClick.emit()">Back</button>
          <button class="admp__btn admp__btn--submit" (click)="addClick.emit({merchantNo, lastFiveIban})">Submit</button>
        </div>
      </div>

      <!-- Delete mode -->
      <div class="admp__panel" *ngIf="mode === 'delete'">
        <div class="admp__title">{{ deleteTitle }}</div>
        <div class="admp__field">
          <label class="admp__label">Select Merchant to Delete</label>
          <div *ngFor="let m of merchantOptions" class="admp__radio-row">
            <input type="radio" name="delMerchant" [value]="m.merchantNo"
              [(ngModel)]="selectedMerchantNo" [id]="'del-' + m.merchantNo" />
            <label [for]="'del-' + m.merchantNo" class="admp__radio-label">
              {{ m.label }} ({{ m.merchantNo }})
            </label>
          </div>
          <div *ngIf="!merchantOptions.length" class="admp__empty">No merchant accounts found.</div>
        </div>
        <div class="admp__actions">
          <button class="admp__btn admp__btn--back" (click)="backClick.emit()">Back</button>
          <button class="admp__btn admp__btn--delete"
            [disabled]="!selectedMerchantNo"
            (click)="deleteClick.emit(selectedMerchantNo)">Delete</button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host { display: block; font-family: Arial, sans-serif; }
    .admp__tabs { display: flex; gap: 0; border-bottom: none; }
    .admp__tab {
      padding: 9px 20px; font-size: 13px; cursor: pointer; border: 1px solid #ccc;
      background: #f5f5f5; color: #555; font-family: Arial, sans-serif;
      border-bottom: none; border-radius: 3px 3px 0 0; margin-right: 3px;
    }
    .admp__tab--active { background: #fff; color: #7b1fa2; font-weight: bold; border-bottom: 1px solid #fff; }
    .admp__accent { height: 3px; background: #7b1fa2; }
    .admp__panel { background: #fff; border: 1px solid #e0e0e0; padding: 20px 24px; max-width: 480px; }
    .admp__title { font-size: 14px; font-weight: bold; color: #1a3a6b; margin-bottom: 16px; }
    .admp__field { margin-bottom: 14px; }
    .admp__label { display: block; font-size: 13px; color: #333; margin-bottom: 5px; }
    .admp__req { color: #c62828; }
    .admp__input {
      width: 100%; box-sizing: border-box; border: 1px solid #ccc; border-radius: 3px;
      padding: 8px 10px; font-size: 13px; font-family: Arial, sans-serif; outline: none;
    }
    .admp__input:focus { border-color: #7b1fa2; }
    .admp__radio-row { display: flex; align-items: center; gap: 8px; padding: 5px 0; }
    .admp__radio-label { font-size: 13px; color: #333; cursor: pointer; }
    .admp__empty { font-size: 13px; color: #888; padding: 8px 0; }
    .admp__actions { display: flex; gap: 12px; margin-top: 16px; }
    .admp__btn { padding: 9px 28px; font-size: 14px; font-weight: bold; border: none; border-radius: 3px; cursor: pointer; font-family: Arial, sans-serif; }
    .admp__btn--back   { background: #1e3a5f; color: #fff; }
    .admp__btn--back:hover { background: #16304f; }
    .admp__btn--submit { background: #7b1fa2; color: #fff; }
    .admp__btn--submit:hover { background: #6a1b9a; }
    .admp__btn--delete { background: #c62828; color: #fff; }
    .admp__btn--delete:hover:not([disabled]) { background: #b71c1c; }
    .admp__btn--delete[disabled] { opacity: 0.45; cursor: not-allowed; }
  `],
})
export class AmexAddDeleteMerchantPanelComponent {
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
}
