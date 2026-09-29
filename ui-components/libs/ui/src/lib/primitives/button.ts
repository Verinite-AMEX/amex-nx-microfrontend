import {
  Component,
  Input,
  HostListener,
  HostBinding,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';

/** Values ui-components has ever accepted for `variant`. 'ghost' and 'danger' are legacy — kept working, but new code should use the DLS-native names on the right. */
export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'contextual'
  | 'white'
  | 'white-secondary'
  | 'white-tertiary'
  | 'ghost' // legacy alias -> tertiary
  | 'danger'; // legacy alias -> primary + DLS red utility classes

/** Values ui-components has ever accepted for `size`. 'md' and 'lg' are legacy — kept working, both map to DLS's default (unclassed) size since DLS has no separate lg size. */
export type ButtonSize = 'default' | 'sm' | 'utility' | 'md' | 'lg';

@Component({
  selector: 'ui-button',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button
      #nativeButton
      [type]="type"
      [disabled]="disabled"
      [style.pointer-events]="loading ? 'none' : null"
      [ngClass]="[
        'btn',
        variantClass,
        sizeClass,
        fullWidth ? 'btnBlock' : '',
        allowWrap ? 'btnOverflow' : '',
        loading ? 'btnLoading' : '',
      ]"
      [attr.role]="role"
      [attr.aria-label]="ariaLabel || label"
      [attr.aria-describedby]="ariaDescribedBy"
      [attr.aria-expanded]="ariaExpanded"
      [attr.aria-pressed]="ariaPressed"
      [attr.aria-selected]="ariaSelected"
      [attr.aria-controls]="ariaControls || null"
      [attr.aria-disabled]="disabled || loading"
      [attr.aria-busy]="loading"
      [attr.tabindex]="tabIndexOverride"
      (keydown)="onKeydown($event)"
    >
      <ng-content select="[slot=icon-start]"></ng-content
      ><span [style.visibility]="loading ? 'hidden' : 'visible'">{{ label }}</span
      ><ng-content select="[slot=icon-end]"></ng-content>
    </button>
  `,
})
export class ButtonComponent {
  private static _idCounter = 0;
  @HostBinding('attr.id') @Input() id =
    `ui-button-${++ButtonComponent._idCounter}`;

  @Input() label = 'Button';
  @Input() variant: ButtonVariant = 'primary';
  @Input() size: ButtonSize = 'default';
  @Input() disabled = false;

  /** Shows DLS's built-in spinner (.btnLoading) and disables the button while true */
  @Input() loading = false;

  /** Applies DLS's .btnOverflow so long labels wrap instead of ellipsis-truncating */
  @Input() allowWrap = false;

  @Input() ariaLabel = '';
  @Input() ariaDescribedBy = '';
  @Input() ariaExpanded: boolean | null = null;
  @Input() ariaPressed: boolean | null = null;
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input() role: string | null = null;
  @Input() ariaSelected: boolean | null = null;
  @Input() ariaControls = '';
  @Input() tabIndexOverride: number | null = null;

  @Input() fullWidth = false;

  @ViewChild('nativeButton', { static: true })
  private nativeButton!: ElementRef<HTMLButtonElement>;

  /**
   * Maps to DLS's real button classes from btn.css. DLS classes are
   * camelCase (btnPrimary, btnSecondary, ...) — NOT kebab-case
   * (btn-primary, btn-secondary, ...). The previous version of this map
   * emitted kebab-case class names that don't exist anywhere in DLS, so
   * every variant except the bare .btn silently rendered unstyled.
   */
  private readonly variantClassMap: Record<ButtonVariant, string> = {
    primary: 'btnPrimary',
    secondary: 'btnSecondary',
    tertiary: 'btnTertiary',
    contextual: 'btnContextual',
    white: 'btnWhite',
    'white-secondary': 'btnWhiteSecondary',
    'white-tertiary': 'btnWhiteTertiary',
    ghost: 'btnTertiary',
    danger: 'btnPrimary dlsRedBg dlsRedBgHvr dlsWhite',
  };

  private readonly sizeClassMap: Record<ButtonSize, string> = {
    default: '',
    sm: 'btnSm',
    utility: 'btnUtility',
    md: '', // legacy alias -> DLS default size
    lg: '', // legacy alias -> DLS has no separate lg size
  };

  get variantClass(): string {
    return this.variantClassMap[this.variant] ?? 'btnPrimary';
  }

  get sizeClass(): string {
    return this.sizeClassMap[this.size] ?? '';
  }

  focus(): void {
    this.nativeButton.nativeElement.focus();
  }

  @HostListener('keydown', ['$event'])
  onKeydown(event: KeyboardEvent) {
    if (this.disabled || this.loading) return;
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      (event.target as HTMLButtonElement).click();
    }
  }
}