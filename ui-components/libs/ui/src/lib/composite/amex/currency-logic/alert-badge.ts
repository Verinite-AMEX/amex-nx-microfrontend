import { Component, Input, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * A new component — didn't exist in ui-components before. Built to match
 * DLS's real .badgeIconDefault pattern from badge.css/badge.js: a small
 * absolutely-positioned notification dot (green by default, white border,
 * z-index above its sibling) meant to overlay a wrapped icon/avatar.
 *
 * DLS's own CSS defines .badgeIconDefault as position:absolute with no
 * width/height/border-radius of its own — those come from combining it with
 * the base .badge class (same modifier pattern as .badgeOutline), which is
 * why both classes are applied together below, exactly as DLS intends.
 *
 * DLS has no concept of "wrap this content and overlay a dot on top of it" —
 * that positioning-context wrapper is a genuine gap (no DLS class provides
 * it), so it's kept as minimal custom CSS with zero color/branding, same
 * pattern as AccentCard/Accordion's uncovered-gap glue.
 */
@Component({
  selector: 'ui-alert-badge',
  standalone: true,
  imports: [CommonModule],
  template: `
    <span class="alert-badge-anchor">
      <ng-content></ng-content>
      <span
        *ngIf="show"
        class="badge badgeIconDefault"
        [style.backgroundColor]="color"
        role="status"
        [attr.aria-label]="ariaLabel"
      >
        {{ count || null }}
      </span>
    </span>
  `,
  styles: [
    // Structural glue only — DLS has no wrapper concept for "content with an
    // overlaid alert dot," so this positioning context has no DLS class to
    // call. No color/branding here; .badge/.badgeIconDefault (shape, border,
    // default green background) come entirely from DLS.
    `
      .alert-badge-anchor {
        position: relative;
        display: inline-block;
      }
    `,
  ],
})
export class AlertBadgeComponent {
  private static _idCounter = 0;
  @HostBinding('attr.id') @Input() id =
    `ui-alert-badge-${++AlertBadgeComponent._idCounter}`;

  /** Whether the alert dot is shown at all. */
  @Input() show = true;
  /** Optional count/text shown inside the dot; leave empty for a plain dot. */
  @Input() count = '';
  /** DLS defaults to #008767 (green) via .badgeIconDefault; override per use case. */
  @Input() color = '#008767';
  @Input() ariaLabel = 'New alert';
}