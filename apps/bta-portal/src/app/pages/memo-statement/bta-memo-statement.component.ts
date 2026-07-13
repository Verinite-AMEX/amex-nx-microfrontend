import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  AmexPageHeaderComponent,
  AmexBreadcrumbTrailComponent,
  AmexStatementRowComponent,
  AmexAccountNumberComponent,
} from '@ui-components/ui';

@Component({
  selector: 'app-bta-memo-statement',
  imports: [
    CommonModule, FormsModule,
    AmexPageHeaderComponent,
    AmexBreadcrumbTrailComponent,
  ],
  template: `
    <amex-page-header portalStyle="onls" title="BTA MEMO STATEMENT"></amex-page-header>
    <amex-breadcrumb-trail
      [items]="[{id:'home',label:'Home'},{id:'bta',label:'BTA Portal'},{id:'memo',label:'Memo Statement'}]"
      [showBack]="true" (backClick)="goBack()">
    </amex-breadcrumb-trail>

    <div class="bta-page">

      <div *ngIf="!showStatement" class="bta-panel">
        <div class="bta-panel-hd">Memo Statement</div>
        <div class="bta-panel-bd">
          <div class="bta-field-row">
            <label>Select BTA Number: <span class="req">*</span></label>
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
        <div class="bta-panel-hd">BTA Memo Statement</div>
        <div class="bta-panel-bd">
          <div class="stmt-date">{{ today }}</div>
          <div class="stmt-title">BTA Memo Statement</div>
          <div class="stmt-account">BTA 3744XXXXXXX5229 - BTACLIENTBAH001</div>
          <div class="stmt-agent">Travel Agent: DNATA (BTA) - Telephone: +97143166343</div>

          <div class="stmt-empty" *ngIf="transactions.length === 0">
            There are no transactions available.
          </div>

          <table *ngIf="transactions.length > 0" class="bta-table">
            <thead>
              <tr><th>Date</th><th>Description</th><th>Reference</th><th>Type</th><th>Amount</th></tr>
            </thead>
            <tbody>
              <tr *ngFor="let t of transactions">
                <td>{{ t.date }}</td><td>{{ t.desc }}</td>
                <td>{{ t.ref }}</td><td>{{ t.type }}</td>
                <td class="amount">{{ t.amount | number:'1.3-3' }}</td>
              </tr>
            </tbody>
          </table>

          <div class="stmt-legend">
            <span class="legend-link">1 Remittance - 2 Refund - 3 Dispute - 5 Allocated - 6 Allocated &amp; Paid</span>
          </div>
          <p class="stmt-note">Should you have any enquiry regarding the transactions and information displayed, kindly contact your Travel Agent or AEME BTA Team on ((+973) 17 557243).</p>

          <div class="stmt-footer">
            <button class="bta-btn bta-btn-secondary" (click)="returnToSelection()">Return to Account Selection</button>
            <div class="download-row">
              <select class="bta-select-sm" [(ngModel)]="downloadFormat">
                <option>PDF</option><option>Excel</option><option>CSV</option><option>RTF</option>
              </select>
              <button class="bta-btn bta-btn-primary" (click)="download()">Download Report</button>
            </div>
          </div>

          <div *ngIf="downloadMsg" class="download-msg">{{ downloadMsg }}</div>

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
    .bta-field-row label { font-size:12px; font-weight:bold; color:#333; white-space:nowrap; padding-top:5px; }
    .field-wrap      { display:flex; flex-direction:column; gap:3px; }
    .bta-select-wide { padding:4px 8px; font-size:12px; border:1px solid #aaa; min-width:280px; font-family:Arial,sans-serif; }
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
    .stmt-account    { text-align:center; color:#006fcf; font-size:13px; }
    .stmt-agent      { text-align:center; font-size:12px; color:#555; margin-bottom:16px; }
    .stmt-empty      { color:#cc0000; font-size:12px; padding:12px 0; }
    .bta-table       { width:100%; border-collapse:collapse; font-size:12px; margin-bottom:14px; }
    .bta-table th    { background:#cfe2f3; border:1px solid #b8d0e8; padding:6px 10px; text-align:left; font-weight:bold; color:#1e3a6e; }
    .bta-table td    { border:1px solid #dde4ed; padding:6px 10px; }
    .amount          { text-align:right; font-family:monospace; }
    .legend-link     { color:#006fcf; font-size:11px; }
    .stmt-note       { font-size:11px; color:#555; margin:8px 0; }
    .stmt-footer     { display:flex; justify-content:space-between; align-items:center; margin-top:14px; border-top:1px solid #eee; padding-top:12px; }
    .download-row    { display:flex; gap:8px; align-items:center; }
    .download-msg    { margin-top:10px; padding:8px 12px; background:#e6f9f0; color:#1a7a4a; border:1px solid #b7e4ce; font-size:12px; border-radius:2px; }
  `]
})
export class BtaMemoStatementComponent {
  showStatement  = false;
  downloadFormat = 'PDF';
  submitted      = false;
  downloadMsg    = '';
  errors: Record<string, string> = {};
  today = new Date().toLocaleDateString('en-GB', { day:'2-digit', month:'short', year:'numeric' });

