import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  AmexSortableFilterableTableComponent,
  AmexTableColumn
} from '@ui-components/ui';

@Component({
  selector: 'app-rejection-letter-details',
  standalone: true,
  imports: [
    CommonModule,
    AmexSortableFilterableTableComponent
  ],
  templateUrl: './rejection-letter-details.html',
  styleUrl: './rejection-letter-details.css'
})
export class RejectionLetterDetails {
  showTable = false;

  columns: AmexTableColumn[] = [
    { key: 'socRefNo',        label: 'SOC Ref No.' },
    { key: 'rocRefNo',        label: 'ROC Ref No.' },
    { key: 'salesEntity',     label: 'Sales Entity' },
    { key: 'cardNumber',      label: 'Card Number' },
    { key: 'approvalCode',    label: 'Approval Code' },
    { key: 'amount',          label: 'Amount' },
    { key: 'currency',        label: 'Currency' },
    { key: 'rejectionCode',   label: 'Rejection Code' },
    { key: 'rejectionReason', label: 'Rejection Reason' },
  ];

  records: Record<string, any>[] = [];

  onSearch(): void {
    // TODO: Replace with ReportService API call
    this.records = [];
    this.showTable = true;
  }

  onPrint(): void { window.print(); }
  onExport(): void { /* TODO: export logic */ }

  onSortChange(event: { key: string; dir: any }): void {
    console.log('Sort:', event);
  }
}