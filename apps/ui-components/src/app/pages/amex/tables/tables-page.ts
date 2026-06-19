import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShowcasePageComponent } from '../../showcase-page';
import { VariantSectionComponent } from '../../variant-section';
import {
  AmexBCRBReportsTableComponent, BCRBReportRow,
  AmexSortableFilterableTableComponent,
  AmexPaginatedTableComponent,
  AmexUserManagementTableComponent, AmexUserRow,
  AmexSOCROCRecordsTableComponent, SOCROCRow,
  AmexEligibleTransactionsTableComponent, EligibleTransaction,
  AmexCardListSelectorComponent, AmexCardRow,
  AmexWearableDeviceTableComponent, WearableDeviceRow,
  AmexAuditTrailDetailTableComponent, AuditTrailRow,
  AmexMasterDataTableComponent, MasterDataRow,
  AmexRejectionReportTableComponent, RejectionReportRow,
  AmexFileResponseStatusTableComponent, FileResponseRow,
  AmexSettlementSubmissionsTableComponent, SettlementRow,
  AmexSubUserAdminTableComponent, SubUserRow,
  AmexCardMemberDetailsViewComponent, CardMemberDetails,
  AmexEmptyStateMessageComponent,
  AmexCaseManagementListComponent, CaseManagementRow,
  AmexTMCTransactionsTableComponent, TMCTransactionRow,
  AmexPaymentRegisterTableComponent, PaymentRegisterRow,
  AmexRequestApprovalQueueComponent, ApprovalRequestRow,
  AmexPointsHistoryTableComponent, PointsHistoryRow,
  AmexTableWithRowActionsComponent,
} from '@vn-core-ui-components/ui';

