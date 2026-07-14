import { Component, Input, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ui-panel',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="panel">
      <ng-container *ngIf="variant === 'accent'">
        <div class="panel-title" *ngIf="title">{{ title }}</div>
        <div class="panel-accent" *ngIf="title"></div>
        <div class="panel-body"><ng-content></ng-content></div>
      </ng-container>
      <ng-container *ngIf="variant === 'band'">
        <div class="panel-band" *ngIf="title">{{ title }}</div>
        <div class="panel-band-body"><ng-content></ng-content></div>
      </ng-container>
    </div>
  `,
  styles: [`
    .panel { display: block; font-family: Arial, sans-serif; }

    /* accent variant — OMS style: title + purple rule + bordered box */
    .panel-title {
        font-size: var(--panel-title-size, 16px);
        font-weight: bold;
        font-style: var(--panel-title-style, normal);
        color: var(--panel-title-color, #1a3a6b);
        text-transform: var(--panel-title-transform, none);
        letter-spacing: 0.5px;
        padding: 0 0 6px;
    }
    .panel-accent { height: 3px; background: var(--panel-accent-color, #7b1fa2); margin-bottom: 16px; }
    .panel-body {
      background: #fff;
      border: 1px solid #e0e0e0;
      border-radius: var(--panel-radius, 3px);
      padding: var(--panel-padding, 20px 24px);
      max-width: var(--panel-max-width, none);
    }

    /* band variant — BTA style: light-blue title bar flush against bordered box */
    .panel-band {
      background: var(--panel-band-bg, #b8d8f0);
      padding: 8px 14px;
      font-size: var(--panel-title-size, 13px);
      font-weight: bold;
      color: var(--panel-title-color, #1a3a6b);
      border: 1px solid var(--panel-band-border, #a0c0d8);
      border-bottom: none;
    }
    .panel-band-body {
      border: 1px solid var(--panel-band-border, #b0cce0);
      background: #fff;
      padding: var(--panel-padding, 16px 20px);
      max-width: var(--panel-max-width, none);
    }
  `],
})
export class PanelComponent {
  private static _idCounter = 0;
  @HostBinding('attr.id') @Input() id = `ui-panel-${++PanelComponent._idCounter}`;

  @Input() title = '';
  @Input() variant: 'accent' | 'band' = 'accent';
}