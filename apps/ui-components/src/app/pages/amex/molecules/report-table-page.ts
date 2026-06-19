import { Component } from '@angular/core';
import { ShowcasePageComponent } from '../../showcase-page';
import { VariantSectionComponent } from '../../variant-section';
import { AmexReportTableComponent, AmexReportTableConfig } from '@vn-core-ui-components/ui';

@Component({ selector: 'app-report-table-page', standalone: true,
  imports: [ShowcasePageComponent, VariantSectionComponent, AmexReportTableComponent],
  template: `
    <app-showcase-page title="AMEX Report Table" description="Sortable, searchable, paginated data table with export.">
      <app-variant-section title="Transaction Report">
        <div style="width:100%">
          <amex-report-table [config]="txnConfig" [rows]="txnRows" (export)="onExport($event)"></amex-report-table>
        </div>
      </app-variant-section>
    </app-showcase-page>
  `,
})
export class ReportTablePageComponent {
  txnConfig: AmexReportTableConfig = {
    columns: [
      { key: 'date', label: 'Date', sortable: true, width: '110px' },
      { key: 'description', label: 'Description', sortable: true },
      { key: 'refNo', label: 'Reference', width: '150px' },
      { key: 'amount', label: 'Amount', sortable: true, width: '110px' },
      { key: 'status', label: 'Status', type: 'status', width: '130px' },
    ],
    pageSize: 5,
    searchable: true,
    exportable: true,
  };
  txnRows = [
    { date: '12 Mar 2024', description: 'Amazon AE', refNo: 'REF-00192837', amount: 'AED 349.99', status: 'completed' },
    { date: '11 Mar 2024', description: 'Carrefour MOE', refNo: 'REF-00192200', amount: 'AED 215.50', status: 'completed' },
    { date: '10 Mar 2024', description: 'Emirates Airlines', refNo: 'REF-00190011', amount: 'AED 1,200.00', status: 'pending' },
    { date: '09 Mar 2024', description: 'Atlantis Hotel Dispute', refNo: 'REF-00185544', amount: 'AED 5,400.00', status: 'processing' },
    { date: '08 Mar 2024', description: 'Noon Shopping', refNo: 'REF-00184433', amount: 'AED 89.00', status: 'completed' },
    { date: '07 Mar 2024', description: 'Talabat Food Delivery', refNo: 'REF-00183210', amount: 'AED 54.75', status: 'completed' },
    { date: '06 Mar 2024', description: 'Etisalat Bill Payment', refNo: 'REF-00181100', amount: 'AED 300.00', status: 'approved' },
  ];
  onExport(format: string) { alert(`Exporting as ${format.toUpperCase()}`); }
}