import { Component, Input, Output, EventEmitter, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../../../primitives/button';
import { BadgeComponent } from '../../../primitives/badge';
import { TableComponent } from '../../../primitives/table';
import { TableHeadComponent } from '../../../primitives/table-head';
import { TableHeaderCellComponent } from '../../../primitives/table-header-cell';
import { TableBodyComponent } from '../../../primitives/table-body';
import { TableRowComponent } from '../../../primitives/table-row';
import { TableCellComponent } from '../../../primitives/table-cell';

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
  imports: [
    CommonModule, ButtonComponent, BadgeComponent, TableComponent, TableHeadComponent, TableHeaderCellComponent,
    TableBodyComponent, TableRowComponent, TableCellComponent,
  ],
  template: `
    <div class="frst">
      <div class="frst__title" *ngIf="title">{{ title }}</div>
      <ui-table class="frst__table" [bordered]="true">
        <ui-table-head>
          <ui-table-row [header]="true" [hoverable]="false">
            <ui-table-header-cell>Submission Date</ui-table-header-cell>
            <ui-table-header-cell>File Name</ui-table-header-cell>
            <ui-table-header-cell>Status</ui-table-header-cell>
            <ui-table-header-cell class="frst__th--actions">Actions</ui-table-header-cell>
          </ui-table-row>
        </ui-table-head>
        <ui-table-body>
          <ui-table-row *ngFor="let row of rows" [hoverable]="true">
            <ui-table-cell>{{ row.submissionDate }}</ui-table-cell>
            <ui-table-cell class="frst__td--file">{{ row.fileName }}</ui-table-cell>
            <ui-table-cell>
              <ui-badge [label]="row.status" [variant]="statusVariant(row.status)" [size]="'sm'"></ui-badge>
            </ui-table-cell>
            <ui-table-cell class="frst__td--actions">
              <ui-button *ngIf="row.canView" class="frst__action-link" label="View" variant="ghost" [size]="'sm'"
                (click)="actionClick.emit({action:'view', row})"></ui-button>
              <ui-button *ngIf="row.canDownload" class="frst__action-link" label="Download" variant="ghost" [size]="'sm'"
                (click)="actionClick.emit({action:'download', row})"></ui-button>
            </ui-table-cell>
          </ui-table-row>
          <ui-table-row *ngIf="!rows.length" [hoverable]="false">
            <ui-table-cell [colspan]="4" [align]="'center'" class="frst__empty">No files found.</ui-table-cell>
          </ui-table-row>
        </ui-table-body>
      </ui-table>
    </div>
  `,
  styles: [`
    :host { display: block; font-family: Arial, sans-serif; }
    .frst__title { font-size: 14px; font-weight: bold; color: #1a3a6b; padding: 0 0 8px; }
    .frst__th--actions { text-align: center; }
    .frst__td--file { color: #1a3a6b; }
    .frst__td--actions { text-align: center; white-space: nowrap; }
    .frst__action-link { --btn-bg: transparent; --btn-color: #1a3a6b; --btn-font-weight: normal; margin: 0 4px; }
    .frst__action-link:hover { text-decoration: underline; }
    .frst__empty { color: #888; font-size: 13px; padding: 24px 0; }
  `],
})
export class AmexFileResponseStatusTableComponent {
  private static _idCounter = 0;
  @HostBinding('attr.id') @Input() id = `file-response-status-table-${++AmexFileResponseStatusTableComponent._idCounter}`;

  @Input() title = '';
  @Input() rows: FileResponseRow[] = [];
  @Output() actionClick = new EventEmitter<{ action: string; row: FileResponseRow }>();

  statusVariant(status: string): 'success' | 'error' | 'warning' | 'primary' | 'neutral' {
    const s = (status || '').toLowerCase();
    if (s === 'pending') return 'warning';
    if (s === 'processing') return 'primary';
    if (s === 'completed') return 'success';
    if (s === 'failed') return 'error';
    return 'neutral';
  }
}