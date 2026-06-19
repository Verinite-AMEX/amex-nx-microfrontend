import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShowcasePageComponent } from '../../showcase-page';
import { VariantSectionComponent } from '../../variant-section';
import {
  AmexTempPasswordEmailPreviewComponent,
  AmexStatementViewerComponent,
  AmexMemoStatementViewerComponent,
  AmexMonthlyStatementViewerComponent,
  AmexLargeReportDownloadPanelComponent,
  AmexOffersPanelComponent,
  AmexBenefitsPanelComponent,
  AmexPriorityPassViewerComponent,
  AmexCenturionCardDetailsViewComponent,
  AmexWearableDetailsViewComponent,
  AmexReportSubmissionConfirmationComponent,
  AmexAuditTrailSummaryViewComponent,
  AmexPointsBalanceSummaryCardComponent,
  AmexVATInvoiceReportViewComponent,
  AmexUAEFTSStatusViewComponent,
  AmexDownloadUserGuidePanelComponent,
  AmexTermsAndConditionsViewerComponent,
} from '@vn-core-ui-components/ui';

@Component({
  selector: 'app-display-viewers-page',
  standalone: true,
  imports: [
    CommonModule,
    ShowcasePageComponent,
    VariantSectionComponent,
    AmexTempPasswordEmailPreviewComponent,
    AmexStatementViewerComponent,
    AmexMemoStatementViewerComponent,
    AmexMonthlyStatementViewerComponent,
    AmexLargeReportDownloadPanelComponent,
    AmexOffersPanelComponent,
    AmexBenefitsPanelComponent,
    AmexPriorityPassViewerComponent,
    AmexCenturionCardDetailsViewComponent,
    AmexWearableDetailsViewComponent,
    AmexReportSubmissionConfirmationComponent,
    AmexAuditTrailSummaryViewComponent,
    AmexPointsBalanceSummaryCardComponent,
    AmexVATInvoiceReportViewComponent,
    AmexUAEFTSStatusViewComponent,
    AmexDownloadUserGuidePanelComponent,
    AmexTermsAndConditionsViewerComponent,
  ],
  template: `
    <app-showcase-page
      title="AMEX Display & Viewers"
      description="All display components from the AEME portal suite — read-only viewers, statement panels, enrollment flows, and lifecycle status views. Designs match exact screenshots from the 17 functional spec documents."
    >

      <!-- ─── 1. Temp Password Email Preview ─────────────────────── -->
      <app-variant-section title="Temp Password Email Preview">
        <amex-temp-password-email-preview
          toAddress="ahmed.mansouri@company.ae"
          userName="Ahmed Al Mansouri"
          userId="ahmed_onls01"
          tempPassword="Amex@9812"
          portalName="AEME Online Helper"
          portalUrl="https://tst-wassrv02/wps/portal/onlshelper/"
        ></amex-temp-password-email-preview>
      </app-variant-section>

      <!-- ─── 2. Statement Viewer ─────────────────────────────────── -->
      <app-variant-section title="Statement Viewer — ONLS Helper">
        <div class="dv-col">
          <div class="dv-label">Empty — no search yet</div>
          <amex-statement-viewer [statements]="[]"></amex-statement-viewer>
        </div>
        <div class="dv-col">
          <div class="dv-label">With latest + previous months</div>
          <amex-statement-viewer
            cardNumber="374405679097005"
            [statements]="statementMonths"
          ></amex-statement-viewer>
        </div>
      </app-variant-section>

      <!-- ─── 3. Memo Statement Viewer ────────────────────────────── -->
      <app-variant-section title="Memo Statement Viewer — BTA">
        <div class="dv-col dv-col--wide">
          <div class="dv-label">No transactions (matches screenshot)</div>
          <amex-memo-statement-viewer
            statementDate="29 Jan 2025"
            accountNumber="BTA 3744XXXXXXX5229 - BTACLIENTBAH001"
            travelAgent="DNATA (BTA)"
            telephone="+97143166343"
            [transactions]="[]"
          ></amex-memo-statement-viewer>
        </div>
      </app-variant-section>

      <!-- ─── 4. Monthly Statement Viewer ─────────────────────────── -->
      <app-variant-section title="Monthly Statement Viewer — BTA">
        <div class="dv-col dv-col--wide">
          <div class="dv-label">February 2025 — balance summary (matches screenshot)</div>
          <amex-monthly-statement-viewer
            statementDate="28 February 2025"
            accountNumber="BTA 3744XXXXXXX5229 - BTACLIENTBAH001"
            travelAgent="DNATA (BTA)"
            telephone="+97143166343"
            [summary]="monthlySummary"
            [transactions]="[]"
            [availableMonths]="availableMonths"
          ></amex-monthly-statement-viewer>
        </div>
      </app-variant-section>

      <!-- ─── 5. Large Report Download Panel ──────────────────────── -->
      <app-variant-section title="Large Report Download Panel — BTA">
        <div class="dv-col dv-col--wide">
          <amex-large-report-download-panel
            [btaNumbers]="btaNumbers"
            [results]="largeReportResults"
          ></amex-large-report-download-panel>
        </div>
      </app-variant-section>

      <!-- ─── 6. Offers Panel ──────────────────────────────────────── -->
      <app-variant-section title="Offers Panel — Browse by Category grid">
        <div class="dv-col dv-col--fullwidth">
          <amex-offers-panel [offers]="sampleOffers"></amex-offers-panel>
        </div>
      </app-variant-section>

      <!-- ─── 7. Benefits Panel ────────────────────────────────────── -->
      <app-variant-section title="Benefits Panel">
        <div class="dv-col dv-col--fullwidth">
          <amex-benefits-panel [benefits]="sampleBenefits"></amex-benefits-panel>
        </div>
      </app-variant-section>

      <!-- ─── 8. Priority Pass Viewer ─────────────────────────────── -->
      <app-variant-section title="Priority Pass Viewer — Enrollment">
        <div class="dv-col">
          <div class="dv-label">No eligible cards (matches screenshot)</div>
          <amex-priority-pass-viewer
            clientCode="20473521"
            [noEligibleCards]="true"
            [cards]="[]"
          ></amex-priority-pass-viewer>
        </div>
        <div class="dv-col">
          <div class="dv-label">With eligible cards (matches screenshot)</div>
          <amex-priority-pass-viewer
            clientCode="20464423"
            [noEligibleCards]="false"
            mobile="+(973) 32323231"
            email="moulika.vadivel@american"
            selectedBasicCard="3702XXXXXXXX3002"
            [cards]="priorityPassCards"
          ></amex-priority-pass-viewer>
        </div>
      </app-variant-section>

      <!-- ─── 9. Centurion Card Details View ───────────────────────── -->
      <app-variant-section title="Centurion Card Details View — LCY EXC">
        <div class="dv-col dv-col--wide">
          <div class="dv-label">Card details loaded (matches screenshot)</div>
          <amex-centurion-card-details-view
            [details]="centurionCardDetails"
          ></amex-centurion-card-details-view>
        </div>
      </app-variant-section>

      <!-- ─── 10. Wearable Details View ────────────────────────────── -->
      <app-variant-section title="Wearable Details View — AMEX Wearables">
        <div class="dv-col">
          <div class="dv-label">No client yet — enter client number</div>
          <amex-wearable-details-view [device]="null"></amex-wearable-details-view>
        </div>
        <div class="dv-col">
          <div class="dv-label">Device found</div>
          <amex-wearable-details-view [device]="wearableDevice"></amex-wearable-details-view>
        </div>
      </app-variant-section>

      <!-- ─── 11. Report Submission Confirmation ───────────────────── -->
      <app-variant-section title="Report Submission Confirmation">
        <div class="dv-col dv-col--wide">
          <div class="dv-label">BCRB style — dark header bar (matches screenshot)</div>
          <amex-report-submission-confirmation
            variant="bcrb"
            username="ssharaf_onlshelper"
            requestId="1281"
            referenceNo="1281_REP009_220920241714"
            status="NO RESPONSE FROM BACKEND. CONTACT ADMIN"
            [isError]="true"
          ></amex-report-submission-confirmation>
        </div>
        <div class="dv-col dv-col--wide" style="margin-top:16px">
          <div class="dv-label">Generic success variant</div>
          <amex-report-submission-confirmation
            variant="default"
            title="Request Submitted Successfully"
            message="Your UAEFTS statement request has been submitted."
            requestId="REQ-2024-00892"
            referenceNo="SFE2505261345I0"
            status="CREATED"
          ></amex-report-submission-confirmation>
        </div>
      </app-variant-section>

      <!-- ─── 12. Audit Trail Summary View ────────────────────────── -->
      <app-variant-section title="Audit Trail Summary View — BTA">
        <div class="dv-col dv-col--wide">
          <div class="dv-label">No entries found (matches screenshot)</div>
          <amex-audit-trail-summary-view
            activeTab="detail"
            selectedYear="2021"
            selectedMonth="October"
            corporationName="TEST BTA 9"
            corporationAccountNo="10026800010"
            [showResults]="true"
            [noEntries]="true"
          ></amex-audit-trail-summary-view>
        </div>
        <div class="dv-col dv-col--wide" style="margin-top:16px">
          <div class="dv-label">With detail entries</div>
          <amex-audit-trail-summary-view
            activeTab="detail"
            selectedYear="2024"
            selectedMonth="March"
            corporationName="BTACLIENTBAH001"
            corporationAccountNo="3744XXXXXXX5229"
            [showResults]="true"
            [noEntries]="false"
            [detailEntries]="auditEntries"
          ></amex-audit-trail-summary-view>
        </div>
      </app-variant-section>

      <!-- ─── 13. Points Balance Summary Card ─────────────────────── -->
      <app-variant-section title="Points Balance Summary Card — Pay with Points">
        <div class="dv-col dv-col--wide">
          <div class="dv-label">Card not eligible (matches screenshot)</div>
          <amex-points-balance-summary-card
            [cards]="[{ cardNumber: '3744XXXXXXXX1001' }]"
            selectedCardNumber="3744XXXXXXXX1001"
            [balance]="null"
            errorMessage="Sorry, selected card is not eligible for the Select and Pay With Points benefit."
          ></amex-points-balance-summary-card>
        </div>
        <div class="dv-col dv-col--wide" style="margin-top:16px">
          <div class="dv-label">Card selected — points balance</div>
          <amex-points-balance-summary-card
            [cards]="[{ cardNumber: '3744XXXXXXXX5229' }, { cardNumber: '3744XXXXXXXX9008' }]"
            selectedCardNumber="3744XXXXXXXX5229"
            [balance]="125000"
            [aedEquivalent]="1250.00"
            errorMessage=""
          ></amex-points-balance-summary-card>
        </div>
      </app-variant-section>

      <!-- ─── 14. VAT Invoice Report View ─────────────────────────── -->
      <app-variant-section title="VAT Invoice Report View — Tax Invoice">
        <div class="dv-col">
          <div class="dv-label">Default — Invoice Number mode (matches screenshot)</div>
          <amex-vat-invoice-report-view
            customerType="corporate"
            searchMode="invoice"
          ></amex-vat-invoice-report-view>
        </div>
        <div class="dv-col">
          <div class="dv-label">No match error (matches screenshot)</div>
          <amex-vat-invoice-report-view
            customerType="corporate"
            searchMode="invoice"
            searchValue="9765297775"
            errorMessage="No Tax Invoice with matching details."
          ></amex-vat-invoice-report-view>
        </div>
      </app-variant-section>

      <!-- ─── 15. UAEFTS Status View ───────────────────────────────── -->
      <app-variant-section title="UAEFTS Status View — Statements">
        <div class="dv-col dv-col--fullwidth">
          <div class="dv-label">Search results (matches screenshot)</div>
          <amex-uaefts-status-view
            mode="search"
            [records]="uaeftsRecords"
          ></amex-uaefts-status-view>
        </div>
      </app-variant-section>

      <!-- ─── 16. Download User Guide Panel ────────────────────────── -->
      <app-variant-section title="Download User Guide Panel — OMS">
        <div class="dv-col" style="max-width:220px">
          <div class="dv-label">OMS login page buttons (matches screenshot)</div>
          <amex-download-user-guide-panel></amex-download-user-guide-panel>
        </div>
        <div class="dv-col" style="max-width:300px">
          <div class="dv-label">With section header and description</div>
          <amex-download-user-guide-panel
            [showSectionHeader]="true"
            sectionHeaderText="Help & Resources"
            description="Download the PDF guide or watch the video tutorial."
          ></amex-download-user-guide-panel>
        </div>
      </app-variant-section>

      <!-- ─── 17. Terms & Conditions Viewer ────────────────────────── -->
      <app-variant-section title="Terms & Conditions Viewer">
        <div class="dv-col dv-col--wide">
          <div class="dv-label">OMS Registration T&amp;C</div>
          <amex-terms-and-conditions-viewer
            title="Terms and Conditions"
            [text]="omsTermsText"
            maxHeight="160px"
            [accepted]="false"
            agreeLabel="I Agree"
            cancelLabel="Cancel"
            [showCancel]="true"
          ></amex-terms-and-conditions-viewer>
        </div>
        <div class="dv-col dv-col--wide">
          <div class="dv-label">Priority Pass Enrollment T&amp;C — bullet list (matches screenshot)</div>
          <amex-terms-and-conditions-viewer
            preamble="To complete your enrolment please confirm that:"
            [bullets]="priorityPassBullets"
            maxHeight="120px"
            [accepted]="false"
            agreeLabel="CONFIRM & ENROLL"
            [showCancel]="false"
          ></amex-terms-and-conditions-viewer>
        </div>
      </app-variant-section>

    </app-showcase-page>
  `,
  styles: [`
    .dv-col {
      flex: 1;
      min-width: 300px;
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    .dv-col--wide      { min-width: 500px; flex: 2; }
    .dv-col--fullwidth { min-width: 100%; flex: 1 0 100%; }
    .dv-label {
      font-size: 11px;
      font-weight: bold;
      color: #006fcf;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      margin-bottom: 4px;
    }
  `],
})
export class AmexDisplayViewersPageComponent {

