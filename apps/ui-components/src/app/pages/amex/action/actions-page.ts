import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShowcasePageComponent } from '../../showcase-page';
import { VariantSectionComponent } from '../../variant-section';
import { AmexReportDownloadButtonComponent, ReportFormat } from '@vn-core-ui-components/ui';

@Component({
  selector: 'app-amex-actions-page',
  standalone: true,
  imports: [
    CommonModule,
    ShowcasePageComponent,
    VariantSectionComponent,
    AmexReportDownloadButtonComponent,
  ],
  template: `
    <app-showcase-page
      title="AMEX Actions"
      description="Action components used across all AEME portals. The ReportDownloadButton handles report export across BCRB, BTA, OMS, and SOC/ROC portals — each with their own format and label variant."
    >

      <!-- Portal style legend -->
      <div class="style-legend">
        <span class="style-legend__badge style-legend__badge--bcrb">BCRB</span>
        <span class="style-legend__desc">Excel export — Submit Request + Back to main page</span>
        <span class="style-legend__badge style-legend__badge--bta">BTA</span>
        <span class="style-legend__desc">CSV download — no back button</span>
        <span class="style-legend__badge style-legend__badge--oms">OMS</span>
        <span class="style-legend__desc">PDF export — Download Report</span>
        <span class="style-legend__badge style-legend__badge--soc">SOC/ROC</span>
        <span class="style-legend__desc">Multi-format dropdown (Excel / PDF / CSV / RTF)</span>
      </div>

      <!-- 1. BCRB — Default Excel export (matches screenshot exactly) -->
      <app-variant-section title="BCRB — Export to Excel (default)">
        <div class="section-desc">
          Matches the BCRB Reports portal screenshot: bold "Export to Excel ★" label,
          green Excel icon, full-width blue <strong>Submit Request</strong> and
          <strong>Back to main page</strong> buttons stacked below.
        </div>
        <div class="card-wrap">
          <div class="panel-frame">
            <div class="panel-frame__title">Consumer Monthly Audit Report ( REP-009 )</div>
            <amex-report-download-button
              [config]="{ formats: ['excel'], submitLabel: 'Submit Request', showBack: true, backLabel: 'Back to main page', loading: bcrbLoading() }"
              (download)="onBcrbDownload($event)"
              (back)="onBack('BCRB')"
            ></amex-report-download-button>
            <div class="event-log" *ngIf="lastEvent()">{{ lastEvent() }}</div>
          </div>
        </div>
      </app-variant-section>

      <!-- 2. BTA — CSV download, no back button -->
      <app-variant-section title="BTA — Export to CSV">
        <div class="section-desc">
          BTA Memo Statement portal: single CSV format, custom "Download Report" label, no back button.
        </div>
        <div class="card-wrap">
          <div class="panel-frame">
            <div class="panel-frame__title">BTA Memo Statement</div>
            <amex-report-download-button
              [config]="{ label: 'Export to CSV', formats: ['csv'], submitLabel: 'Download Report', showBack: false }"
              (download)="logEvent('BTA: Download CSV')"
            ></amex-report-download-button>
          </div>
        </div>
      </app-variant-section>

      <!-- 3. OMS — PDF export -->
      <app-variant-section title="OMS — Export to PDF">
        <div class="section-desc">
          OMS / VAT Invoice portal: single PDF format, "Download Report" submit label.
        </div>
        <div class="card-wrap">
          <div class="panel-frame">
            <div class="panel-frame__title">VAT Invoice Report</div>
            <amex-report-download-button
              [config]="{ label: 'Export to PDF', formats: ['pdf'], submitLabel: 'Download Report', showBack: true, backLabel: 'Back to main page' }"
              (download)="logEvent('OMS: Download PDF')"
              (back)="onBack('OMS')"
            ></amex-report-download-button>
          </div>
        </div>
      </app-variant-section>

      <!-- 4. SOC/ROC — Multi-format dropdown -->
      <app-variant-section title="SOC/ROC — Multi-format dropdown">
        <div class="section-desc">
          SOC &amp; ROC portal supports multiple export formats. A dropdown lets the user choose
          Excel, PDF, CSV, or RTF before submitting.
        </div>
        <div class="card-wrap">
          <div class="panel-frame">
            <div class="panel-frame__title">SOC / ROC Report Export</div>
            <amex-report-download-button
              [config]="{ formats: ['excel', 'pdf', 'csv', 'rtf'], label: 'Export Report', submitLabel: 'Submit Request', showBack: true, backLabel: 'Back to main page' }"
              (download)="logEvent('SOC/ROC: Download ' + $event.toUpperCase())"
              (back)="onBack('SOC/ROC')"
            ></amex-report-download-button>
          </div>
        </div>
      </app-variant-section>

      <!-- 5. States: Loading + No Back -->
      <app-variant-section title="States">
        <div class="two-col">
          <!-- Loading -->
          <div class="two-col__col">
            <div class="two-col__label">Loading state (request in-flight)</div>
            <div class="panel-frame">
              <amex-report-download-button
                [config]="{ formats: ['excel'], submitLabel: 'Submit Request', showBack: true, loading: true }"
                (download)="logEvent('Loading: clicked (should be blocked)')"
              ></amex-report-download-button>
            </div>
          </div>
          <!-- No back button -->
          <div class="two-col__col">
            <div class="two-col__label">No back button (modal/inline context)</div>
            <div class="panel-frame">
              <amex-report-download-button
                [config]="{ formats: ['excel'], submitLabel: 'Download Now', showBack: false }"
                (download)="logEvent('Modal context: Download Excel')"
              ></amex-report-download-button>
            </div>
          </div>
        </div>
      </app-variant-section>

    </app-showcase-page>
  `,
  styles: [`
    /* ─── Legend ───────────────────────────────────────────────── */
    .style-legend {
      display: flex; align-items: center; gap: 10px; flex-wrap: wrap;
      margin-bottom: 28px; padding: 10px 14px;
      background: #f9f9f9; border: 1px solid #e8e8e8; border-radius: 4px;
      font-family: Arial, sans-serif; font-size: 12px; color: #666;
    }
    .style-legend__badge {
      padding: 2px 10px; border-radius: 10px;
      font-size: 11px; font-weight: bold; white-space: nowrap;
    }
    .style-legend__badge--bcrb { background: #e3f0ff; color: #006fcf; }
    .style-legend__badge--bta  { background: #e8f5e9; color: #2e7d32; }
    .style-legend__badge--oms  { background: #fce4ec; color: #c62828; }
    .style-legend__badge--soc  { background: #f3e5f5; color: #6a1b9a; }
    .style-legend__desc { margin-right: 8px; }

    /* ─── Section description ───────────────────────────────────── */
    .section-desc {
      font-size: 13px; color: #555; margin-bottom: 18px;
      font-family: Arial, sans-serif; line-height: 1.5;
    }

    /* ─── Panel frame (mimics BCRB content area) ───────────────── */
    .card-wrap { display: flex; justify-content: center; width: 100%; }
    .panel-frame {
      border: 1px solid #ddd;
      border-radius: 4px;
      background: #fff;
      min-width: 420px;
      max-width: 560px;
      width: 100%;
      padding-bottom: 8px;
    }
    .panel-frame__title {
      font-family: Arial, sans-serif;
      font-size: 15px;
      font-weight: 700;
      color: #222;
      text-align: center;
      padding: 20px 24px 4px;
      border-bottom: 1px solid #eee;
      margin-bottom: 0;
    }

    /* ─── Event log ─────────────────────────────────────────────── */
    .event-log {
      margin: 0 24px 12px;
      padding: 6px 10px;
      background: #f0faf0;
      border: 1px solid #b2dfdb;
      border-radius: 3px;
      font-size: 12px;
      color: #2e7d32;
      font-family: monospace;
    }

    /* ─── Two-column layout (States section) ───────────────────── */
    .two-col { display: flex; gap: 24px; width: 100%; flex-wrap: wrap; }
    .two-col__col { flex: 1; min-width: 280px; display: flex; flex-direction: column; gap: 8px; }
    .two-col__label {
      font-family: Arial, sans-serif;
      font-size: 11px; font-weight: bold;
      text-transform: uppercase; letter-spacing: 0.05em;
      color: #555; margin-bottom: 4px;
    }
  `],
})
export class AmexActionsPageComponent {
  lastEvent   = signal('');
  bcrbLoading = signal(false);

  onBcrbDownload(format: ReportFormat): void {
    this.bcrbLoading.set(true);
    this.lastEvent.set(`⬇ Downloading ${format.toUpperCase()} report…`);
    // Simulate async
    setTimeout(() => {
      this.bcrbLoading.set(false);
      this.lastEvent.set(`✓ ${format.toUpperCase()} report downloaded successfully.`);
    }, 1800);
  }

  onBack(portal: string): void {
    this.logEvent(`${portal}: Back to main page clicked`);
  }

  logEvent(msg: string): void {
    this.lastEvent.set(msg);
  }
}
