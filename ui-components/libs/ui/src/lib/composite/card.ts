import { Component, Input, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageComponent } from '../primitives/image';

@Component({
  selector: 'ui-card',
  standalone: true,
  imports: [CommonModule, ImageComponent],
  template: `
    <div class="card cardRounded" [class.cardActionable]="hoverable">
      <div *ngIf="image" class="card-image">
        <ui-image [src]="image" [alt]="title" objectFit="cover"></ui-image>
      </div>
      <div class="card-body">
        <div *ngIf="title || subtitle" class="card-header">
          <h3 *ngIf="title" class="heading3">{{ title }}</h3>
          <p *ngIf="subtitle" class="body1 dlsColorNeutral">{{ subtitle }}</p>
        </div>
        <div class="body1 card-content"><ng-content></ng-content></div>
      </div>
      <div *ngIf="hasFooter" class="card-footer">
        <ng-content select="[slot=footer]"></ng-content>
      </div>
    </div>
  `,
  styles: [
    // .card + .cardRounded (background, shadow, border, radius) and
    // .cardActionable (DLS's real hover-lift interaction, which also respects
    // prefers-reduced-motion for free) come entirely from DLS. Title/subtitle/
    // content use DLS's real typography classes (.heading3, .body1,
    // .dlsColorNeutral) instead of hand-picked font-size/color/weight values.
    //
    // DLS's `variant: 'flat'` distinction (shadow vs no-shadow) has no direct
    // DLS equivalent — .card always carries its own subtle box-shadow as part
    // of the base class, it isn't a separate opt-in modifier. Rather than
    // fake a shadow-less look with custom CSS, both variants now render
    // DLS's one real card look; `variant` is kept as an accepted input for
    // backward compatibility but no longer changes the visual result.
    //
    // Only genuine structural glue remains custom below: overflow:hidden on
    // the card wrapper (neither .card nor .cardRounded set this — without
    // it, a full-width top image's square corners would poke past the
    // card's rounded corners), image area sizing (DLS's cardImg classes are
    // for a full-bleed background-image hero pattern, a different use case
    // from this simple top-thumbnail image) and the footer's divider line
    // (no DLS class covers a card footer specifically).
    `
      .card {
        overflow: hidden;
      }
      .card-image {
        max-height: 200px;
        overflow: hidden;
      }
      .card-body {
        padding: 16px;
      }
      .card-header {
        margin-bottom: 8px;
      }
      .card-footer {
        padding: 12px 16px;
        border-top: 1px solid #ecedee;
      }
    `,
  ],
})
export class CardComponent {
  private static _idCounter = 0;
  @HostBinding('attr.id') @Input() id = `ui-card-${++CardComponent._idCounter}`;

  @Input() title = '';
  @Input() subtitle = '';
  @Input() image = '';
  @Input() hoverable = false;
  /** @deprecated No longer changes rendering — DLS's .card always carries its own subtle shadow; kept for backward compatibility only. */
  @Input() variant: 'elevated' | 'flat' = 'elevated';
  @Input() hasFooter = false;
}