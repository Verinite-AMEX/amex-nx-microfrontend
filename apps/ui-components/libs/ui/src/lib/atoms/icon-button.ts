import { Component, Input, Output, EventEmitter, HostListener } from '@angular/core';

@Component({
  selector: 'ui-icon-button',
  standalone: true,
  template: `
    <button type="button" class="icon-btn icon-btn-{{variant}} icon-btn-{{size}}"
      [disabled]="disabled" 
      [attr.aria-label]="ariaLabel || ariaLabelFallback"
      [attr.aria-describedby]="ariaDescribedBy"
      [attr.aria-pressed]="ariaPressed"
      [attr.aria-expanded]="ariaExpanded"
      [attr.aria-disabled]="disabled"
      (click)="clicked.emit()"
      (keydown)="onKeydown($event)">
      <span class="icon-btn-icon" aria-hidden="true">{{ icon }}</span>
    </button>
  `,
  styles: [`
    .icon-btn {
      display: inline-flex; align-items: center; justify-content: center;
      border: none; border-radius: 50%; cursor: pointer;
      transition: background 0.2s, opacity 0.2s; font-family: Arial, sans-serif;
    }
    .icon-btn-sm { width: 28px; height: 28px; font-size: 14px; }
    .icon-btn-md { width: 36px; height: 36px; font-size: 18px; }
    .icon-btn-lg { width: 48px; height: 48px; font-size: 22px; }
    .icon-btn-primary { background: #1976d2; color: #fff; }
    .icon-btn-primary:hover:not(:disabled) { background: #1565c0; }
    .icon-btn-ghost { background: transparent; color: #555; }
    .icon-btn-ghost:hover:not(:disabled) { background: #f0f0f0; }
    .icon-btn-danger { background: #f44336; color: #fff; }
    .icon-btn-danger:hover:not(:disabled) { background: #d32f2f; }
    .icon-btn:disabled { opacity: 0.5; cursor: not-allowed; }
  `],
})
export class IconButtonComponent {
  @Input() icon = '★';
  @Input() ariaLabel = '';
  @Input() ariaDescribedBy = '';
  @Input() ariaPressed: boolean | null = null;
  @Input() ariaExpanded: boolean | null = null;
  @Input() variant: 'primary' | 'ghost' | 'danger' = 'ghost';
  @Input() size: 'sm' | 'md' | 'lg' = 'md';
  @Input() disabled = false;
  @Output() clicked = new EventEmitter<void>();

  get ariaLabelFallback(): string {
    // Provide fallback aria-label based on icon if not explicitly set
    const iconLabels: { [key: string]: string } = {
      '★': 'Star',
      '✕': 'Close',
      '✓': 'Check',
      '✗': 'Cross',
      '❤': 'Heart',
      '➕': 'Add',
      '➖': 'Remove',
      '✏': 'Edit',
      '🔍': 'Search',
      '⚙': 'Settings'
    };
    return iconLabels[this.icon] || 'Icon button';
  }

  @HostListener('keydown', ['$event'])
  onKeydown(event: KeyboardEvent) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.clicked.emit();
    }
  }
}
