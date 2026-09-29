import { Component, Input, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';

export type BadgeVariant =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'error'
  | 'neutral';
export type BadgeSize = 'sm' | 'md' | 'lg';

@Component({
  selector: 'ui-badge',
  standalone: true,
  imports: [CommonModule],
  template: `<span [ngClass]="['badge', variantClass, sizeClass]">{{
    label
  }}</span>`,
  styles: [
    `
      /**
       * DLS's badge.css (.badge) defines exactly one fixed size. It has no
       * sm/md/lg modifiers of its own. These two classes are LOCAL,
       * non-DLS additions that only ever touch spacing/font-size — never
       * color or shape, which always come from the real DLS classes
       * applied via [ngClass] above. 'md' uses DLS's own default size
       * untouched.
       */
      .badgeSizeSm {
        font-size: 0.75rem;
        height: 1.25rem;
        min-width: 1.25rem;
        padding: 0 0.3125rem;
      }
      .badgeSizeLg {
        font-size: 1.0625rem;
        height: 1.875rem;
        min-width: 1.875rem;
        padding: 0 0.5rem;
      }
    `,
  ],
})
export class BadgeComponent {
  private static _idCounter = 0;
  @HostBinding('attr.id') readonly id =
    `ui-badge-${++BadgeComponent._idCounter}`;

  @Input() label = '';
  @Input() variant: BadgeVariant = 'primary';
  @Input() size: BadgeSize = 'md';

  /**
   * Per DLS docs (site/components/badges -> "Status Badges" -> States),
   * .badgeStatus only ships 4 semantic colors, and their names are
   * counter-intuitive — verified against the docs, not guessed from the
   * CSS file alone:
   *   dlsColorSuccessBg   -> green  -> Active
   *   dlsColorAttentionBg -> YELLOW -> Suspended / Pending / In Progress
   *   dlsColorNeutralBg   -> grey   -> Off / Inactive
   *   dlsColorWarningBg   -> RED    -> Error
   * i.e. "Attention" is the yellow/pending tone and "Warning" is the red/
   * error tone — the reverse of what their names suggest. 'primary' needs
   * no extra class — .badge's own default background IS DLS's primary
   * blue. 'secondary' has no documented DLS status color, so it falls
   * back to neutral grey; confirm with design if a distinct look is
   * wanted.
   */
  private readonly variantClassMap: Record<BadgeVariant, string> = {
    primary: '',
    secondary: 'dlsColorNeutralBg', // no distinct DLS status color for this — confirm with design
    success: 'dlsColorSuccessBg',
    warning: 'dlsColorAttentionBg', // DLS's "Attention" = yellow, matches "warning" semantically
    error: 'dlsColorWarningBg', // DLS's "Warning" = red, matches "error" semantically
    neutral: 'dlsColorNeutralBg',
  };

  private readonly sizeClassMap: Record<BadgeSize, string> = {
    sm: 'badgeSizeSm',
    md: '',
    lg: 'badgeSizeLg',
  };

  get variantClass(): string {
    return this.variantClassMap[this.variant] ?? '';
  }

  get sizeClass(): string {
    return this.sizeClassMap[this.size] ?? '';
  }
}