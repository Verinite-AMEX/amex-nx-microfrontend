import { Component, Input, forwardRef, HostBinding } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CommonModule } from '@angular/common';

/**
 * STRUCTURAL REWRITE: DLS's real switch (switches.css) is NOT built on a
 * hidden <input type="checkbox"> at all — it's the ARIA "switch" pattern:
 * a plain element carrying role="switch" + an [aria-checked] attribute
 * that DLS's CSS reads directly (`.switch[aria-checked=true]`,
 * `.switch[disabled]`). There's no checkbox anywhere in DLS's design.
 * Confirmed against dls.js's own Switch class too — it works purely by
 * reading/writing aria-checked on a click target, no hidden input
 * involved.
 *
 * DLS actually ships two equivalent class patterns for this — a two-
 * element `.toggleSwitch` (outer) + `.toggleSwitchStyles` (inner track)
 * pair, and a simpler single-element `.switch` with the exact same visual
 * rules applied directly. This version uses the single-element `.switch`
 * pattern — no reason to add a wrapper element DLS doesn't require.
 *
 * A native <button role="switch"> is used as the interactive element
 * rather than a <div> with manual keydown handling: real <button>
 * elements already fire `click` on both Enter and Space natively, which
 * is exactly what dls.js's own Switch class listens for (`onclick`) — so
 * no custom keyboard handler is needed at all, unlike the old version's
 * manual Space-key listener on a hidden checkbox.
 *
 * DLS's CSS also references `.switchHandle` in one disabled-state
 * selector (`.toggleSwitch[disabled] .switchHandle`), but never defines a
 * base `.switchHandle` rule anywhere in switches.css — looks like dead/
 * vestigial CSS from an older markup version, not something this
 * implementation needs to reproduce.
 */
@Component({
  selector: 'ui-toggle',
  standalone: true,
  imports: [CommonModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ToggleComponent),
      multi: true,
    },
  ],
  template: `
    <span class="toggle-wrap">
      <button
        type="button"
        role="switch"
        class="switch"
        [attr.id]="id"
        [attr.aria-checked]="checked"
        [disabled]="disabled"
        [attr.aria-label]="ariaLabel || (label ? null : 'Toggle')"
        [attr.aria-labelledby]="label ? id + '-label' : null"
        [attr.aria-describedby]="ariaDescribedBy || null"
        [attr.aria-invalid]="ariaInvalid || null"
        [attr.aria-required]="required || null"
        (click)="toggle()"
        (blur)="onTouched()"
      ></button>
      <label
        *ngIf="label"
        [id]="id + '-label'"
        [attr.for]="id"
        class="toggle-text"
        >{{ label }}</label
      >
    </span>
  `,
  styles: [
    // Layout-only glue for placing the label text next to the switch —
    // not part of DLS's switch identity, which is purely the button
    // itself.
    `
      .toggle-wrap {
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
      }
      .toggle-text {
        cursor: pointer;
      }
    `,
  ],
})
export class ToggleComponent implements ControlValueAccessor {
  private static _idCounter = 0;
  @HostBinding('attr.id') @Input() id =
    `ui-toggle-${++ToggleComponent._idCounter}`;

  @Input() label = '';
  @Input() disabled = false;
  @Input() ariaLabel = '';
  @Input() ariaDescribedBy = '';
  @Input() ariaInvalid = false;
  @Input() required = false;

  /**
   * Pre-existing bug fix: this was a plain internal property, not an
   * @Input — so `[checked]="true"` from an outside template (as the old
   * "On" story tried to do) could never actually bind to it; Angular
   * doesn't allow external template bindings to non-@Input properties on
   * a component. Now a real @Input, while still fully compatible with
   * ControlValueAccessor's writeValue() for reactive-forms usage — both
   * paths write to the same field.
   */
  @Input() checked = false;
  onChange = (_: boolean) => {};
  onTouched = () => {};

  toggle() {
    if (this.disabled) return;
    this.checked = !this.checked;
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
  setDisabledState(d: boolean) {
    this.disabled = d;
  }
}