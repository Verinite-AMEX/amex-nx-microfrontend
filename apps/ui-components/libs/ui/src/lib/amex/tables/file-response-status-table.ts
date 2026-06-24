import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

export type FileResponseStatus = 'Pending' | 'Processing' | 'Completed' | 'Failed';

export interface FileResponseRow {
  submissionDate: string;
  fileName: string;
  status: FileResponseStatus;
  canView?: boolean;
  canDownload?: boolean;
}

/**
 * FileResponseStatusTable
 * AECB/UAEFTS response file processing status per submission batch.
 * Source: BCRB (AECB Alert, SCRUB), UAEFTS Statements
 * Style: BCRB modern style — white bg, status badges, view/download links
 */
@Component({
  selector: 'amex-file-response-status-table',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="frst">
      <div class="frst__title" *ngIf="title">{{ title }}</div>
      <table class="frst__table">
        <thead>
          <tr class="frst__head-row">
            <th class="frst__th">Submission Date</th>
            <th class="frst__th">File Name</th>
            <th class="frst__th">Status</th>
            <th class="frst__th frst__th--actions">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let row of rows" class="frst__row">
            <td class="frst__td">{{ row.submissionDate }}</td>
            <td class="frst__td frst__td--file">{{ row.fileName }}</td>
            <td class="frst__td">
              <span class="frst__badge frst__badge--{{ row.status.toLowerCase() }}">
                {{ row.status }}
              </span>
            </td>
            <td class="frst__td frst__td--actions">
              <span *ngIf="row.canView"
                class="frst__action-link"
                (click)="actionClick.emit({action:'view', row})">View</span>
              <span *ngIf="row.canDownload"
                class="frst__action-link"
                (click)="actionClick.emit({action:'download', row})">Download</span>
            </td>
          </tr>
          <tr *ngIf="!rows.length">
            <td colspan="4" class="frst__empty">No files found.</td>
          </tr>
        </tbody>
      </table>
    </div>
  `,
  styles: [`
    :host { display: block; font-family: Arial, sans-serif; }
    .frst__title { font-size: 14px; font-weight: bold; color: #1a3a6b; padding: 0 0 8px; }
    .frst__table { width: 100%; border-collapse: collapse; font-size: 13px; }
    .frst__head-row { background: #d6eaf8; }
    .frst__th { padding: 8px 12px; text-align: left; font-size: 12px; font-weight: bold; color: #1a3a6b; border: 1px solid #b8d4ea; }
    .frst__th--actions { text-align: center; }
    .frst__row { border-bottom: 1px solid #eee; }
    .frst__row:hover { background: #f5f9ff; }
    .frst__td { padding: 8px 12px; border: 1px solid #e8eef4; font-size: 13px; color: #333; }
    .frst__td--file { color: #1a3a6b; }
    .frst__td--actions { text-align: center; white-space: nowrap; }

    /* Status badges */
    .frst__badge { padding: 2px 10px; border-radius: 10px; font-size: 11px; font-weight: bold; white-space: nowrap; }
    .frst__badge--pending    { background: #fff8e1; color: #f57f17; }
    .frst__badge--processing { background: #e8eaf6; color: #3949ab; }
    .frst__badge--completed  { background: #e8f5e9; color: #2e7d32; }
    .frst__badge--failed     { background: #ffebee; color: #c62828; }

    .frst__action-link { color: #1a3a6b; cursor: pointer; font-size: 12px; margin: 0 4px; }
    .frst__action-link:hover { text-decoration: underline; }
    .frst__empty { text-align: center; padding: 24px; color: #888; font-size: 13px; }
  `],
})
export class AmexFileResponseStatusTableComponent {
  @Input() title = '';
  @Input() rows: FileResponseRow[] = [];
  @Output() actionClick = new EventEmitter<{ action: string; row: FileResponseRow }>();
}
