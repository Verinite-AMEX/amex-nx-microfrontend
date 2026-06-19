import { Component, Input } from '@angular/core';

@Component({
  selector: 'ui-spinner',
  standalone: true,
  template: `
    <div class="spinner spinner-{{size}}" [style.color]="color" role="status" aria-label="Loading">
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-dasharray="31.4 31.4" />
      </svg>
    </div>
  `,
  styles: [`
    .spinner { display: inline-flex; animation: spin 0.8s linear infinite; }
    .spinner-sm { width: 16px; height: 16px; }
    .spinner-md { width: 24px; height: 24px; }
    .spinner-lg { width: 40px; height: 40px; }
    @keyframes spin { to { transform: rotate(360deg); } }
  `],
})
export class SpinnerComponent {
  @Input() size: 'sm' | 'md' | 'lg' = 'md';
  @Input() color = '#1976d2';
}
