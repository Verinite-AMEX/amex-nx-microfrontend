import { Component, Input, Output, EventEmitter, OnChanges, ElementRef, ViewChildren, QueryList, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface TabItem {
  id: string;
  label: string;
  disabled?: boolean;
  ariaLabel?: string;
  ariaDescribedBy?: string;
  ariaControls?: string;
}

@Component({
  selector: 'ui-tabs',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="tabs">
      <div class="tabs-nav" role="tablist" [attr.aria-label]="ariaLabel">
        <button *ngFor="let tab of tabs; let i = index" #tabButton 
          role="tab"
          class="tab-btn" 
          [class.active]="tab.id === activeTab" 
          [disabled]="tab.disabled"
          [attr.aria-selected]="tab.id === activeTab"
          [attr.aria-controls]="tab.ariaControls || 'tabpanel-' + tab.id"
          [attr.aria-label]="tab.ariaLabel || tab.label"
          [attr.aria-describedby]="tab.ariaDescribedBy"
          [attr.tabindex]="tab.id === activeTab ? 0 : -1"
          [id]="'tab-' + tab.id"
          (click)="select(tab.id)" 
          (keydown)="onKeydown($event, i)">
          {{ tab.label }}
        </button>
      </div>
      <div class="tabs-content" 
        role="tabpanel" 
        [attr.aria-labelledby]="'tab-' + activeTab"
        [attr.aria-live]="'polite'"
        [id]="'tabpanel-' + activeTab">
        <ng-content></ng-content>
      </div>
    </div>
  `,
  styles: [`
    .tabs { font-family: Arial, sans-serif; }
    .tabs-nav { display: flex; border-bottom: 2px solid #e0e0e0; gap: 0; }
    .tab-btn {
      padding: 10px 20px; background: none; border: none;
      font-size: 14px; font-family: inherit; color: #666;
      cursor: pointer; border-bottom: 2px solid transparent;
      margin-bottom: -2px; transition: color 0.15s, border-color 0.15s;
    }
    .tab-btn:hover:not(:disabled) { color: #1976d2; }
    .tab-btn.active { color: #1976d2; border-bottom-color: #1976d2; font-weight: 600; }
    .tab-btn:disabled { opacity: 0.4; cursor: not-allowed; }
    .tabs-content { padding: 16px 0; font-size: 14px; color: #555; }
  `],
})
export class TabsComponent implements OnChanges, AfterViewInit {
  @Input() tabs: TabItem[] = [];
  @Input() activeTab = '';
  @Input() ariaLabel = 'Tabs';
  @Output() tabChange = new EventEmitter<string>();
  @ViewChildren('tabButton', { read: ElementRef }) tabButtons!: QueryList<ElementRef<HTMLButtonElement>>;

  ngAfterViewInit() {
    // ensure first tab is focusable if none focused
    this.setTabIndexForButtons();
  }

  ngOnChanges() {
    if (!this.activeTab && this.tabs.length) this.activeTab = this.tabs[0].id;
    // update tabindex on buttons when inputs change
    setTimeout(() => this.setTabIndexForButtons());
  }

  select(id: string) {
    this.activeTab = id;
    this.tabChange.emit(id);
    // update tabindex so roving tabindex is maintained
    setTimeout(() => this.setTabIndexForButtons());
  }

  onKeydown(e: KeyboardEvent, index: number) {
    const max = this.tabs.length - 1;
    let next = index;
    if (e.key === 'ArrowRight') {
      next = index === max ? 0 : index + 1;
      e.preventDefault();
      this.focusButton(next);
      this.select(this.tabs[next].id);
    } else if (e.key === 'ArrowLeft') {
      next = index === 0 ? max : index - 1;
      e.preventDefault();
      this.focusButton(next);
      this.select(this.tabs[next].id);
    } else if (e.key === 'Home') {
      e.preventDefault();
      this.focusButton(0);
      this.select(this.tabs[0].id);
    } else if (e.key === 'End') {
      e.preventDefault();
      this.focusButton(max);
      this.select(this.tabs[max].id);
    }
  }

  private focusButton(idx: number) {
    const btn = this.tabButtons?.toArray()[idx];
    if (btn && btn.nativeElement) btn.nativeElement.focus();
  }

  private setTabIndexForButtons() {
    const arr = this.tabButtons?.toArray() || [];
    arr.forEach((ref, i) => {
      const el = ref.nativeElement;
      el.setAttribute('tabindex', this.tabs[i].id === this.activeTab ? '0' : '-1');
    });
  }
}
