// libs/ui/src/lib/primitives/alert.ts
import {
  Component,
  Input,
  Output,
  EventEmitter,
  HostBinding,
} from '@angular/core';
import { CommonModule } from '@angular/common';

export type AlertVariant = 'neutral' | 'positive' | 'warn';

const ICON_CLASS_BY_VARIANT: Record<AlertVariant, string> = {
  neutral: 'dlsIconInfo',
  positive: 'dlsIconSuccess',
  warn: 'dlsIconWarning',
};

@Component({
  selector: 'ui-alert',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      *ngIf="visible"
      class="alert"
      [class.alertNeutral]="variant === 'neutral'"
      [class.alertPositive]="variant === 'positive'"
      [class.alertWarn]="variant === 'warn'"
      [class.alertDismissible]="!dialog"
      [class.alertDialog]="dialog"
      [class.animFade]="!dialog"
      [class.in]="!dialog && !closing"
      role="alert"
    >
      <i class="icon" [class]="iconClass" aria-hidden="true"></i>
      <span>
        <strong *ngIf="title">{{ title }} </strong>{{ message }}
      </span>
      <button
        *ngIf="dismissible && !dialog"
        type="button"
        class="glyph glyphLg"
        aria-label="Close"
        (click)="dismiss()"
      >
        <i class="glyph glyphLg dlsIconClose"></i>
      </button>
    </div>
  `,
})
export class AlertComponent {
  private static _idCounter = 0;
  @HostBinding('attr.id') readonly id =
    `ui-alert-${++AlertComponent._idCounter}`;

  @Input() variant: AlertVariant = 'neutral';
  @Input() title = '';
  @Input() message = '';
  /** Controls only whether the close button renders. DLS's base padding/layout (`alertDismissible`) applies to every non-dialog alert regardless of this. */
  @Input() dismissible = false;
  /** Maps to DLS's `.alertDialog` variant — block layout, centered, used inside modals. No close button in this mode. */
  @Input() dialog = false;
  @Output() dismissed = new EventEmitter<void>();

  visible = true;
  closing = false;

  get iconClass(): string {
    return ICON_CLASS_BY_VARIANT[this.variant];
  }

  /** Mirrors DLS's own dismissible.js: fades out (removing `.in`), then removes the element after the transition. */
  dismiss(): void {
    this.closing = true;
    setTimeout(() => {
      this.visible = false;
      this.dismissed.emit();
    }, 150);
  }
}