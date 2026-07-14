import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AmexPageHeaderComponent, AmexBreadcrumbTrailComponent } from '@ui-components/ui';

@Component({
  selector: 'app-bta-monthly-statement',
  imports: [CommonModule, FormsModule, AmexPageHeaderComponent, AmexBreadcrumbTrailComponent],
  template: `
    <amex-page-header portalStyle="onls" title="BTA MONTHLY STATEMENT"></amex-page-header>
    <amex-breadcrumb-trail
      [items]="[{id:'home',label:'Home'},{id:'bta',label:'BTA Portal'},{id:'ms',label:'Monthly Statements'}]"
      [showBack]="true" (backClick)="goBack()">
    </amex-breadcrumb-trail>

    <div class="bta-page">

      <div *ngIf="!showStatement" class="bta-panel">
        <div class="bta-panel-hd">Monthly Statements</div>
        <div class="bta-panel-bd">
          <div class="bta-field-row">
            <label>Select the BTA Number you wish to Access Monthly Statement for:</label>
          </div>
          <div class="bta-field-row" style="margin-top:8px;">
            <div class="field-wrap">
              <select [(ngModel)]="selectedAccount" class="bta-select-wide"
                [class.field-error]="submitted && errors.account">
                <option value="">-- Select BTA Account --</option>
                <option *ngFor="let a of accounts" [value]="a.value">{{ a.label }}</option>
              </select>
              <span *ngIf="submitted && errors.account" class="error-msg">{{ errors.account }}</span>
            </div>
            <button class="bta-btn bta-btn-primary" (click)="viewStatement()">View Statement</button>
          </div>
        </div>
      </div>

      <div *ngIf="showStatement" class="bta-panel">
        <div class="bta-panel-hd">BTA Monthly Statement</div>
        <div class="bta-panel-bd">
          <div class="stmt-date">{{ today }}</div>
          <div class="stmt-title">BTA Monthly Statement</div>
          <div class="stmt-account">BTA 3744XXXXXXX5229 - BTACLIENTBAH001</div>
          <div class="stmt-agent">Travel Agent: DNATA (BTA) - Telephone: +97143166343</div>

          <table class="summary-table">
            <thead>
              <tr>
                <th>Previous Balance</th><th>New Remittance</th><th>New Credit</th>
                <th>New Debits</th><th>Disputes*</th><th>Total Due Balance</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="amount">{{ summary.prevBalance | number:'1.3-3' }}</td>
                <td class="amount">{{ summary.remittance  | number:'1.3-3' }}</td>
                <td class="amount">{{ summary.credit      | number:'1.3-3' }}</td>
                <td class="amount">{{ summary.debits      | number:'1.3-3' }}</td>
                <td class="amount">{{ summary.disputes    | number:'1.3-3' }}</td>
                <td class="amount total">{{ summary.totalDue | number:'1.3-3' }}</td>
              </tr>
              <tr>
                <td colspan="5"></td>
                <td class="due-date">Total Balance Due by {{ dueDate }}</td>
              </tr>
            </tbody>
          </table>

          <div class="stmt-empty">There are no transactions available.</div>

          <div class="stmt-legend">1 Remittance - 2 Refund - 3 Dispute</div>
          <div class="stmt-note">*by the time of statement issuance no settlement was received</div>

          <div class="stmt-footer">
            <div class="view-diff">
              <label>View a Different Monthly Statement:</label>
              <div class="field-wrap">
                <select [(ngModel)]="selectedMonth" class="bta-select-md"
                  [class.field-error]="diffSubmitted && diffErrors.month">
                  <option value="">-- Select Month --</option>
                  <option *ngFor="let m of months" [value]="m">{{ m }}</option>
                </select>
                <span *ngIf="diffSubmitted && diffErrors.month" class="error-msg">{{ diffErrors.month }}</span>
              </div>
              <button class="bta-btn bta-btn-secondary" (click)="showDiffStatement()">Show Statement</button>
            </div>
            <div class="download-row">
              <select class="bta-select-sm" [(ngModel)]="downloadFormat">
                <option>PDF</option><option>Excel</option><option>CSV</option><option>RTF</option>
              </select>
              <button class="bta-btn bta-btn-primary" (click)="download()">Download Report</button>
            </div>
          </div>

          <div style="margin-top:8px;">
            <button class="bta-btn bta-btn-secondary" (click)="returnToSelection()">Return to Account Selection</button>
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
    .bta-field-row   { display:flex; align-items:flex-start; gap:10px; flex-wrap:wrap; }
    .bta-field-row label { font-size:12px; color:#333; }
    .field-wrap      { display:flex; flex-direction:column; gap:3px; }
    .bta-select-wide { padding:4px 8px; font-size:12px; border:1px solid #aaa; min-width:300px; font-family:Arial,sans-serif; }
    .bta-select-md   { padding:3px 6px; font-size:12px; border:1px solid #aaa; font-family:Arial,sans-serif; min-width:160px; }
    .bta-select-sm   { padding:3px 6px; font-size:12px; border:1px solid #aaa; font-family:Arial,sans-serif; }
    .field-error     { border-color:#cc0000 !important; }
    .error-msg       { color:#cc0000; font-size:11px; }
    .req             { color:#cc0000; }
    .bta-btn         { padding:4px 14px; font-size:12px; font-family:Arial,sans-serif; cursor:pointer; border-radius:2px; }
    .bta-btn-primary  { background:#1e3a6e; color:#fff; border:1px solid #1e3a6e; }
    .bta-btn-primary:hover { background:#2d5499; }
    .bta-btn-secondary { background:#fff; color:#333; border:1px solid #aaa; }
    .stmt-date       { text-align:right; font-size:12px; margin-bottom:12px; }
    .stmt-title      { text-align:center; font-size:14px; font-weight:bold; margin-bottom:6px; }
    .stmt-account    { text-align:center; color:#1e3a6e; font-size:13px; }
    .stmt-agent      { text-align:center; font-size:12px; color:#555; margin-bottom:14px; }
    .summary-table   { width:100%; border-collapse:collapse; font-size:12px; margin-bottom:14px; }
    .summary-table th { background:#cfe2f3; border:1px solid #b8d0e8; padding:7px 12px; text-align:center; font-weight:bold; color:#1e3a6e; }
    .summary-table td { border:1px solid #dde4ed; padding:7px 12px; text-align:center; }
    .amount          { font-family:monospace; }
    .total           { font-weight:bold; }
    .due-date        { font-size:11px; color:#555; text-align:right; border:none !important; }
    .stmt-empty      { color:#cc0000; font-size:12px; padding:10px 0; }
    .stmt-legend     { font-size:11px; color:#006fcf; }
    .stmt-note       { font-size:11px; color:#555; margin:4px 0 14px; }
    .stmt-footer     { display:flex; justify-content:space-between; align-items:flex-start; border-top:1px solid #eee; padding-top:10px; flex-wrap:wrap; gap:10px; }
    .view-diff       { display:flex; align-items:flex-start; gap:8px; font-size:12px; flex-wrap:wrap; }
    .download-row    { display:flex; gap:8px; align-items:center; }
  `]
})
export class BtaMonthlyStatementComponent {
  showStatement  = false;
  downloadFormat = 'PDF';
  submitted      = false;
  diffSubmitted  = false;
  errors:      Record<string, string> = {};
  diffErrors:  Record<string, string> = {};

