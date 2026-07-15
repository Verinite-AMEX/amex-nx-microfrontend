import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  AmexPageHeaderComponent,
  AmexBreadcrumbTrailComponent,
} from '@ui-components/ui';

@Component({
  selector: 'app-bta-audit-trail',
  imports: [CommonModule, FormsModule, AmexPageHeaderComponent, AmexBreadcrumbTrailComponent],
  templateUrl: './bta-audit-trail.component.html',
  styleUrls: ['./bta-audit-trail.component.css'],     
})

export class BtaAuditTrailComponent {
  activeTab    = 'detailed';
  detailYear   = '';
  detailMonth  = '';
  detailShown  = false;
  summaryShown = false;
  submitted        = false;
  summarySubmitted = false;
  detailDownloadFormat  = 'PDF';
  summaryDownloadFormat = 'PDF';
  summaryFrom = '';
  summaryTo   = '';
  today = new Date().toISOString().split('T')[0];
  summaryErrors: { from?: string; to?: string; range?: string } = {};
  years = Array.from({ length: 10 }, (_, i) => String(new Date().getFullYear() - i));
  months = [
    'January','February','March','April','May','June',
    'July','August','September','October','November','December',
  ];

  summaryOptions = [
    { label: 'Login/Logout',          checked: true  },
    { label: 'User Management',       checked: true  },
    { label: 'Report Downloads',      checked: true  },
    { label: 'Payment Transactions',  checked: false },
  ];

  detailedRows: any[] = [];

  switchTab(tab: string) {
    this.activeTab       = tab;
    this.submitted       = false;
    this.summarySubmitted = false;
    this.detailShown     = false;
    this.summaryShown    = false;
    this.summaryErrors   = {};
  }

  showDetailedTrail() {
    this.submitted = true;
    if (!this.detailYear || !this.detailMonth) return;
    this.detailShown = true;
  }

  atLeastOneChecked(): boolean {
    return this.summaryOptions.some(o => o.checked);
  }

  showSummaryTrail() {
    this.summarySubmitted = true;
    this.summaryErrors    = {};
    let valid = true;

    if (!this.summaryFrom) { this.summaryErrors.from = 'Date From is required.'; valid = false; }
    if (!this.summaryTo)   { this.summaryErrors.to   = 'Date To is required.';   valid = false; }

    if (this.summaryFrom && this.summaryFrom > this.today) {
      this.summaryErrors.from = 'Date From cannot be a future date.'; valid = false;
    }
    if (this.summaryFrom && this.summaryTo && this.summaryFrom > this.summaryTo) {
      this.summaryErrors.range = '"Date From" must be before or equal to "Date To".'; valid = false;
    }
    if (!this.atLeastOneChecked()) { valid = false; }
    if (!valid) return;

    this.summaryShown = true;
  }

  downloadDetailed() {
    const filename = `Audit_Trail_Detailed_${this.detailMonth}_${this.detailYear}`;
    const headers  = ['Date/Time', 'User ID', 'Action', 'Details', 'IP Address'];
    const rows     = this.detailedRows.length
      ? this.detailedRows.map(r => [r.datetime, r.userId, r.action, r.details, r.ip])
      : [['No audit entries found for this search criteria', '', '', '', '']];
    const meta = [
      `Audit Trail For ${this.detailMonth}/${this.detailYear}`,
      'Corporation Name: TEST BTA 9',
      'Corporation Account No: 10026800010',
    ];
    this.dispatch(this.detailDownloadFormat, filename, headers, rows, meta);
  }

  downloadSummary() {
    const filename = `Audit_Trail_Summary_${this.summaryFrom}_to_${this.summaryTo}`;
    const included = this.summaryOptions.filter(o => o.checked).map(o => o.label).join(', ');
    const headers  = ['Category', 'Status'];
    const rows     = [['Audit entries are not found for the selected date range.', '']];
    const meta = [
      `Summary Report: ${this.summaryFrom} to ${this.summaryTo}`,
      `Included Details: ${included}`,
      'Corporation Name: TEST BTA 9',
      'Corporation Account No: 10026800010',
    ];
    this.dispatch(this.summaryDownloadFormat, filename, headers, rows, meta);
  }

  private dispatch(
    format: string,
    filename: string,
    headers: string[],
    rows: string[][],
    meta: string[]
  ): void {
    switch (format) {
      case 'CSV':   this.downloadCSV(filename, headers, rows, meta);   break;
      case 'Excel': this.downloadExcel(filename, headers, rows, meta); break;
      case 'RTF':   this.downloadRTF(filename, headers, rows, meta);   break;
      case 'PDF':
      default:      this.downloadPDF(filename, headers, rows, meta);   break;
    }
  }

