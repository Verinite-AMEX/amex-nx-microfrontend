import {
  Component,
  Input,
  Output,
  EventEmitter,
  ElementRef,
  ViewChild,
  OnChanges,
  SimpleChanges,
  OnDestroy,
  HostBinding,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconButtonComponent } from '../primitives/icon-button';

@Component({
  selector: 'ui-modal',
  standalone: true,
  imports: [CommonModule, IconButtonComponent],
  template: `
    <div *ngIf="open" class="modal" role="presentation">
      <div
        class="modalScreen"
        (click)="onBackdropClick($event)"
      >
        <div
          #dialog
          class="card cardRounded ui-modal-dialog ui-modal-dialog--{{ size }}"
          role="dialog"
          aria-modal="true"
          tabindex="-1"
          [attr.aria-label]="ariaLabel || title"
          [attr.aria-describedby]="ariaDescribedBy"
        >
          <header class="ui-modal-header">
            <h2 class="heading3 ui-modal-title" id="modal-title-{{ uniqueId }}">
              {{ title }}
            </h2>
            <ui-icon-button
              icon="✕"
              variant="ghost"
              size="sm"
              ariaLabel="Close modal"
              [ariaDescribedBy]="title ? 'modal-title-' + uniqueId : ''"
              (clicked)="closed.emit()"
            >
            </ui-icon-button>
          </header>
          <div
            class="body1 ui-modal-body"
            [attr.aria-labelledby]="title ? 'modal-title-' + uniqueId : null"
          >
            <ng-content></ng-content>
          </div>
          <div *ngIf="hasFooter" class="ui-modal-footer">
            <ng-content select="[slot=footer]"></ng-content>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [
    // .modal (full-viewport fixed wrapper) and .modalScreen (dark backdrop +
    // centering) are DLS's real classes from modal.css — note DLS's naming
    // is inverted from what you'd expect: .modal is NOT the visible box,
    // it's the outer positioning layer; .modalScreen carries the dark tint.
    //
    // The dialog box itself has no dedicated DLS class — DLS styles
    // div[role=dialog] directly and expects its visual look (background,
    // shadow, radius) to come from .card/.cardRounded, the same real classes
    // used everywhere else in this project. Also picks up DLS's real focus
    // style for free: .modal div[role=dialog]:focus gets a white dashed
    // outline (designed for the dark backdrop) — the previous version had no
    // visible focus indicator on the dialog root at all when focus-trapping
    // activated.
    //
    // Header padding (5px 5px 5px 20px, asymmetric to make room for the
    // close button) is DLS's real value from ".modal header". DLS's own
    // ".modal header button::before" close-icon glyph relies on an icon-font
    // pseudo-element — given we've already found other icon-font/pseudo-
    // element rules missing from this compiled bundle (collapsibleCaret),
    // kept the existing ui-icon-button here instead of gambling on it, since
    // it already provides a robust, properly-labeled close control.
    //
    // Title now uses DLS's real .heading3 (600 weight) instead of a
    // hand-picked 18px/600/#333, and the body wrapper uses .body1 so
    // projected content inherits DLS's real typography by default.
    //
    // Deliberately KEPT custom, not forced into DLS's exact spec:
    // - Pinned header/footer with only the body scrolling (DLS's own spec
    //   scrolls the whole dialog together) — this preserves existing
    //   behavior, which is arguably better UX for modals with footer
    //   actions. Flag if you'd rather match DLS's simpler behavior exactly.
    // - sm/md/lg width tiers — DLS's real dialog has no width-tier system at
    //   all, just a single max-height rule, so there's nothing to call here.
    // - Backdrop tint now uses DLS's real rgba(0,0,0,.4) via .modalScreen
    //   (was a custom .45 before — effectively unnoticeable difference, now
    //   sourced from DLS instead of invented).
    `
      .ui-modal-dialog {
        /* DLS's real .card class sets height:100% (correct for a regular
           card sitting in a sized grid cell, wrong here) - since modalScreen
           has a definite height (100% of the fixed full-viewport backdrop),
           that 100% resolves to the ENTIRE screen height, stretching the
           dialog box far past its actual content and pushing the footer to
           the bottom with a large empty gap. Overriding back to auto so the
           dialog sizes to its own content instead. */
        height: auto;
        width: 100%;
        max-height: 90vh;
        display: flex;
        flex-direction: column;
        margin: 16px;
      }
      .ui-modal-dialog--sm {
        max-width: 400px;
      }
      .ui-modal-dialog--md {
        max-width: 560px;
      }
      .ui-modal-dialog--lg {
        max-width: 800px;
      }
      .ui-modal-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-bottom: 1px solid #ecedee;
      }
      .ui-modal-title {
        margin: 0;
      }
      .ui-modal-body {
        padding: 20px;
        overflow-y: auto;
        flex: 1;
      }
      .ui-modal-footer {
        padding: 12px 20px;
        border-top: 1px solid #ecedee;
        display: flex;
        justify-content: flex-end;
        gap: 8px;
      }
    `,
  ],
})
export class ModalComponent implements OnChanges, OnDestroy {
  private static _idCounter = 0;
  @HostBinding('attr.id') @Input() id =
    `ui-modal-${++ModalComponent._idCounter}`;

  @Input() open = false;
  @Input() title = '';
  @Input() size: 'sm' | 'md' | 'lg' = 'md';
  @Input() closeOnBackdrop = true;
  @Input() hasFooter = false;
  @Input() ariaLabel = '';
  @Input() ariaDescribedBy = '';
  @Output() closed = new EventEmitter<void>();
  @ViewChild('dialog', { static: false }) dialogRef!: ElementRef<HTMLElement>;

  uniqueId = Math.random().toString(36).substr(2, 9);

  private previouslyFocused?: Element | null = null;
  private onKeydown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      e.stopPropagation();
      this.closeInternal();
    } else if (e.key === 'Tab') {
      this.maintainFocus(e);
    }
  };

  ngOnChanges(changes: SimpleChanges) {
    if (changes['open']) {
      if (this.open) {
        this.trapFocus();
      } else {
        this.restoreFocus();
      }
    }
  }

  ngOnDestroy() {
    this.restoreFocus();
    document.removeEventListener('keydown', this.onKeydown, true);
  }

  onBackdropClick(e: MouseEvent) {
    if (
      this.closeOnBackdrop &&
      (e.target as HTMLElement).classList.contains('modalScreen')
    ) {
      this.closeInternal();
    }
  }

  closeInternal() {
    this.closed.emit();
    this.restoreFocus();
  }

  private trapFocus() {
    this.previouslyFocused = document.activeElement;
    setTimeout(() => {
      try {
        this.dialogRef?.nativeElement?.focus();
      } catch (e) {
        /* ignore */
      }
    });
    document.addEventListener('keydown', this.onKeydown, true);
  }

  private restoreFocus() {
    document.removeEventListener('keydown', this.onKeydown, true);
    try {
      const el = this.previouslyFocused as HTMLElement | null | undefined;
      if (el && typeof (el as HTMLElement).focus === 'function') {
        (el as HTMLElement).focus();
      }
    } catch (e) {
      /* ignore */
    }
    this.previouslyFocused = null;
  }

  private maintainFocus(e: KeyboardEvent) {
    const dialog = this.dialogRef?.nativeElement;
    if (!dialog) return;
    const focusable = Array.from(
      dialog.querySelectorAll<HTMLElement>(
        'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex]:not([tabindex="-1"]), [contenteditable]',
      ),
    ).filter(
      (el) =>
        el.offsetWidth > 0 ||
        el.offsetHeight > 0 ||
        el === document.activeElement,
    );

    if (focusable.length === 0) {
      e.preventDefault();
      dialog.focus();
      return;
    }

    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    const active = document.activeElement as HTMLElement;

    if (e.shiftKey) {
      if (active === first || active === dialog) {
        e.preventDefault();
        last.focus();
      }
    } else {
      if (active === last) {
        e.preventDefault();
        first.focus();
      }
    }
  }
}