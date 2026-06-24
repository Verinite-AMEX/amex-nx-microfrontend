import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShowcasePageComponent } from '../../showcase-page';
import { VariantSectionComponent } from '../../variant-section';
import {
  AmexSearchBarComponent,
  AmexDateRangePickerComponent,
  AmexMonthYearSelectorComponent,
  AmexDropdownFilterComponent,
  AmexAutocompleteInputComponent,
  AmexReportTypeSelectorComponent,
  AmexViewReportDropdownComponent,
  AmexMonthsDropdownFilterComponent,
} from '@vn-core-ui-components/ui';

@Component({
  selector: 'app-amex-search-filters-page',
  standalone: true,
  imports: [
    CommonModule,
    ShowcasePageComponent,
    VariantSectionComponent,
    AmexSearchBarComponent,
    AmexDateRangePickerComponent,
    AmexMonthYearSelectorComponent,
    AmexDropdownFilterComponent,
    AmexAutocompleteInputComponent,
    AmexReportTypeSelectorComponent,
    AmexViewReportDropdownComponent,
    AmexMonthsDropdownFilterComponent,
  ],
  template: `
    <app-showcase-page
      title="AMEX Search & Filters"
      description="8 search and filter components matching exact AEME portal designs. Used across Online Account Services, BCRB, BTA, OMS, SOC/ROC, and helper portals."
    >

      <!-- ── 1. SearchBar ── -->
      <app-variant-section title="1 · SearchBar">
        <div class="stack">

          <div class="vlabel">Online Account Services — Search by Card Member User ID or Card Number</div>
          <div class="demo-box">
            <amex-search-bar
              label="Card Member User ID / Card Number"
              placeholder="Enter User ID or Card Number"
              buttonLabel="Submit">
            </amex-search-bar>
          </div>

          <div class="vlabel" style="margin-top:14px">Supplementary Access Helper — Search by UCI</div>
          <div class="demo-box">
            <amex-search-bar
              label="Supplementary Card Member User ID / UCI"
              placeholder="Enter User ID or UCI"
              buttonLabel="Submit">
            </amex-search-bar>
          </div>

          <div class="vlabel" style="margin-top:14px">Wearables / Centurion LCY — Search by Client Code</div>
          <div class="demo-box">
            <amex-search-bar
              label="Client Code"
              placeholder="Enter client code"
              buttonLabel="Submit">
            </amex-search-bar>
          </div>

          <div class="vlabel" style="margin-top:14px">UAEFTS — Search by IBAN Number</div>
          <div class="demo-box">
            <amex-search-bar
              label="IBAN Number"
              placeholder="Enter IBAN number"
              buttonLabel="Submit">
            </amex-search-bar>
          </div>

          <div class="vlabel" style="margin-top:14px">With validation error state</div>
          <div class="demo-box">
            <amex-search-bar
              label="Card Number"
              placeholder="Enter card number"
              buttonLabel="Submit"
              errorMessage="No records found for the entered card number.">
            </amex-search-bar>
          </div>

        </div>
      </app-variant-section>

      <!-- ── 2. DateRangePicker ── -->
      <app-variant-section title="2 · DateRangePicker">
        <div class="stack">

          <div class="vlabel">BCRB Reports — Filter report requests by date range</div>
          <div class="demo-box">
            <amex-date-range-picker
              fromLabel="Start Date"
              toLabel="End Date"
              buttonLabel="Search">
            </amex-date-range-picker>
          </div>

          <div class="vlabel" style="margin-top:14px">BTA — Audit Trail Summary date range</div>
          <div class="demo-box">
            <amex-date-range-picker
              fromLabel="Date From"
              toLabel="Date To"
              buttonLabel="Submit">
            </amex-date-range-picker>
          </div>

          <div class="vlabel" style="margin-top:14px">OMS Customized Reports — Report date range</div>
          <div class="demo-box">
            <amex-date-range-picker
              fromLabel="From"
              toLabel="To"
              buttonLabel="Apply">
            </amex-date-range-picker>
          </div>

        </div>
      </app-variant-section>

      <!-- ── 3. MonthYearSelector ── -->
      <app-variant-section title="3 · MonthYearSelector">
        <div class="stack">

          <div class="vlabel">BTA — Monthly Statements selector</div>
          <div class="demo-box">
            <amex-month-year-selector buttonLabel="Submit"></amex-month-year-selector>
          </div>

          <div class="vlabel" style="margin-top:14px">BTA — Audit Trail Detailed (year + month)</div>
          <div class="demo-box">
            <amex-month-year-selector buttonLabel="View Report" [startYear]="2018"></amex-month-year-selector>
          </div>

        </div>
      </app-variant-section>

      <!-- ── 4. DropdownFilter ── -->
      <app-variant-section title="4 · DropdownFilter">
        <div class="stack">

          <div class="vlabel">BCRB — Filter by Report Type</div>
          <div class="demo-box">
            <amex-dropdown-filter
              label="Report Type"
              [options]="reportTypeOptions">
            </amex-dropdown-filter>
          </div>

          <div class="vlabel" style="margin-top:14px">OMS / BTA — Filter by Status</div>
          <div class="demo-box">
            <amex-dropdown-filter
              label="Status"
              buttonLabel="Filter"
              [options]="statusOptions">
            </amex-dropdown-filter>
          </div>

          <div class="vlabel" style="margin-top:14px">OMS Users list — Filter by Role</div>
          <div class="demo-box">
            <amex-dropdown-filter
              label="Role"
              buttonLabel="Filter"
              [options]="roleOptions">
            </amex-dropdown-filter>
          </div>

        </div>
      </app-variant-section>

      <!-- ── 5. AutocompleteInput ── -->
      <app-variant-section title="5 · AutocompleteInput">
        <div class="stack">

          <div class="vlabel">SOC/ROC — Country Master (Modify) — type name, code auto-fills</div>
          <div class="demo-box">
            <amex-autocomplete-input
              label="Country Name"
              placeholder="Start typing country name..."
              codeLabel="Country Code"
              [suggestions]="countrySuggestions">
            </amex-autocomplete-input>
          </div>

          <div class="vlabel" style="margin-top:14px">SOC/ROC — Currency Master (Modify) — type name, code + rate auto-fill</div>
          <div class="demo-box">
            <amex-autocomplete-input
              label="Currency Name"
              placeholder="Start typing currency name..."
              codeLabel="Currency Code"
              extraLabel="Exchange Rate"
              [suggestions]="currencySuggestions">
            </amex-autocomplete-input>
          </div>

        </div>
      </app-variant-section>

      <!-- ── 6. ReportTypeSelector ── -->
      <app-variant-section title="6 · ReportTypeSelector">
        <div class="stack">

          <div class="vlabel">BCRB — Request New Report (radio buttons)</div>
          <div class="demo-box">
            <amex-report-type-selector
              label="Select Report Type"
              mode="radio"
              [options]="bcrbReportTypes"
              buttonLabel="Request New Report">
            </amex-report-type-selector>
          </div>

          <div class="vlabel" style="margin-top:14px">OMS — Customized Reports (dropdown with dynamic secondary fields)</div>
          <div class="demo-box">
            <amex-report-type-selector
              label="Primary Report Type"
              mode="dropdown"
              [options]="omsReportTypes"
              buttonLabel="Generate">
            </amex-report-type-selector>
          </div>

        </div>
      </app-variant-section>

      <!-- ── 7. ViewReportDropdown ── -->
      <app-variant-section title="7 · ViewReportDropdown">
        <div class="stack">

          <div class="vlabel">BTA — Audit Trail Summary (Travel Agent / Internal Admin) — 3 view modes</div>
          <div class="demo-box">
            <amex-view-report-dropdown [options]="btaViewOptions"></amex-view-report-dropdown>
          </div>

        </div>
      </app-variant-section>

      <!-- ── 8. MonthsDropdownFilter ── -->
      <app-variant-section title="8 · MonthsDropdownFilter">
        <div class="stack">

          <div class="vlabel">OMS — Settlement & Submissions (Merchant User) — select number of months</div>
          <div class="demo-box">
            <amex-months-dropdown-filter
              label="Select number of months"
              buttonLabel="Submit"
              hint="Select the number of months for which transaction data should be displayed."
              [monthOptions]="[1, 2, 3, 6, 12]">
            </amex-months-dropdown-filter>
          </div>

          <div class="vlabel" style="margin-top:14px">OMS — MRM / Sub User / VAT User / Admin variant</div>
          <div class="demo-box">
            <amex-months-dropdown-filter
              label="Number of Months"
              buttonLabel="Submit"
              [monthOptions]="[1, 3, 6, 12]">
            </amex-months-dropdown-filter>
          </div>

        </div>
      </app-variant-section>

    </app-showcase-page>
  `,
  styles: [`
    .stack { display: flex; flex-direction: column; width: 100%; }
    .vlabel { font-size: 11px; color: #888; font-style: italic; margin-bottom: 4px; margin-top: 2px; }

    .demo-box {
      background: #fff;
      border: 1px solid #e8e8e8;
      padding: 14px 16px;
      border-radius: 2px;
    }
  `],
})
export class AmexSearchFiltersPageComponent {

