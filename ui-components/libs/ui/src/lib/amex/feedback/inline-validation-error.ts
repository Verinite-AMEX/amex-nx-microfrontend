import { Component, Input, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AmexPortalStyle } from './success-toast';

@Component({
  selector: 'amex-inline-validation-error',
  standalone: true,
  imports: [CommonModule],
  template: `
    <ng-container *ngIf="message">

      <!-- ONLS style: red text directly below the input field (label turns red, simple text) -->
      <div *ngIf="portalStyle === 'onls'" class="onls-field-error" role="alert" aria-live="polite">
        {{ message }}
      </div>

      <!-- OMS style: tooltip-style callout "This value is required." (matches image20 in SOC doc) -->
      <div *ngIf="portalStyle === 'oms'" class="oms-field-error" role="alert" aria-live="polite">
        <span class="oms-field-error__icon">!</span>
        {{ message }}
      </div>

    </ng-container>
  `,
  styles: [`
    /* ONLS: plain red text below field — matches portal red validation text */
    .onls-field-error {
      font-family: Arial, sans-serif;
      font-size: 12px;
      color: #c0392b;
      margin-top: 3px;
      padding-left: 2px;
    }

    /* OMS: callout box — matches "This value is required." tooltip in SOC image20 */
    .oms-field-error {
      display: inline-flex;
      align-items: center;
      gap: 5px;
      background: #fff;
      border: 1px solid #aaa;
      border-radius: 3px;
      padding: 4px 10px;
      font-family: Arial, sans-serif;
      font-size: 12px;
      color: #333;
      margin-top: 4px;
      box-shadow: 1px 1px 4px rgba(0,0,0,0.12);
      position: relative;
    }
    .oms-field-error::before {
      content: '';
      position: absolute;
      top: -6px; left: 12px;
      border: 5px solid transparent;
      border-bottom-color: #aaa;
      border-top: none;
    }
    .oms-field-error__icon {
      color: #c0392b;
      font-weight: bold;
      font-size: 13px;
    }
  `],
})
export class AmexInlineValidationErrorComponent {
  private static _idCounter = 0;
  @HostBinding('attr.id') @Input() id = `inline-validation-error-${++AmexInlineValidationErrorComponent._idCounter}`;

  @Input() message = '';
  @Input() portalStyle: AmexPortalStyle = 'onls';
}
