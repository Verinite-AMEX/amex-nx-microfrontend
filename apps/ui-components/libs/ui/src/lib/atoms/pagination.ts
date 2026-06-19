import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ui-pagination',
  standalone: true,
  imports: [CommonModule],
  template: `
    <nav class="pagination" aria-label="Pagination">
      <button class="page-btn" [disabled]="currentPage === 1" (click)="go(currentPage - 1)">‹</button>
      <button *ngFor="let p of pages" class="page-btn" [class.active]="p === currentPage"
        [class.ellipsis]="p === -1" [disabled]="p === -1" (click)="p !== -1 && go(p)">
        {{ p === -1 ? '…' : p }}
      </button>
      <button class="page-btn" [disabled]="currentPage === totalPages" (click)="go(currentPage + 1)">›</button>
    </nav>
  `,
  styles: [`
    .pagination { display: flex; align-items: center; gap: 4px; font-family: Arial, sans-serif; }
    .page-btn {
      min-width: 32px; height: 32px; padding: 0 8px;
      border: 1px solid #e0e0e0; border-radius: 4px;
      background: #fff; color: #333; font-size: 14px;
      cursor: pointer; transition: all 0.15s;
    }
    .page-btn:hover:not(:disabled):not(.active) { background: #f5f5f5; border-color: #bbb; }
    .page-btn.active { background: #1976d2; color: #fff; border-color: #1976d2; font-weight: 600; }
    .page-btn:disabled { opacity: 0.4; cursor: not-allowed; }
    .page-btn.ellipsis { border: none; background: none; cursor: default; }
  `],
})
export class PaginationComponent implements OnChanges {
  @Input() currentPage = 1;
  @Input() totalPages = 1;
  @Output() pageChange = new EventEmitter<number>();

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
}
