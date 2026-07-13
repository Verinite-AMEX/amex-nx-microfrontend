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
  template: `
    <amex-page-header portalStyle="onls" title="AUDIT TRAIL"></amex-page-header>
    <amex-breadcrumb-trail
      [items]="[{id:'home',label:'Home'},{id:'bta',label:'BTA Portal'},{id:'at',label:'Audit Trail'}]"
      [showBack]="true" (backClick)="goBack()">
    </amex-breadcrumb-trail>

    <div class="bta-page">
      <div class="bta-panel">
        <div class="bta-panel-hd">Audit Trail</div>
        <div class="bta-panel-bd">

          <div class="audit-tabs">
            <button class="audit-tab" [class.active]="activeTab==='detailed'" (click)="switchTab('detailed')">Detailed Report</button>
            <button class="audit-tab" [class.active]="activeTab==='summary'"  (click)="switchTab('summary')">Summary Report</button>
          </div>

          <!-- DETAILED REPORT -->
          <div *ngIf="activeTab==='detailed'" class="tab-content">
            <div class="bta-field-row" style="margin-top:14px;">
              <label>View Audit Trail For:</label>
              <select [(ngModel)]="detailYear" class="bta-select-sm"
                [class.field-error]="submitted && !detailYear">
                <option value="">-- Select Year --</option>
                <option *ngFor="let y of years" [value]="y">{{ y }}</option>
              </select>
              <span *ngIf="submitted && !detailYear" class="error-msg">Year is required.</span>

              <select [(ngModel)]="detailMonth" class="bta-select-sm"
                [class.field-error]="submitted && !detailMonth">
                <option value="">-- Select Month --</option>
                <option *ngFor="let m of months" [value]="m">{{ m }}</option>
              </select>
              <span *ngIf="submitted && !detailMonth" class="error-msg">Month is required.</span>

              <button class="bta-btn bta-btn-primary" (click)="showDetailedTrail()">Show Trail</button>
            </div>

            <div *ngIf="detailShown" class="trail-result">
              <div class="trail-meta">
                <div>Audit Trail For {{ detailMonth }}/{{ detailYear }}</div>
                <div>Corporation Name: TEST BTA 9</div>
                <div>Corporation Account No: 10026800010</div>
              </div>
              <div *ngIf="detailedRows.length === 0" class="no-records">Audit entries are not found for this search criteria</div>
              <table *ngIf="detailedRows.length" class="bta-table">
                <thead>
                  <tr><th>Date/Time</th><th>User ID</th><th>Action</th><th>Details</th><th>IP Address</th></tr>
                </thead>
                <tbody>
                  <tr *ngFor="let r of detailedRows">
                    <td>{{ r.datetime }}</td><td>{{ r.userId }}</td>
                    <td>{{ r.action }}</td><td>{{ r.details }}</td><td>{{ r.ip }}</td>
                  </tr>
                </tbody>
              </table>
              <div class="download-row" style="margin-top:12px;">
                <select class="bta-select-sm" [(ngModel)]="detailDownloadFormat">
                  <option>PDF</option><option>Excel</option><option>CSV</option><option>RTF</option>
                </select>
                <button class="bta-btn bta-btn-primary" (click)="downloadDetailed()">Download Report</button>
              </div>
            </div>
          </div>

          <!-- SUMMARY REPORT -->
          <div *ngIf="activeTab==='summary'" class="tab-content">
            <div class="bta-field-row" style="margin-top:14px;">
              <label>Date From:</label>
              <input type="date" [(ngModel)]="summaryFrom" class="bta-date-input"
                [class.field-error]="summarySubmitted && summaryErrors.from" [max]="today"/>
              <label>Date To:</label>
              <input type="date" [(ngModel)]="summaryTo" class="bta-date-input"
                [class.field-error]="summarySubmitted && summaryErrors.to" [max]="today"/>
            </div>
            <div *ngIf="summarySubmitted && summaryErrors.from"  class="error-msg" style="margin-top:4px;">{{ summaryErrors.from }}</div>
            <div *ngIf="summarySubmitted && summaryErrors.to"    class="error-msg" style="margin-top:4px;">{{ summaryErrors.to }}</div>
            <div *ngIf="summarySubmitted && summaryErrors.range" class="error-msg" style="margin-top:4px;">{{ summaryErrors.range }}</div>

            <div class="bta-field-row" style="margin-top:10px;">
              <label>Include Details:</label>
              <div class="checkbox-group">
                <label *ngFor="let opt of summaryOptions">
                  <input type="checkbox" [(ngModel)]="opt.checked"/> {{ opt.label }}
                </label>
              </div>
            </div>
            <div *ngIf="summarySubmitted && !atLeastOneChecked()" class="error-msg" style="margin-top:4px;">
              Please select at least one detail to include.
            </div>

            <div class="bta-actions" style="margin-top:14px;">
              <button class="bta-btn bta-btn-primary" (click)="showSummaryTrail()">Show Trail</button>
            </div>

            <div *ngIf="summaryShown" class="trail-result">
              <div class="no-records">Audit entries are not found for the selected date range.</div>
              <div class="download-row" style="margin-top:12px;">
                <select class="bta-select-sm" [(ngModel)]="summaryDownloadFormat">
                  <option>PDF</option><option>Excel</option><option>CSV</option><option>RTF</option>
                </select>
                <button class="bta-btn bta-btn-primary" (click)="downloadSummary()">Download Report</button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  `,
  styles: [`
    .bta-page        { padding:0 16px 24px; background:#fff; }
    .bta-panel       { border:1px solid #b8d0e8; border-radius:2px; overflow:hidden; margin-top:12px; }
    .bta-panel-hd    { background:#cfe2f3; border-bottom:1px solid #b8d0e8; padding:8px 14px; font-size:13px; font-weight:bold; color:#1e3a6e; }
    .bta-panel-bd    { padding:16px; }
    .audit-tabs      { display:flex; border-bottom:2px solid #006fcf; gap:0; }
    .audit-tab       { padding:7px 18px; font-size:12px; font-family:Arial,sans-serif; cursor:pointer; border:1px solid #b8d0e8; border-bottom:none; background:#f5f9ff; color:#1e3a6e; margin-right:2px; border-radius:2px 2px 0 0; }
    .audit-tab.active { background:#006fcf; color:#fff; font-weight:bold; border-color:#006fcf; }
    .tab-content     { padding-top:4px; }
    .bta-field-row   { display:flex; align-items:center; gap:10px; flex-wrap:wrap; }
    .bta-field-row label { font-size:12px; font-weight:bold; color:#333; white-space:nowrap; }
    .bta-select-sm   { padding:3px 8px; font-size:12px; border:1px solid #aaa; font-family:Arial,sans-serif; }
    .bta-date-input  { padding:3px 8px; font-size:12px; border:1px solid #aaa; font-family:Arial,sans-serif; }
    .field-error     { border-color:#cc0000 !important; }
    .error-msg       { color:#cc0000; font-size:11px; }
    .checkbox-group  { display:flex; gap:16px; flex-wrap:wrap; }
    .checkbox-group label { display:flex; align-items:center; gap:5px; font-size:12px; cursor:pointer; }
    .bta-btn         { padding:4px 14px; font-size:12px; font-family:Arial,sans-serif; cursor:pointer; border-radius:2px; }
    .bta-btn-primary  { background:#1e3a6e; color:#fff; border:1px solid #1e3a6e; }
    .bta-btn-primary:hover { background:#2d5499; }
    .trail-result    { margin-top:14px; }
    .trail-meta      { font-size:12px; color:#1e3a6e; margin-bottom:12px; display:flex; flex-direction:column; gap:3px; }
    .no-records      { font-size:12px; color:#cc0000; padding:8px 0; }
    .bta-table       { width:100%; border-collapse:collapse; font-size:12px; }
    .bta-table th    { background:#cfe2f3; border:1px solid #b8d0e8; padding:7px 10px; font-weight:bold; color:#1e3a6e; text-align:left; }
    .bta-table td    { border:1px solid #dde4ed; padding:7px 10px; }
    .download-row    { display:flex; gap:8px; align-items:center; }
  `]
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

  // 10 years back from current year
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

  // ── Tab switch ─────────────────────────────────────────────────
  switchTab(tab: string) {
    this.activeTab       = tab;
    this.submitted       = false;
    this.summarySubmitted = false;
    this.detailShown     = false;
    this.summaryShown    = false;
    this.summaryErrors   = {};
  }

  // ── Show trails ────────────────────────────────────────────────
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

  // ── Download entry points ──────────────────────────────────────
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

  // ── Dispatcher ─────────────────────────────────────────────────
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

  // ── Trigger helper ─────────────────────────────────────────────
  private triggerDownload(blob: Blob, filename: string): void {
    const url = URL.createObjectURL(blob);
    const a   = document.createElement('a');
    a.href     = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  }

  // ── CSV ────────────────────────────────────────────────────────
  private downloadCSV(filename: string, headers: string[], rows: string[][], meta: string[]): void {
    const metaBlock = meta.map(m => `"${m}"`).join('\n');
    const headerRow = headers.map(h => `"${h}"`).join(',');
    const dataRows  = rows.map(r => r.map(c => `"${c}"`).join(',')).join('\n');
    const content   = `${metaBlock}\n\n${headerRow}\n${dataRows}`;
    this.triggerDownload(new Blob([content], { type: 'text/csv;charset=utf-8;' }), `${filename}.csv`);
  }

  // ── Excel (SpreadsheetML — opens natively in Excel) ────────────
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

  // ── RTF ────────────────────────────────────────────────────────
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

  // ── PDF (hidden iframe + browser print dialog) ─────────────────
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

  // ── Navigation ─────────────────────────────────────────────────
  goBack() {
    this.detailShown     = false;
    this.summaryShown    = false;
    this.submitted       = false;
    this.summarySubmitted = false;
  }
}