@Component({
  selector: 'app-amex-tables-page',
  standalone: true,
  imports: [
    CommonModule,
    ShowcasePageComponent, VariantSectionComponent,
    AmexBCRBReportsTableComponent,
    AmexSortableFilterableTableComponent,
    AmexPaginatedTableComponent,
    AmexUserManagementTableComponent,
    AmexSOCROCRecordsTableComponent,
    AmexEligibleTransactionsTableComponent,
    AmexCardListSelectorComponent,
    AmexWearableDeviceTableComponent,
    AmexAuditTrailDetailTableComponent,
    AmexMasterDataTableComponent,
    AmexRejectionReportTableComponent,
    AmexFileResponseStatusTableComponent,
    AmexSettlementSubmissionsTableComponent,
    AmexSubUserAdminTableComponent,
    AmexCardMemberDetailsViewComponent,
    AmexEmptyStateMessageComponent,
    AmexCaseManagementListComponent,
    AmexTMCTransactionsTableComponent,
    AmexPaymentRegisterTableComponent,
    AmexRequestApprovalQueueComponent,
    AmexPointsHistoryTableComponent,
    AmexTableWithRowActionsComponent,
  ],
  template: `
    <app-showcase-page
      title="AMEX Data Tables"
      description="22 table components — exact AEME portal designs from BCRB, OMS, SOC/ROC, BTA, Wearables, Pay-with-Points portals.">

      <app-variant-section title="1 · BCRBReportsTable — indigo header, filter, pagination">
        <div class="fw">
          <p class="vl">Empty state</p>
          <amex-bcrb-reports-table [rows]="[]" username="ssharaf_onlshelper"></amex-bcrb-reports-table>
          <p class="vl mt">With data — red error status</p>
          <amex-bcrb-reports-table [rows]="bcrbRows" username="ssharaf_onlshelper"></amex-bcrb-reports-table>
        </div>
      </app-variant-section>

      <app-variant-section title="2 · SortableFilterableTable — OMS blue header, sort + filter">
        <div class="fw">
          <amex-sortable-filterable-table [columns]="sortCols" [rows]="sortRows"></amex-sortable-filterable-table>
        </div>
      </app-variant-section>

      <app-variant-section title="3 · PaginatedTable — generic with |&lt; &lt; &gt; &gt;| pagination">
        <div class="fw">
          <amex-paginated-table [columns]="sortCols" [rows]="sortRows" [pageSize]="3"></amex-paginated-table>
        </div>
      </app-variant-section>

      <app-variant-section title="4 · UserManagementTable — OMS MRM (sort, filter, Reset/Edit/Delete)">
        <div class="fw">
          <amex-user-management-table [rows]="userRows" title="MRM USER ADMINISTRATION" [showDelete]="true"></amex-user-management-table>
        </div>
      </app-variant-section>

      <app-variant-section title="5 · SOCROCRecordsTable — ONLS bordered (Modify/Delete/Print SOC)">
        <div class="fw">
          <p class="vl">With data</p>
          <amex-socroc-records-table [rows]="socrocRows" sectionLabel="SOC's"></amex-socroc-records-table>
          <p class="vl mt">Empty — "No Data Found"</p>
          <amex-socroc-records-table [rows]="[]"></amex-socroc-records-table>
        </div>
      </app-variant-section>

      <app-variant-section title="6 · EligibleTransactionsTable — SELECT &amp; PAY WITH POINTS tabs">
        <div class="fw">
          <p class="vl">Error state (card not eligible)</p>
          <amex-eligible-transactions-table
            [cards]="eligibleCards" [eligibleRows]="[]" [historyRows]="[]"
            errorMessage="ERROR: Sorry, selected card is not eligible for the Select and Pay With Points benefit.">
          </amex-eligible-transactions-table>
          <p class="vl mt">With eligible transactions</p>
          <amex-eligible-transactions-table
            [cards]="eligibleCards" [eligibleRows]="eligibleTxnRows" [historyRows]="[]"
            pointsBalance="12,450" aedValue="124.50">
          </amex-eligible-transactions-table>
        </div>
      </app-variant-section>

      <app-variant-section title="7 · CardListSelector — Centurion LCY / Wearables (client search + radio)">
        <div class="fw">
          <amex-card-list-selector [rows]="cardRows" memberName="BAHONE" memberCardNumber="3744XXXXXXX9008"></amex-card-list-selector>
        </div>
      </app-variant-section>

      <app-variant-section title="8 · WearableDeviceTable — Bracelet/Band/Ring icon tabs">
        <div class="fw">
          <amex-wearable-device-table [rows]="wearableRows"></amex-wearable-device-table>
        </div>
      </app-variant-section>

      <app-variant-section title="9 · AuditTrailDetailTable — BTA (Detailed/Summary tabs, download)">
        <div class="fw">
          <p class="vl">With data</p>
          <amex-audit-trail-detail-table [rows]="auditRows" [loaded]="true"></amex-audit-trail-detail-table>
          <p class="vl mt">No records state</p>
          <amex-audit-trail-detail-table [rows]="[]" [loaded]="true"></amex-audit-trail-detail-table>
        </div>
      </app-variant-section>

      <app-variant-section title="10 · MasterDataTable — SOC/ROC Country / Currency master (radio, Add New)">
        <div class="two-col">
          <div>
            <p class="vl">Country Master</p>
            <amex-master-data-table [rows]="countryRows" nameLabel="Country Name" codeLabel="Country Code"></amex-master-data-table>
          </div>
          <div>
            <p class="vl">Currency Master</p>
            <amex-master-data-table [rows]="currencyRows" nameLabel="Currency Name" codeLabel="Currency Code"></amex-master-data-table>
          </div>
        </div>
      </app-variant-section>

      <app-variant-section title="11 · RejectionReportTable — SOC/ROC rejected items (Export, Print)">
        <div class="fw">
          <amex-rejection-report-table [rows]="rejectionRows"></amex-rejection-report-table>
        </div>
      </app-variant-section>

      <app-variant-section title="12 · FileResponseStatusTable — BCRB/UAEFTS batch status (status badges)">
        <div class="fw">
          <amex-file-response-status-table title="AECB File Response Status" [rows]="fileResponseRows"></amex-file-response-status-table>
        </div>
      </app-variant-section>

      <app-variant-section title="13 · SettlementSubmissionsTable — OMS months filter + grid">
        <div class="fw">
          <amex-settlement-submissions-table [rows]="settlementRows"></amex-settlement-submissions-table>
        </div>
      </app-variant-section>

      <app-variant-section title="14 · SubUserAdminTable — OMS sub-users (Edit, Delete)">
        <div class="fw">
          <amex-sub-user-admin-table [rows]="subUserRows" [showCreate]="true"></amex-sub-user-admin-table>
        </div>
      </app-variant-section>

      <app-variant-section title="15 · CardMemberDetailsView — Online Account Services / Supp Access">
        <div class="two-col">
          <div>
            <p class="vl">With Offers &amp; Benefits links</p>
            <amex-card-member-details-view [details]="cardMemberDetails"></amex-card-member-details-view>
          </div>
          <div>
            <p class="vl">Empty state</p>
            <amex-card-member-details-view [details]="null"></amex-card-member-details-view>
          </div>
        </div>
      </app-variant-section>

      <app-variant-section title="16 · EmptyStateMessage — all portals">
        <div class="two-col">
          <div>
            <p class="vl">BCRB/ONLS — bold centred</p>
            <amex-empty-state-message message="No Data Found" variant="default"></amex-empty-state-message>
          </div>
          <div>
            <p class="vl">OMS — green info box</p>
            <amex-empty-state-message message="No merchants are available." variant="oms"></amex-empty-state-message>
          </div>
        </div>
        <div style="margin-top:12px">
          <p class="vl">With icon + CTA button</p>
          <amex-empty-state-message message="No eligible cards found." icon="💳" ctaLabel="Search Again" variant="default"></amex-empty-state-message>
        </div>
      </app-variant-section>

      <app-variant-section title="17 · CaseManagementList — BTA Travel Agent (View, Comment)">
        <div class="fw">
          <amex-case-management-list [rows]="caseRows"></amex-case-management-list>
        </div>
      </app-variant-section>

      <app-variant-section title="18 · TMCTransactionsTable — BTA Travel Agent (Index dropdown)">
        <div class="fw">
          <amex-tmc-transactions-table [rows]="tmcRows" [indexOptions]="tmcIndexOptions"></amex-tmc-transactions-table>
        </div>
      </app-variant-section>

      <app-variant-section title="19 · PaymentRegisterTable — SOC/ROC ledger (Print button)">
        <div class="fw">
          <amex-payment-register-table [rows]="paymentRegRows"></amex-payment-register-table>
        </div>
      </app-variant-section>

      <app-variant-section title="20 · RequestApprovalQueue — UAEFTS Checker (Accept, Reject)">
        <div class="fw">
          <amex-request-approval-queue title="UAEFTS Approval Queue" [rows]="approvalRows"></amex-request-approval-queue>
        </div>
      </app-variant-section>

      <app-variant-section title="21 · PointsHistoryTable — Pay with Points (History tab)">
        <div class="fw">
          <p class="vl">Empty — no redemptions yet</p>
          <amex-points-history-table [rows]="[]"></amex-points-history-table>
          <p class="vl mt">With redemption history</p>
          <amex-points-history-table [rows]="pointsHistoryRows" totalCredit="AED 250.00" totalPointsRedeemed="25,000"></amex-points-history-table>
        </div>
      </app-variant-section>

      <app-variant-section title="22 · TableWithRowActions — SOC/ROC / OMS / BTA / BCRB (Modify, Delete, Print, Reset, View)">
        <div class="fw">
          <p class="vl">SOC/ROC — Modify / Delete / Print SOC (with PDF | Export | Back bar)</p>
          <amex-table-with-row-actions
            sectionTitle="SOC &amp; ROC Records"
            [showTopBar]="true" [showPdf]="true" [showPrint]="true" [showExport]="true" [showBack]="true"
            [columns]="rowActionCols"
            [rows]="rowActionRows"
            [actions]="socrocActions">
          </amex-table-with-row-actions>

          <p class="vl mt">OMS — Reset Password / Edit</p>
          <amex-table-with-row-actions
            sectionTitle="OMS User Administration"
            [columns]="omsUserCols"
            [rows]="omsUserRows"
            [actions]="omsUserActions">
          </amex-table-with-row-actions>

          <p class="vl mt">Empty — No Data Found</p>
          <amex-table-with-row-actions
            sectionTitle="Records"
            [showTopBar]="true" [showPdf]="true" [showPrint]="true" [showExport]="true" [showBack]="true"
            [columns]="rowActionCols"
            [rows]="[]"
            [actions]="socrocActions">
          </amex-table-with-row-actions>
        </div>
      </app-variant-section>

    </app-showcase-page>
  `,
  styles: [`
    .fw { width: 100%; }
    .two-col { display: flex; gap: 24px; width: 100%; flex-wrap: wrap; }
    .two-col > div { flex: 1; min-width: 280px; }
    .vl { font-size: 11px; color: #888; font-style: italic; margin: 0 0 5px; }
    .mt { margin-top: 14px; }
  `],
})
export class AmexTablesPageComponent {

