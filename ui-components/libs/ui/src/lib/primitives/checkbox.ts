import { Component, Input, forwardRef, HostBinding } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ui-checkbox',
  standalone: true,
  imports: [CommonModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CheckboxComponent),
      multi: true,
    },
  ],
  template: `
    <div class="checkbox">
      <input
        type="checkbox"
        [id]="inputId"
        [checked]="checked"
        [disabled]="disabled"
        [required]="required"
        [attr.aria-checked]="indeterminate ? 'mixed' : checked"
        [attr.aria-invalid]="ariaInvalid ? 'true' : null"
        [attr.aria-label]="ariaLabel || null"
        [attr.aria-describedby]="ariaDescribedBy || null"
        [attr.aria-required]="required"
        (change)="onToggle($event)"
        (blur)="onTouched()"
      />
      <label [attr.for]="inputId">
        {{ label }}
        <ng-content></ng-content>
      </label>
    </div>
  `,
  styles: [
    // Verified via DevTools that checkbox.css is entirely absent from this
    // repo's compiled dls.min.css — not one .checkbox rule matches anywhere
    // (Pseudo ::before/::after sections show only the generic global
    // box-sizing reset). This is the same category of gap as .flexColumn and
    // .collapsibleCaret::before, just complete this time — the whole
    // component's styling is missing, not one rule within it.
    //
    // Since DLS's real .checkbox class can't be relied on to actually apply,
    // every value below is copied directly from DLS's own checkbox.css
    // source (box size, border color, checked/hover/disabled/invalid colors,
    // the real check + mixed-state SVG icons) — nothing invented — just
    // written as our own component CSS so it's guaranteed to render
    // regardless of what's missing from the compiled bundle. Same approach
    // used for the OutlineBadge cascade fix.
    `
      .checkbox {
        display: block;
        position: relative;
      }
      .checkbox input[type='checkbox'] {
        position: absolute;
        left: 0;
        opacity: 0;
      }
      .checkbox input[type='checkbox']:focus + label::before {
        outline: dashed 1px #53565a;
        outline-offset: 3px;
      }
      .checkbox input[type='checkbox']:hover + label::before {
        background-color: #fff;
        border-color: #006fcf;
      }
      .checkbox input[type='checkbox']:checked + label::before,
      .checkbox input[type='checkbox'][aria-checked='mixed'] + label::before {
        background-color: #006fcf;
        border-color: #006fcf;
      }
      .checkbox input[type='checkbox']:checked + label::after,
      .checkbox input[type='checkbox'][aria-checked='mixed'] + label::after {
        visibility: visible;
      }
      .checkbox input[type='checkbox']:disabled + label {
        color: #8e9092;
        cursor: not-allowed;
      }
      .checkbox input[type='checkbox']:disabled + label::before {
        background-color: #f7f8f9;
        border-color: #c8c9c7;
        cursor: not-allowed;
      }
      .checkbox input[type='checkbox']:disabled:checked + label::before,
      .checkbox
        input[type='checkbox']:disabled[aria-checked='mixed']
        + label::before {
        background-color: rgba(0, 0, 0, 0.25);
        border-color: #c8c9c7;
      }
      .checkbox input[aria-invalid='true'] + label::before {
        background-color: #fff;
        border-color: #b42c01;
      }
      .checkbox
        input[aria-invalid='true']:not(:checked, [aria-checked='mixed']):hover
        + label::before {
        border-color: #b42c01;
      }
      .checkbox label {
        font-family: 'Helvetica Neue', Helvetica, sans-serif;
        font-size: 1rem;
        font-weight: 400;
        line-height: 1.375rem;
        cursor: pointer;
        display: inline-block;
        min-height: 1.375rem;
        padding: 0.6875rem 0.6875rem 0.6875rem 2.75rem;
        position: relative;
      }
      .checkbox label::before {
        background-color: #fff;
        border: 0.0625rem solid #8e9092;
        border-radius: 0.25rem;
        content: '';
        display: inline-block;
        height: 1.375rem;
        left: 0.6875rem;
        position: absolute;
        transition: border 0.25s ease-out, background-color 0.25s ease-out;
        width: 1.375rem;
      }
      .checkbox label::after {
        background-image: url('data:image/svg+xml;utf8,<svg fill="%23FFFFFF" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="M5.978 10.52l-3.25-3.442a1 1 0 10-1.455 1.373l4 4.236a1 1 0 001.475-.023l8-9a1 1 0 00-1.495-1.328L5.978 10.52z"/></svg>');
        background-position: center center;
        background-repeat: no-repeat;
        content: '';
        width: 0.875rem;
        height: 0.875rem;
        left: 0.9375rem;
        top: 0.9375rem;
        position: absolute;
        visibility: hidden;
      }
      .checkbox input[aria-checked='mixed'] + label::after {
        background-image: url('data:image/svg+xml;utf8,<svg fill="%23FFFFFF" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="M15 7a1 1 0 010 2H1a1 1 0 010-2h14z"/></svg>');
      }
    `,
  ],
})
export class CheckboxComponent implements ControlValueAccessor {
  private static _idCounter = 0;
  @HostBinding('attr.id') @Input() id =
    `ui-checkbox-${++CheckboxComponent._idCounter}`;

  get inputId(): string {
    return `${this.id}-input`;
  }

  @Input() label = '';
  @Input() disabled = false;
  @Input() ariaLabel = '';
  @Input() ariaDescribedBy = '';
  @Input() ariaInvalid = false;
  @Input() required = false;
  /** DLS's real tri-state support via [aria-checked="mixed"] — not available in the previous custom implementation. */
  @Input() indeterminate = false;

  /** Was never a real @Input before (just an internal class field) — the previous "Checked" story's [checked] binding likely never worked. Fixed here. */
  @Input() checked = false;
  onChange = (_: boolean) => {};
  onTouched = () => {};

  onToggle(event: Event) {
    this.checked = (event.target as HTMLInputElement).checked;
    this.onChange(this.checked);
  }

  writeValue(val: boolean) {
    this.checked = !!val;
  }
  registerOnChange(fn: (_: boolean) => void) {
    this.onChange = fn;
  }
  registerOnTouched(fn: () => void) {
    this.onTouched = fn;
  }
  setDisabledState(disabled: boolean) {
    this.disabled = disabled;
  }
}