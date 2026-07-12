import { Component, Input, Output, EventEmitter, HostListener, ElementRef, inject, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface AmexAutocompleteSuggestion {
  label: string;    // display name (e.g. country name)
  code: string;     // auto-populated sibling (e.g. country code / currency code)
  extra?: string;   // optional third field (e.g. exchange rate for currency)
}

/**
 * AmexAutocompleteInputComponent
 * Text field with live suggestion dropdown. On selection, sibling read-only
 * field(s) auto-populate with code/rate.
 * Source: SOC/ROC Country Master (Modify), Currency Master (Modify).
 */
@Component({
  selector: 'amex-autocomplete-input',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="ac-wrap">
      <div class="ac-row">
        <!-- Primary input with suggestions -->
        <div class="ac-field">
          <label class="ac-label" [for]="id + '-input'">{{ label }}</label>
          <div class="ac-input-wrap">
            <input
              [id]="id + '-input'"
              class="ac-input"
              type="text"
              [placeholder]="placeholder"
              [(ngModel)]="inputValue"
              (input)="onInput()"
              (focus)="onFocus()"
              autocomplete="off"
            />
            <div class="ac-suggestions" *ngIf="filtered.length > 0 && showSuggestions">
              <div
                class="ac-suggestion"
                *ngFor="let s of filtered"
                (mousedown)="onSelect(s)"
              >
                {{ s.label }}
              </div>
            </div>
          </div>
        </div>

        <!-- Auto-populated code field -->
        <div class="ac-field" *ngIf="codeLabel">
          <label class="ac-label" [for]="id + '-code'">{{ codeLabel }}</label>
          <input [id]="id + '-code'" class="ac-input ac-input--readonly" type="text" [value]="selectedCode" readonly />
        </div>

        <!-- Auto-populated extra field (e.g. exchange rate) -->
        <div class="ac-field" *ngIf="extraLabel && selectedExtra">
          <label class="ac-label" [for]="id + '-extra'">{{ extraLabel }}</label>
          <input [id]="id + '-extra'" class="ac-input ac-input--readonly" type="text" [value]="selectedExtra" readonly />
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host { display: block; font-family: Arial, sans-serif; }

    .ac-wrap { padding: 8px 0; }

    .ac-row {
      display: flex;
      align-items: flex-start;
      gap: 12px;
      flex-wrap: wrap;
    }

    .ac-field {
      display: flex;
      flex-direction: column;
      gap: 3px;
    }

    .ac-label {
      font-size: 12px;
      color: #555;
    }

    .ac-input-wrap { position: relative; }

    .ac-input {
      border: 1px solid #bbb;
      border-radius: 2px;
      padding: 4px 8px;
      font-size: 12px;
      font-family: Arial, sans-serif;
      color: #333;
      background: #fff;
      width: 180px;
    }
    .ac-input:focus { outline: none; border-color: #006fcf; }
    .ac-input--readonly {
      background: #f5f5f5;
      color: #666;
      cursor: default;
      width: 100px;
    }

    .ac-suggestions {
      position: absolute;
      top: 100%;
      left: 0;
      width: 200px;
      background: #fff;
      border: 1px solid #bbb;
      border-top: none;
      z-index: 100;
      max-height: 160px;
      overflow-y: auto;
      box-shadow: 0 2px 4px rgba(0,0,0,0.12);
    }

    .ac-suggestion {
      padding: 6px 10px;
      font-size: 12px;
      color: #333;
      cursor: pointer;
    }
    .ac-suggestion:hover { background: #e8f0f8; }
  `],
})
export class AmexAutocompleteInputComponent {
  private static _idCounter = 0;
  @HostBinding('attr.id') readonly id = `autocomplete-input-${++AmexAutocompleteInputComponent._idCounter}`;


  @Input() label = 'Name';
  @Input() placeholder = 'Start typing...';
  @Input() codeLabel = 'Code';
  @Input() extraLabel = '';
  @Input() suggestions: AmexAutocompleteSuggestion[] = [];

  @Output() selectionChanged = new EventEmitter<AmexAutocompleteSuggestion>();

  inputValue = '';
  selectedCode = '';
  selectedExtra = '';
  showSuggestions = false;

  private el = inject(ElementRef);


  get filtered(): AmexAutocompleteSuggestion[] {
    if (!this.inputValue.trim()) return [];
    const term = this.inputValue.toLowerCase();
    return this.suggestions.filter(s => s.label.toLowerCase().includes(term)).slice(0, 8);
  }

  onInput() {
    this.showSuggestions = true;
    this.selectedCode = '';
    this.selectedExtra = '';
  }

  onFocus() {
    this.showSuggestions = true;
  }

  onSelect(s: AmexAutocompleteSuggestion) {
    this.inputValue = s.label;
    this.selectedCode = s.code;
    this.selectedExtra = s.extra ?? '';
    this.showSuggestions = false;
    this.selectionChanged.emit(s);
  }

  closeSuggestions() {
    this.showSuggestions = false;
  }

  @HostListener('document:click', ['$event'])
  onDocClick(event: MouseEvent) {
    if (!this.el.nativeElement.contains(event.target)) {
      this.showSuggestions = false;
    }
  }
}