  // ── 2. Statement Viewer ────────────────────────────────────────────
  // @Input: [statements]  (NOT [months])
  statementMonths = [
    { label: 'October 2029', isLatest: true },
    { label: 'September 2029' },
    { label: 'August 2029' },
    { label: 'July 2029' },
    { label: 'June 2029' },
    { label: 'May 2029' },
    { label: 'April 2029' },
    { label: 'March 2029' },
    { label: 'February 2029' },
    { label: 'January 2029' },
  ];

  // ── 4. Monthly Statement Viewer ───────────────────────────────────
  // @Input: [summary] as MonthlyStatementSummary  (NOT flat individual props)
  monthlySummary = {
    previousBalance: -57.852,
    newRemittance:    0,
    newCredit:        0,
    newDebits:        0,
    disputes:         0,
    totalDueBalance: -57.852,
    totalDueDate:    '25-03-2025',
  };

  availableMonths = [
    'February 2025', 'January 2025', 'December 2024',
    'November 2024', 'October 2024',
  ];

  // ── 5. Large Report Download Panel ────────────────────────────────
  // @Input: [btaNumbers] + [results]  (NOT [reports])
  btaNumbers = [
    'BTACLIENTBAH001-3744XXXXXX5229',
    'BTACLIENTUAE001-3744XXXXXX1010',
  ];