  selectedAccount = '';
  selectedMonth   = '';
  today    = new Date().toLocaleDateString('en-GB', { day:'2-digit', month:'long', year:'numeric' });
  dueDate  = '25-03-2025';

  accounts = [
    { value:'BTACLIENTBAH001-3744XXXXXXX5229', label:'BTACLIENTBAH001-3744XXXXXXX5229' },
    { value:'BTACLIENTBAH002-3744XXXXXXX6130', label:'BTACLIENTBAH002-3744XXXXXXX6130' },
  ];

  months = ['February 2025','January 2025','December 2024','November 2024','October 2024'];

  summary = { prevBalance:-57.852, remittance:0, credit:0, debits:0, disputes:0, totalDue:-57.852 };

  viewStatement() {
    this.submitted = true;
    this.errors    = {};
    if (!this.selectedAccount) {
      this.errors['account'] = 'Please select a BTA Account to view the statement.';
      return;
    }
    this.showStatement = true;
  }

  showDiffStatement() {
    this.diffSubmitted = true;
    this.diffErrors    = {};
    if (!this.selectedMonth) {
      this.diffErrors['month'] = 'Please select a month to view.';
      return;
    }
  }

  returnToSelection() {
    this.showStatement  = false;
    this.submitted      = false;
    this.errors         = {};
    this.diffSubmitted  = false;
    this.diffErrors     = {};
  }

  goBack() { this.returnToSelection(); }

  download() {
    const label    = this.selectedMonth || 'March 2025';
    const filename = `BTA_Monthly_Statement_${label.replace(' ', '_')}`;

    switch (this.downloadFormat) {
      case 'CSV':   this.downloadCSV(filename);   break;
      case 'Excel': this.downloadExcel(filename);  break;
      case 'RTF':   this.downloadRTF(filename);    break;
      case 'PDF':
      default:      this.downloadPDF(filename);    break;
    }
  }

  private getStatementRows(): string[][] {
    return [
      ['Previous Balance', 'New Remittance', 'New Credit', 'New Debits', 'Disputes', 'Total Due Balance'],
      [
        this.summary.prevBalance.toFixed(3),
        this.summary.remittance.toFixed(3),
        this.summary.credit.toFixed(3),
        this.summary.debits.toFixed(3),
        this.summary.disputes.toFixed(3),
        this.summary.totalDue.toFixed(3),
      ],
    ];
  }

  private triggerDownload(blob: Blob, filename: string): void {
    const url = URL.createObjectURL(blob);
    const a   = document.createElement('a');
    a.href     = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  }

