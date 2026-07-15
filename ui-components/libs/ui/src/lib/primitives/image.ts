// libs/ui/src/lib/atoms/image.ts
import { Component, Input, HostBinding } from '@angular/core';
import { NgIf } from '@angular/common';

@Component({
  selector: 'ui-image',
  standalone: true,
  imports: [NgIf],
  template: `
    <img
      *ngIf="src; else fallbackTpl"
      [id]="id"
      [src]="src"
      [alt]="alt"
      [class.ui-image--cover]="objectFit === 'cover'"
      [class.ui-image--contain]="objectFit === 'contain'"
      class="ui-image"
      [attr.loading]="loading"
    />
    <ng-template #fallbackTpl>
      <div [id]="id" class="ui-image-fallback" [attr.role]="fallbackText ? 'img' : null" [attr.aria-label]="fallbackText || alt || null">
        <span class="ui-image-fallback__text">{{ fallbackText }}</span>
      </div>
    </ng-template>
  `,
  styles: [`
    :host { display: block; width: 100%; height: 100%; }
    .ui-image { width: 100%; height: 100%; display: block; }
    .ui-image--cover { object-fit: cover; }
    .ui-image--contain { object-fit: contain; }
    .ui-image-fallback {
      width: 100%; height: 100%;
      display: flex; align-items: center; justify-content: center;
      background: var(--image-fallback-bg, #006FCF);
    }
    .ui-image-fallback__text {
      color: var(--image-fallback-color, rgba(255,255,255,0.75));
      font-size: var(--image-fallback-font-size, 12px);
      font-weight: 700;
      letter-spacing: var(--image-fallback-letter-spacing, 0.08em);
      text-align: center;
      padding: 0 8px;
    }
  `],
})
export class ImageComponent {
  private static _idCounter = 0;
  @HostBinding('attr.id') @Input() id = `ui-image-${++ImageComponent._idCounter}`;

  @Input() src = '';
  @Input() alt = '';
  @Input() objectFit: 'cover' | 'contain' | 'fill' = 'cover';
  @Input() loading: 'eager' | 'lazy' = 'lazy';
  @Input() fallbackText = '';
}