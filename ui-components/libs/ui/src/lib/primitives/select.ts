// libs/ui/src/lib/primitives/select.ts
import {
  Component,
  Input,
  forwardRef,
  HostBinding,
  ViewChild,
  ElementRef,
  AfterViewInit,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CommonModule } from '@angular/common';

export interface SelectOption {
  label: string;
  value: string | number;
  /** Optional shorter label DLS's two-lined variant shows once selected (falls back to `label`). */
  twoLinedLabel?: string;
}

@Component({
  selector: 'ui-select',
  standalone: true,
  imports: [CommonModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectComponent),
      multi: true,
    },
  ],
  template: `
    <label *ngIf="label" [attr.for]="id" class="label3">{{ label }}</label>
    <span *ngIf="hint" [id]="hintId" class="hint" tabindex="-1">{{
      hint
    }}</span>
    <div
      class="select"
      [class.formControl]="formControl"
      [class.formControlWarning]="showWarning"
      [class.selectTwoLined]="twoLined"
      [class.disabled]="disabled"
      [attr.disabled]="disabled ? '' : null"
    >
      <label *ngIf="twoLined" class="label1">{{ twoLinedLabelText }}</label>
      <select
        #selectEl
        [id]="id"
        [disabled]="disabled"
        [required]="required"
        [attr.aria-describedby]="showWarning ? warningId : null"
        [attr.aria-label]="ariaLabel || null"
        [attr.aria-labelledby]="ariaLabelledBy || null"
        (change)="onSelectChange($event)"
        (blur)="onTouched()"
      >
        <option *ngIf="placeholder" value=""></option>
        <option
          *ngFor="let opt of options"
          [value]="opt.value"
          [attr.data-label]="opt.twoLinedLabel || opt.label"
          [selected]="opt.value === value"
        >
          {{ opt.label }}
        </option>
      </select>
    </div>
    <div *ngIf="showWarning" [id]="warningId" class="alertForm" role="alert">
      <i class="icon margin-1-r" aria-hidden="true"></i>
      {{ warningMessage }}
    </div>
  `,
})
export class SelectComponent implements ControlValueAccessor, AfterViewInit {
  private static _idCounter = 0;
  @HostBinding('attr.id') @Input() id =
    `ui-select-${++SelectComponent._idCounter}`;

  @ViewChild('selectEl') selectEl!: ElementRef<HTMLSelectElement>;

  @Input() options: SelectOption[] = [];
  @Input() placeholder = '';
  @Input() disabled = false;
  @Input() required = false;
  @Input() label = '';
  @Input() hint = '';
  /** DLS pairs `.select` with `.formControl` in every real example; default true to match. */
  @Input() formControl = true;
  /** Maps to DLS's `.selectTwoLined` variant (label above the current selection). */
  @Input() twoLined = false;
  @Input() warningMessage = 'A selection is required';
  @Input() ariaLabel = '';
  @Input() ariaLabelledBy = '';

  readonly hintId = `${this.id}-hint`;
  readonly warningId = `${this.id}-warning`;

  value: string | number = '';
  twoLinedLabelText = '';
  /** Mirrors DLS's own select.js: the warning only appears after a change, not on initial load. */
  private hasInteracted = false;

  onChangeFn = (_: string | number) => {};
  onTouched = () => {};

  get showWarning(): boolean {
    return this.hasInteracted && this.required && !this.value;
  }

  ngAfterViewInit(): void {
    // Sync the two-lined inner label to whatever the browser auto-selected
    // on first render, instead of leaving it blank until the user interacts.
    if (this.twoLined) {
      this.updateTwoLinedLabel(this.selectEl.nativeElement);
    }
  }

  onSelectChange(event: Event): void {
    const select = event.target as HTMLSelectElement;
    this.value = select.value;
    this.hasInteracted = true;
    this.updateTwoLinedLabel(select);
    this.onChangeFn(this.value);
  }

  private updateTwoLinedLabel(select: HTMLSelectElement): void {
    if (!this.twoLined) return;
    const selectedOption = select.options[select.selectedIndex];
    this.twoLinedLabelText = selectedOption?.dataset['label'] || '';
  }

  writeValue(val: string | number): void {
    this.value = val ?? '';
    const match = this.options.find((o) => o.value === this.value);
    this.twoLinedLabelText = match
      ? match.twoLinedLabel || match.label
      : '';
  }
  registerOnChange(fn: (_: string | number) => void): void {
    this.onChangeFn = fn;
  }
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
  setDisabledState(disabled: boolean): void {
    this.disabled = disabled;
  }
}