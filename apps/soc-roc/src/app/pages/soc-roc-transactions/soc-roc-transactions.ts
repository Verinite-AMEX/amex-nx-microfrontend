import { Component } from '@angular/core';
import {
  AmexSOCROCRecordsTableComponent,
  AmexSOCROCEntryFormComponent,
  SOCROCRow
} from '@vn-core-ui-components/ui';

@Component({
  selector: 'app-soc-roc-transactions',
  standalone: true,
  imports: [AmexSOCROCRecordsTableComponent, AmexSOCROCEntryFormComponent],
  template: `
    <amex-socroc-entry-form
      [showSOC]="true"
      [showROC]="true"
      [rejectionCodes]="rejectionCodes"
      (socAction)="onSocAction($event)"
      (rocAction)="onRocAction($event)">
    </amex-socroc-entry-form>

    <amex-socroc-records-table
      [rows]="records"
      sectionLabel="SOC's & ROC's"
      [showExport]="true"
      (actionClick)="onActionClick($event)"
      (exportClick)="onExport()"
      (printClick)="onPrint()">
    </amex-socroc-records-table>
  `
})
export class SocRocTransactions {
  rejectionCodes: string[] = [
    '001 - Invalid Card Number',
    '002 - Duplicate Transaction',
    '003 - Expired Card',
    '004 - Insufficient Funds',
    '005 - Invalid Merchant'
  ];

  // Interface: { seNo, socRefNo, totalAmount, noOfCharges, cardAccountNo, approvalCode }
  records: SOCROCRow[] = [];

  onSocAction(event: { action: string; soc: any }): void {
    // TODO: Replace with SocRocService API call
    console.log('SOC action:', event);
  }

  onRocAction(event: { action: string; roc: any }): void {
    // TODO: Replace with SocRocService API call
    console.log('ROC action:', event);
  }

  onActionClick(event: { action: string; row: SOCROCRow }): void {
    console.log('Row action:', event);
  }

  onExport(): void {}

  onPrint(): void {
    window.print();
  }
}