  private triggerDownload(blob: Blob, filename: string): void {
    const url = URL.createObjectURL(blob);
    const a   = document.createElement('a');
    a.href     = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  }

  private downloadCSV(filename: string, headers: string[], rows: string[][], meta: string[]): void {
    const metaBlock = meta.map(m => `"${m}"`).join('\n');
    const headerRow = headers.map(h => `"${h}"`).join(',');
    const dataRows  = rows.map(r => r.map(c => `"${c}"`).join(',')).join('\n');
    const content   = `${metaBlock}\n\n${headerRow}\n${dataRows}`;
    this.triggerDownload(new Blob([content], { type: 'text/csv;charset=utf-8;' }), `${filename}.csv`);
  }

  private downloadExcel(filename: string, headers: string[], rows: string[][], meta: string[]): void {
    const metaRows = meta.map(m =>
      `<Row><Cell ss:MergeAcross="${headers.length - 1}"><Data ss:Type="String">${m}</Data></Cell></Row>`
    ).join('\n');

    const headerRow = '<Row>' + headers.map(h =>
      `<Cell><Data ss:Type="String">${h}</Data></Cell>`
    ).join('') + '</Row>';

    const dataRows = rows.map(r =>
      '<Row>' + r.map(c => `<Cell><Data ss:Type="String">${c}</Data></Cell>`).join('') + '</Row>'
    ).join('\n');

    const xml = `<?xml version="1.0"?>
<?mso-application progid="Excel.Sheet"?>
<Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet"
  xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet">
  <Worksheet ss:Name="Audit Trail">
    <Table>
      ${metaRows}
      <Row/>
      ${headerRow}
      ${dataRows}
    </Table>
  </Worksheet>
</Workbook>`;
    this.triggerDownload(
      new Blob([xml], { type: 'application/vnd.ms-excel;charset=utf-8;' }),
      `${filename}.xls`
    );
  }

  private downloadRTF(filename: string, headers: string[], rows: string[][], meta: string[]): void {
    const colWidth  = 1800;
    const tableRow  = (cells: string[]) =>
      `\\trowd\\trgaph115\\trleft-115` +
      cells.map((_, i) => `\\cellx${(i + 1) * colWidth}`).join('') +
      cells.map(c => `\\pard\\intbl ${c.replace(/[\\{}]/g, '\\$&')}\\cell`).join('') +
      `\\row\n`;

    const metaBlock = meta.map(m => m.replace(/[\\{}]/g, '\\$&') + '\\line\n').join('');

    const rtf = `{\\rtf1\\ansi\\deff0
{\\fonttbl{\\f0 Arial;}}
\\f0\\fs22
{\\b Audit Trail Report}\\line
${metaBlock}\\line
${tableRow(headers)}${rows.map(r => tableRow(r)).join('')}
}`;
    this.triggerDownload(new Blob([rtf], { type: 'application/rtf' }), `${filename}.rtf`);
  }

  private downloadPDF(filename: string, headers: string[], rows: string[][], meta: string[]): void {
    const thCells = headers.map(h => `<th>${h}</th>`).join('');
    const tdRows  = rows.map(r =>
      `<tr>${r.map(c => `<td>${c}</td>`).join('')}</tr>`
    ).join('');
    const metaBlock = meta.map(m => `<div class="meta">${m}</div>`).join('');

    const html = `<!DOCTYPE html><html><head><meta charset="utf-8">
<title>${filename}</title>
<style>
  body  { font-family:Arial,sans-serif; font-size:12px; padding:24px; }
  h2    { font-size:14px; margin-bottom:8px; }
  .meta { font-size:12px; color:#1e3a6e; margin-bottom:4px; }
  table { width:100%; border-collapse:collapse; margin-top:14px; }
  th    { background:#cfe2f3; border:1px solid #b8d0e8; padding:6px 10px; text-align:left; color:#1e3a6e; }
  td    { border:1px solid #dde4ed; padding:6px 10px; }
</style></head><body>
<h2>Audit Trail Report</h2>
${metaBlock}
<table><thead><tr>${thCells}</tr></thead>
<tbody>${tdRows}</tbody></table>
</body></html>`;

    const iframe = document.createElement('iframe');
    iframe.style.cssText = 'position:fixed;width:0;height:0;border:0;visibility:hidden;';
    document.body.appendChild(iframe);
    iframe.contentDocument!.open();
    iframe.contentDocument!.write(html);
    iframe.contentDocument!.close();
    iframe.contentWindow!.focus();
    setTimeout(() => {
      iframe.contentWindow!.print();
      document.body.removeChild(iframe);
    }, 500);
  }

  goBack() {
    this.detailShown     = false;
    this.summaryShown    = false;
    this.submitted       = false;
    this.summarySubmitted = false;
  }
}