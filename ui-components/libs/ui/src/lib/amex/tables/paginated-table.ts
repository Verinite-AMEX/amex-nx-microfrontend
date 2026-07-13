import { Component, Input, Output, EventEmitter, OnChanges, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface AmexPaginatedColumn {
  key: string;
  label: string;
  isLink?: boolean;    /* render as blue link */
  isStatus?: boolean;  /* render as colored status text */
}

@Component({
  selector: 'amex-paginated-table',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="pt">
      <table class="pt__table">
        <thead>
          <tr class="pt__head-row">
            <th *ngFor="let col of columns" class="pt__th" scope="col">{{ col.label }}</th>
            <th *ngIf="actions.length" class="pt__th" scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let row of pageRows; let i = index"
            class="pt__row" [class.pt__row--alt]="i % 2 === 1">
            <td *ngFor="let col of columns" class="pt__td">
              <span *ngIf="col.isLink" class="pt__link" (click)="cellClick.emit({key:col.key,row})">
                {{ row[col.key] }}
              </span>
              <span *ngIf="col.isStatus" class="pt__status"
                [ngClass]="statusClass(row[col.key])">
                {{ row[col.key] }}
              </span>
              <span *ngIf="!col.isLink && !col.isStatus">{{ row[col.key] }}</span>
            </td>
            <td *ngIf="actions.length" class="pt__td pt__td--actions">
              <button *ngFor="let act of actions"
                class="pt__action-btn"
                [ngClass]="'pt__action-btn--' + act.type"
                (click)="actionClick.emit({action:act.id,row})">
                {{ act.label }}
              </button>
            </td>
          </tr>
          <tr *ngIf="!pageRows.length">
            <td [colSpan]="columns.length + (actions.length ? 1 : 0)" class="pt__empty">
              No Data Found
            </td>
          </tr>
        </tbody>
      </table>

      <!-- Pagination bar — matches BCRB screenshot exactly -->
      <div class="pt__pager">
        <span class="pt__per-page-label">Items per page:</span>
        <select class="pt__per-page-select" [(ngModel)]="pageSize" (ngModelChange)="onPageSizeChange()">
          <option *ngFor="let s of pageSizeOptions" [value]="s">{{ s }}</option>
        </select>
        <span class="pt__range">{{ rangeLabel }}</span>
        <div class="pt__btns">
          <button class="pt__btn" (click)="goFirst()" [disabled]="page === 1" title="First">|&lt;</button>
          <button class="pt__btn" (click)="goPrev()"  [disabled]="page === 1" title="Previous">&lt;</button>
          <button class="pt__btn" (click)="goNext()"  [disabled]="page === totalPages" title="Next">&gt;</button>
          <button class="pt__btn" (click)="goLast()"  [disabled]="page === totalPages" title="Last">&gt;|</button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host { display: block; font-family: Arial, sans-serif; }

    .pt { background: #fff; }
    .pt__table { width: 100%; border-collapse: collapse; font-size: 13px; }

    /* Header — matches BCRB: plain white/light with bottom border */
    .pt__head-row { background: #fff; border-bottom: 2px solid #dde3ea; }
    .pt__th {
      padding: 10px 14px; text-align: left; color: #333;
      font-size: 13px; font-weight: normal;
      border-bottom: 1px solid #dde3ea;
    }

    .pt__row { background: #fff; }
    .pt__row--alt { background: #fafbfc; }
    .pt__row:hover { background: #f0f7ff; }
    .pt__td {
      padding: 8px 14px; border-bottom: 1px solid #eef1f4;
      font-size: 13px; color: #333;
    }
    .pt__td--actions { white-space: nowrap; }

    .pt__link { color: #1a3a6b; cursor: pointer; font-weight: normal; }
    .pt__link:hover { text-decoration: underline; }

    /* Status — red text for errors (matches BCRB "NO RESPONSE FROM BACKEND" red) */
    .pt__status { font-weight: normal; }
    .pt__status--error    { color: #c62828; font-weight: bold; }
    .pt__status--pending  { color: #f57f17; }
    .pt__status--completed { color: #2e7d32; }
    .pt__status--processing { color: #1565c0; }
    .pt__status--failed   { color: #c62828; font-weight: bold; }

    .pt__action-btn {
      border: none; padding: 4px 12px; font-size: 12px;
      cursor: pointer; border-radius: 3px; margin: 2px;
      font-family: Arial, sans-serif;
    }
    .pt__action-btn--primary { background: #1976d2; color: #fff; }
    .pt__action-btn--danger  { background: #e53935; color: #fff; }
    .pt__action-btn--default { background: #546e7a; color: #fff; }

    .pt__empty {
      text-align: center; padding: 32px; font-size: 14px;
      font-weight: bold; color: #333;
    }

    /* Pagination bar — matches BCRB screenshot: right-aligned, items per page + arrows */
    .pt__pager {
      display: flex; align-items: center; justify-content: flex-end;
      gap: 8px; padding: 8px 14px;
      border-top: 1px solid #dde3ea; font-size: 13px; color: #555;
    }
    .pt__per-page-label { white-space: nowrap; }
    .pt__per-page-select {
      border: 1px solid #bbb; padding: 2px 6px; font-size: 12px;
      font-family: Arial, sans-serif; border-radius: 2px;
    }
    .pt__range { min-width: 64px; text-align: right; color: #555; }
    .pt__btns { display: flex; gap: 2px; }
    .pt__btn {
      background: none; border: 1px solid #ccc; color: #555;
      width: 28px; height: 28px; font-size: 13px; cursor: pointer;
      border-radius: 2px; display: flex; align-items: center; justify-content: center;
      font-family: Arial, sans-serif; padding: 0;
    }
    .pt__btn:hover:not([disabled]) { background: #e8f0fe; color: #1a3a6b; border-color: #1a3a6b; }
    .pt__btn[disabled] { opacity: 0.35; cursor: default; }
  `],
})
export class AmexPaginatedTableComponent implements OnChanges {
  private static _idCounter = 0;
  @HostBinding('attr.id') readonly id = `paginated-table-${++AmexPaginatedTableComponent._idCounter}`;


  @Input() columns: AmexPaginatedColumn[] = [];
  @Input() rows: Record<string, any>[] = [];
  @Input() actions: { id: string; label: string; type: string }[] = [];
  @Input() initialPageSize = 5;
  @Input() pageSize = 5;
  @Output() actionClick = new EventEmitter<{ action: string; row: any }>();
  @Output() cellClick = new EventEmitter<{ key: string; row: any }>();

  page = 1;
  
  pageSizeOptions = [5, 10, 20, 50];

  get totalPages() { return Math.max(1, Math.ceil(this.rows.length / this.pageSize)); }
  get pageRows() {
    const start = (this.page - 1) * this.pageSize;
    return this.rows.slice(start, start + this.pageSize);
  }
  get rangeLabel() {
    if (!this.rows.length) return '0 of 0';
    const start = (this.page - 1) * this.pageSize + 1;
    const end = Math.min(this.page * this.pageSize, this.rows.length);
    return `${start} – ${end} of ${this.rows.length}`;
  }

  ngOnChanges() { this.pageSize = this.initialPageSize; this.page = 1; }

  goFirst() { this.page = 1; }
  goPrev()  { if (this.page > 1) this.page--; }
  goNext()  { if (this.page < this.totalPages) this.page++; }
  goLast()  { this.page = this.totalPages; }
  onPageSizeChange() { this.page = 1; }

  statusClass(val: string) {
    const v = (val || '').toLowerCase();
    if (v.includes('error') || v.includes('no response') || v.includes('fail') || v.includes('contact admin')) return 'pt__status--error';
    if (v.includes('pending')) return 'pt__status--pending';
    if (v.includes('complet')) return 'pt__status--completed';
    if (v.includes('process')) return 'pt__status--processing';
    return '';
  }
}
