import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

const ICONS: Record<string, string> = {
  info: 'ℹ',
  success: '✓',
  warning: '⚠',
  error: '✕',
};

@Component({
  selector: 'ui-alert',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div *ngIf="visible" class="alert alert-{{variant}}" role="alert">
      <span class="alert-icon">{{ icon }}</span>
      <div class="alert-body">
        <strong *ngIf="title" class="alert-title">{{ title }}</strong>
        <span class="alert-message">{{ message }}</span>
      </div>
      <button *ngIf="dismissible" class="alert-close" (click)="dismiss()" aria-label="Dismiss">✕</button>
    </div>
  `,
  styles: [`
    .alert {
      display: flex; align-items: flex-start; gap: 10px;
      padding: 12px 16px; border-radius: 6px; font-family: Arial, sans-serif;
      font-size: 14px; border-left: 4px solid transparent;
    }
    .alert-info { background: #e3f2fd; border-color: #1976d2; color: #0d47a1; }
    .alert-success { background: #e8f5e9; border-color: #4caf50; color: #1b5e20; }
    .alert-warning { background: #fff3e0; border-color: #ff9800; color: #e65100; }
    .alert-error { background: #ffebee; border-color: #f44336; color: #b71c1c; }
    .alert-icon { font-size: 16px; flex-shrink: 0; margin-top: 1px; }
    .alert-body { flex: 1; display: flex; flex-direction: column; gap: 2px; }
    .alert-title { font-weight: 600; }
    .alert-close { background: none; border: none; cursor: pointer; font-size: 14px; color: inherit; opacity: 0.6; padding: 0; margin-left: auto; }
    .alert-close:hover { opacity: 1; }
  `],
})
export class AlertComponent {
  @Input() variant: 'info' | 'success' | 'warning' | 'error' = 'info';
  @Input() title = '';
  @Input() message = '';
  @Input() dismissible = false;

  visible = true;

  get icon() { return ICONS[this.variant]; }

  dismiss() { this.visible = false; }
}
