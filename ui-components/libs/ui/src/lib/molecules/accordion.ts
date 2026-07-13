import { Component, Input, ElementRef, ViewChildren, QueryList, AfterViewInit, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface AccordionItem {
  id: string;
  title: string;
  content: string;
}

@Component({
  selector: 'ui-accordion',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="accordion">
      <div *ngFor="let item of items; let i = index" class="accordion-item" [class.open]="isOpen(item.id)">
        <button class="accordion-header" #headerBtn
          id="{{item.id}}-header"
          aria-controls="{{item.id}}-panel"
          (click)="toggle(item.id)"
          (keydown)="onKeydown($event, i)"
          [attr.aria-expanded]="isOpen(item.id)">
          <span>{{ item.title }}</span>
          <span class="accordion-icon">{{ isOpen(item.id) ? '▲' : '▼' }}</span>
        </button>
        <div class="accordion-body" *ngIf="isOpen(item.id)" #panelRef id="{{item.id}}-panel" role="region" [attr.aria-labelledby]="item.id + '-header'">
          <p>{{ item.content }}</p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .accordion { font-family: Arial, sans-serif; border: 1px solid #e0e0e0; border-radius: 6px; overflow: hidden; }
    .accordion-item { border-bottom: 1px solid #e0e0e0; }
    .accordion-item:last-child { border-bottom: none; }
    .accordion-header {
      width: 100%; display: flex; justify-content: space-between; align-items: center;
      padding: 14px 16px; background: #fff; border: none; cursor: pointer;
      font-size: 14px; font-weight: 600; color: #333; text-align: left;
      transition: background 0.15s;
    }
    .accordion-header:hover { background: #f9f9f9; }
    .accordion-item.open .accordion-header { background: #f5f9ff; color: #1976d2; }
    .accordion-icon { font-size: 11px; color: #888; }
    .accordion-body { padding: 12px 16px 16px; font-size: 14px; color: #555; line-height: 1.6; background: #fff; }
  `],
})
export class AccordionComponent implements AfterViewInit {
  private static _idCounter = 0;
  @HostBinding('attr.id') readonly id = `ui-accordion-${++AccordionComponent._idCounter}`;


  @Input() items: AccordionItem[] = [];
  @Input() multiple = false;

  openIds = new Set<string>();

  @ViewChildren('headerBtn', { read: ElementRef }) headerButtons!: QueryList<ElementRef<HTMLButtonElement>>;
  @ViewChildren('panelRef', { read: ElementRef }) panels!: QueryList<ElementRef<HTMLElement>>;

  ngAfterViewInit() {
    // ensure headers are focusable; nothing to init now but available for keyboard ops
  }

  isOpen(id: string) { return this.openIds.has(id); }

  toggle(id: string) {
    if (this.openIds.has(id)) {
      this.openIds.delete(id);
    } else {
      if (!this.multiple) this.openIds.clear();
      this.openIds.add(id);
      // after opening, move focus into first focusable element inside panel (if any)
      setTimeout(() => {
        const panel = document.getElementById(`${id}-panel`);
        if (panel) {
          const focusable = panel.querySelector<HTMLElement>(
            'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), [tabindex]:not([tabindex="-1"])'
          );
          if (focusable) focusable.focus();
        }
      });
    }
  }

  onKeydown(e: KeyboardEvent, index: number) {
    const max = this.items.length - 1;
    let next = index;
    if (e.key === 'ArrowDown') {
      next = index === max ? 0 : index + 1;
      e.preventDefault();
      this.focusHeader(next);
    } else if (e.key === 'ArrowUp') {
      next = index === 0 ? max : index - 1;
      e.preventDefault();
      this.focusHeader(next);
    } else if (e.key === 'Home') {
      e.preventDefault();
      this.focusHeader(0);
    } else if (e.key === 'End') {
      e.preventDefault();
      this.focusHeader(max);
    }
  }

  private focusHeader(idx: number) {
    const btn = this.headerButtons?.toArray()[idx];
    if (btn && btn.nativeElement) btn.nativeElement.focus();
  }
}
