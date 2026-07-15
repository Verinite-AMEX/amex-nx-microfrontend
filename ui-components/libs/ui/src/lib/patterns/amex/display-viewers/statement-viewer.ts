import { Component, Input, Output, EventEmitter, HostBinding } from '@angular/core';
import { NgIf, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LabelComponent } from '../../../primitives/label';
import { InputComponent } from '../../../primitives/input';
import { ButtonComponent } from '../../../primitives/button';

export interface StatementMonth {
  label: string;   // e.g. 'October 2029'
  isLatest?: boolean;
}

/**
 * StatementViewer
 * ONLS Helper statement list viewer. Renders the "View Statements" panel:
 * card number input → submit → shows Latest Statement + Previous Statements list.
 * Clicking a month link fires statementSelect.
 * Source: Statements Online Helper, Central Statements
 * Style: White bordered panel, light-blue header bar, alternating blue/white month rows.
 */
@Component({
  selector: 'amex-statement-viewer',
  standalone: true,
  imports: [NgIf, NgFor, FormsModule, LabelComponent, InputComponent, ButtonComponent],
  template: `
    <div class="sv">
      <!-- Header panel -->
      <div class="sv__panel">
        <div class="sv__panel-header">View Statements</div>
        <div class="sv__search-row">
          <ui-label class="sv__search-label" [forId]="id + '-please-enter-a-card-number'">Please enter a card number</ui-label>
          <ui-input [id]="id + '-please-enter-a-card-number'" class="sv__input" [(ngModel)]="cardNumber"></ui-input>
          <ui-button class="sv__btn" variant="primary" label="View Statements" (click)="viewStatements.emit(cardNumber)"></ui-button>
        </div>

        <!-- Results -->
        <div *ngIf="statements && statements.length > 0" class="sv__results">
          <ng-container *ngFor="let s of statements; let i = index">
            <div class="sv__month-row"
                 [class.sv__month-row--latest]="s.isLatest"
                 [class.sv__month-row--alt]="!s.isLatest && i % 2 === 0">
              <span *ngIf="s.isLatest" class="sv__month-badge">Latest Statement</span>
              <span *ngIf="!s.isLatest && i === 1" class="sv__month-badge sv__month-badge--prev">Previous<br/>Statements</span>
              <span *ngIf="!s.isLatest && i !== 1" class="sv__month-badge sv__month-badge--empty"></span>
              <span class="sv__month-link" (click)="statementSelect.emit(s)">{{ s.label }}</span>
            </div>
          </ng-container>
        </div>
      </div>

      <!-- Copyright -->
      <div class="sv__copyright">Copyright &copy; 2009 American Express Company</div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      font-family: Arial, sans-serif;
      font-size: 13px;
      --input-border: 1px solid #aaa;
      --input-padding: 3px 6px;
      --label-font-size: 12px;
      --label-font-weight: normal;
      --label-color: #333;
    }

    .sv { background: #e8e8e8; padding: 20px; min-height: 200px; }

    .sv__panel {
      background: #fff;
      border: 1px solid #b0c8dc;
      max-width: 700px;
      padding: 0;
      overflow: hidden;
    }

    .sv__panel-header {
      background: #b8d4ef;
      color: #1a3c5e;
      font-weight: bold;
      font-size: 13px;
      padding: 8px 14px;
      border-bottom: 1px solid #a0bcd8;
    }

    .sv__search-row {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 14px 16px;
    }

    .sv__search-label ::ng-deep .ui-label { white-space: nowrap; }

    .sv__input { width: 200px; font-size: 12px; }

    .sv__btn {
      --btn-bg: linear-gradient(to bottom, #5ba3e0, #006fcf);
      --btn-color: #fff;
      --btn-border: 1px solid #005fba;
      --btn-padding: 4px 14px;
      --btn-font-size: 12px;
    }

    /* Results table */
    .sv__results { padding: 0 16px 14px; }

    .sv__month-row {
      display: flex;
      align-items: flex-start;
      gap: 0;
      min-height: 26px;
    }

    .sv__month-row--latest .sv__month-link {
      color: #333;
      font-weight: normal;
    }

    .sv__month-badge {
      font-size: 12px;
      font-weight: bold;
      color: #333;
      min-width: 130px;
      padding: 4px 8px 4px 0;
      flex-shrink: 0;
      line-height: 1.4;
    }

    .sv__month-badge--prev { color: #333; }
    .sv__month-badge--empty { min-width: 130px; }

    .sv__month-link {
      display: block;
      flex: 1;
      padding: 4px 10px;
      font-size: 12px;
      color: #006fcf;
      cursor: pointer;
      background: transparent;
    }
    .sv__month-link:hover { text-decoration: underline; }

    .sv__month-row--alt .sv__month-link {
      background: #cce0f5;
    }

    .sv__copyright {
      font-size: 11px;
      color: #888;
      text-align: right;
      margin-top: 10px;
    }
  `],
})
export class AmexStatementViewerComponent {
  private static _idCounter = 0;
  @HostBinding('attr.id') @Input() id = `statement-viewer-${++AmexStatementViewerComponent._idCounter}`;

  @Input() cardNumber = '';
  @Input() statements: StatementMonth[] = [];
  @Output() viewStatements  = new EventEmitter<string>();
  @Output() statementSelect = new EventEmitter<StatementMonth>();
}