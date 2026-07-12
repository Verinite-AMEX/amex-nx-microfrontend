import { Component, Input, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ui-progress-bar',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="progress-wrap">
      <div class="progress-header" *ngIf="label || showValue">
        <span *ngIf="label" class="progress-label">{{ label }}</span>
        <span *ngIf="showValue" class="progress-value">{{ value }}%</span>
      </div>
      <div class="progress-track" [style.height.px]="height">
        <div class="progress-fill progress-{{variant}}"
          [style.width.%]="clampedValue"
          [class.indeterminate]="indeterminate">
        </div>
      </div>
    </div>
  `,
  styles: [`
    .progress-wrap { display: flex; flex-direction: column; gap: 4px; width: 100%; }
    .progress-header { display: flex; justify-content: space-between; }
    .progress-label { font-size: 13px; font-family: Arial, sans-serif; color: #333; }
    .progress-value { font-size: 13px; font-family: Arial, sans-serif; color: #666; }
    .progress-track { width: 100%; background: #e0e0e0; border-radius: 999px; overflow: hidden; }
    .progress-fill { height: 100%; border-radius: 999px; transition: width 0.3s ease; }
    .progress-primary { background: #1976d2; }
    .progress-success { background: #4caf50; }
    .progress-warning { background: #ff9800; }
    .progress-error { background: #f44336; }
    .indeterminate { width: 40% !important; animation: indeterminate 1.2s ease-in-out infinite; }
    @keyframes indeterminate {
      0% { transform: translateX(-100%); }
      100% { transform: translateX(350%); }
    }
  `],
})
export class ProgressBarComponent {
  private static _idCounter = 0;
  @HostBinding('attr.id') readonly id = `ui-progress-bar-${++ProgressBarComponent._idCounter}`;


  @Input() value = 0;
  @Input() label = '';
  @Input() showValue = false;
  @Input() height = 8;
  @Input() indeterminate = false;
  @Input() variant: 'primary' | 'success' | 'warning' | 'error' = 'primary';

  get clampedValue() { return Math.min(100, Math.max(0, this.value)); }
}
