import { Component, Input, Output, EventEmitter, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

/**
 * AmexSearchBarComponent
 * Single search input used across: Supp Access Helper, Online Account Services,
 * UAEFTS, Wearables, Centurion LCY, VAT Invoice, Pay with Points.
 * Label varies by context (cardNumber, clientCode, uci, userId, iban).
 */
@Component({
  selector: 'amex-search-bar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="search-wrap">
      <div class="search-row">
        <label class="search-label" [for]="id + '-field'">{{ label }}</label>
        <input [id]="id + '-field'"
          class="search-input"
          type="text"
          [placeholder]="placeholder"
          [(ngModel)]="value"
          (keyup.enter)="onSubmit()"
        />
        <button class="search-btn" (click)="onSubmit()" [disabled]="!value.trim()">
          {{ buttonLabel }}
        </button>
        <button *ngIf="value" class="search-clear" (click)="onClear()">Clear</button>
      </div>
      <div *ngIf="errorMessage" class="search-error">{{ errorMessage }}</div>
    </div>
  `,
  styles: [`
    :host { display: block; font-family: Arial, sans-serif; }

    .search-wrap { padding: 10px 0; }

    .search-row {
      display: flex;
      align-items: center;
      gap: 6px;
      flex-wrap: wrap;
    }

    .search-label {
      font-size: 13px;
      color: #333;
      white-space: nowrap;
      min-width: 120px;
    }

    .search-input {
      border: 1px solid #bbb;
      border-radius: 2px;
      padding: 4px 8px;
      font-size: 12px;
      font-family: Arial, sans-serif;
      color: #333;
      background: #fff;
      width: 220px;
    }
    .search-input:focus {
      outline: none;
      border-color: #006fcf;
      box-shadow: 0 0 0 2px rgba(0,111,207,0.12);
    }

    .search-btn {
      background: linear-gradient(to bottom, #2a84e0, #1462b8);
      color: #fff;
      border: 1px solid #1050a0;
      border-radius: 2px;
      padding: 4px 14px;
      font-size: 12px;
      font-family: Arial, sans-serif;
      cursor: pointer;
      white-space: nowrap;
    }
    .search-btn:hover:not(:disabled) { background: linear-gradient(to bottom, #1e78d0, #0e50a0); }
    .search-btn:disabled { opacity: 0.5; cursor: not-allowed; }

    .search-clear {
      background: none;
      border: 1px solid #bbb;
      border-radius: 2px;
      padding: 4px 10px;
      font-size: 12px;
      font-family: Arial, sans-serif;
      color: #555;
      cursor: pointer;
    }
    .search-clear:hover { background: #f5f5f5; }

    .search-error {
      margin-top: 4px;
      font-size: 12px;
      color: #c00;
      font-family: Arial, sans-serif;
    }
  `],
})
export class AmexSearchBarComponent {
  private static _idCounter = 0;
  @HostBinding('attr.id') readonly id = `search-bar-${++AmexSearchBarComponent._idCounter}`;


  /** Label shown before the input. Varies per portal context. */
  @Input() label = 'Search';
  /** Placeholder text inside the input */
  @Input() placeholder = '';
  /** Button label */
  @Input() buttonLabel = 'Submit';
  /** Validation or API error message to display below the row */
  @Input() errorMessage = '';

  @Output() search = new EventEmitter<string>();
  @Output() cleared = new EventEmitter<void>();

  value = '';

  onSubmit() {
    if (this.value.trim()) {
      this.search.emit(this.value.trim());
    }
  }

  onClear() {
    this.value = '';
    this.cleared.emit();
  }
}
