import { Component, Input, Output, EventEmitter, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * A new component — didn't exist in ui-components before. Built to match
 * DLS's real .badge + .badgeOutline pattern from badge.css/badge.js:
 * an outlined pill that fills solid on hover, on selection (.filled, DLS's
 * own combinator class), and is greyed out via the native :disabled state,
 * all of which come from DLS's real CSS with zero custom color/branding.
 *
 * DLS's badgeOutline is a toggle-style control (has explicit hover/filled/
 * disabled states, not just a static label), so this is implemented as a
 * real <button> with a selected/toggle model — not just a decorative span.
 * A native <button> also means DLS's global focus style
 * (button:focus { outline: dashed 1px #53565a }) applies automatically,
 * so no custom focus CSS was needed either.
 */
@Component({
  selector: 'ui-outline-badge',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button
      type="button"
      class="badge badgeOutline"
      [class.filled]="selected"
      [disabled]="disabled"
      [attr.aria-pressed]="selected"
      (click)="toggle()"
    >
      {{ label }}
    </button>
  `,
  styles: [
    // .badge (shape/layout) + .badgeOutline (border/color/hover/disabled) are
    // both real DLS classes with correct values — but verified via DevTools
    // that in this repo's compiled dls.min.css, .badge's background-color/
    // color/border win the cascade over .badgeOutline's conflicting
    // properties (both are equal-specificity single-class selectors, so
    // whichever the bundle happens to place later wins — a compiled-bundle
    // ordering quirk, not something wrong in our markup). Every value below
    // is copied directly from DLS's own .badgeOutline spec in badge.css/
    // badge.js — nothing invented — just written as a compound selector
    // (.badge.badgeOutline) so it reliably outranks the plain .badge rule
    // regardless of source order in the compiled bundle.
    `
      .badge.badgeOutline {
        background-color: #fff;
        border-color: #006fcf;
        border-style: solid;
        border-width: 2px;
        color: #006fcf;
        font-size: 0.75rem;
        font-weight: bold;
        height: 2rem;
        min-width: 2rem;
      }
      .badge.badgeOutline:hover,
      .badge.badgeOutline.filled {
        background-color: #006fcf;
        color: #fff;
      }
      .badge.badgeOutline:disabled {
        background-color: #c8c9c7 !important;
        border-color: #c8c9c7;
        color: #fff;
      }
    `,
  ],
})
export class OutlineBadgeComponent {
  private static _idCounter = 0;
  @HostBinding('attr.id') @Input() id =
    `ui-outline-badge-${++OutlineBadgeComponent._idCounter}`;

  @Input() label = '';
  @Input() selected = false;
  @Input() disabled = false;

  @Output() selectedChange = new EventEmitter<boolean>();

  toggle(): void {
    if (this.disabled) return;
    this.selected = !this.selected;
    this.selectedChange.emit(this.selected);
  }
}