  largeReportResults = [
    {
      documentId: '561',
      reportType: 'memo',
      fileName:   'btabahrain01_MemoStatement_3744XXXX5229.pdf',
      format:     'pdf',
      status:     'Ready To Download',
    },
    {
      documentId: '562',
      reportType: 'monthly',
      fileName:   'btabahrain01_MonthlyStatement_Feb2025.pdf',
      format:     'pdf',
      status:     'Generating',
    },
  ];

  // ── 6. Offers Panel ───────────────────────────────────────────────
  sampleOffers = [
    {
      id: '1', title: 'General Offer', description: 'Bowling Maniac 1',
      category: 'All', expiryDate: '31 Dec, 2024', hasFlash: true,
      enrolled: false, isFavorite: false,
      imageUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400&auto=format&fit=crop',
    },
    {
      id: '2', title: 'Renaming Customer File With Filled Data', description: 'Correct File format',
      category: 'Travel', expiryDate: '08 Oct, 2047', hasFlash: true,
      enrolled: false, isFavorite: false,
      imageUrl: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=400&auto=format&fit=crop',
    },
    {
      id: '3', title: 'Customer View', description: 'Correct File format',
      category: 'Shopping', expiryDate: '08 Oct, 2047', hasFlash: true,
      enrolled: true, isFavorite: false,
      imageUrl: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=400&auto=format&fit=crop',
    },
    {
      id: '4', title: 'Long Offer Name With Flash And Save To Card Offerr',
      description: 'long offer name with flash and Save to Card offerr',
      category: 'Promotional Campaigns', expiryDate: '25 Dec, 2027',
      hasFlash: true, enrolled: false, isFavorite: false,
    },
    {
      id: '5', title: 'Save To Card Offer',
      description: 'Save to card promotional offer for eligible members.',
      category: 'Favorites', expiryDate: '25 Dec, 2027',
      hasFlash: true, enrolled: false, isFavorite: true,
    },
    {
      id: '6', title: 'Dining Cashback',
      description: 'Earn 10% cashback at participating restaurants.',
      category: 'Entertainment', expiryDate: '31 Mar, 2025',
      hasFlash: false, enrolled: false, isFavorite: false,
      imageUrl: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&auto=format&fit=crop',
      termsAndConditions: 'American Express reserves the right to modify / cancel this anytime.',
    },
  ];

