import { Component, Input, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ui-form-group',
  standalone: true,
  imports: [CommonModule],
  template: `
    <fieldset class="form-group" [class.horizontal]="layout === 'horizontal'">
      <legend *ngIf="legend" class="form-group-legend">{{ legend }}</legend>
      <ng-content></ng-content>
    </fieldset>
  `,
  styles: [`
    .form-group {
      display: flex; flex-direction: column; gap: 16px;
      border: 1px solid #e0e0e0; border-radius: 6px;
      padding: 16px 20px; margin: 0;
    }
    .form-group.horizontal { flex-direction: row; flex-wrap: wrap; align-items: flex-start; }
    .form-group.horizontal > :ng-deep ui-form-field { flex: 1; min-width: 200px; }
    .form-group-legend {
      font-size: 14px; font-weight: 600;
      font-family: Arial, sans-serif;
      color: #333; padding: 0 4px;
    }
  `],
})
export class FormGroupComponent {
  private static _idCounter = 0;
  @HostBinding('attr.id') readonly id = `ui-form-group-${++FormGroupComponent._idCounter}`;


  @Input() legend = '';
  @Input() layout: 'vertical' | 'horizontal' = 'vertical';
}
