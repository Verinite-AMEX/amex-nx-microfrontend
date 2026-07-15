import { Component, Input, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageComponent } from '../primitives/image';

@Component({
  selector: 'ui-card',
  standalone: true,
  imports: [CommonModule, ImageComponent],
  template: `
    <div class="card" [class.hoverable]="hoverable" [class.flat]="variant === 'flat'">
      <div *ngIf="image" class="card-image">
        <ui-image [src]="image" [alt]="title" objectFit="cover"></ui-image>
      </div>
      <div class="card-body">
        <div *ngIf="title || subtitle" class="card-header">
          <h3 *ngIf="title" class="card-title">{{ title }}</h3>
          <p *ngIf="subtitle" class="card-subtitle">{{ subtitle }}</p>
        </div>
        <div class="card-content"><ng-content></ng-content></div>
      </div>
      <div *ngIf="hasFooter" class="card-footer"><ng-content select="[slot=footer]"></ng-content></div>
    </div>
  `,
  styles: [`
    .card {
      background: #fff; border-radius: 8px; overflow: hidden;
      box-shadow: 0 1px 4px rgba(0,0,0,0.1); font-family: Arial, sans-serif;
    }
    .card.flat { box-shadow: none; border: 1px solid #e0e0e0; }
    .card.hoverable { transition: box-shadow 0.2s, transform 0.2s; cursor: pointer; }
    .card.hoverable:hover { box-shadow: 0 4px 16px rgba(0,0,0,0.15); transform: translateY(-2px); }
    .card-image { max-height: 200px; overflow: hidden; }
    .card-body { padding: 16px; }
    .card-header { margin-bottom: 8px; }
    .card-title { margin: 0 0 4px; font-size: 16px; font-weight: 600; color: #333; }
    .card-subtitle { margin: 0; font-size: 13px; color: #888; }
    .card-content { font-size: 14px; color: #555; line-height: 1.5; }
    .card-footer { padding: 12px 16px; border-top: 1px solid #f0f0f0; }
  `],
})
export class CardComponent {
  private static _idCounter = 0;
  @HostBinding('attr.id') @Input() id = `ui-card-${++CardComponent._idCounter}`;

  @Input() title = '';
  @Input() subtitle = '';
  @Input() image = '';
  @Input() hoverable = false;
  @Input() variant: 'elevated' | 'flat' = 'elevated';
  @Input() hasFooter = false;
}