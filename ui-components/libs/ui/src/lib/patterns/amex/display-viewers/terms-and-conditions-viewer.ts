import { Component, Input, Output, EventEmitter, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CheckboxComponent } from '../../../primitives/checkbox';
import { ButtonComponent } from '../../../primitives/button';
import { ListComponent } from '../../../primitives/list';
import { ListItemComponent } from '../../../primitives/list-item';

/**
 * TermsAndConditionsViewer
 * Scrollable T&C text area with a mandatory accept checkbox + I Agree / Submit button.
 * Used in OMS (Merchant registration flow) and Wearables (issuance T&C).
 * Also matches Priority Pass T&C block at bottom of enrollment page.
 * Source: OMS, Wearables, Priority Pass
 * Style: OMS portal — white scroll area, bordered, checkbox row, dark submit button.
 */
@Component({
  selector: 'amex-terms-and-conditions-viewer',
  standalone: true,
  imports: [CommonModule, FormsModule, CheckboxComponent, ButtonComponent, ListComponent, ListItemComponent],
  template: `
    <div class="tcv">

      <!-- Optional title -->
      <div *ngIf="title" class="tcv__title">{{ title }}</div>

      <!-- Scrollable T&C body -->
      <div class="tcv__scroll" [style.max-height]="maxHeight">
        <div class="tcv__text" *ngIf="text">{{ text }}</div>
        <ng-content></ng-content>

        <!-- Bullet-list variant (Priority Pass style) -->
        <div *ngIf="bullets.length > 0" class="tcv__bullets">
          <p class="tcv__preamble" *ngIf="preamble">{{ preamble }}</p>
          <ui-list class="tcv__list" [compact]="true">
            <ui-list-item *ngFor="let b of bullets" class="tcv__list-item">{{ b }}</ui-list-item>
          </ui-list>
        </div>
      </div>

      <!-- Accept checkbox row -->
      <div class="tcv__accept-row">
        <ui-checkbox class="tcv__checkbox" [(ngModel)]="accepted" (ngModelChange)="acceptedChange.emit(accepted)">
          <span class="tcv__accept-text">
            I accept the
            <span class="tcv__link" (click)="termsLinkClick.emit()">Terms &amp; Conditions</span>
          </span>
        </ui-checkbox>
      </div>

      <!-- Action buttons -->
      <div class="tcv__actions">
        <ui-button class="tcv__btn tcv__btn--agree"
                [disabled]="!accepted"
                [class.tcv__btn--disabled]="!accepted"
                variant="primary" [label]="agreeLabel"
                (click)="agree.emit()"></ui-button>
        <ui-button *ngIf="showCancel" class="tcv__btn tcv__btn--cancel"
                variant="secondary" [label]="cancelLabel"
                (click)="cancel.emit()"></ui-button>
      </div>

    </div>
  `,
  styles: [`
    :host { display: block; font-family: Arial, sans-serif; font-size: 12px; }
    .tcv { max-width: 700px; }

    .tcv__title {
      font-size: 13px; font-weight: bold; color: #1a1a1a;
      margin-bottom: 10px;
    }

    .tcv__scroll {
      border: 1px solid #ccc;
      overflow-y: auto;
      background: #fff;
      padding: 12px 14px;
      margin-bottom: 12px;
      line-height: 1.6;
    }
    .tcv__text { font-size: 12px; color: #333; white-space: pre-wrap; }

    .tcv__bullets { font-size: 12px; color: #333; }
    .tcv__preamble { font-weight: bold; margin-bottom: 8px; }
    .tcv__list { margin: 0; --list-indent: 20px; --list-item-gap: 4px; }

    .tcv__accept-row {
      margin-bottom: 12px;
    }
    .tcv__accept-text { font-size: 12px; color: #333; }
    .tcv__link { color: #006fcf; cursor: pointer; }
    .tcv__link:hover { text-decoration: underline; }

    .tcv__actions { display: flex; gap: 10px; align-items: center; }

    .tcv__btn {
      --btn-padding: 7px 22px;
      --btn-font-size: 13px;
      --btn-border: none;
    }
.tcv__btn--agree {
      --btn-bg: #1c3f72;
      --btn-color: #fff;
      --btn-radius: 0;
      --btn-bg-hover: #163060;
    }
    .tcv__btn--disabled {
      --btn-bg: #aaa;
    }
    .tcv__btn--cancel {
      --btn-bg: #e8e8e8;
      --btn-color: #333;
      --btn-border: 1px solid #aaa;
      --btn-radius: 0;
      --btn-bg-hover: #d8d8d8;
    }
  `],
})
export class AmexTermsAndConditionsViewerComponent {
  private static _idCounter = 0;
  @HostBinding('attr.id') @Input() id = `terms-and-conditions-viewer-${++AmexTermsAndConditionsViewerComponent._idCounter}`;

  @Input() title       = '';
  @Input() text        = '';
  @Input() bullets: string[] = [];
  @Input() preamble    = '';
  @Input() maxHeight   = '200px';
  @Input() accepted    = false;
  @Input() agreeLabel  = 'I Agree';
  @Input() cancelLabel = 'Cancel';
  @Input() showCancel  = true;

  @Output() agree           = new EventEmitter<void>();
  @Output() cancel          = new EventEmitter<void>();
  @Output() acceptedChange  = new EventEmitter<boolean>();
  @Output() termsLinkClick  = new EventEmitter<void>();
}