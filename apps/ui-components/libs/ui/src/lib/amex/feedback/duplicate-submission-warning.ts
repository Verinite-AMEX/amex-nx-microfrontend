import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AmexPortalStyle } from './success-toast';

@Component({
  selector: 'amex-duplicate-submission-warning',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div [class]="portalStyle === 'onls' ? 'onls-dup' : 'oms-dup'" role="alert">

      <!-- ONLS style: yellow warning box with text -->
      <ng-container *ngIf="portalStyle === 'onls'">
        <table class="onls-dup__layout">
          <tr>
            <td class="onls-dup__icon-cell">⚠</td>
            <td class="onls-dup__content">
              <p class="onls-dup__title">Duplicate Record Detected</p>
              <p class="onls-dup__text">
                A record has already been submitted for
                <strong *ngIf="clientId">Client ID: {{ clientId }}</strong>
                <span *ngIf="!clientId">this entry</span>.
                Please verify before proceeding.
              </p>
              <div class="onls-dup__actions">
                <button class="onls-btn onls-btn--secondary" (click)="back.emit()">{{ backLabel }}</button>
                <button class="onls-btn onls-btn--primary" (click)="proceed.emit()">{{ proceedLabel }}</button>
              </div>
            </td>
          </tr>
        </table>
      </ng-container>

      <!-- OMS style: white card with purple left border -->
      <ng-container *ngIf="portalStyle === 'oms'">
        <div class="oms-dup__icon">⚠</div>
        <div class="oms-dup__body">
          <p class="oms-dup__title">Duplicate Submission Detected</p>
          <p class="oms-dup__text">
            A record has already been submitted for
            <strong *ngIf="clientId">Client ID: {{ clientId }}</strong>
            <span *ngIf="!clientId">this entry</span>.
          </p>
          <div class="oms-dup__actions">
            <button class="oms-btn oms-btn--back" (click)="back.emit()">{{ backLabel }}</button>
            <button class="oms-btn oms-btn--primary" (click)="proceed.emit()">{{ proceedLabel }}</button>
          </div>
        </div>
      </ng-container>

    </div>
  `,
  styles: [`
    /* ONLS: yellow/amber warning box */
    .onls-dup {
      background: #fff8dc;
      border: 1px solid #e6c84a;
      padding: 12px 16px;
      font-family: Arial, sans-serif;
      max-width: 560px;
    }
    .onls-dup__layout { border-collapse: collapse; width: 100%; }
    .onls-dup__icon-cell {
      font-size: 28px; color: #e6a817; vertical-align: top;
      padding-right: 14px; padding-top: 2px; width: 36px;
    }
    .onls-dup__content { vertical-align: top; }
    .onls-dup__title { font-size: 13px; font-weight: bold; color: #7a5700; margin: 0 0 6px; }
    .onls-dup__text { font-size: 13px; color: #555; margin: 0 0 12px; line-height: 1.5; }
    .onls-dup__actions { display: flex; gap: 8px; }
    .onls-btn {
      padding: 4px 16px; font-size: 13px; font-family: Arial, sans-serif;
      border-radius: 3px; cursor: pointer;
    }
    .onls-btn--primary {
      background: linear-gradient(to bottom, #5ba3e0, #006fcf);
      color: #fff; border: 1px solid #005fba;
    }
    .onls-btn--primary:hover { background: linear-gradient(to bottom, #4a92cf, #0058a6); }
    .onls-btn--secondary {
      background: linear-gradient(to bottom, #f5f5f5, #ddd);
      color: #333; border: 1px solid #bbb;
    }

    /* OMS: white card with orange-left-border */
    .oms-dup {
      display: flex; gap: 14px;
      background: #fff;
      border: 1px solid #e0e0e0;
      border-left: 4px solid #f57c00;
      border-radius: 4px;
      padding: 16px 18px;
      font-family: Arial, sans-serif;
      max-width: 540px;
    }
    .oms-dup__icon { font-size: 24px; color: #f57c00; flex-shrink: 0; line-height: 1; }
    .oms-dup__body { flex: 1; }
    .oms-dup__title { font-size: 14px; font-weight: bold; color: #e65100; margin: 0 0 6px; }
    .oms-dup__text { font-size: 13px; color: #555; margin: 0 0 14px; line-height: 1.5; }
    .oms-dup__actions { display: flex; gap: 10px; }
    .oms-btn {
      padding: 7px 18px; font-size: 13px; font-weight: bold;
      font-family: Arial, sans-serif; border: none; border-radius: 3px; cursor: pointer;
    }
    .oms-btn--primary { background: #7b1fa2; color: #fff; }
    .oms-btn--primary:hover { background: #6a1b9a; }
    .oms-btn--back { background: #1e3a5f; color: #fff; }
    .oms-btn--back:hover { background: #16304f; }
  `],
})
export class AmexDuplicateSubmissionWarningComponent {
  @Input() portalStyle: AmexPortalStyle = 'oms';
  @Input() clientId = '';
  @Input() backLabel = 'Back';
  @Input() proceedLabel = 'Proceed Anyway';
  @Output() back = new EventEmitter<void>();
  @Output() proceed = new EventEmitter<void>();
}
