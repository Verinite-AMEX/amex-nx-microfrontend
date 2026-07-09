import { Component, Input, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ui-divider',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="divider divider-{{orientation}}" [class.has-label]="label">
      <span *ngIf="label" class="divider-label">{{ label }}</span>
    </div>
  `,
  styles: [`
    .divider { display: flex; align-items: center; }
    .divider-horizontal { width: 100%; }
    .divider-horizontal::before, .divider-horizontal::after {
      content: ''; flex: 1; height: 1px; background: #e0e0e0;
    }
    .divider-vertical {
      width: 1px; height: 100%; min-height: 16px;
      background: #e0e0e0; display: inline-block;
    }
    .divider-label { padding: 0 12px; font-size: 12px; color: #999; font-family: Arial, sans-serif; white-space: nowrap; }
  `],
})
export class DividerComponent {
  private static _idCounter = 0;
  @HostBinding('attr.id') readonly id = `ui-divider-${++DividerComponent._idCounter}`;


  @Input() orientation: 'horizontal' | 'vertical' = 'horizontal';
  @Input() label = '';
}