  // ── 7. Benefits Panel ─────────────────────────────────────────────
  sampleBenefits = [
    {
      id: 'b1', title: 'Airport Lounge Access',
      description: 'Complimentary access to 1,300+ airport lounges worldwide via Priority Pass.',
      validFrom: '01 Jan 2024', validUntil: '31 Dec 2024', category: 'Travel',
    },
    {
      id: 'b2', title: 'Travel Insurance',
      description: 'Comprehensive travel accident insurance up to USD 500,000 when you charge your tickets to your Card.',
      validFrom: '01 Jan 2024', validUntil: '31 Dec 2024', category: 'Travel',
    },
    {
      id: 'b3', title: 'Dining Privileges',
      description: 'Exclusive discounts and special menus at over 200 fine dining restaurants across the UAE.',
      validFrom: '01 Jan 2024', validUntil: '31 Dec 2024', category: 'Dining',
    },
    {
      id: 'b4', title: 'Hotel Collection',
      description: 'Complimentary room upgrade and late check-out at The Hotel Collection properties when you book through Amex Travel.',
      validFrom: '01 Jan 2024', validUntil: '31 Dec 2024', category: 'Hotels',
    },
  ];

  // ── 8. Priority Pass ──────────────────────────────────────────────
  priorityPassCards = [
    {
      cardNumber: '3702XXXXXXXX3002',
      cardType:   'The American Express® Corporate Card',
      variant:    'BULLET P',
      enrolled:   false,
      entitlements: [
        'Eight complimentary visits per annum to Priority Pass lounges',
        'For any incremental usage and for guest visits a charge of USD 35 per visit will be applied',
      ],
    },
    {
      cardNumber: '3702XXXXXXXX4011',
      cardType:   'The American Express® Corporate Card',
      variant:    'BULLET P',
      enrolled:   false,
      entitlements: [
        'Eight complimentary visits per annum to Priority Pass lounges',
        'For any incremental usage and for guest visits a charge of USD 35 per visit will be applied',
      ],
    },
  ];

