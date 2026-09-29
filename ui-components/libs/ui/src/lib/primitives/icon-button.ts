import {
  Component,
  Input,
  Output,
  EventEmitter,
  HostListener,
  HostBinding,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent } from './icon';

/**
 * Renders its own native <button> with DLS's real .btnIcon + .btnCircle
 * classes, rather than wrapping <ui-button> and re-targeting its inner
 * element with class="icon-btn-{{variant}}" + ::ng-deep. class="..." on a
 * component host lands on the host tag (<ui-button>), never on the child
 * template's inner <button>, so the previous approach could only ever work
 * via ::ng-deep piercing into hand-rolled local CSS. Rendering natively
 * here lets DLS's own classes apply directly and needs no ::ng-deep.
 */
export type IconButtonVariant = 'primary' | 'ghost' | 'danger';
export type IconButtonSize = 'sm' | 'md' | 'lg';

@Component({
  selector: 'ui-icon-button',
  standalone: true,
  imports: [CommonModule, IconComponent],
  template: `
    <button
      #nativeButton
      type="button"
      [disabled]="disabled"
      [ngClass]="['btn', 'btnIcon', 'btnCircle', variantClass, sizeClass]"
      [attr.role]="role"
      [attr.aria-label]="ariaLabel || ariaLabelFallback"
      [attr.aria-describedby]="ariaDescribedBy"
      [attr.aria-pressed]="ariaPressed"
      [attr.aria-expanded]="ariaExpanded"
      [attr.aria-selected]="ariaSelected"
      [attr.aria-controls]="ariaControls || null"
      [attr.tabindex]="tabIndexOverride"
      (click)="clicked.emit()"
    >
      <ui-icon [glyph]="icon" size="sm" [decorative]="true"></ui-icon>
    </button>
  `,
})
export class IconButtonComponent {
  private static _idCounter = 0;
  @HostBinding('attr.id') @Input() id =
    `ui-icon-button-${++IconButtonComponent._idCounter}`;

  @Input() icon = '★';
  @Input() ariaLabel = '';
  @Input() ariaDescribedBy = '';
  @Input() ariaPressed: boolean | null = null;
  @Input() ariaExpanded: boolean | null = null;
  @Input() ariaSelected: boolean | null = null;
  @Input() ariaControls = '';
  @Input() role: string | null = null;
  @Input() tabIndexOverride: number | null = null;
  @Input() variant: IconButtonVariant = 'ghost';
  @Input() size: IconButtonSize = 'md';
  @Input() disabled = false;
  @Output() clicked = new EventEmitter<void>();

  @ViewChild('nativeButton', { static: true })
  private nativeButton!: ElementRef<HTMLButtonElement>;

  /** Same real DLS class names as ButtonComponent — kept in sync with btn.css. */
  private readonly variantClassMap: Record<IconButtonVariant, string> = {
    primary: 'btnPrimary',
    ghost: 'btnTertiary',
    danger: 'btnPrimary dlsRedBg dlsRedBgHvr dlsWhite',
  };

  private readonly sizeClassMap: Record<IconButtonSize, string> = {
    sm: 'btnSm',
    md: '', // DLS default size
    lg: '', // DLS has no separate lg size
  };

  get variantClass(): string {
    return this.variantClassMap[this.variant] ?? 'btnTertiary';
  }

  get sizeClass(): string {
    return this.sizeClassMap[this.size] ?? '';
  }

  get ariaLabelFallback(): string {
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
      '⚙': 'Settings',
    };
    return iconLabels[this.icon] || 'Icon button';
  }

  focus(): void {
    this.nativeButton.nativeElement.focus();
  }

  @HostListener('keydown', ['$event'])
  onKeydown(event: KeyboardEvent) {
    if (this.disabled) return;
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      (event.target as HTMLButtonElement).click();
    }
  }
}