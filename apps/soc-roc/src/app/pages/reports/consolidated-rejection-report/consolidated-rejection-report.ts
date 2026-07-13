import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  AmexSortableFilterableTableComponent,
  AmexTableColumn
} from '@ui-components/ui';

@Component({
  selector: 'app-consolidated-rejection-report',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    AmexSortableFilterableTableComponent
  ],
  templateUrl: './consolidated-rejection-report.html',
  styleUrl: './consolidated-rejection-report.css'
})
export class ConsolidatedRejectionReport {
  showTable = false;
  fromDate: string = '';
  toDate: string = '';
  status: 'idle' | 'success' | 'error' = 'idle';
  statusMessage: string = '';
  columns: AmexTableColumn[] = [
    { key: 'julianDay',       label: 'Julian Day' },
    { key: 'socRefNo',        label: 'SOC Ref No.' },
    { key: 'rocRefNo',        label: 'ROC Ref No.' },
    { key: 'salesEntity',     label: 'Sales Entity' },
    { key: 'cardNumber',      label: 'Card Number' },
    { key: 'amount',          label: 'Amount' },
    { key: 'currency',        label: 'Currency' },
    { key: 'rejectionCode',   label: 'Rejection Code' },
    { key: 'rejectionReason', label: 'Rejection Reason' },
  ];
  records: Record<string, any>[] = [];
  onSearch(): void {
    if (!this.fromDate || !this.toDate) {
      this.status = 'error';
      this.statusMessage = 'From Date and To Date are required.';
      this.showTable = false;
      return;
    }
    this.statusMessage = '';
    this.status = 'idle';
    this.records = [];
    this.showTable = true;
  }
  onPrint(): void { window.print(); }
  onExport(): void { /* TODO: export logic */ }
  onSortChange(event: { key: string; dir: any }): void {
    console.log('Sort:', event);
  }
}