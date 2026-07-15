import { Component, Input, Output, EventEmitter, OnChanges, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'ui-pagination',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <nav class="pagination" aria-label="Pagination">
      <!-- Numbered variant (default, unchanged) -->
      <ng-container *ngIf="variant === 'numbered'">
        <button class="page-btn" [disabled]="currentPage === 1" (click)="go(currentPage - 1)">‹</button>
        <button *ngFor="let p of pages" class="page-btn" [class.active]="p === currentPage"
          [class.ellipsis]="p === -1" [disabled]="p === -1" (click)="p !== -1 && go(p)">
          {{ p === -1 ? '…' : p }}
        </button>
        <button class="page-btn" [disabled]="currentPage === totalPages" (click)="go(currentPage + 1)">›</button>
      </ng-container>

      <!-- Compact variant: first/prev/next/last arrows, no page-number list -->
      <ng-container *ngIf="variant === 'compact'">
        <span *ngIf="showPageSizeSelector" class="page-size-label">{{ pageSizeLabel }}</span>
        <select *ngIf="showPageSizeSelector" class="page-size-select"
          [class.native-appearance]="pageSizeNativeAppearance"
          [ngModel]="pageSize" (ngModelChange)="onPageSizeChange($event)">
          <option *ngFor="let s of pageSizeOptions" [value]="s">{{ s }}</option>
        </select>
        <span *ngIf="showRangeLabel" class="range-label">{{ rangeLabel }}</span>
        <button *ngIf="showFirstLast" class="page-btn" [disabled]="currentPage === 1" (click)="go(1)" title="First">|&lt;</button>
        <button class="page-btn" [disabled]="currentPage === 1" (click)="go(currentPage - 1)" title="Previous">&lt;</button>
        <button class="page-btn" [disabled]="currentPage === totalPages" (click)="go(currentPage + 1)" title="Next">&gt;</button>
        <button *ngIf="showFirstLast" class="page-btn" [disabled]="currentPage === totalPages" (click)="go(totalPages)" title="Last">&gt;|</button>
      </ng-container>
    </nav>
  `,
  styles: [`
    .pagination { display: flex; align-items: center; gap: var(--pagination-gap, 4px); font-family: Arial, sans-serif; }
    .page-btn {
      min-width: var(--pagination-btn-size, 32px); height: var(--pagination-btn-size, 32px); padding: 0 8px;
      border: var(--pagination-btn-border, 1px solid #e0e0e0); border-radius: var(--pagination-btn-radius, 4px);
      background: var(--pagination-btn-bg, #fff); color: var(--pagination-btn-color, #333);
      font-size: var(--pagination-font-size, 14px);
      cursor: pointer; transition: all 0.15s; font-family: Arial, sans-serif;
    }
    .page-btn:hover:not(:disabled):not(.active) { background: var(--pagination-btn-hover-bg, #f5f5f5); border-color: #bbb; }
    .page-btn.active {
      background: var(--pagination-active-bg, #1976d2); color: var(--pagination-active-color, #fff);
      border-color: var(--pagination-active-bg, #1976d2); font-weight: 600;
    }
    .page-btn:disabled { opacity: 0.4; cursor: not-allowed; }
    .page-btn.ellipsis { border: none; background: none; cursor: default; }
    .page-size-label { font-size: var(--pagination-font-size, 13px); color: var(--pagination-btn-color, #555); white-space: nowrap; }
    .page-size-select {
      border: var(--pagination-btn-border, 1px solid #bbb); padding: 2px 6px; font-size: var(--pagination-font-size, 12px);
      font-family: Arial, sans-serif; border-radius: var(--pagination-btn-radius, 2px); appearance: none;
    }
    .page-size-select.native-appearance { appearance: auto; -webkit-appearance: auto; -moz-appearance: auto; }
    .range-label { font-size: var(--pagination-font-size, 13px); color: var(--pagination-btn-color, #555); min-width: 64px; text-align: right; white-space: nowrap; }
  `],
})
export class PaginationComponent implements OnChanges {
  private static _idCounter = 0;
  @HostBinding('attr.id') @Input() id = `ui-pagination-${++PaginationComponent._idCounter}`;

  @Input() currentPage = 1;
  @Input() totalPages = 1;
  @Output() pageChange = new EventEmitter<number>();

  /** 'numbered' (default, existing behavior) or 'compact' (arrows + optional range/page-size UI). */
  @Input() variant: 'numbered' | 'compact' = 'numbered';
  @Input() showFirstLast = false;
  @Input() showRangeLabel = false;
  @Input() rangeLabel = '';
  @Input() showPageSizeSelector = false;
  @Input() pageSizeLabel = 'Items per page:';
  @Input() pageSize = 10;
  @Input() pageSizeOptions = [5, 10, 20, 50];
  @Input() pageSizeNativeAppearance = false;
  @Output() pageSizeChange = new EventEmitter<number>();

  pages: number[] = [];

  ngOnChanges() { this.buildPages(); }

  buildPages() {
    const total = this.totalPages, cur = this.currentPage;
    if (total <= 7) { this.pages = Array.from({ length: total }, (_, i) => i + 1); return; }
    const p: number[] = [1];
    if (cur > 3) p.push(-1);
    for (let i = Math.max(2, cur - 1); i <= Math.min(total - 1, cur + 1); i++) p.push(i);
    if (cur < total - 2) p.push(-1);
    p.push(total);
    this.pages = p;
  }

  go(page: number) {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
    this.buildPages();
    this.pageChange.emit(page);
  }

  onPageSizeChange(size: number) {
    this.pageSize = +size;
    this.pageSizeChange.emit(this.pageSize);
  }
}