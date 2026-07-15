import { Component, Input, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LabelComponent } from '../primitives/label';

@Component({
  selector: 'ui-form-field',
  standalone: true,
  imports: [CommonModule, LabelComponent],
  template: `
    <div class="form-field" [class.required]="required" [class.form-field--horizontal]="layout === 'horizontal'">
      <ui-label
        *ngIf="label"
        class="form-field-label"
        [forId]="forId"
        [required]="required"
        [style.width]="layout === 'horizontal' ? (labelWidth || null) : null">
        {{ label }}
      </ui-label>
      <div class="form-field-content">
        <ng-content></ng-content>
        <span *ngIf="hint && !error" class="form-field-hint">{{ hint }}</span>
        <span *ngIf="error" class="form-field-error">{{ error }}</span>
      </div>
    </div>
  `,
  styles: [`
    .form-field { display: flex; flex-direction: column; gap: 4px; }
    .form-field-content { display: flex; flex-direction: column; gap: 4px; }
    .form-field-hint { font-size: 12px; color: #666; }
    .form-field-error { font-size: 12px; color: #f44336; }

    /* Horizontal layout: fixed/auto-width label to the left of the field,
       label text right-aligned to sit flush against the field column. */
    .form-field--horizontal {
      flex-direction: row;
      align-items: center;
      gap: 12px;
    }
    .form-field--horizontal .form-field-label {
      flex-shrink: 0;
      text-align: right;
    }
    .form-field--horizontal .form-field-content {
      flex: 1;
      min-width: 0;
    }
  `],
})
export class FormFieldComponent {
  private static _idCounter = 0;
  @HostBinding('attr.id') @Input() id = `ui-form-field-${++FormFieldComponent._idCounter}`;

  @Input() label = '';
  @Input() hint = '';
  @Input() error = '';
  @Input() required = false;
  @Input() forId = '';
  /** 'vertical' (default, label above field) or 'horizontal' (label column to the left). */
  @Input() layout: 'vertical' | 'horizontal' = 'vertical';
  /** Fixed width for the label column, e.g. '130px'. Only applied when layout is 'horizontal'. */
  @Input() labelWidth = '';
}