  selectedAccount = '';
  accounts = [
    { value:'BTACLIENTBAH001-3744XXXXXXX5229', label:'BTACLIENTBAH001-3744XXXXXXX5229' },
    { value:'BTACLIENTBAH002-3744XXXXXXX6130', label:'BTACLIENTBAH002-3744XXXXXXX6130' },
  ];

  transactions: any[] = [];

  viewStatement() {
    this.submitted = true;
    this.errors    = {};
    if (!this.selectedAccount) {
      this.errors['account'] = 'Please select a BTA Account to view the statement.';
      return;
    }
    this.showStatement = true;
  }

  returnToSelection() {
    this.showStatement = false;
    this.submitted     = false;
    this.errors        = {};
    this.downloadMsg   = '';
  }

  goBack() {
    this.showStatement = false;
    this.submitted     = false;
    this.errors        = {};
    this.downloadMsg   = '';
  }

  download() {
    this.downloadMsg = '';
    const safeName   = this.selectedAccount.replace(/[^a-zA-Z0-9]/g, '_');
    const fileName   = `BTA_Memo_Statement_${safeName}_${this.today.replace(/ /g, '_')}`;

    switch (this.downloadFormat) {
      case 'PDF':   this.downloadAsPdf(fileName);   break;
      case 'Excel': this.downloadAsExcel(fileName); break;
      case 'CSV':   this.downloadAsCsv(fileName);   break;
      case 'RTF':   this.downloadAsRtf(fileName);   break;
    }

    this.downloadMsg = `✓ "${fileName}" downloaded as ${this.downloadFormat}.`;
    setTimeout(() => { this.downloadMsg = ''; }, 4000);
  }

  private downloadAsCsv(fileName: string) {
    const rows = [
      ['BTA Memo Statement'],
      [`Account: BTA 3744XXXXXXX5229 - BTACLIENTBAH001`],
      [`Travel Agent: DNATA (BTA) - Telephone: +97143166343`],
      [`Date: ${this.today}`],
      [],
      ['Date', 'Description', 'Reference', 'Type', 'Amount'],
      ...(this.transactions.length > 0
        ? this.transactions.map(t => [t.date, t.desc, t.ref, t.type, t.amount])
        : [['', 'There are no transactions available.', '', '', '']]),
    ];

    const csv  = rows.map(r => r.map(c => `"${c ?? ''}"`).join(',')).join('\n');
    this.triggerDownload(csv, `${fileName}.csv`, 'text/csv;charset=utf-8;');
  }

  private downloadAsExcel(fileName: string) {
    const rows = [
      ['BTA Memo Statement', '', '', '', ''],
      ['Account: BTA 3744XXXXXXX5229 - BTACLIENTBAH001', '', '', '', ''],
      ['Travel Agent: DNATA (BTA) - Telephone: +97143166343', '', '', '', ''],
      [`Date: ${this.today}`, '', '', '', ''],
      ['', '', '', '', ''],
      ['Date', 'Description', 'Reference', 'Type', 'Amount'],
      ...(this.transactions.length > 0
        ? this.transactions.map(t => [t.date, t.desc, t.ref, t.type, t.amount])
        : [['', 'There are no transactions available.', '', '', '']]),
    ];

    const xmlRows = rows.map(r =>
      `<Row>${r.map(c => `<Cell><Data ss:Type="String">${c ?? ''}</Data></Cell>`).join('')}</Row>`
    ).join('');

    const xml = `<?xml version="1.0"?>
<Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet"
  xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet">
  <Worksheet ss:Name="Memo Statement">
    <Table>${xmlRows}</Table>
  </Worksheet>
</Workbook>`;

    this.triggerDownload(xml, `${fileName}.xls`, 'application/vnd.ms-excel;charset=utf-8;');
  }