  /* ── DropdownFilter options ── */
  reportTypeOptions = [
    { value: 'consumer-monthly', label: 'Consumer Monthly Audit' },
    { value: 'corporate-monthly', label: 'Corporate Monthly Audit' },
    { value: 'consumer-data', label: 'Consumer Data Audit' },
    { value: 'corporate-data', label: 'Corporate Data Audit' },
    { value: 'consumer-full', label: 'Consumer Full Report' },
    { value: 'consumer-history', label: 'Consumer History Report' },
    { value: 'corporate-history', label: 'Corporate History Report' },
  ];

  statusOptions = [
    { value: 'pending', label: 'Pending' },
    { value: 'processing', label: 'Processing' },
    { value: 'completed', label: 'Completed' },
    { value: 'failed', label: 'Failed' },
  ];

  roleOptions = [
    { value: 'admin', label: 'Admin' },
    { value: 'merchant', label: 'Merchant User' },
    { value: 'mrm', label: 'MRM User' },
    { value: 'subuser', label: 'Sub User' },
    { value: 'vat', label: 'VAT User' },
  ];

  /* ── AutocompleteInput suggestions ── */
  countrySuggestions = [
    { label: 'United Arab Emirates', code: 'AE' },
    { label: 'Saudi Arabia', code: 'SA' },
    { label: 'Egypt', code: 'EG' },
    { label: 'Algeria', code: 'DZ' },
    { label: 'Jordan', code: 'JO' },
    { label: 'Bahrain', code: 'BH' },
    { label: 'Kuwait', code: 'KW' },
    { label: 'Qatar', code: 'QA' },
    { label: 'Oman', code: 'OM' },
  ];

