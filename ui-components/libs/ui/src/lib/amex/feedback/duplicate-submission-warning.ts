import { Component, Input, Output, EventEmitter, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../../atoms/button';
import { AmexPortalStyle } from './success-toast';

@Component({
  selector: 'amex-duplicate-submission-warning',
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  template: `
    <div [class]="portalStyle === 'onls' ? 'onls-dup' : 'oms-dup'" role="alert">

      <!-- ONLS style: yellow warning box with text -->
      <ng-container *ngIf="portalStyle === 'onls'">
        <div class="onls-dup__layout">
          <div class="onls-dup__icon-cell">⚠</div>
          <div class="onls-dup__content">
            <p class="onls-dup__title">Duplicate Record Detected</p>
            <p class="onls-dup__text">
              A record has already been submitted for
              <strong *ngIf="clientId">Client ID: {{ clientId }}</strong>
              <span *ngIf="!clientId">this entry</span>.
              Please verify before proceeding.
            </p>
            <div class="onls-dup__actions">
              <ui-button class="onls-btn-wrap onls-btn-wrap--secondary"
                [label]="backLabel" size="sm" variant="ghost"
                (click)="back.emit()">
              </ui-button>
              <ui-button class="onls-btn-wrap onls-btn-wrap--primary"
                [label]="proceedLabel" size="sm" variant="primary"
                (click)="proceed.emit()">
              </ui-button>
            </div>
          </div>
        </div>
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
            <ui-button class="oms-btn-wrap oms-btn-wrap--back"
              [label]="backLabel" size="md" variant="ghost"
              (click)="back.emit()">
            </ui-button>
            <ui-button class="oms-btn-wrap oms-btn-wrap--primary"
              [label]="proceedLabel" size="md" variant="primary"
              (click)="proceed.emit()">
            </ui-button>
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
    /* Replaces the previous <table>/<tr>/<td> layout markup with flex — same visual
       result, no semantic-table misuse for what was purely an icon+text layout. */
    .onls-dup__layout { display: flex; width: 100%; }
    .onls-dup__icon-cell {
      font-size: 28px; color: #e6a817;
      padding-right: 14px; padding-top: 2px; width: 36px; flex-shrink: 0;
    }
    .onls-dup__content { flex: 1; }
    .onls-dup__title { font-size: 13px; font-weight: bold; color: #7a5700; margin: 0 0 6px; }
    .onls-dup__text { font-size: 13px; color: #555; margin: 0 0 12px; line-height: 1.5; }
    .onls-dup__actions { display: flex; gap: 8px; }
    /* Themed via ui-button's exposed CSS custom properties — no ::ng-deep. */
    .onls-btn-wrap {
      --btn-radius: 3px; --btn-padding: 4px 16px; --btn-font-size: 13px;
    }
    .onls-btn-wrap--primary {
      --btn-bg: linear-gradient(to bottom, #5ba3e0, #006fcf); --btn-color: #fff; --btn-border: 1px solid #005fba;
    }
    .onls-btn-wrap--primary:hover { --btn-bg: linear-gradient(to bottom, #4a92cf, #0058a6); }
    .onls-btn-wrap--secondary {
      --btn-bg: linear-gradient(to bottom, #f5f5f5, #ddd); --btn-color: #333; --btn-border: 1px solid #bbb;
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
    /* Themed via ui-button's exposed CSS custom properties — no ::ng-deep. */
    .oms-btn-wrap {
      --btn-radius: 3px; --btn-padding: 7px 18px; --btn-font-size: 13px;
    }
    .oms-btn-wrap--primary { --btn-bg: #7b1fa2; --btn-color: #fff; }
    .oms-btn-wrap--primary:hover { --btn-bg: #6a1b9a; }
    .oms-btn-wrap--back { --btn-bg: #1e3a5f; --btn-color: #fff; }
    .oms-btn-wrap--back:hover { --btn-bg: #16304f; }
  `],
})
export class AmexDuplicateSubmissionWarningComponent {
  private static _idCounter = 0;
  @HostBinding('attr.id') @Input() id = `duplicate-submission-warning-${++AmexDuplicateSubmissionWarningComponent._idCounter}`;

  @Input() portalStyle: AmexPortalStyle = 'oms';
  @Input() clientId = '';
  @Input() backLabel = 'Back';
  @Input() proceedLabel = 'Proceed Anyway';
  @Output() back = new EventEmitter<void>();
  @Output() proceed = new EventEmitter<void>();
}