  private downloadCSV(filename: string): void {
    const rows   = this.getStatementRows();
    const header = `BTA Monthly Statement\n${this.today}\nBTA 3744XXXXXXX5229 - BTACLIENTBAH001\nTravel Agent: DNATA (BTA) - Telephone: +97143166343\n\n`;
    const csv    = header + rows.map(r => r.map(c => `"${c}"`).join(',')).join('\n')
                          + '\n\nThere are no transactions available.'
                          + `\nTotal Balance Due by ${this.dueDate}`;
    this.triggerDownload(new Blob([csv], { type:'text/csv;charset=utf-8;' }), `${filename}.csv`);
  }

  private downloadExcel(filename: string): void {
    const rows    = this.getStatementRows();
    const headers = rows[0].map(h => `<Cell><Data ss:Type="String">${h}</Data></Cell>`).join('');
    const values  = rows[1].map(v => `<Cell><Data ss:Type="Number">${v}</Data></Cell>`).join('');

    const xml = `<?xml version="1.0"?>
<?mso-application progid="Excel.Sheet"?>
<Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet"
  xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet">
  <Worksheet ss:Name="Statement">
    <Table>
      <Row><Cell ss:MergeAcross="5"><Data ss:Type="String">BTA Monthly Statement</Data></Cell></Row>
      <Row><Cell ss:MergeAcross="5"><Data ss:Type="String">${this.today}</Data></Cell></Row>
      <Row><Cell ss:MergeAcross="5"><Data ss:Type="String">BTA 3744XXXXXXX5229 - BTACLIENTBAH001</Data></Cell></Row>
      <Row><Cell ss:MergeAcross="5"><Data ss:Type="String">Travel Agent: DNATA (BTA)</Data></Cell></Row>
      <Row/>
      <Row>${headers}</Row>
      <Row>${values}</Row>
      <Row/>
      <Row><Cell ss:MergeAcross="5"><Data ss:Type="String">There are no transactions available.</Data></Cell></Row>
      <Row><Cell ss:MergeAcross="5"><Data ss:Type="String">Total Balance Due by ${this.dueDate}</Data></Cell></Row>
    </Table>
  </Worksheet>
</Workbook>`;
    this.triggerDownload(
      new Blob([xml], { type:'application/vnd.ms-excel;charset=utf-8;' }),
      `${filename}.xls`
    );
  }

  private downloadRTF(filename: string): void {
    const rows = this.getStatementRows();
    const tableRow = (cells: string[]) =>
      `\\trowd\\trgaph115\\trleft-115` +
      cells.map((_, i) => `\\cellx${(i + 1) * 1800}`).join('') +
      cells.map(c => `\\pard\\intbl ${c}\\cell`).join('') +
      `\\row\n`;

    const rtf = `{\\rtf1\\ansi\\deff0
{\\fonttbl{\\f0 Arial;}}
\\f0\\fs22
{\\b BTA Monthly Statement}\\line
${this.today}\\line
BTA 3744XXXXXXX5229 - BTACLIENTBAH001\\line
Travel Agent: DNATA (BTA) - Telephone: +97143166343\\line\\line
${tableRow(rows[0])}
${tableRow(rows[1])}
\\line
There are no transactions available.\\line
Total Balance Due by ${this.dueDate}\\line
}`;
    this.triggerDownload(new Blob([rtf], { type:'application/rtf' }), `${filename}.rtf`);
  }

  private downloadPDF(filename: string): void {
    const rows = this.getStatementRows();
    const thCells = rows[0].map(h => `<th>${h}</th>`).join('');
    const tdCells = rows[1].map(v => `<td>${v}</td>`).join('');

    const html = `<!DOCTYPE html><html><head><meta charset="utf-8">
<title>${filename}</title>
<style>
  body { font-family:Arial,sans-serif; font-size:12px; padding:24px; }
  h2   { text-align:center; font-size:14px; }
  .sub { text-align:center; color:#1e3a6e; font-size:13px; }
  .agent { text-align:center; color:#555; font-size:11px; margin-bottom:16px; }
  .date  { text-align:right; font-size:11px; margin-bottom:12px; }
  table  { width:100%; border-collapse:collapse; margin-bottom:12px; }
  th { background:#cfe2f3; border:1px solid #b8d0e8; padding:6px 10px; text-align:center; color:#1e3a6e; }
  td { border:1px solid #dde4ed; padding:6px 10px; text-align:center; font-family:monospace; }
  .note { font-size:11px; color:#555; }
  .empty { color:#cc0000; font-size:12px; }
</style></head><body>
<div class="date">${this.today}</div>
<h2>BTA Monthly Statement</h2>
<div class="sub">BTA 3744XXXXXXX5229 - BTACLIENTBAH001</div>
<div class="agent">Travel Agent: DNATA (BTA) - Telephone: +97143166343</div>
<table><thead><tr>${thCells}</tr></thead>
<tbody><tr>${tdCells}</tr>
<tr><td colspan="5"></td><td class="note">Total Balance Due by ${this.dueDate}</td></tr>
</tbody></table>
<div class="empty">There are no transactions available.</div>
<div class="note">1 Remittance - 2 Refund - 3 Dispute</div>
<div class="note">*by the time of statement issuance no settlement was received</div>
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
}