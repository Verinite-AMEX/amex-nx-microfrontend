import { Component, Input, Output, EventEmitter, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AccentCardComponent, AmexEmptyStateMessageComponent, LabelComponent, RadioComponent, SelectComponent, SelectOption, ButtonComponent } from '@ui-components/ui';


export interface MerchantAccountOption {
  id: string;
  label: string;
}

/**
 * AmexMerchantDetailsPanel
 * "MERCHANT DETAILS" card on the OMS Settlement and Submissions page
 * (Merchant User / MRM / Sub User / VAT User / Admin — all roles share this).
 * Renders a merchant account picker + "select number of months" filter with
 * a Submit action, or the OMS empty-state message when no merchant accounts
 * are available for the logged-in user.
 * The section title/heading is owned by the consuming page, not this card —
 * see oms-settlement-submissions-table for how it's placed above this panel.
 * Source: OMS portal — Settlement and Submissions (Merchant Details).
 */
@Component({
  selector: 'amex-merchant-details-panel',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    AccentCardComponent,
    AmexEmptyStateMessageComponent,
    LabelComponent,
    RadioComponent,
    SelectComponent,
    ButtonComponent,
  ],
  templateUrl: 'merchant-details-panel.html',
  styles: [`
    :host {
      display: block;
      width: 100%;
      font-family: Arial, sans-serif;
    }
    .mdp__section-label { display: block; margin-bottom: 10px; font-weight: 600; }
    .mdp__months-label { margin-top: 20px; }
    .mdp__account-list { display: flex; flex-direction: column; gap: 10px; }
    .mdp__months-row { max-width: 220px; margin-bottom: 14px; }
    .mdp__date-range-link {
      display: inline-block;
      margin-bottom: 20px;
      text-decoration: none;
      cursor: pointer;
    }
    .mdp__date-range-link:hover { text-decoration: underline; }
    .mdp__submit-btn { display: block; }
  `],
})
export class AmexMerchantDetailsPanelComponent {
  private static _idCounter = 0;
  @HostBinding('attr.id') @Input() id = `merchant-details-panel-${++AmexMerchantDetailsPanelComponent._idCounter}`;

  // Content
  @Input() merchantAccounts: MerchantAccountOption[] = [];
  @Input() selectedAccountId = '';
  @Input() monthOptions = [1, 3, 6, 12];
  @Input() emptyMessage = 'No merchants are available.';
  @Input() accountSectionLabel = 'Merchant Account';
  @Input() monthsSectionLabel = 'Select number of months to be displayed';
  @Input() showDateRangeLink = true;
  @Input() dateRangeLinkLabel = 'Settlement and Submissions by date range';
  @Input() submitButtonLabel = 'Submit';

  // Appearance — passed straight through to ui-accent-card
  @Input() accentColor = '#7b1f4b';
  @Input() accentHeight = 4;
  @Input() cardBackground = '#ffffff';
  @Input() cardPadding = '24px 20px';
  @Input() cardMaxWidth = '100%';

  // Appearance — submit button, exposed as inputs instead of baked-in CSS
  @Input() submitButtonBg = '#1a1a5e';
  @Input() submitButtonColor = '#fff';
  @Input() dateRangeLinkColor = '#016fd0';

  @HostBinding('style.--btn-bg') get _btnBg() { return this.submitButtonBg; }
  @HostBinding('style.--btn-color') get _btnColor() { return this.submitButtonColor; }
  @HostBinding('style.--btn-radius') readonly _btnRadius = '2px';
  @HostBinding('style.--btn-padding') readonly _btnPadding = '8px 20px';
  @HostBinding('style.--btn-font-size') readonly _btnFontSize = '14px';

  selectedMonths = 1;

  @Output() accountChange = new EventEmitter<string>();
  @Output() dateRangeClick = new EventEmitter<void>();
  @Output() submitted = new EventEmitter<{ accountId: string; months: number }>();

  get monthSelectOptions(): SelectOption[] {
    return this.monthOptions.map(m => ({ value: m, label: `${m} ${m === 1 ? 'Month' : 'Months'}` }));
  }

  onAccountChange(accountId: string | number) {
    this.selectedAccountId = String(accountId);
    this.accountChange.emit(this.selectedAccountId);
  }

  onSubmit() {
    this.submitted.emit({ accountId: this.selectedAccountId, months: Number(this.selectedMonths) });
  }
}