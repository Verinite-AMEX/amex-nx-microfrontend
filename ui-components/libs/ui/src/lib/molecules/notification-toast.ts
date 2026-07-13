import { Component, Input, Output, EventEmitter, OnInit, OnDestroy, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ui-notification-toast',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div *ngIf="visible" class="toast toast-{{variant}}" role="alert">
      <span class="toast-icon">{{ icon }}</span>
      <div class="toast-body">
        <strong *ngIf="title" class="toast-title">{{ title }}</strong>
        <span class="toast-message">{{ message }}</span>
      </div>
      <button class="toast-close" (click)="close()" aria-label="Close">✕</button>
    </div>
  `,
  styles: [`
    .toast {
      display: flex; align-items: center; gap: 10px;
      padding: 12px 16px; border-radius: 8px; min-width: 280px; max-width: 400px;
      box-shadow: 0 4px 16px rgba(0,0,0,0.15); font-family: Arial, sans-serif;
      animation: slideIn 0.25s ease;
    }
    .toast-info { background: #1976d2; color: #fff; }
    .toast-success { background: #4caf50; color: #fff; }
    .toast-warning { background: #ff9800; color: #fff; }
    .toast-error { background: #f44336; color: #fff; }
    .toast-icon { font-size: 18px; flex-shrink: 0; }
    .toast-body { flex: 1; display: flex; flex-direction: column; gap: 2px; }
    .toast-title { font-size: 14px; font-weight: 600; }
    .toast-message { font-size: 13px; opacity: 0.9; }
    .toast-close { background: none; border: none; color: inherit; cursor: pointer; opacity: 0.7; font-size: 14px; padding: 0; }
    .toast-close:hover { opacity: 1; }
    @keyframes slideIn { from { transform: translateX(20px); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
  `],
})
export class NotificationToastComponent implements OnInit, OnDestroy {
  private static _idCounter = 0;
  @HostBinding('attr.id') readonly id = `ui-notification-toast-${++NotificationToastComponent._idCounter}`;


  @Input() variant: 'info' | 'success' | 'warning' | 'error' = 'info';
  @Input() title = '';
  @Input() message = '';
  @Input() duration = 4000;
  @Output() dismissed = new EventEmitter<void>();

  visible = true;
  private timer: ReturnType<typeof setTimeout> | null = null;

  readonly icons: Record<string, string> = { info: 'ℹ', success: '✓', warning: '⚠', error: '✕' };
  get icon() { return this.icons[this.variant]; }

  ngOnInit() {
    if (this.duration > 0) this.timer = setTimeout(() => this.close(), this.duration);
  }

  ngOnDestroy() { if (this.timer) clearTimeout(this.timer); }

  close() { this.visible = false; this.dismissed.emit(); }
}
