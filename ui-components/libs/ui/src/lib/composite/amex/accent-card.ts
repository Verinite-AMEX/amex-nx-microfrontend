import { Component, Input, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Plain white card with a colored accent bar across the top.
 * Deliberately has no header/footer/image slots — just a body for
 * `<ng-content>`. Size and accent color are left to the consumer.
 */
@Component({
  selector: 'ui-accent-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="accent-card" [style.width]="width" [style.maxWidth]="maxWidth">
      <div class="accent-bar" [style.background]="accentColor" [style.height.px]="accentHeight"></div>
      <div class="accent-card-body" [style.padding]="padding" [style.background]="background">
        <ng-content></ng-content>
      </div>
    </div>
  `,
  styles: [`
    .accent-card {
      display: flex;
      flex-direction: column;
      border: 1px solid #e0e0e0;
      overflow: hidden;
      box-sizing: border-box;
      font-family: Arial, sans-serif;
    }
    .accent-bar { width: 100%; flex-shrink: 0; }
    .accent-card-body { flex: 1; box-sizing: border-box; }
  `]
})
export class AccentCardComponent {
  private static _idCounter = 0;
  @HostBinding('attr.id') @Input() id = `ui-accent-card-${++AccentCardComponent._idCounter}`;

  /** Color of the top accent bar. Default matches the OMS brand purple. */
  @Input() accentColor = '#7b1f4b';
  /** Thickness of the accent bar in px. */
  @Input() accentHeight = 4;
  /** Card body background. */
  @Input() background = '#ffffff';
  /** Card body inner padding — any valid CSS padding value. */
  @Input() padding = '24px 20px';
  /** Card width — any valid CSS width value. */
  @Input() width = '100%';
  /** Card max-width — any valid CSS width value. */
  @Input() maxWidth = '360px';
}