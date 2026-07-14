import { Component, Input, HostListener, HostBinding, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ui-button',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button #nativeButton [type]="type"
      [disabled]="disabled"
      [ngClass]="['btn', 'btn-' + variant, 'btn-' + size, fullWidth ? 'btn-full' : '']"
      [attr.role]="role"
      [attr.aria-label]="ariaLabel || label"
      [attr.aria-describedby]="ariaDescribedBy"
      [attr.aria-expanded]="ariaExpanded"
      [attr.aria-pressed]="ariaPressed"
      [attr.aria-selected]="ariaSelected"
      [attr.aria-controls]="ariaControls || null"
      [attr.aria-disabled]="disabled"
      [attr.tabindex]="tabIndexOverride"
      (keydown)="onKeydown($event)">
      <ng-content select="[slot=icon-start]"></ng-content><span class="btn-label">{{ label }}</span><ng-content select="[slot=icon-end]"></ng-content>
    </button>
  `,
  styles: [`
    .btn {
      border: var(--btn-border, none);
      border-bottom-color: var(--btn-border-bottom-color, inherit);
      cursor: pointer;
      font-family: Arial, sans-serif;
      font-weight: var(--btn-font-weight, 600);
      display: inline-flex;
      flex-direction: var(--btn-flex-direction, row);
      align-items: var(--btn-align-items, center);
      justify-content: var(--btn-justify-content, flex-start);
      gap: var(--btn-gap, 6px);
      width: var(--btn-width, auto);
    }
    .btn-full { width: 100%; justify-content: space-between; }
    .btn-primary {
      background: var(--btn-bg, #1976d2);
      color: var(--btn-color, #fff);
      border-radius: var(--btn-radius, 4px);
    }
    .btn-primary:hover:not(:disabled) {
      background: var(--btn-bg-hover, var(--btn-bg, #1976d2));
      color: var(--btn-color-hover, var(--btn-color, #fff));
      opacity: var(--btn-hover-opacity, 1);
    }
    .btn-secondary {
      background: var(--btn-bg, #ff4081);
      color: var(--btn-color, #fff);
      border-radius: var(--btn-radius, 4px);
    }
    .btn-secondary:hover:not(:disabled) {
      background: var(--btn-bg-hover, var(--btn-bg, #ff4081));
      color: var(--btn-color-hover, var(--btn-color, #fff));
      opacity: var(--btn-hover-opacity, 1);
    }
    .btn-ghost {
      background: var(--btn-bg, transparent);
      color: var(--btn-color, #1976d2);
      border: var(--btn-border, 1px solid #1976d2);
      border-radius: var(--btn-radius, 4px);
    }
    .btn-ghost:hover:not(:disabled) {
      background: var(--btn-bg-hover, var(--btn-bg, transparent));
      color: var(--btn-color-hover, var(--btn-color, #1976d2));
      opacity: var(--btn-hover-opacity, 1);
    }
    .btn-danger {
      background: var(--btn-bg, #f44336);
      color: var(--btn-color, #fff);
      border-radius: var(--btn-radius, 4px);
    }
    .btn-danger:hover:not(:disabled) {
      background: var(--btn-bg-hover, var(--btn-bg, #f44336));
      color: var(--btn-color-hover, var(--btn-color, #fff));
      opacity: var(--btn-hover-opacity, 1);
    }
    .btn:focus-visible {
      outline: var(--btn-focus-outline, 2px solid #1976d2);
      outline-offset: var(--btn-focus-outline-offset, 2px);
    }
    .btn:hover:not(:disabled) { background: var(--btn-bg-hover, var(--btn-bg, inherit)); }
    .btn-sm { padding: var(--btn-padding, 4px 8px); font-size: var(--btn-font-size, 12px); }
    .btn-md { padding: var(--btn-padding, 8px 16px); font-size: var(--btn-font-size, 14px); }
    .btn-lg { padding: var(--btn-padding, 16px 24px); font-size: var(--btn-font-size, 16px); }
    button:disabled { opacity: 0.6; cursor: not-allowed; }
  `],
})
export class ButtonComponent {
  private static _idCounter = 0;
  @HostBinding('attr.id') @Input() id = `ui-button-${++ButtonComponent._idCounter}`;

  @Input() label = 'Button';
  @Input() variant: 'primary' | 'secondary' | 'ghost' | 'danger' = 'primary';
  @Input() size: 'sm' | 'md' | 'lg' = 'md';
  @Input() disabled = false;
  @Input() ariaLabel = '';
  @Input() ariaDescribedBy = '';
  @Input() ariaExpanded: boolean | null = null;
  @Input() ariaPressed: boolean | null = null;
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input() role: string | null = null;
  @Input() ariaSelected: boolean | null = null;
  @Input() ariaControls = '';
  @Input() tabIndexOverride: number | null = null;
  /** Stretches the button to fill its container, spacing icon-start/label/icon-end apart. */
  @Input() fullWidth = false;

  @ViewChild('nativeButton', { static: true }) private nativeButton!: ElementRef<HTMLButtonElement>;

  focus(): void {
    this.nativeButton.nativeElement.focus();
  }

  @HostListener('keydown', ['$event'])
  onKeydown(event: KeyboardEvent) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      (event.target as HTMLButtonElement).click();
    }
  }
}