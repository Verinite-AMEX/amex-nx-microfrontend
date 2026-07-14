import { Component, Input, Output, EventEmitter, HostBinding } from '@angular/core';
import { NgIf, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InputComponent } from '../../../primitives/input';
import { SelectComponent, SelectOption } from '../../../primitives/select';
import { CheckboxComponent } from '../../../primitives/checkbox';
import { ButtonComponent } from '../../../primitives/button';
import { ImageComponent } from '../../../primitives/image';
import { ListComponent } from '../../../primitives/list';
import { ListItemComponent } from '../../../primitives/list-item';

export interface PriorityPassCard {
  cardNumber: string;
  cardType:   string;       // e.g. 'The American Express® Corporate Card'
  variant:    string;       // e.g. 'BULLET P'
  enrolled:   boolean;
  entitlements: string[];   // bullet list of entitlement text
  selected?:  boolean;
}

/**
 * PriorityPassViewer
 * PRIORITY PASS™ ENROLLMENT screen.
 * - Client code search field + Submit button
 * - On results: Contact Details (Mobile, Email), Basic Card dropdown, Card Selection checklist
 * - T&C checkbox + CONFIRM & ENROLL button
 * - Empty state: red error message when no eligible cards
 * Source: Lounge Rationalization (Priority Pass)
 * Style: Dark navy header #1c3f72, bordered card rows, blue CONFIRM & ENROLL button.
 *
 * NOTE: enroll button's disabled state uses a solid grey (#aaa) background,
 * not just dimmed opacity — ui-button's disabled rule only exposes an
 * opacity var today, not a background-color override, so that one rule is
 * scoped locally via ::ng-deep — see flag below.
 */
