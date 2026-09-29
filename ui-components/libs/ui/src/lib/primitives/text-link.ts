import { Component, Input, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';

export type TextLinkVariant = 'default' | 'underlined' | 'white';

/**
 * A new component - didn't exist in ui-components before. DLS's real link
 * pattern comes from elements.css: the base `a` tag already carries DLS's
 * link color/hover-underline/focus-outline (color:#006fcf, underline on
 * :hover, dashed focus outline) with zero class needed at all for the
 * default look. Three real DLS modifier classes cover every variant this
 * component needs:
 *  - a.textLink: enlarges the tap target to DLS's real 44x44px minimum
 *    (min-width/min-height: 2.75rem) for accessible touch targets, with a
 *    special focus rule that draws the outline only around the inner text
 *    (via a wrapping <span>), not the whole padded tap zone.
 *  - a.linkUnderlined: always-underlined variant with real darker
 *    hover/active colors (#0065bd / #005aa8).
 *  - a.linkWhite: white text, for links on dark surfaces.
 * No custom CSS at all - every value comes directly from DLS.
 */
@Component({
  selector: 'ui-text-link',
  standalone: true,
  imports: [CommonModule],
  template: `
    <a
      [id]="id"
      [href]="disabled ? null : href"
      [class]="classes"
      [class.disabled]="disabled"
      [attr.aria-disabled]="disabled ? 'true' : null"
      [attr.target]="external ? '_blank' : null"
      [attr.rel]="external ? 'noopener noreferrer' : null"
    >
      <span><ng-content></ng-content></span>
    </a>
  `,
  styles: [
    // FIX: previously split <ng-content> across an *ngIf/else pair (wrapped
    // vs unwrapped), the same content-projection bug found in Text - only
    // one branch ever actually received the projected text, leaving
    // largeTapTarget's "Large Tap Target" story rendering empty. Fixed by
    // always wrapping in a single unconditional <span> - harmless when
    // largeTapTarget is false (a plain inline span changes nothing
    // visually), and it's also what DLS's own a.textLink:focus rule expects
    // to target (span:only-child) for the "outline only around the text,
    // not the whole padded tap zone" focus behavior.
    //
    // `disabled` is the one genuine gap: DLS only defines a disabled look for
    // `.navLink.disabled` (nav-menu-specific), not for a plain generic link -
    // there's no DLS class to call for a disabled anchor outside that
    // context. Reusing DLS's real muted-text color token (#8e9092, the same
    // value .navLink.disabled itself uses) rather than inventing a new one.
    `
      a.disabled {
        color: #8e9092;
        cursor: not-allowed;
        pointer-events: none;
      }
    `,
  ],
})
export class TextLinkComponent {
  private static _idCounter = 0;
  @HostBinding('attr.id') @Input() id =
    `ui-text-link-${++TextLinkComponent._idCounter}`;

  @Input() href = '#';
  @Input() variant: TextLinkVariant = 'default';
  /** DLS's real a.textLink enlarged 44x44px tap target (accessibility requirement for touch). */
  @Input() largeTapTarget = false;
  @Input() external = false;
  @Input() disabled = false;

  private readonly variantClassMap: Record<TextLinkVariant, string> = {
    default: '',
    underlined: 'linkUnderlined',
    white: 'linkWhite',
  };

  get classes(): string {
    return [
      this.largeTapTarget ? 'textLink' : '',
      this.variantClassMap[this.variant],
    ]
      .filter(Boolean)
      .join(' ');
  }
}