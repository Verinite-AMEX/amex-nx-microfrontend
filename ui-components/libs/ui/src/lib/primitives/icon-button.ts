import { Component, Input, Output, EventEmitter, HostListener, HostBinding } from '@angular/core';
import { NgIf } from '@angular/common';
import { IconComponent } from './icon';

@Component({
  selector: 'ui-icon-button',
  standalone: true,
  imports: [NgIf, IconComponent],
  template: `
    <button type="button" class="icon-btn icon-btn-{{variant}} icon-btn-{{size}}"
      [disabled]="disabled"
      [attr.role]="role"
      [attr.aria-label]="ariaLabel || ariaLabelFallback"
      [attr.aria-describedby]="ariaDescribedBy"
      [attr.aria-pressed]="ariaPressed"
      [attr.aria-expanded]="ariaExpanded"
      [attr.aria-selected]="ariaSelected"
      [attr.aria-controls]="ariaControls || null"
      [attr.aria-disabled]="disabled"
      [attr.tabindex]="tabIndexOverride"
      (click)="clicked.emit()"
      (keydown)="onKeydown($event)">
      <ui-icon [glyph]="icon" size="sm" [decorative]="!ariaLabel"
        [ariaLabel]="ariaLabel || ariaLabelFallback">
        <ng-content></ng-content>
      </ui-icon>
    </button>
  `,
  styles: [`
    .icon-btn {
      display: inline-flex; align-items: center; justify-content: center;
      border: none; border-radius: 50%; cursor: pointer;
      transition: background 0.2s, opacity 0.2s; font-family: Arial, sans-serif;
      width: var(--icon-btn-size, 36px);
      height: var(--icon-btn-size, 36px);
      color: var(--icon-btn-color, #fff);
      background: var(--icon-btn-bg, #1976d2);
    }
    .icon-btn-sm { --icon-btn-size: 28px; }
    .icon-btn-md { --icon-btn-size: 36px; }
    .icon-btn-lg { --icon-btn-size: 48px; }
    .icon-btn-primary {
      --icon-btn-bg: #1976d2;
      --icon-btn-color: #fff;
    }
    .icon-btn-primary:hover:not(:disabled) { background: var(--icon-btn-hover-bg, #1565c0); }
    .icon-btn-ghost {
      --icon-btn-bg: transparent;
      --icon-btn-color: #555;
    }
    .icon-btn-ghost:hover:not(:disabled) { background: var(--icon-btn-hover-bg, #f0f0f0); }
    .icon-btn-danger {
      --icon-btn-bg: #f44336;
      --icon-btn-color: #fff;
    }
    .icon-btn-danger:hover:not(:disabled) { background: var(--icon-btn-hover-bg, #d32f2f); }
    .icon-btn:disabled { opacity: 0.5; cursor: not-allowed; }
  `],
})
export class IconButtonComponent {
  private static _idCounter = 0;
  @HostBinding('attr.id') @Input() id = `ui-icon-button-${++IconButtonComponent._idCounter}`;

  @Input() icon = '★';
  @Input() ariaLabel = '';
  @Input() ariaDescribedBy = '';
  @Input() ariaPressed: boolean | null = null;
  @Input() ariaExpanded: boolean | null = null;
  @Input() variant: 'primary' | 'ghost' | 'danger' = 'ghost';
  @Input() size: 'sm' | 'md' | 'lg' = 'md';
  @Input() disabled = false;
  @Input() role: string | null = null;
  @Input() ariaSelected: boolean | null = null;
  @Input() ariaControls = '';
  @Input() tabIndexOverride: number | null = null;
  @Output() clicked = new EventEmitter<void>();

  get ariaLabelFallback(): string {
    const iconLabels: { [key: string]: string } = {
      '★': 'Star', '✕': 'Close', '✓': 'Check', '✗': 'Cross', '❤': 'Heart',
      '➕': 'Add', '➖': 'Remove', '✏': 'Edit', '🔍': 'Search', '⚙': 'Settings'
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