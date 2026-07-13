import { Component, Input, Output, EventEmitter, ElementRef, ViewChild, OnChanges, SimpleChanges, OnDestroy, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ui-modal',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div *ngIf="open" class="modal-backdrop" (click)="onBackdropClick($event)" role="presentation">
      <div #dialog class="modal modal-{{size}}" 
        role="dialog" 
        aria-modal="true" 
        tabindex="-1" 
        [attr.aria-label]="ariaLabel || title"
        [attr.aria-describedby]="ariaDescribedBy">
        <div class="modal-header">
          <h2 class="modal-title" id="modal-title-{{uniqueId}}">{{ title }}</h2>
          <button class="modal-close" 
            (click)="closed.emit()" 
            aria-label="Close modal"
            [attr.aria-describedby]="title ? 'modal-title-' + uniqueId : null">
            ✕
          </button>
        </div>
        <div class="modal-body" [attr.aria-labelledby]="title ? 'modal-title-' + uniqueId : null">
          <ng-content></ng-content>
        </div>
        <div *ngIf="hasFooter" class="modal-footer">
          <ng-content select="[slot=footer]"></ng-content>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .modal-backdrop {
      position: fixed; inset: 0; background: rgba(0,0,0,0.45);
      display: flex; align-items: center; justify-content: center;
      z-index: 1000; padding: 16px;
    }
    .modal {
      background: #fff; border-radius: 8px; width: 100%;
      box-shadow: 0 8px 32px rgba(0,0,0,0.2); font-family: Arial, sans-serif;
      max-height: 90vh; display: flex; flex-direction: column;
    }
    .modal-sm { max-width: 400px; }
    .modal-md { max-width: 560px; }
    .modal-lg { max-width: 800px; }
    .modal-header { display: flex; align-items: center; justify-content: space-between; padding: 16px 20px; border-bottom: 1px solid #f0f0f0; }
    .modal-title { margin: 0; font-size: 18px; font-weight: 600; color: #333; }
    .modal-close { background: none; border: none; font-size: 18px; cursor: pointer; color: #888; padding: 0; }
    .modal-close:hover { color: #333; }
    .modal-body { padding: 20px; overflow-y: auto; flex: 1; font-size: 14px; color: #555; line-height: 1.6; }
    .modal-footer { padding: 12px 20px; border-top: 1px solid #f0f0f0; display: flex; justify-content: flex-end; gap: 8px; }
  `],
})
export class ModalComponent {
  private static _idCounter = 0;
  @HostBinding('attr.id') readonly id = `ui-modal-${++ModalComponent._idCounter}`;


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
    if (this.closeOnBackdrop && (e.target as HTMLElement).classList.contains('modal-backdrop')) {
      this.closeInternal();
    }
  }

  closeInternal() {
    // emit and restore focus
    this.closed.emit();
    this.restoreFocus();
  }

  private trapFocus() {
    this.previouslyFocused = document.activeElement;
    // focus the dialog container
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
        'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex]:not([tabindex="-1"]), [contenteditable]'
      )
    ).filter((el) => el.offsetWidth > 0 || el.offsetHeight > 0 || el === document.activeElement);

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
