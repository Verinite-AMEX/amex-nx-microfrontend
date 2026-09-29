import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  HostBinding,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

/**
 * DLS ships TWO pagination markups: `.pagination` (legacy — an absolutely
 * positioned sliding `.selector` highlight behind the current page) and
 * `.paginationV2` (flex-based, no sliding highlight — the current page is
 * just colored directly, and `.paginationV2 .selector { display: none }`
 * explicitly turns the old sliding mechanism off). This rewrite uses
 * `.paginationV2` — it's simpler, doesn't require replicating DLS's
 * pixel-position sliding-highlight JS/math, and its own CSS shows it as
 * the one DLS itself is steering toward. Flag if the legacy sliding-highlight
 * look is actually required instead.
 *
 * ELLIPSIS: DLS doesn't have a generic "ellipsis" class. What it actually
 * defines are two POSITION-specific non-interactive markers baked into
 * the page-list structure itself: `.item.afterFirst` (sits right after
 * the first page) and `.item.beforeLast` (sits right before the last
 * page) — both styled as plain, non-clickable grey text. The existing
 * buildPages() algorithm already only ever inserts a `-1` sentinel in
 * those exact two positions (index 1, and index length-2), so mapping
 * onto DLS's real classes is exact, not approximate.
 *
 * PAGE-SIZE SELECTOR: has no DLS-specific styling in pagination.css at
 * all — DLS's pagination doesn't define a page-size dropdown. Kept using
 * a native <select class="formControl">, reusing DLS's real form-control
 * class from the Inputs upgrade (forms.css) rather than inventing new
 * dropdown styling here.
 *
 * ICON FIX (correction from earlier components, and a second correction
 * after checking further): DLS's icon font requires TWO classes together,
 * not one. `.dlsGlyphLeft::before` etc. (also in iconography.css) only set
 * *which* character to show (`content: "\eafa"`) — the actual
 * `font-family: "dls-icons-2.31.4"` declaration lives on a separate
 * `.icon::before`/`.glyph::before` rule. Without that companion class
 * present, the private-use-area character renders in whatever font is
 * already active (Nunito Sans), which has no glyph there — a tofu box —
 * and critically, since the icon font was never actually invoked by
 * anything on the page, the browser correctly never even requests
 * dls-icons.woff2 (confirmed: no font request appeared in Network tab
 * until `icon` was added alongside `dlsGlyphLeft` below). Both classes
 * are required together: `class="icon dlsGlyphLeft"`.
 *
 * This requirement is specific to iconography.css's font-based icons.
 * `.collapsibleCaret`/`.btnIcon` (used in Accordion/Button) are unrelated
 * and unaffected — they render via an embedded SVG `background-image`,
 * not the icon font, so they don't need `.icon`/`.glyph` alongside them.
 */
@Component({
  selector: 'ui-pagination',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <nav class="paginationV2" aria-label="Pagination">
      <button
        *ngIf="variant === 'compact' && showFirstLast"
        class="prev"
        [disabled]="currentPage === 1"
        (click)="go(1)"
        title="First"
      >
        <span class="icon dlsGlyphDoubleLeft" aria-hidden="true"></span>
      </button>

      <button
        class="prev"
        [disabled]="currentPage === 1"
        (click)="go(currentPage - 1)"
        title="Previous"
      >
        <span class="icon dlsGlyphLeft" aria-hidden="true"></span>
      </button>

      <span
        *ngIf="variant === 'compact' && showPageSizeSelector"
        class="page-size-label"
        >{{ pageSizeLabel }}</span
      >
      <select
        *ngIf="variant === 'compact' && showPageSizeSelector"
        class="formControl page-size-select"
        [class.native-appearance]="pageSizeNativeAppearance"
        [ngModel]="pageSize"
        (ngModelChange)="onPageSizeChange($event)"
      >
        <option *ngFor="let s of pageSizeOptions" [value]="s">{{ s }}</option>
      </select>
      <span
        *ngIf="variant === 'compact' && showRangeLabel"
        class="range-label"
        >{{ rangeLabel }}</span
      >

      <div class="pageList" *ngIf="variant === 'numbered'">
        <ng-container *ngFor="let p of pages; let i = index">
          <div
            class="itemContainer"
            [class.current]="p === currentPage"
            *ngIf="p !== -1"
          >
            <button
              class="item"
              [class.first]="i === 0"
              [class.last]="i === pages.length - 1"
              [attr.aria-current]="p === currentPage ? 'page' : null"
              [attr.aria-label]="'Page ' + p"
              (click)="go(p)"
            >
              <span>{{ p }}</span>
            </button>
          </div>
          <span
            *ngIf="p === -1"
            class="item"
            [class.afterFirst]="i === 1"
            [class.beforeLast]="i === pages.length - 2"
            aria-hidden="true"
            >…</span
          >
        </ng-container>
      </div>

      <button
        class="next"
        [disabled]="currentPage === totalPages"
        (click)="go(currentPage + 1)"
        title="Next"
      >
        <span class="icon dlsGlyphRight" aria-hidden="true"></span>
      </button>

      <button
        *ngIf="variant === 'compact' && showFirstLast"
        class="next"
        [disabled]="currentPage === totalPages"
        (click)="go(totalPages)"
        title="Last"
      >
        <span class="icon dlsGlyphDoubleRight" aria-hidden="true"></span>
      </button>
    </nav>
  `,
  styles: [
    // Layout-only glue for the page-size dropdown/label — pagination.css
    // has no equivalent since DLS's pagination doesn't define one.
    `
      .page-size-label,
      .range-label {
        font-size: 0.8125rem;
        color: #53565a;
        white-space: nowrap;
        margin: 0 0.5rem;
      }
      .page-size-select {
        margin: 0 0.5rem;
      }
    `,
  ],
})
export class PaginationComponent implements OnChanges {
  private static _idCounter = 0;
  @HostBinding('attr.id') @Input() id =
    `ui-pagination-${++PaginationComponent._idCounter}`;

  @Input() currentPage = 1;
  @Input() totalPages = 1;
  @Output() pageChange = new EventEmitter<number>();

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

  ngOnChanges() {
    this.buildPages();
  }

  buildPages() {
    const total = this.totalPages,
      cur = this.currentPage;
    if (total <= 7) {
      this.pages = Array.from({ length: total }, (_, i) => i + 1);
      return;
    }
    const p: number[] = [1];
    if (cur > 3) p.push(-1);
    for (let i = Math.max(2, cur - 1); i <= Math.min(total - 1, cur + 1); i++)
      p.push(i);
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