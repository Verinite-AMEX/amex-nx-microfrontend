import { Component, Input, Output, EventEmitter, HostListener, ElementRef, ViewChild, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export type ReportFormat = 'excel' | 'pdf' | 'csv' | 'rtf';

export interface ReportDownloadButtonConfig {
  /** Label shown above the format icon, e.g. "Export to Excel" */
  label?: string;
  /** Which formats to show. When more than one is provided a dropdown appears. */
  formats?: ReportFormat[];
  /** Text for the primary action button (default: "Submit Request") */
  submitLabel?: string;
  /** Show the "Back to main page" secondary button (default: true) */
  showBack?: boolean;
  /** Text for the back button (default: "Back to main page") */
  backLabel?: string;
  /** Disable the submit button while a request is in-flight */
  loading?: boolean;
}

const FORMAT_ICON: Record<ReportFormat, { svg: string; label: string }> = {
  excel: {
    label: 'Excel',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 56 56" width="56" height="56">
      <rect width="56" height="56" rx="6" fill="#1D6F42"/>
      <text x="50%" y="38" dominant-baseline="middle" text-anchor="middle"
            font-family="Arial,sans-serif" font-weight="bold" font-size="26" fill="#fff">X</text>
      <rect x="30" y="30" width="22" height="22" rx="3" fill="#fff"/>
      <line x1="33" y1="33" x2="49" y2="49" stroke="#1D6F42" stroke-width="2.5"/>
      <line x1="49" y1="33" x2="33" y2="49" stroke="#1D6F42" stroke-width="2.5"/>
    </svg>`,
  },
  pdf: {
    label: 'PDF',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 56 56" width="56" height="56">
      <rect width="56" height="56" rx="6" fill="#D32F2F"/>
      <text x="50%" y="34" dominant-baseline="middle" text-anchor="middle"
            font-family="Arial,sans-serif" font-weight="bold" font-size="18" fill="#fff">PDF</text>
    </svg>`,
  },
  csv: {
    label: 'CSV',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 56 56" width="56" height="56">
      <rect width="56" height="56" rx="6" fill="#0277BD"/>
      <text x="50%" y="34" dominant-baseline="middle" text-anchor="middle"
            font-family="Arial,sans-serif" font-weight="bold" font-size="18" fill="#fff">CSV</text>
    </svg>`,
  },
  rtf: {
    label: 'RTF',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 56 56" width="56" height="56">
      <rect width="56" height="56" rx="6" fill="#6A1B9A"/>
      <text x="50%" y="34" dominant-baseline="middle" text-anchor="middle"
            font-family="Arial,sans-serif" font-weight="bold" font-size="18" fill="#fff">RTF</text>
    </svg>`,
  },
};

@Component({
  selector: 'amex-report-download-button',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="amex-rdb" role="region" aria-label="Report download options">
      <!-- Label row: "Export to Excel ★" -->
      <div class="amex-rdb__label" id="download-label">
        {{ resolvedLabel }}
        <span class="amex-rdb__star" aria-label="required field">&#9733;</span>
      </div>

      <!-- Format icon or dropdown -->
      <div class="amex-rdb__icon-row">
        <ng-container *ngIf="multiFormat; else singleIcon">
          <!-- Dropdown when multiple formats -->
          <select class="amex-rdb__dropdown" 
                  [(ngModel)]="selectedFormat"
                  aria-labelledby="download-label"
                  aria-label="Select report format"
                  (keydown)="onKeydown($event)"
                  #formatSelect>
            <option *ngFor="let f of resolvedFormats" [value]="f">
              {{ FORMAT_ICON[f].label }}
            </option>
          </select>
        </ng-container>
        <ng-template #singleIcon>
          <!-- Big icon for single format, matches BCRB screenshot -->
          <span
            class="amex-rdb__svg-icon"
            [innerHTML]="FORMAT_ICON[selectedFormat].svg"
            role="img"
            [attr.aria-label]="FORMAT_ICON[selectedFormat].label + ' format icon'"
            tabindex="0"
            (keydown)="onIconKeydown($event)"
            #formatIcon
          ></span>
        </ng-template>
      </div>

      <!-- Primary blue "Submit Request" button -->
      <button
        class="amex-rdb__btn amex-rdb__btn--primary"
        [disabled]="config.loading"
        (click)="onSubmit()"
        (keydown)="onKeydown($event)"
        [attr.aria-pressed]="config.loading ? 'true' : 'false'"
        [attr.aria-label]="config.loading ? 'Processing download request, please wait' : (config.submitLabel || 'Submit Request for ' + FORMAT_ICON[selectedFormat].label + ' format')"
        type="submit"
        #submitButton
      >
        <span *ngIf="config.loading" class="amex-rdb__spinner" aria-hidden="true"></span>
        <span *ngIf="config.loading" class="sr-only">Processing download request</span>
        {{ config.loading ? 'Processing…' : (config.submitLabel || 'Submit Request') }}
      </button>

      <!-- Secondary "Back to main page" button -->
      <button
        *ngIf="showBack"
        class="amex-rdb__btn amex-rdb__btn--secondary"
        (click)="back.emit()"
        (keydown)="onKeydown($event)"
        [attr.aria-label]="config.backLabel || 'Back to main page'"
        type="button"
        #backButton
      >
        {{ config.backLabel || 'Back to main page' }}
      </button>
    </div>
  `,
  styles: [`
    /* ─── Container ────────────────────────────────────────────── */
    .amex-rdb {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 14px;
      padding: 32px 24px;
      background: #fff;
      font-family: Arial, sans-serif;
      max-width: 480px;
      margin: 0 auto;
    }

    /* ─── "Export to Excel ★" label ────────────────────────────── */
    .amex-rdb__label {
      font-size: 15px;
      font-weight: 700;
      color: #222;
      text-align: center;
      letter-spacing: 0.01em;
    }
    .amex-rdb__star {
      color: #c0392b;
      margin-left: 3px;
      font-size: 14px;
    }

    /* ─── Icon area ─────────────────────────────────────────────── */
    .amex-rdb__icon-row {
      display: flex;
      justify-content: center;
      margin-bottom: 4px;
    }
    .amex-rdb__svg-icon {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 64px;
      height: 64px;
      cursor: default;
    }
    .amex-rdb__svg-icon ::ng-deep svg {
      width: 64px;
      height: 64px;
      border-radius: 8px;
      box-shadow: 0 2px 6px rgba(0,0,0,0.18);
    }

    /* ─── Multi-format dropdown ──────────────────────────────────  */
    .amex-rdb__dropdown {
      padding: 7px 32px 7px 12px;
      border: 1px solid #bbb;
      border-radius: 4px;
      font-size: 13px;
      background: #fff;
      color: #222;
      cursor: pointer;
      outline: none;
      min-width: 160px;
    }
    .amex-rdb__dropdown:focus { 
      border-color: #016FD0;
      outline: 2px solid #016FD0;
      outline-offset: 2px;
    }

    /* ─── Buttons ────────────────────────────────────────────────  */
    .amex-rdb__btn {
      width: 100%;
      max-width: 380px;
      padding: 11px 20px;
      border: none;
      border-radius: 4px;
      font-size: 14px;
      font-weight: 600;
      cursor: pointer;
      transition: background 0.15s, opacity 0.15s;
      letter-spacing: 0.02em;
    }
    .amex-rdb__btn--primary {
      background: #016FD0;
      color: #fff;
    }
    .amex-rdb__btn--primary:hover:not(:disabled) { background: #0157a8; }
    .amex-rdb__btn--primary:disabled { opacity: 0.55; cursor: not-allowed; }

    .amex-rdb__btn--secondary {
      background: #016FD0;
      color: #fff;
    }
    .amex-rdb__btn--secondary:hover { background: #0157a8; }
    
    .amex-rdb__btn:focus {
      outline: 2px solid #016FD0;
      outline-offset: 2px;
    }
    
    .amex-rdb__svg-icon:focus {
      outline: 2px solid #016FD0;
      outline-offset: 2px;
      border-radius: 8px;
    }

    /* ─── Loading spinner ────────────────────────────────────────  */
    .amex-rdb__spinner {
      display: inline-block;
      width: 12px;
      height: 12px;
      border: 2px solid rgba(255,255,255,0.4);
      border-top-color: #fff;
      border-radius: 50%;
      animation: amex-spin 0.7s linear infinite;
      margin-right: 8px;
      vertical-align: middle;
    }
    @keyframes amex-spin { to { transform: rotate(360deg); } }
    
    /* Accessibility */
    .sr-only {
      position: absolute;
      width: 1px;
      height: 1px;
      padding: 0;
      margin: -1px;
      overflow: hidden;
      clip: rect(0, 0, 0, 0);
      white-space: nowrap;
      border: 0;
    }
  `],
})
export class AmexReportDownloadButtonComponent {
  @Input() config: ReportDownloadButtonConfig = {};

  /** Emits the chosen format when "Submit Request" is clicked */
  @Output() download = new EventEmitter<ReportFormat>();

  /** Emits when "Back to main page" is clicked */
  @Output() back = new EventEmitter<void>();

  /** Expose icon map to template */
  readonly FORMAT_ICON = FORMAT_ICON;

  @ViewChild('formatSelect') formatSelect!: ElementRef<HTMLSelectElement>;
  @ViewChild('formatIcon') formatIcon!: ElementRef<HTMLSpanElement>;
  @ViewChild('submitButton') submitButton!: ElementRef<HTMLButtonElement>;
  @ViewChild('backButton') backButton!: ElementRef<HTMLButtonElement>;

  selectedFormat: ReportFormat = 'excel';


  get resolvedFormats(): ReportFormat[] {
    return this.config.formats?.length ? this.config.formats : ['excel'];
  }

  get multiFormat(): boolean {
    return this.resolvedFormats.length > 1;
  }

  get showBack(): boolean {
    return this.config.showBack !== false;
  }

  get resolvedLabel(): string {
    if (this.config.label) return this.config.label;
    const map: Record<ReportFormat, string> = {
      excel: 'Export to Excel',
      pdf:   'Export to PDF',
      csv:   'Export to CSV',
      rtf:   'Export to RTF',
    };
    return map[this.selectedFormat] ?? 'Export Report';
  }

  ngAfterViewInit() {
    // Set initial focus to submit button
    if (this.submitButton) {
      this.submitButton.nativeElement.focus();
    }
  }

  onKeydown(event: KeyboardEvent): void {
    // Handle Enter and Space keys for buttons
    if (event.key === 'Enter' || event.key === ' ') {
      if (event.target === this.submitButton?.nativeElement) {
        event.preventDefault();
        this.onSubmit();
      } else if (event.target === this.backButton?.nativeElement) {
        event.preventDefault();
        this.back.emit();
      }
    }
  }

  onIconKeydown(event: KeyboardEvent): void {
    // Handle keyboard interaction with format icon
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      // Announce current format to screen readers
      this.announceFormat();
    }
  }

  onSubmit(): void {
    if (!this.config.loading) {
      this.download.emit(this.selectedFormat);
    }
  }

  announceFormat(): void {
    // Create a temporary announcement for screen readers
    const announcement = document.createElement('div');
    announcement.setAttribute('role', 'status');
    announcement.setAttribute('aria-live', 'polite');
    announcement.className = 'sr-only';
    announcement.textContent = `Selected format: ${this.FORMAT_ICON[this.selectedFormat].label}`;
    document.body.appendChild(announcement);
    
    // Remove after announcement
    setTimeout(() => {
      document.body.removeChild(announcement);
    }, 1000);
  }

  @HostListener('keydown', ['$event'])
  handleGlobalKeydown(event: KeyboardEvent): void {
    // Handle Escape key to reset focus
    if (event.key === 'Escape') {
      this.submitButton?.nativeElement.focus();
    }
  }
}