  bcrbRows: BCRBReportRow[] = [
    { serialNo: 1, processId: '1281', fileName: '1281_REP009_220920241714', reportCreationTime: '22-09-2024 05:14', processingStatus: 'NO RESPONSE FROM BACKEND. CONTACT ADMIN' },
    { serialNo: 2, processId: '1305', fileName: '1305_REP007_230920241022', reportCreationTime: '23-09-2024 10:22', processingStatus: 'Completed' },
    { serialNo: 3, processId: '1310', fileName: '1310_REP005_240920241300', reportCreationTime: '24-09-2024 13:00', processingStatus: 'Processing' },
  ];

  sortCols = [
    { key: 'userId', label: 'User ID' }, { key: 'userName', label: 'User Name' },
    { key: 'email', label: 'Email Address' }, { key: 'status', label: 'Status' },
  ];
  sortRows = [
    { userId: 'mrmadmin', userName: 'Essa', email: 'essa.memon@americanexpress.com.bh', status: 'Inactive' },
    { userId: 'wasimtest123', userName: 'wasimtest123', email: 'wasim.sayyed@americanexpress.com.bh', status: 'Active' },
    { userId: 'mrmadmintest4', userName: 'mrmadminketaki', email: 'ketaki_pore@yahoo.com', status: 'Active' },
    { userId: 'ketakimrm12', userName: 'Ketaki', email: 'ketaki.pore222@gmail.com', status: 'Active' },
    { userId: 'testuser01', userName: 'Test User', email: 'test@amex.com', status: 'Inactive' },
  ];

