import { Component, Input, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';

export type TextVariant =
  | 'heading1'
  | 'heading2'
  | 'heading3'
  | 'heading4'
  | 'heading5'
  | 'heading6'
  | 'body1'
  | 'body2'
  | 'body3'
  | 'label1'
  | 'label2';

export type TextAlign = 'left' | 'center' | 'right' | 'justify';
export type TextTransform = 'none' | 'uppercase' | 'lowercase' | 'capitalize';
export type TextTag =
  | 'p'
  | 'span'
  | 'div'
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6';

/**
 * DLS's real typography system (typography.css: .heading1-6/.body1-3/
 * .label1-2) combined with text.css's real alignment/transform/truncate
 * utility classes. No custom CSS at all - every value comes from DLS.
 *
 * FIX: the previous version used *ngSwitch across multiple <h1>-<h6>/<span>/
 * <div>/<p> branches, each with its own <ng-content>. Angular's content
 * projection only reliably binds ONE unselected <ng-content> slot per
 * component template - spreading it across several structural-directive
 * branches meant only one branch ever actually received projected content,
 * leaving every other tag choice rendering empty (confirmed via Storybook:
 * Heading 3 and Label 1 stories rendered blank boxes). Fixed the same way
 * Accordion's dynamic-heading problem was fixed: always render a single
 * real host element with exactly one <ng-content>, and use role="heading" +
 * aria-level for semantic heading equivalence instead of trying to swap the
 * actual tag name (which Angular templates can't do dynamically the way
 * React can).
 */
@Component({
  selector: 'ui-text',
  standalone: true,
  imports: [CommonModule],
  template: `
    <p
      [id]="id"
      [class]="classes"
      [attr.role]="headingLevel ? 'heading' : null"
      [attr.aria-level]="headingLevel"
    >
      <ng-content></ng-content>
    </p>
  `,
  styles: [
    // No custom CSS at all. DLS's real typography classes (.heading1-6,
    // .body1-3, .label1-2) each carry their own documented font-family,
    // weight, size, and line-height, and text.css's utility classes
    // (.textAlignLeft/Center/Right, .textJustify, .textUppercase/Lowercase/
    // Capitalize, .textTruncate) cover alignment/transform/truncation.
    //
    // A plain <p> is used as the single real host element regardless of the
    // semantic `tag` requested - DLS's typography classes only set font
    // properties, not any tag-specific box/display behavior, so a <p> looks
    // and behaves visually identical to a <div>/<span> here. `tag` is still
    // accepted as an input (see headingLevel below) for the one case that
    // actually needs a different attribute wired up: headings.
  ],
})
export class TextComponent {
  private static _idCounter = 0;
  @HostBinding('attr.id') @Input() id = `ui-text-${++TextComponent._idCounter}`;

  @Input() variant: TextVariant = 'body1';
  @Input() tag: TextTag = 'p';
  @Input() align: TextAlign | '' = '';
  @Input() transform: TextTransform = 'none';
  @Input() truncate = false;
  @Input() nowrap = false;

  private readonly alignClassMap: Record<TextAlign, string> = {
    left: 'textAlignLeft',
    center: 'textAlignCenter',
    right: 'textAlignRight',
    justify: 'textJustify',
  };

  private readonly transformClassMap: Record<TextTransform, string> = {
    none: '',
    uppercase: 'textUppercase',
    lowercase: 'textLowercase',
    capitalize: 'textCapitalize',
  };

  /** role="heading"/aria-level derived from `tag` when it's h1-h6, same technique used for Accordion's heading wrapper. */
  get headingLevel(): number | null {
    const match = /^h([1-6])$/.exec(this.tag);
    return match ? Number(match[1]) : null;
  }

  get classes(): string {
    return [
      this.variant,
      this.align ? this.alignClassMap[this.align] : '',
      this.transformClassMap[this.transform],
      this.truncate ? 'textTruncate' : '',
      this.nowrap ? 'textNowrap' : '',
    ]
      .filter(Boolean)
      .join(' ');
  }
}