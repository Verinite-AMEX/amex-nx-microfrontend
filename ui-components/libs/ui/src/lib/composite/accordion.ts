import {
  Component,
  Input,
  ViewChildren,
  QueryList,
  ElementRef,
  HostBinding,
} from '@angular/core';
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
    <div class="accordion" [style.border]="'1px solid ' + dividerColor" [style.borderRadius]="borderRadius">
      <div
        *ngFor="let item of items; let i = index"
        class="accordion-item"
        [style.borderBottom]="i < items.length - 1 ? '1px solid ' + dividerColor : 'none'"
        [class.open]="isOpen(item.id)"
      >
        <div class="body1" role="heading" [attr.aria-level]="headingLevel">
          <button
            #headerBtn
            type="button"
            class="collapsible"
            [id]="item.id + '-header'"
            [attr.aria-controls]="item.id + '-panel'"
            [attr.aria-expanded]="isOpen(item.id)"
            (click)="toggle(item.id)"
            (keydown)="onKeydown($event, i)"
          >
            <span class="collapsibleCaret" aria-hidden="true"></span>
            <span>{{ item.title }}</span>
          </button>
        </div>
        <div
          class="accordionContent"
          *ngIf="isOpen(item.id)"
          id="{{ item.id }}-panel"
          role="region"
          [attr.aria-labelledby]="item.id + '-header'"
        >
          <p>{{ item.content }}</p>
        </div>
      </div>
    </div>
  `,
  styles: [
    // Structural glue only — no hardcoded colors/branding here.
    // DLS's accordion CSS (navAccordion) is built for nav-sidebar menus, not a
    // standalone content accordion, so there's no DLS class for the outer list
    // container/divider look. Since that's a real visual decision DLS doesn't
    // make for us, it's exposed as `dividerColor`/`borderRadius` @Inputs below
    // instead of being baked into this library — same pattern as AccentCard.
    // The header button, caret icon, and content panel all come from DLS's
    // real .collapsible / .collapsibleCaret / .accordionContent classes.
    //
    // The caret is an EMPTY element (no inline SVG needed) — DLS's real
    // collapsible.css (the individual source partial, not the known-stale
    // bundled dls.min.css) renders the chevron via a .collapsibleCaret::before
    // background-image, and automatically rotates it 90deg when the parent
    // .collapsible button has aria-expanded="true" — both confirmed present
    // in css/collapsible.css directly. No manual transform binding needed;
    // DLS already drives the rotation off the aria-expanded attribute this
    // component sets on the button.
    `
      .accordion {
        overflow: hidden;
      }
      .collapsible {
        width: 100%;
      }
    `,
  ],
})
export class AccordionComponent {
  private static _idCounter = 0;
  @HostBinding('attr.id') @Input() id =
    `ui-accordion-${++AccordionComponent._idCounter}`;

  @Input() items: AccordionItem[] = [];
  @Input() multiple = false;

  /**
   * Semantic heading level wrapping each header button, matching DLS's
   * real Accordion pattern (default h3, same default as the source component).
   * Uses role="heading"/aria-level instead of a dynamic tag, since Angular
   * templates can't swap element tag names the way React can — DLS's own
   * docs site uses this same role="heading" technique in places too.
   */
  @Input() headingLevel: 1 | 2 | 3 | 4 | 5 | 6 = 3;

  /** No DLS class covers this outer list divider — consumer-customizable, not hardcoded. */
  @Input() dividerColor = '#e0e0e0';
  @Input() borderRadius = '6px';

  openIds = new Set<string>();

  @ViewChildren('headerBtn')
  headerButtons!: QueryList<ElementRef<HTMLButtonElement>>;

  isOpen(id: string) {
    return this.openIds.has(id);
  }

  toggle(id: string) {
    if (this.openIds.has(id)) {
      this.openIds.delete(id);
    } else {
      if (!this.multiple) this.openIds.clear();
      this.openIds.add(id);
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
    this.headerButtons?.toArray()[idx]?.nativeElement.focus();
  }
}