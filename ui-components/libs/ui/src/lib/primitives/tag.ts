import {
  Component,
  Input,
  Output,
  EventEmitter,
  HostBinding,
} from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * BREAKING API CHANGE — WORTH FLAGGING CLEARLY: the old `variant` input
 * (primary/secondary/success/warning/error/neutral, 6 hardcoded pastel
 * colors) has no DLS equivalent at all. Checked tags.css directly: DLS's
 * real tag system only has TWO visual styles, neither color-semantic:
 *   .tagInline  -> grey background (#ecedee), grey text — a subtle,
 *                  low-emphasis tag
 *   .tagGeneral -> white background, blue outline + blue text — a more
 *                  prominent, outlined tag
 * There's no sensible way to map "success"/"warning"/"error" onto these
 * two, since neither is semantically red/green/amber — so rather than
 * inventing a fake mapping, `variant` is replaced with `style: 'inline' |
 * 'general'`, matching DLS's real two options. Existing call sites passing
 * `variant="..."` will need updating — this is a real breaking change, not
 * a drop-in rename.
 *
 * Removable tags use DLS's real .closeTagInline/.closeTagGeneral pattern:
 * the ENTIRE tag becomes a clickable <button> (not just an X icon inside
 * it) — confirmed from tags.css's own :focus selectors, which target the
 * outer .closeTagInline/.closeTagGeneral element directly, meaning that
 * outer element is the focusable/interactive one.
 *
 * NOTE: the close icon uses a plain "✕" character in a `.icon` span,
 * matching DLS's padding-left spacing rule for `.icon`/`.glyph`, not
 * DLS's real icon font — same known gap flagged on IconButton/Button
 * earlier (icon.ts hasn't been upgraded to DLS's icon font yet).
 */
export type TagStyle = 'inline' | 'general';

@Component({
  selector: 'ui-tag',
  standalone: true,
  imports: [CommonModule],
  template: `
    @if (removable) {
      <button
        type="button"
        [class]="style === 'general' ? 'closeTagGeneral' : 'closeTagInline'"
        (click)="removed.emit(label)"
        [attr.aria-label]="'Remove ' + label"
      >
        <span
          [class]="
            style === 'general'
              ? 'closeTagGeneralStyles'
              : 'closeTagInlineStyles'
          "
        >
          {{ label }}
          <span class="icon" aria-hidden="true">✕</span>
        </span>
      </button>
    } @else {
      <span [class]="style === 'general' ? 'tagGeneral' : 'tagInline'">
        {{ label }}
      </span>
    }
  `,
})
export class TagComponent {
  private static _idCounter = 0;
  @HostBinding('attr.id') @Input() id = `ui-tag-${++TagComponent._idCounter}`;

  @Input() label = '';
  @Input() style: TagStyle = 'inline';
  @Input() removable = false;
  @Output() removed = new EventEmitter<string>();
}