  currencySuggestions = [
    { label: 'UAE Dirham', code: 'AED', extra: '1.000' },
    { label: 'Saudi Riyal', code: 'SAR', extra: '0.980' },
    { label: 'Algerian Dinar', code: 'DZD', extra: '0.027' },
    { label: 'US Dollar', code: 'USD', extra: '3.673' },
    { label: 'Euro', code: 'EUR', extra: '3.980' },
    { label: 'British Pound', code: 'GBP', extra: '4.620' },
  ];

  /* ── ReportTypeSelector options ── */
  bcrbReportTypes = [
    { value: 'consumer-monthly', label: 'Consumer Monthly Audit Report (REP-009)' },
    { value: 'corporate-monthly', label: 'Corporate Monthly Audit Report (REP-010)' },
    { value: 'consumer-data', label: 'Consumer Data Audit Report' },
    { value: 'corporate-data', label: 'Corporate Data Audit Report' },
    { value: 'consumer-full', label: 'Consumer Full Report' },
    { value: 'consumer-history', label: 'Consumer History Report' },
    { value: 'corporate-history', label: 'Corporate History Report' },
  ];

  omsReportTypes = [
    {
      value: 'settlement-detail',
      label: 'Settlement Detail',
      secondaryFields: [
        { key: 'from', label: 'From Date', type: 'date' as const },
        { key: 'to', label: 'To Date', type: 'date' as const },
      ],
    },
    {
      value: 'submission-detail',
      label: 'Submission Detail',
      secondaryFields: [
        { key: 'from', label: 'From Date', type: 'date' as const },
        { key: 'to', label: 'To Date', type: 'date' as const },
        { key: 'merchant', label: 'Merchant No', type: 'text' as const },
      ],
    },
    {
      value: 'sub-trans-detail',
      label: 'Submission and Transaction Detail',
      secondaryFields: [
        { key: 'from', label: 'From Date', type: 'date' as const },
        { key: 'to', label: 'To Date', type: 'date' as const },
      ],
    },
    {
      value: 'adjustment-detail',
      label: 'Adjustment Detail',
      secondaryFields: [
        { key: 'from', label: 'From Date', type: 'date' as const },
        { key: 'to', label: 'To Date', type: 'date' as const },
      ],
    },
  ];

  /* ── ViewReportDropdown options ── */
  btaViewOptions = [
    {
      value: 'by-date',
      label: 'By Date Range',
      fields: [
        { key: 'from', label: 'From Date', type: 'date' as const },
        { key: 'to', label: 'To Date', type: 'date' as const },
      ],
    },
    {
      value: 'by-user',
      label: 'By User',
      fields: [
        { key: 'userId', label: 'User ID', type: 'text' as const },
        { key: 'from', label: 'From Date', type: 'date' as const },
        { key: 'to', label: 'To Date', type: 'date' as const },
      ],
    },
    {
      value: 'by-action',
      label: 'By Action Type',
      fields: [
        {
          key: 'action', label: 'Action Type', type: 'select' as const,
          options: [
            { value: 'login', label: 'Login' },
            { value: 'view', label: 'View Statement' },
            { value: 'download', label: 'Download Report' },
            { value: 'edit', label: 'Edit User' },
            { value: 'reset', label: 'Reset Password' },
          ],
        },
        { key: 'from', label: 'From Date', type: 'date' as const },
        { key: 'to', label: 'To Date', type: 'date' as const },
      ],
    },
  ];
}