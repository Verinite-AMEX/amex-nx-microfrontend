import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  ViewChildren,
  QueryList,
  ElementRef,
  HostBinding,
} from '@angular/core';
import { CommonModule } from '@angular/common';

export interface TabItem {
  id: string;
  label: string;
  disabled?: boolean;
  ariaLabel?: string;
  ariaDescribedBy?: string;
  ariaControls?: string;
}

/**
 * STRUCTURAL CHANGE: DLS's real tab markup (tabs.css) is NOT built on top
 * of .btn/<ui-button> at all — .tabLink is its own self-contained visual
 * style (background/padding/border-right/underline-on-select), completely
 * separate from the button system. Wrapping <ui-button> here (as the old
 * version did) would apply BOTH .btn's styling and .tabLink's styling to
 * the same element — they were never designed to combine. This version
 * renders a plain native <button class="tabLink"> instead.
 *
 * DLS'S OWN CLASS-NAME INCONSISTENCY (real, not introduced here): checked
 * dls.js directly — DLS ships an actual Tabs behavior class, but it looks
 * up elements via getElementsByClassName('tab-menu') / ('tab-link')
 * (kebab-case), while tabs.css styles .tabMenu / .tabLink (camelCase). DLS
 * genuinely expects BOTH classes on the same elements — one pair for CSS,
 * a different pair for their JS to find them. Both are applied below.
 *
 * DLS's own Tabs JS class is NOT used here — it does raw DOM manipulation
 * (classList, imperative attribute writes) designed for non-framework
 * pages, and would fight Angular's change detection if run inside an
 * Angular component. Instead, the same end states DLS's JS would produce
 * (aria-selected, tabindex, focus-on-arrow-key) are driven directly by
 * Angular bindings below — DLS's CSS reacts to [aria-selected=true]
 * automatically regardless of what set it.
 *
 * KNOWN DLS GAP: tabs.css has no :disabled styling for .tabLink at all —
 * a disabled tab falls back to the browser's default disabled button
 * look, not a DLS-specific one.
 */
@Component({
  selector: 'ui-tabs',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="tabs">
      <div
        class="tabMenu tab-menu"
        role="tablist"
        [attr.aria-label]="ariaLabel"
      >
        <button
          #tabBtn
          *ngFor="let tab of tabs; let i = index"
          type="button"
          class="tabLink tab-link"
          role="tab"
          [id]="'tab-' + tab.id"
          [disabled]="!!tab.disabled"
          [attr.aria-selected]="tab.id === activeTab"
          [attr.aria-controls]="tab.ariaControls || 'tabpanel-' + tab.id"
          [attr.aria-label]="tab.ariaLabel || null"
          [attr.aria-describedby]="tab.ariaDescribedBy || null"
          [attr.tabindex]="tab.id === activeTab ? 0 : -1"
          (click)="select(tab.id)"
          (keydown)="onKeydown($event, i)"
        >
          {{ tab.label }}
        </button>
      </div>
      <div
        class="tabContent"
        role="tabpanel"
        tabindex="0"
        [attr.aria-labelledby]="'tab-' + activeTab"
        [attr.aria-live]="'polite'"
        [id]="'tabpanel-' + activeTab"
      >
        <ng-content></ng-content>
      </div>
    </div>
  `,
})
export class TabsComponent implements OnChanges {
  private static _idCounter = 0;
  @HostBinding('attr.id') @Input() id =
    `ui-tabs-${++TabsComponent._idCounter}`;

  @Input() tabs: TabItem[] = [];
  @Input() activeTab = '';
  @Input() ariaLabel = 'Tabs';
  @Output() tabChange = new EventEmitter<string>();

  @ViewChildren('tabBtn')
  tabButtons!: QueryList<ElementRef<HTMLButtonElement>>;

  ngOnChanges() {
    if (!this.activeTab && this.tabs.length) this.activeTab = this.tabs[0].id;
  }

  select(id: string) {
    this.activeTab = id;
    this.tabChange.emit(id);
  }

  onKeydown(e: KeyboardEvent, index: number) {
    const max = this.tabs.length - 1;
    let next = index;
    if (e.key === 'ArrowRight') {
      next = index === max ? 0 : index + 1;
      e.preventDefault();
      this.focusAndSelect(next);
    } else if (e.key === 'ArrowLeft') {
      next = index === 0 ? max : index - 1;
      e.preventDefault();
      this.focusAndSelect(next);
    } else if (e.key === 'Home') {
      e.preventDefault();
      this.focusAndSelect(0);
    } else if (e.key === 'End') {
      e.preventDefault();
      this.focusAndSelect(max);
    }
  }

  private focusAndSelect(idx: number) {
    this.select(this.tabs[idx].id);
    Promise.resolve().then(() =>
      this.tabButtons?.toArray()[idx]?.nativeElement.focus()
    );
  }
}