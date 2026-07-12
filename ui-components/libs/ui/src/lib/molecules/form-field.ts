import { Component, Input, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ui-form-field',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="form-field" [class.required]="required">
      <label *ngIf="label" class="form-field-label" [attr.for]="forId">{{ label }}</label>
      <ng-content></ng-content>
      <span *ngIf="hint && !error" class="form-field-hint">{{ hint }}</span>
      <span *ngIf="error" class="form-field-error">{{ error }}</span>
    </div>
  `,
  styles: [`
    .form-field { display: flex; flex-direction: column; gap: 4px; }
    .form-field-label {
      font-size: 14px; font-weight: 600;
      font-family: Arial, sans-serif;
      color: #333;
    }
    .required .form-field-label::after { content: ' *'; color: #f44336; }
    .form-field-hint { font-size: 12px; color: #666; }
    .form-field-error { font-size: 12px; color: #f44336; }
  `],
})
export class FormFieldComponent {
  private static _idCounter = 0;
  @HostBinding('attr.id') readonly id = `ui-form-field-${++FormFieldComponent._idCounter}`;


  @Input() label = '';
  @Input() hint = '';
  @Input() error = '';
  @Input() required = false;
  @Input() forId = '';
}
