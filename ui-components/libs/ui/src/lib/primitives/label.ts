import { Component, Input } from '@angular/core';
import { NgIf } from '@angular/common';

@Component({
  selector: 'ui-label',
  standalone: true,
  imports: [NgIf],
  template: `
    <label [attr.for]="forId || null" class="ui-label" [class.disabled]="disabled">
      <ng-content></ng-content>
      <span *ngIf="required" class="required-indicator" aria-label="required">*</span>
    </label>
  `,
  styles: [`
    .ui-label {
      font-size: var(--label-font-size, 14px);
      font-family: Arial, sans-serif;
      font-weight: var(--label-font-weight, 500);
      color: var(--label-color, #333);
    }
    .ui-label.disabled { opacity: 0.6; }
    .required-indicator {
      color: var(--label-required-color, #f44336);
      margin-left: 2px;
    }
  `],
})
export class LabelComponent {
  @Input() forId = '';
  @Input() required = false;
  @Input() disabled = false;
}