import { Component, Input, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';

export type AmexCardType =
  | 'centurion'
  | 'platinum'
  | 'gold'
  | 'green'
  | 'corporate'
  | 'bta'
  | 'supplementary';

@Component({
  selector: 'amex-card-badge',
  standalone: true,
  imports: [CommonModule],
  template: `
    <span [ngClass]="['badge', colorClass]">
      {{ label || typeLabel }}
    </span>
  `,
})
export class AmexCardBadgeComponent {
  private static _idCounter = 0;
  @HostBinding('attr.id') @Input() id =
    `card-badge-${++AmexCardBadgeComponent._idCounter}`;

  @Input() type: AmexCardType = 'green';
  @Input() label = '';

  get typeLabel(): string {
    const map: Record<AmexCardType, string> = {
      centurion: 'Centurion',
      platinum: 'Platinum',
      gold: 'Gold',
      green: 'Green',
      corporate: 'Corporate',
      bta: 'BTA',
      supplementary: 'Supplementary',
    };
    return map[this.type];
  }

  /**
   * NEEDS DESIGN/PRODUCT SIGN-OFF: DLS's colorsCard.css defines exact
   * per-product background colors for Centurion, Platinum, Gold, and Green
   * (used below as-is — these four are real, confirmed DLS card colors).
   * It has NO defined color for 'corporate', 'bta', or 'supplementary' —
   * those three card types don't exist in DLS's card-color palette at all.
   * The mappings below for those three are my best guess standing in
   * until someone on design confirms the intended color:
   *   - corporate     -> dlsCardCobrandBg (closest conceptual match)
   *   - bta           -> dlsCardBlueBg (Amex Business Travel Account is
   *                       conventionally blue-branded)
   *   - supplementary -> dlsCardGeneralBg (DLS's generic/lesser-tier grey)
   * Flag this row for review before shipping.
   *
   * CONTRAST CAVEAT: .badge's text is always white. dlsCardPlatinumBg
   * (#8e9da9) and dlsCardGeneralBg (#c8c9c7) are light/mid greys — white
   * text on them may not meet contrast requirements. Check these two
   * visually in Storybook before shipping; may need a dark-text override
   * for just those two if accessibility review flags it.
   */
  private readonly colorClassMap: Record<AmexCardType, string> = {
    centurion: 'dlsCardCenturionBg',
    platinum: 'dlsCardPlatinumBg',
    gold: 'dlsCardGoldBg',
    green: 'dlsCardGreenBg',
    corporate: 'dlsCardCobrandBg', // best-guess, confirm with design
    bta: 'dlsCardBlueBg', // best-guess, confirm with design
    supplementary: 'dlsCardGeneralBg', // best-guess, confirm with design
  };

  get colorClass(): string {
    return this.colorClassMap[this.type] ?? 'dlsCardGeneralBg';
  }
}