  private downloadAsPdf(fileName: string) {
    const tableRows = this.transactions.length > 0
      ? this.transactions.map(t =>
          `<tr>
            <td>${t.date}</td><td>${t.desc}</td>
            <td>${t.ref}</td><td>${t.type}</td>
            <td style="text-align:right;">${Number(t.amount).toFixed(3)}</td>
          </tr>`
        ).join('')
      : `<tr><td colspan="5" style="text-align:center;color:#cc0000;">
           There are no transactions available.
         </td></tr>`;

    const html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8"/>
  <title>${fileName}</title>
  <style>
    body  { font-family:Arial,sans-serif; font-size:12px; padding:24px; color:#222; }
    h2    { text-align:center; color:#1e3a6e; margin-bottom:4px; }
    .sub  { text-align:center; color:#006fcf; font-size:13px; margin-bottom:2px; }
    .agent{ text-align:center; font-size:11px; color:#555; margin-bottom:16px; }
    .date { text-align:right; font-size:11px; margin-bottom:12px; }
    table { width:100%; border-collapse:collapse; margin-top:12px; }
    th    { background:#cfe2f3; border:1px solid #b8d0e8; padding:6px 10px; text-align:left; color:#1e3a6e; }
    td    { border:1px solid #dde4ed; padding:6px 10px; }
    .legend { font-size:10px; color:#006fcf; margin-top:10px; }
    .note   { font-size:10px; color:#555; margin-top:4px; }
    @media print { button { display:none; } }
  </style>
</head>
<body>
  <div class="date">${this.today}</div>
  <h2>BTA Memo Statement</h2>
  <div class="sub">BTA 3744XXXXXXX5229 - BTACLIENTBAH001</div>
  <div class="agent">Travel Agent: DNATA (BTA) - Telephone: +97143166343</div>
  <table>
    <thead>
      <tr><th>Date</th><th>Description</th><th>Reference</th><th>Type</th><th>Amount</th></tr>
    </thead>
    <tbody>${tableRows}</tbody>
  </table>
  <div class="legend">1 Remittance - 2 Refund - 3 Dispute - 5 Allocated - 6 Allocated &amp; Paid</div>
  <div class="note">Should you have any enquiry, kindly contact your Travel Agent or AEME BTA Team on (+973) 17 557243.</div>
  <script>window.onload = function(){ window.print(); }</script>
</body>
</html>`;

    const blob = new Blob([html], { type: 'text/html' });
    const url  = URL.createObjectURL(blob);
    const win  = window.open(url, '_blank');
    if (win) {
      win.addEventListener('afterprint', () => URL.revokeObjectURL(url));
    }
  }

  private downloadAsRtf(fileName: string) {
    const dataLines = this.transactions.length > 0
      ? this.transactions.map(t =>
          `${t.date}\\tab ${t.desc}\\tab ${t.ref}\\tab ${t.type}\\tab ${Number(t.amount).toFixed(3)}\\par`
        ).join('\n')
      : 'There are no transactions available.\\par';

    const rtf = `{\\rtf1\\ansi\\deff0
{\\fonttbl{\\f0 Arial;}}
\\f0\\fs24
{\\b\\fs28 BTA Memo Statement}\\par
\\par
Account: BTA 3744XXXXXXX5229 - BTACLIENTBAH001\\par
Travel Agent: DNATA (BTA) - Telephone: +97143166343\\par
Date: ${this.today}\\par
\\par
{\\b Date\\tab Description\\tab Reference\\tab Type\\tab Amount}\\par
${dataLines}
\\par
1 Remittance - 2 Refund - 3 Dispute - 5 Allocated - 6 Allocated & Paid\\par
}`;

    this.triggerDownload(rtf, `${fileName}.rtf`, 'application/rtf');
  }

  private triggerDownload(content: string, fileName: string, mimeType: string) {
    const blob = new Blob([content], { type: mimeType });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement('a');
    a.href     = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }
}