  userRows: AmexUserRow[] = [
    { userId: 'mrmadmin', userName: 'Essa', emailAddress: 'essa.memon@americanexpress.com.bh', creationDate: '09/09/2021', status: 'Inactive' },
    { userId: 'wasimtest123', userName: 'wasimtest123', emailAddress: 'wasim.sayyed@americanexpress.com.bh', creationDate: '05/05/2024', status: 'Active' },
    { userId: 'mrmadmintest4', userName: 'mrmadminketaki', emailAddress: 'ketaki_pore@yahoo.com', creationDate: '09/09/2021', status: 'Active' },
    { userId: 'ketakimrm12', userName: 'Ketaki', emailAddress: 'ketaki.pore222@gmail.com', creationDate: '08/09/2021', status: 'Active' },
  ];

  socrocRows: SOCROCRow[] = [
    { seNo: 'SE001', socRefNo: 'SOC-2024-001', totalAmount: '5,250.00', noOfCharges: '3', cardAccountNo: '3791XXXXXX7018', approvalCode: 'A12345' },
    { seNo: 'SE002', socRefNo: 'SOC-2024-002', totalAmount: '1,800.00', noOfCharges: '1', cardAccountNo: '3791XXXXXX8024', approvalCode: 'B67890' },
  ];

  eligibleCards = [
    { value: '3791XXXXXX7018', label: '3791XXXXXX7018 - The American Express Gold Credit Card' },
    { value: '3791XXXXXX8024', label: '3791XXXXXX8024 - The American Express Platinum Card' },
  ];
  eligibleTxnRows: EligibleTransaction[] = [
    { id: '1', transactionDate: '01/09/2024', description: 'NOON PAYMENTS', amount: 'AED 500.00', pointsValue: '5,000' },
    { id: '2', transactionDate: '05/09/2024', description: 'AMAZON AE', amount: 'AED 250.00', pointsValue: '2,500' },
    { id: '3', transactionDate: '10/09/2024', description: 'CARREFOUR UAE', amount: 'AED 180.00', pointsValue: '1,800' },
  ];