  // ── 9. Centurion Card Details View ────────────────────────────────
  // @Input: [details] as CenturionCardDetails
  // CenturionHighlight shape: { text: string; highlighted?: string[] }
  centurionCardDetails = {
    clientId:             '20510409',
    name:                 'BAHONE',
    cardNumber:           '3744XXXXXXXX9008',
    cardType:             'Centurion Local Currency',
    status:               'Active',
    issuanceState:        'Issued',
    premiumizationStatus: 'Completed',
    highlights: [
      {
        text: 'You are invited to change your Centurion Card billing currency from US$ to Bahraini Dinar while all the Centurion benefits you are accustomed to remain as is.',
        highlighted: ['Bahraini Dinar'],
      },
      {
        text: 'Your Card statement will be billed in Bahraini Dinar and your monthly Card settlement (payment) will be done in Bahraini Dinar.',
        highlighted: ['Bahraini Dinar'],
      },
      {
        text: 'You will not be charged Conversion Processing Fee for transactions done in Bahraini Dinar, while the respective fee will apply on Non-Billing currency transactions (including USD).',
        highlighted: ['Bahraini Dinar'],
      },
      {
        text: 'You will be issued new Centurion Cards (primary & supplementary Card(s)) in Bahraini Dinar and your existing Centurion Card will continue to be active until your new Cards are delivered and activated.',
        highlighted: ['Bahraini Dinar'],
      },
      {
        text: 'You will continue to earn double MR points when you spend locally.',
      },
    ],
  };

