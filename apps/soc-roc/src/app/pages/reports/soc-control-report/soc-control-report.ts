import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  AmexSortableFilterableTableComponent,
  AmexTableColumn
} from '@vn-core-ui-components/ui';

@Component({
  selector: 'app-soc-control-report',
  standalone: true,
  imports: [
    CommonModule,
    AmexSortableFilterableTableComponent
  ],
  templateUrl: './soc-control-report.html',
  styleUrl: './soc-control-report.css'
})
export class SocControlReport {
  showTable = false;

  columns: AmexTableColumn[] = [
    { key: 'socRefNo',     label: 'SOC Ref. No.' },
    { key: 'salesEntity',  label: 'Sales Entity' },
    { key: 'julianDay',    label: 'Julian Day' },
    { key: 'totalCharges', label: 'Total Charges' },
    { key: 'numCharges',   label: 'No. of Charges' },
    { key: 'totalRefunds', label: 'Total Refunds' },
    { key: 'numRefunds',   label: 'No. of Refunds' },
    { key: 'status',       label: 'Status' },
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