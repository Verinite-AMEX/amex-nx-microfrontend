import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  AmexSortableFilterableTableComponent,
  AmexTableColumn
} from '@ui-components/ui';

@Component({
  selector: 'app-rejection-letter',
  standalone: true,
  imports: [
    CommonModule,
    AmexSortableFilterableTableComponent
  ],
  templateUrl: './rejection-letter.html',
  styleUrl: './rejection-letter.css'
})
export class RejectionLetter {
  showTable = false;

  columns: AmexTableColumn[] = [
    { key: 'seNo',             label: 'SE No.' },
    { key: 'rejectionReason',  label: 'Rejection Reason' },
    { key: 'date',             label: 'Date' },
    { key: 'amount',           label: 'Amount' },
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