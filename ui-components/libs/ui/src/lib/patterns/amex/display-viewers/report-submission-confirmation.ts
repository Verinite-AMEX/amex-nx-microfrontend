import { Component, Input, Output, EventEmitter, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../../../primitives/button';

/**
 * ReportSubmissionConfirmation
 * Inline confirmation shown after a report/statement request is successfully submitted.
 * Matches BCRB "New Report Request Submitted" panel + UAEFTS request confirmation.
 * Source: BCRB, UAEFTS Statements
 * Style: Success green banner OR BCRB dark-blue bar with white text.
 *
 * NOTE: the two ".rsc__link" <span>s (BCRB "Request New Report +" / "Refresh
 * Request") are intentionally left as spans, not ui-button — they render as
 * plain inline text links with no button chrome at all (no padding, no border,
 * no background, sitting mid-sentence in a flex row), which is a text-link
 * pattern rather than a button pattern. Flagging rather than silently
 * leaving a violation: happy to convert these to ui-button too (ghost
 * variant + --btn-padding:0 etc., same recipe as card-member-details-view)
 * if you want every clickable element funneled through the primitive
 * regardless of visual weight — say the word.
 */
@Component({
  selector: 'amex-report-submission-confirmation',
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  template: `
    <div class="rsc">

      <!-- BCRB style: dark header bar -->
      <div *ngIf="variant === 'bcrb'" class="rsc__bcrb">
        <div class="rsc__bcrb-header">
          <span class="rsc__bcrb-title">BCRB Reports</span>
          <span class="rsc__bcrb-user" *ngIf="username">User :- {{ username }}</span>
        </div>
        <div class="rsc__bcrb-body">
          <div class="rsc__bcrb-main-title">BCRB REPORTS MAIN</div>
          <div class="rsc__bcrb-links">
            <span class="rsc__link" (click)="requestNew.emit()">Request New Report +</span>
            <span class="rsc__link rsc__link--right" (click)="refresh.emit()">Refresh Request</span>
          </div>
          <div *ngIf="message" class="rsc__bcrb-message">{{ message }}</div>
          <div class="rsc__bcrb-details" *ngIf="requestId || referenceNo">
            <div *ngIf="requestId" class="rsc__detail-row">
              <span class="rsc__detail-label">Process ID:</span>
              <span class="rsc__detail-value rsc__link">{{ requestId }}</span>
            </div>
            <div *ngIf="referenceNo" class="rsc__detail-row">
              <span class="rsc__detail-label">File Name:</span>
              <span class="rsc__detail-value rsc__link">{{ referenceNo }}</span>
            </div>
            <div *ngIf="status" class="rsc__detail-row">
              <span class="rsc__detail-label">Processing Status:</span>
              <span class="rsc__detail-value" [class.rsc__status--error]="isError">{{ status }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Generic / UAEFTS style: green success panel -->
      <div *ngIf="variant !== 'bcrb'" class="rsc__generic">
        <div class="rsc__generic-icon">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <circle cx="16" cy="16" r="16" fill="#2e7d32"/>
            <path d="M9 16.5l5 5 9-10" stroke="#fff" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        <div class="rsc__generic-content">
          <div class="rsc__generic-title">{{ title || 'Request Submitted Successfully' }}</div>
          <div *ngIf="message" class="rsc__generic-message">{{ message }}</div>
          <div *ngIf="requestId" class="rsc__detail-row">
            <span class="rsc__detail-label">Request ID:</span>
            <span class="rsc__detail-value">{{ requestId }}</span>
          </div>
          <div *ngIf="referenceNo" class="rsc__detail-row">
            <span class="rsc__detail-label">Reference No:</span>
            <span class="rsc__detail-value">{{ referenceNo }}</span>
          </div>
          <div *ngIf="status" class="rsc__detail-row">
            <span class="rsc__detail-label">Status:</span>
            <span class="rsc__detail-value rsc__status--badge">{{ status }}</span>
          </div>
        </div>
        <div class="rsc__generic-actions">
          <ui-button class="rsc__btn rsc__btn--primary" variant="secondary" [label]="newRequestLabel || 'New Request'" (click)="requestNew.emit()"></ui-button>
          <ui-button class="rsc__btn" variant="secondary" label="Back" (click)="goBack.emit()"></ui-button>
        </div>
      </div>

    </div>
  `,
  styles: [`
    :host { display: block; font-family: Arial, sans-serif; font-size: 12px; }
    .rsc { max-width: 900px; }

    /* BCRB variant */
    .rsc__bcrb { border: 1px solid #d0d8e8; }
    .rsc__bcrb-header {
      background: #3a3e9e; color: #fff;
      display: flex; justify-content: space-between; align-items: center;
      padding: 10px 16px; font-size: 14px; font-weight: bold;
    }
    .rsc__bcrb-user { font-size: 12px; font-weight: normal; }

    .rsc__bcrb-body { padding: 14px 16px; }
    .rsc__bcrb-main-title {
      font-size: 14px; font-weight: bold; color: #1a1a1a;
      text-align: center; margin-bottom: 10px;
    }
    .rsc__bcrb-links {
      display: flex; justify-content: space-between; margin-bottom: 12px;
    }
    .rsc__link {
      color: #7b3fe4; cursor: pointer; font-size: 13px;
      text-decoration: underline;
    }
    .rsc__link--right { margin-left: auto; }

    .rsc__bcrb-message {
      background: #e8f5e9; border: 1px solid #a5d6a7;
      padding: 8px 12px; font-size: 13px; color: #1b5e20; margin-bottom: 10px;
    }

    .rsc__bcrb-details {
      margin-top: 8px;
    }

    /* Generic variant */
    .rsc__generic {
      display: flex; align-items: flex-start; gap: 16px;
      background: #e8f5e9; border: 1px solid #a5d6a7;
      padding: 16px 20px; border-radius: 4px;
    }
    .rsc__generic-icon { flex-shrink: 0; padding-top: 2px; }
    .rsc__generic-content { flex: 1; }
    .rsc__generic-title {
      font-size: 15px; font-weight: bold; color: #1b5e20; margin-bottom: 6px;
    }
    .rsc__generic-message { font-size: 13px; color: #2e7d32; margin-bottom: 8px; }
    .rsc__generic-actions { display: flex; flex-direction: column; gap: 6px; flex-shrink: 0; }

    /* Shared detail rows */
    .rsc__detail-row {
      display: flex; gap: 8px; align-items: center; margin-bottom: 4px;
    }
    .rsc__detail-label {
      font-size: 12px; font-weight: bold; color: #555; min-width: 110px;
    }
    .rsc__detail-value { font-size: 12px; color: #1a1a1a; }

    .rsc__status--error { color: #c00; font-weight: bold; font-size: 11px; }
    .rsc__status--badge {
      background: #e8f5e9; color: #1b5e20; font-weight: bold;
      padding: 2px 8px; border-radius: 10px; font-size: 11px;
    }

    /* Buttons */
    .rsc__btn {
      --btn-bg: #e8e8e8;
      --btn-color: #000;
      --btn-border: 1px solid #aaa;
      --btn-padding: 5px 14px;
      --btn-font-size: 12px;
      --btn-bg-hover: #d8d8d8;
    }
    .rsc__btn--primary {
      --btn-bg: linear-gradient(to bottom, #5ba3e0, #006fcf);
      --btn-color: #fff;
      --btn-border: 1px solid #005fba;
      --btn-bg-hover: linear-gradient(to bottom, #4a92cf, #0058a6);
    }
  `],
})
export class AmexReportSubmissionConfirmationComponent {
  private static _idCounter = 0;
  @HostBinding('attr.id') readonly id = `report-submission-confirmation-${++AmexReportSubmissionConfirmationComponent._idCounter}`;

  /** 'bcrb' = BCRB dark bar style | 'default' = green success panel */
  @Input() variant: 'bcrb' | 'default' = 'default';
  @Input() title          = '';
  @Input() message        = '';
  @Input() requestId      = '';
  @Input() referenceNo    = '';
  @Input() status         = '';
  @Input() isError        = false;
  @Input() username       = '';
  @Input() newRequestLabel = 'New Request';

  @Output() requestNew = new EventEmitter<void>();
  @Output() goBack     = new EventEmitter<void>();
  @Output() refresh    = new EventEmitter<void>();
}