@Component({
  selector: 'amex-priority-pass-viewer',
  standalone: true,
  imports: [NgIf, NgFor, FormsModule, InputComponent, SelectComponent, CheckboxComponent, ButtonComponent, ImageComponent, ListComponent, ListItemComponent],
  template: `
    <div class="ppv">
      <!-- Navy header -->
      <div class="ppv__header">PRIORITY PASS™ ENROLLMENT</div>

      <div class="ppv__body">
        <!-- Client code search -->
        <div class="ppv__search-row">
          <span class="ppv__client-code">{{ clientCode || '&nbsp;' }}</span>
          <ui-button class="ppv__submit-btn" variant="primary" label="SUBMIT" (click)="search.emit(clientCode)"></ui-button>
        </div>

        <!-- No eligible cards error -->
        <div *ngIf="noEligibleCards" class="ppv__no-cards">
          No eligible cards associated with the client code you entered or the client code does not exist.
        </div>

        <!-- Enrollment form — shown when results loaded -->
        <ng-container *ngIf="!noEligibleCards && cards && cards.length > 0">

          <!-- Contact Details -->
          <div class="ppv__section">
            <div class="ppv__section-title">Contact Details</div>
            <p class="ppv__section-note">
              Please confirm we have the correct contact details for your new Priority Pass™.
            </p>
            <p class="ppv__section-warning">
              <strong>Note:</strong> Any updates on your contact details will reflect across all our systems
              including the transaction SMS and e-statements.
            </p>
            <div class="ppv__contact-row">
              <span class="ppv__contact-label">Mobile</span>
              <ui-input class="ppv__contact-input" [ngModel]="mobile" [readonly]="true"></ui-input>
              <ui-button class="ppv__edit-btn" variant="primary" label="EDIT" (click)="editMobile.emit()"></ui-button>
            </div>
            <div class="ppv__contact-row">
              <span class="ppv__contact-label">Email</span>
              <ui-input class="ppv__contact-input" [ngModel]="email" [readonly]="true"></ui-input>
              <ui-button class="ppv__edit-btn" variant="primary" label="EDIT" (click)="editEmail.emit()"></ui-button>
            </div>
          </div>

          <!-- Basic Card dropdown -->
          <div class="ppv__section">
            <div class="ppv__section-title">Please select the Basic Card you wish to enroll</div>
            <ui-select class="ppv__card-select" [options]="basicCardOptions" [(ngModel)]="selectedBasicCard"></ui-select>
          </div>

          <!-- Card Selection list -->
          <div class="ppv__section">
            <div class="ppv__section-title">Card Selection</div>
            <p class="ppv__section-note">Please select the Card you wish to enroll</p>
            <div *ngFor="let c of cards" class="ppv__card-row">
              <div class="ppv__card-check">
                <ui-checkbox [(ngModel)]="c.selected" [ariaLabel]="'Select ' + c.cardNumber"></ui-checkbox>
              </div>
              <div class="ppv__card-img-wrap">
                <ui-image class="ppv__card-img" src="" alt="" fallbackText="AMEX"></ui-image>
              </div>
              <div class="ppv__card-info">
                <div class="ppv__card-type">{{ c.cardType }}</div>
                <div class="ppv__card-num">{{ c.cardNumber }}</div>
                <div class="ppv__card-variant">{{ c.variant }}</div>
              </div>
              <div class="ppv__card-entitlements">
                <p class="ppv__entitle-intro">As an American Express Corporate Cardmember you are entitled to:</p>
                <ui-list class="ppv__entitle-list" [compact]="true">
                  <ui-list-item *ngFor="let e of c.entitlements">{{ e }}</ui-list-item>
                </ui-list>
                <div class="ppv__card-status"
                     [class.ppv__card-status--enrolled]="c.enrolled"
                     [class.ppv__card-status--not]="!c.enrolled">
                  STATUS: {{ c.enrolled ? 'ENROLLED' : 'NOT ENROLLED' }}
                </div>
              </div>
            </div>
          </div>

          <!-- T&C + Confirm -->
          <div class="ppv__tnc">
            <p class="ppv__tnc-text">
              <strong>To complete your enrolment please confirm that:</strong><br/>
              You accept the charges levied by Priority Pass if your Priority Pass lounge usage is more
              than the complimentary allowance on your Card.<br/>
              You accept the Terms &amp; Conditions of Priority Pass and of the American Express Lounge Benefit.<br/>
              <em>If a customer asks about the terms, they should be redirected to the terms online.</em>
            </p>
            <ui-checkbox class="ppv__tnc-check" [(ngModel)]="termsAccepted">
              I accept the <a class="ppv__tnc-link" href="#">Terms &amp; Conditions</a>
            </ui-checkbox>
          </div>

          <div class="ppv__actions">
            <ui-button class="ppv__enroll-btn"
                    variant="primary" label="CONFIRM &amp; ENROLL"
                    [disabled]="!termsAccepted"
                    (click)="onConfirmEnroll()"></ui-button>
          </div>

        </ng-container>
      </div>

      <!-- Copyright -->
      <div class="ppv__copyright">Copyright &copy; 2009 American Express Company</div>
    </div>
  `,
  styles: [`
    :host {
      display: block; font-family: Arial, sans-serif; font-size: 12px;
      --input-border: 1px solid #aaa;
      --input-padding: 4px 8px;
      --select-border: 1px solid #aaa;
      --select-padding: 4px 32px 4px 8px;
      --select-radius: 0px;
      --select-font-size: 12px;
    }

    .ppv { background: #fff; max-width: 600px; }

    .ppv__header {
      background: #1c3f72;
      color: #fff;
      font-size: 15px;
      font-weight: bold;
      padding: 12px 16px;
      letter-spacing: 0.03em;
    }

    .ppv__body { padding: 14px 16px; }

    /* Search row */
    .ppv__search-row {
      display: flex; align-items: center; gap: 12px; margin-bottom: 14px;
    }
    .ppv__client-code { font-size: 14px; color: #1a1a1a; }
    .ppv__submit-btn {
      --btn-bg: #1c3f72; --btn-bg-hover: #153060; --btn-color: #fff;
      --btn-radius: 0px; --btn-padding: 6px 20px; --btn-font-size: 12px;
    }

    /* No eligible cards */
    .ppv__no-cards {
      color: #c00; font-size: 13px; margin: 10px 0;
    }

    /* Sections */
    .ppv__section { margin-bottom: 18px; }
    .ppv__section-title {
      font-size: 13px; font-weight: bold; color: #006fcf;
      border-bottom: 1px solid #b0cce0; padding-bottom: 4px; margin-bottom: 8px;
    }
    .ppv__section-note    { font-size: 12px; color: #333; margin: 0 0 6px; }
    .ppv__section-warning { font-size: 11px; color: #333; margin: 0 0 8px; font-weight: bold; }

    /* Contact rows */
    .ppv__contact-row {
      display: flex; align-items: center; gap: 8px; margin-bottom: 6px;
    }
    .ppv__contact-label { font-size: 12px; color: #333; min-width: 50px; }
    .ppv__contact-input { width: 180px; }
    .ppv__contact-input ::ng-deep .input { width: 180px; font-size: 12px; }
    .ppv__edit-btn {
      --btn-bg: #006fcf; --btn-color: #fff;
      --btn-radius: 0px; --btn-padding: 4px 12px; --btn-font-size: 11px;
    }

    /* Card select */
    .ppv__card-select { width: 100%; }

    /* Card rows */
    .ppv__card-row {
      display: flex; gap: 12px; align-items: flex-start;
      border-bottom: 1px solid #e0e8f0; padding-bottom: 12px; margin-bottom: 12px;
    }
    .ppv__card-check { padding-top: 4px; }
    .ppv__card-img-wrap {
      flex-shrink: 0; width: 70px; height: 44px;
      --image-fallback-bg: #1a1a1a;
      --image-fallback-color: #fff;
      --image-fallback-font-size: 10px;
      --image-fallback-letter-spacing: normal;
    }
    .ppv__card-img ::ng-deep .ui-image-fallback { border-radius: 4px; }

    .ppv__card-info { min-width: 160px; }
    .ppv__card-type    { font-size: 12px; color: #006fcf; font-weight: bold; margin-bottom: 2px; }
    .ppv__card-num     { font-size: 12px; color: #1a1a1a; }
    .ppv__card-variant { font-size: 11px; color: #555; }

    .ppv__card-entitlements { flex: 1; }
    .ppv__entitle-intro { font-size: 12px; color: #333; margin: 0 0 4px; }
    .ppv__entitle-list {
      margin: 0 0 6px; --list-indent: 20px; --list-item-gap: 3px;
      font-size: 12px; color: #333;
    }

    .ppv__card-status     { font-size: 11px; font-weight: bold; }
    .ppv__card-status--enrolled { color: #2e7d32; }
    .ppv__card-status--not      { color: #888; }

    /* T&C */
    .ppv__tnc { margin-bottom: 14px; }
    .ppv__tnc-text {
      font-size: 12px; color: #1a1a1a; margin-bottom: 8px; line-height: 1.6;
    }
    .ppv__tnc-check {
      --label-font-size: 12px; --label-font-weight: normal; --label-color: #1a1a1a;
    }
    .ppv__tnc-link { color: #006fcf; }

    /* Actions */
    .ppv__actions { text-align: right; }
    .ppv__enroll-btn {
      --btn-bg: #006fcf; --btn-bg-hover: #005baa; --btn-color: #fff;
      --btn-radius: 0px; --btn-padding: 9px 28px; --btn-font-size: 13px;
    }
    .ppv__enroll-btn ::ng-deep button:disabled { background: #aaa; opacity: 1; }

    .ppv__copyright {
      font-size: 11px; color: #888; text-align: right; padding: 8px 16px;
      border-top: 1px solid #e0e0e0;
    }
  `],
})
export class AmexPriorityPassViewerComponent {
  private static _idCounter = 0;
  @HostBinding('attr.id') @Input() id = `priority-pass-viewer-${++AmexPriorityPassViewerComponent._idCounter}`;

  @Input() clientCode    = '';
  @Input() noEligibleCards = false;
  @Input() mobile        = '';
  @Input() email         = '';
  @Input() cards: PriorityPassCard[] = [];
  termsAccepted          = false;
  selectedBasicCard      = '';

  @Output() search        = new EventEmitter<string>();
  @Output() confirmEnroll = new EventEmitter<PriorityPassCard[]>();
  @Output() editMobile    = new EventEmitter<void>();
  @Output() editEmail     = new EventEmitter<void>();

  get basicCardOptions(): SelectOption[] {
    return this.cards.map(c => ({ value: c.cardNumber, label: c.cardNumber }));
  }

  onConfirmEnroll() {
    this.confirmEnroll.emit(this.cards.filter(c => c.selected));
  }
}