  cardRows: AmexCardRow[] = [
    { cardNumber: '3744XXXXXXX9008', cardType: 'Centurion USD', status: 'Active' },
    { cardNumber: '3744XXXXXXX1023', cardType: 'Centurion LCY', status: 'Active' },
    { cardNumber: '3744XXXXXXX5042', cardType: 'Supplementary', status: 'Inactive' },
  ];

  wearableRows: WearableDeviceRow[] = [
    { deviceType: 'Bracelet', status: 'Issued', cardLinked: '3791XXXXXX7018', issueDate: '01/08/2024' },
    { deviceType: 'Band', status: 'Active', cardLinked: '3791XXXXXX8024', issueDate: '15/07/2024' },
    { deviceType: 'Ring', status: 'Inactive', cardLinked: '', issueDate: '' },
  ];

  auditRows: AuditTrailRow[] = [
    { date: '01/09/2024', time: '09:14', user: 'admin_bta', action: 'User Created', entity: 'User', oldValue: '', newValue: 'wasimtest123' },
    { date: '05/09/2024', time: '11:32', user: 'admin_bta', action: 'Password Reset', entity: 'User', oldValue: 'Old Password', newValue: 'Temp Password' },
  ];

  countryRows: MasterDataRow[] = [
    { code: '784', name: 'UNITED ARAB EMIRATES' },
    { code: '048', name: 'BAHRAIN' },
    { code: '414', name: 'KUWAIT' },
    { code: '512', name: 'OMAN' },
  ];
  currencyRows: MasterDataRow[] = [
    { code: '001', name: 'US DOLLAR' },
    { code: '002', name: 'UAE DIRHAM' },
    { code: '003', name: 'BAHRAINI DINAR' },
  ];

  rejectionRows: RejectionReportRow[] = [
    { seNo: 'SE001', rejectionReason: 'Invalid Card Number', date: '22/09/2024', amount: '1,200.00' },
    { seNo: 'SE004', rejectionReason: 'Duplicate Reference', date: '23/09/2024', amount: '850.00' },
  ];

  fileResponseRows: FileResponseRow[] = [
    { submissionDate: '22/09/2024', fileName: '1281_REP009_220920241714.csv', status: 'Completed', canView: true, canDownload: true },
    { submissionDate: '23/09/2024', fileName: '1305_REP007_230920241022.csv', status: 'Processing', canView: false, canDownload: false },
    { submissionDate: '24/09/2024', fileName: '1310_REP005_240920241300.csv', status: 'Pending', canView: false, canDownload: false },
    { submissionDate: '20/09/2024', fileName: '1290_REP003_200920241115.csv', status: 'Failed', canView: true, canDownload: false },
  ];

  settlementRows: SettlementRow[] = [
    { period: 'Sep 2024', merchantAccount: '9275640241', settlementAmount: 'AED 12,450.00', submissionsCount: '8', status: 'Completed' },
    { period: 'Aug 2024', merchantAccount: '9275640241', settlementAmount: 'AED 9,820.00', submissionsCount: '6', status: 'Completed' },
    { period: 'Jul 2024', merchantAccount: '9275640241', settlementAmount: 'AED 14,100.00', submissionsCount: '10', status: 'Pending' },
  ];

  subUserRows: SubUserRow[] = [
    { name: 'Ahmed Al Mansouri', email: 'ahmed@merchant.ae', role: 'Sub User', status: 'Active' },
    { name: 'Sara Khalid', email: 'sara@merchant.ae', role: 'VAT User', status: 'Active' },
    { name: 'Omar Hassan', email: 'omar@merchant.ae', role: 'Sub User', status: 'Inactive' },
  ];

  cardMemberDetails: CardMemberDetails = {
    name: 'AHMED AL MANSOURI', userId: 'ahmed_supp01',
    cardNumber: '3791XXXXXX7018', status: 'Active',
    accountType: 'Supplementary', hasOffers: true, hasBenefits: true,
  };

  caseRows: CaseManagementRow[] = [
    { caseId: 'CASE-2024-001', subject: 'Lost Card Request', status: 'Open', assignee: 'Agent A', createdDate: '01/09/2024' },
    { caseId: 'CASE-2024-002', subject: 'Statement Dispute', status: 'Pending', assignee: 'Agent B', createdDate: '05/09/2024' },
    { caseId: 'CASE-2024-003', subject: 'Address Update', status: 'Closed', assignee: 'Agent A', createdDate: '08/09/2024' },
  ];

