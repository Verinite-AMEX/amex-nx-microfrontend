import { Component, Input, HostBinding } from '@angular/core';

@Component({
  selector: 'ui-badge',
  standalone: true,
  template: `<span class="badge badge-{{variant}} badge-{{size}}">{{ label }}</span>`,
  styles: [`
    .badge {
      display: inline-flex; align-items: center; justify-content: center;
      border-radius: 999px; font-family: Arial, sans-serif; font-weight: 600;
      white-space: nowrap; line-height: 1;
    }
    .badge-sm { padding: 2px 8px; font-size: 11px; }
    .badge-md { padding: 4px 10px; font-size: 12px; }
    .badge-lg { padding: 6px 14px; font-size: 14px; }
    .badge-primary { background: #1976d2; color: #fff; }
    .badge-secondary { background: #ff4081; color: #fff; }
    .badge-success { background: #4caf50; color: #fff; }
    .badge-warning { background: #ff9800; color: #fff; }
    .badge-error { background: #f44336; color: #fff; }
    .badge-neutral { background: #e0e0e0; color: #333; }
  `],
})
export class BadgeComponent {
  private static _idCounter = 0;
  @HostBinding('attr.id') readonly id = `ui-badge-${++BadgeComponent._idCounter}`;


  @Input() label = '';
  @Input() variant: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'neutral' = 'primary';
  @Input() size: 'sm' | 'md' | 'lg' = 'md';
}