  // ── 10. Wearable Details View ─────────────────────────────────────
  wearableDevice = {
    clientCode:  '20510409',
    deviceType:  'Ring',
    status:      'Issued',
    issueDate:   '15 Mar 2024',
    cardLinked:  '3744XXXXXXXX9008',
    serialNo:    'WR-20510409-001',
  };

  // ── 12. Audit Trail ───────────────────────────────────────────────
  auditEntries = [
    {
      date: '01-03-2024', time: '09:14:22', user: 'admin_bta01',
      action: 'LOGIN', entity: 'User', oldValue: '', newValue: '',
    },
    {
      date: '01-03-2024', time: '09:18:05', user: 'admin_bta01',
      action: 'UPDATE_USER', entity: 'test44332244',
      oldValue: 'Active', newValue: 'Cancelled',
    },
    {
      date: '02-03-2024', time: '11:00:33', user: 'admin_bta01',
      action: 'DOWNLOAD_REPORT', entity: 'MemoStatement',
      oldValue: '', newValue: 'PDF',
    },
  ];

  // ── 15. UAEFTS Status View ────────────────────────────────────────
  uaeftsRecords = [
    {
      referenceNo:  'SFE2505261345I0',
      customerName: 'DRE RICK',
      idType:       'EI',
      idNumber:     '784199900001200',
      iban:         'AE07033123456789O123456',
      period:        3,
      consentDate:  '24-May-25',
      status:       'CREATED' as const,
      createdBy:    'uaeftsuser4',
      createdDate:  '26-May-25 13:41:48',
      verifiedBy:   '-',
      verifiedDate: '-',
    },
    {
      referenceNo:  'SFE2505261234A1',
      customerName: 'AHMED MANSOURI',
      idType:       'IBAN',
      idNumber:     'AE07033123456789O999',
      iban:         'AE07033123456789O999',
      period:        6,
      consentDate:  '20-May-25',
      status:       'PDF_GENERATED' as const,
      createdBy:    'uaeftsuser4',
      createdDate:  '20-May-25 10:00:00',
      verifiedBy:   'uaeftsuser5',
      verifiedDate: '20-May-25 11:15:00',
    },
  ];

  // ── 17. Terms & Conditions ────────────────────────────────────────
  omsTermsText = `These Terms and Conditions govern your use of the American Express Online Merchant Services (OMS) Portal. By accessing or using the portal, you agree to be bound by these terms.

1. Account Responsibility
You are responsible for maintaining the confidentiality of your User ID and password. Any activity performed under your credentials is your sole responsibility.

2. Permitted Use
The portal may only be used for legitimate business purposes related to your merchant account.

3. Data Accuracy
You must ensure that all information submitted is accurate and up to date. American Express reserves the right to suspend access if inaccurate data is detected.

By clicking "I Agree" you confirm that you have read and agree to these Terms and Conditions.`;

  priorityPassBullets = [
    'You accept the charges levied by Priority Pass if your Priority Pass lounge usage is more than the complimentary allowance on your Card.',
    'You accept the Terms & Conditions of Priority Pass and of the American Express Lounge Benefit.',
    'If a customer asks about the terms, they should be redirected to the terms online.',
  ];
}