  tmcRows: TMCTransactionRow[] = [
    { date: '01/09/2024', amount: 'AED 1,200.00', merchant: 'Emirates Airlines', reference: 'EK-2024-001' },
    { date: '05/09/2024', amount: 'AED 450.00', merchant: 'Marriott Hotel Dubai', reference: 'MH-2024-045' },
  ];
  tmcIndexOptions = [
    { value: '1', label: 'Index 1 - UAE' },
    { value: '2', label: 'Index 2 - Bahrain' },
  ];

  paymentRegRows: PaymentRegisterRow[] = [
    { date: '22/09/2024', location: 'Dubai HQ', currency: 'AED', amount: '5,250.00', reference: 'PAY-2024-001' },
    { date: '23/09/2024', location: 'Abu Dhabi', currency: 'AED', amount: '1,800.00', reference: 'PAY-2024-002' },
  ];

  approvalRows: ApprovalRequestRow[] = [
    { requestId: 'REQ-001', referenceNo: 'UAEFTS-2024-001', customerName: 'Ahmed Al Mansouri', emiratesId: '784-1985-1234567-8', status: 'Pending' },
    { requestId: 'REQ-002', referenceNo: 'UAEFTS-2024-002', customerName: 'Sara Khalid', emiratesId: '784-1990-7654321-2', status: 'Pending' },
    { requestId: 'REQ-003', referenceNo: 'UAEFTS-2024-003', customerName: 'Omar Hassan', emiratesId: '784-1988-1122334-5', status: 'Approved' },
  ];

  pointsHistoryRows: PointsHistoryRow[] = [
    { transactionDate: '01/08/2024', description: 'NOON PAYMENTS', pointsRedeemed: '5,000', amountOffset: 'AED 50.00', redemptionDate: '03/08/2024' },
    { transactionDate: '15/08/2024', description: 'AMAZON AE', pointsRedeemed: '20,000', amountOffset: 'AED 200.00', redemptionDate: '17/08/2024' },
  ];

  // TableWithRowActions data
  rowActionCols = [
    { key: 'seNo',          label: 'SE Number' },
    { key: 'socRefNo',      label: 'SOC Ref No.' },
    { key: 'totalAmount',   label: 'Grand Total' },
    { key: 'noOfCharges',   label: 'No. of Charges' },
    { key: 'cardAccountNo', label: 'Card Account No.' },
  ];
  rowActionRows = [
    { seNo: '12345001', socRefNo: 'SOC-00123', totalAmount: '1,250.00', noOfCharges: '5', cardAccountNo: '3714-XXXXXX-12345' },
    { seNo: '12345002', socRefNo: 'SOC-00124', totalAmount: '2,800.00', noOfCharges: '8', cardAccountNo: '3714-XXXXXX-12346' },
    { seNo: '12345003', socRefNo: 'SOC-00125', totalAmount: '430.00',   noOfCharges: '2', cardAccountNo: '3714-XXXXXX-12347' },
  ];
  socrocActions = [
    { label: 'Modify',    action: 'modify',  variant: 'primary' as const },
    { label: 'Delete',    action: 'delete',  variant: 'danger'  as const },
    { label: 'Print SOC', action: 'print',   variant: 'primary' as const },
  ];

  omsUserCols = [
    { key: 'userId',   label: 'User ID' },
    { key: 'userName', label: 'User Name' },
    { key: 'merchant', label: 'Merchant Number' },
    { key: 'email',    label: 'Email Address' },
    { key: 'status',   label: 'Status' },
  ];
  omsUserRows = [
    { userId: 'vpaytest1', userName: 'Test User 1', merchant: '9275640241', email: 'test1@amex.com.bh', status: 'Active' },
    { userId: 'vpaytest2', userName: 'Test User 2', merchant: '9275640242', email: 'test2@amex.com.bh', status: 'Inactive' },
  ];
  omsUserActions = [
    { label: 'Reset Password', action: 'reset-password', variant: 'primary' as const },
    { label: 'Edit',           action: 'edit',           variant: 'primary' as const },
  ];
}
