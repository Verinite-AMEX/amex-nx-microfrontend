import { Component, Input, Output, EventEmitter, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ui-tag',
  standalone: true,
  imports: [CommonModule],
  template: `
    <span class="tag tag-{{variant}}">
      {{ label }}
      <button *ngIf="removable" class="tag-remove" (click)="removed.emit(label)" aria-label="Remove">✕</button>
    </span>
  `,
  styles: [`
    .tag {
      display: inline-flex; align-items: center; gap: 4px;
      padding: 3px 10px; border-radius: 4px;
      font-size: 12px; font-family: Arial, sans-serif; font-weight: 600;
    }
    .tag-primary { background: #e3f2fd; color: #1976d2; }
    .tag-secondary { background: #fce4ec; color: #c2185b; }
    .tag-success { background: #e8f5e9; color: #388e3c; }
    .tag-warning { background: #fff3e0; color: #e65100; }
    .tag-error { background: #ffebee; color: #c62828; }
    .tag-neutral { background: #f5f5f5; color: #555; }
    .tag-remove {
      background: none; border: none; cursor: pointer; padding: 0;
      font-size: 10px; line-height: 1; color: inherit; opacity: 0.7;
    }
    .tag-remove:hover { opacity: 1; }
  `],
})
export class TagComponent {
  private static _idCounter = 0;
  @HostBinding('attr.id') readonly id = `ui-tag-${++TagComponent._idCounter}`;


  @Input() label = '';
  @Input() variant: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'neutral' = 'primary';
  @Input() removable = false;
  @Output() removed = new EventEmitter<string>();
}
