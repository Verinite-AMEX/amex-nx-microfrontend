import { Component, Input, Output, EventEmitter, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FormFieldComponent } from '../../molecules/form-field';
import { InputComponent } from '../../atoms/input';

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
 *
 * DOM-manipulation note: the original closed the suggestion list via
 * @HostListener('document:click') + inject(ElementRef).nativeElement.contains(...),
 * which is banned here. Replaced with the standard combobox-without-DOM-reads
 * pattern: the input never loses logical focus tracking, and (blur) closes the
 * list on a short delay so an in-flight (mousedown) on a suggestion still
 * commits before the list disappears. No ElementRef, no document listener.
 *
 * Keyboard nav: arrow keys move an `activeIndex` and the input announces it via
 * aria-activedescendant (standard ARIA combobox pattern) instead of moving real
 * DOM focus — so there's no nativeElement/focus() delegate needed here, unlike
 * tabs.ts where real focus does move between distinct interactive controls.
 *
 * Suggestion items are plain divs (role="option"), not buttons — consistent
 * with the "clickable div/li is fine, unrestricted" guidance, since they are
 * one composite listbox control, not standalone interactive elements.
 *
 */
@Component({
  selector: 'amex-autocomplete-input',
  standalone: true,
  imports: [CommonModule, FormsModule, FormFieldComponent, InputComponent],
  template: `
    <div class="ac-wrap">
      <div class="ac-row">
        <!-- Primary input with suggestions -->
        <ui-form-field class="ac-field" [label]="label" [forId]="id + '-input'">
          <div class="ac-input-wrap">
            <ui-input
              [id]="id + '-input'"
              type="text"
              [placeholder]="placeholder"
              [ariaLabel]="label"
              [attr.role]="'combobox'"
              [attr.aria-expanded]="showSuggestions && filtered.length > 0"
              [attr.aria-controls]="id + '-listbox'"
              [attr.aria-activedescendant]="activeIndex >= 0 ? id + '-option-' + activeIndex : null"
              [(ngModel)]="inputValue"
              (ngModelChange)="onInput()"
              (focus)="onFocus()"
              (blur)="onBlur()"
              (keydown)="onKeydown($event)">
            </ui-input>
            <div
              class="ac-suggestions"
              *ngIf="filtered.length > 0 && showSuggestions"
              [id]="id + '-listbox'"
              role="listbox">
              <div
                class="ac-suggestion"
                *ngFor="let s of filtered; let i = index"
                [id]="id + '-option-' + i"
                role="option"
                [attr.aria-selected]="i === activeIndex"
                [class.active]="i === activeIndex"
                (mousedown)="onSelect(s)">
                {{ s.label }}
              </div>
            </div>
          </div>
        </ui-form-field>

        <ui-form-field class="ac-field" *ngIf="codeLabel" [label]="codeLabel" [forId]="id + '-code'">
          <ui-input [id]="id + '-code'" type="text" [ariaLabel]="codeLabel" [readonly]="true" [(ngModel)]="selectedCode"></ui-input>
        </ui-form-field>

        <ui-form-field class="ac-field" *ngIf="extraLabel && selectedExtra" [label]="extraLabel" [forId]="id + '-extra'">
          <ui-input [id]="id + '-extra'" type="text" [ariaLabel]="extraLabel" [readonly]="true" [(ngModel)]="selectedExtra"></ui-input>
        </ui-form-field>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      font-family: Arial, sans-serif;
      --input-border: 1px solid #bbb;
      --input-radius: 2px;
      --input-padding: 4px 8px;
    }

    .ac-wrap { padding: 8px 0; }

    .ac-row {
      display: flex;
      align-items: flex-start;
      gap: 12px;
      flex-wrap: wrap;
    }

    .ac-field { width: 180px; }

    .ac-input-wrap { position: relative; }

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
    .ac-suggestion:hover,
    .ac-suggestion.active { background: #e8f0f8; }
  `],
})
export class AmexAutocompleteInputComponent {
  private static _idCounter = 0;
  @HostBinding('attr.id') @Input() id = `autocomplete-input-${++AmexAutocompleteInputComponent._idCounter}`;

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
  activeIndex = -1;

  private closeTimeout: ReturnType<typeof setTimeout> | null = null;

  get filtered(): AmexAutocompleteSuggestion[] {
    if (!this.inputValue.trim()) return [];
    const term = this.inputValue.toLowerCase();
    return this.suggestions.filter(s => s.label.toLowerCase().includes(term)).slice(0, 8);
  }

  onInput() {
    this.showSuggestions = true;
    this.activeIndex = -1;
    this.selectedCode = '';
    this.selectedExtra = '';
  }

  onFocus() {
    if (this.closeTimeout) {
      clearTimeout(this.closeTimeout);
      this.closeTimeout = null;
    }
    this.showSuggestions = true;
  }

  onBlur() {
    // Delay so an in-flight (mousedown) on a suggestion commits its click
    // before the list closes, without needing an outside-click DOM listener.
    this.closeTimeout = setTimeout(() => {
      this.showSuggestions = false;
      this.activeIndex = -1;
    }, 150);
  }

  onKeydown(event: KeyboardEvent) {
    const list = this.filtered;
    if (!list.length || !this.showSuggestions) return;

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      this.activeIndex = this.activeIndex < list.length - 1 ? this.activeIndex + 1 : 0;
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      this.activeIndex = this.activeIndex > 0 ? this.activeIndex - 1 : list.length - 1;
    } else if (event.key === 'Enter' && this.activeIndex >= 0) {
      event.preventDefault();
      this.onSelect(list[this.activeIndex]);
    } else if (event.key === 'Escape') {
      this.showSuggestions = false;
      this.activeIndex = -1;
    }
  }

  onSelect(s: AmexAutocompleteSuggestion) {
    if (this.closeTimeout) {
      clearTimeout(this.closeTimeout);
      this.closeTimeout = null;
    }
    this.inputValue = s.label;
    this.selectedCode = s.code;
    this.selectedExtra = s.extra ?? '';
    this.showSuggestions = false;
    this.activeIndex = -1;
    this.selectionChanged.emit(s);
  }
}