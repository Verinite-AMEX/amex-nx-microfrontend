import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  AmexSortableFilterableTableComponent,
  AmexTableColumn
} from '@ui-components/ui';

@Component({
  selector: 'app-details-by-currency',
  standalone: true,
  imports: [
    CommonModule,
    AmexSortableFilterableTableComponent
  ],
  templateUrl: './details-by-currency.html',
  styleUrl: './details-by-currency.css'
})
export class DetailsByCurrency {
  showTable = false;

  columns: AmexTableColumn[] = [
    { key: 'currency',     label: 'Currency' },
    { key: 'totalCharges', label: 'Total Charges' },
    { key: 'numCharges',   label: 'No. of Charges' },
    { key: 'totalRefunds', label: 'Total Refunds' },
    { key: 'numRefunds',   label: 'No. of Refunds' },
    { key: 'netAmount',    label: 'Net Amount' },
  ];

  records: Record<string, any>[] = [];

  onSearch(): void {
    this.records = [];
    this.showTable = true;
  }

  onPrint(): void { window.print(); }
  onExport(): void { /* TODO: export logic */ }

  onSortChange(event: { key: string; dir: any }): void {
    console.log('Sort:', event);
  }
}