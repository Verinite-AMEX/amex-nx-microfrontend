import { Component, Input, Output, EventEmitter, OnChanges, ViewChildren, QueryList, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../atoms/button';

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
  imports: [CommonModule, ButtonComponent],
  template: `
    <div class="tabs">
      <div class="tabs-nav" role="tablist" [attr.aria-label]="ariaLabel">
        <ui-button *ngFor="let tab of tabs; let i = index"
          class="tab-btn"
          [class.active]="tab.id === activeTab"
          variant="ghost"
          [role]="'tab'"
          [label]="tab.label"
          [disabled]="!!tab.disabled"
          [ariaSelected]="tab.id === activeTab"
          [ariaControls]="tab.ariaControls || 'tabpanel-' + tab.id"
          [ariaLabel]="tab.ariaLabel || tab.label"
          [ariaDescribedBy]="tab.ariaDescribedBy || ''"
          [tabIndexOverride]="tab.id === activeTab ? 0 : -1"
          [id]="'tab-' + tab.id"
          (click)="select(tab.id)"
          (keydown)="onKeydown($event, i)">
        </ui-button>
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
      --btn-bg: transparent;
      --btn-color: #666;
      --btn-radius: 0;
      --btn-padding: 10px 20px;
      --btn-font-size: 14px;
      border-bottom: 2px solid transparent;
      margin-bottom: -2px;
      transition: color 0.15s, border-color 0.15s;
    }
    .tab-btn.active {
      --btn-color: #1976d2;
      border-bottom-color: #1976d2;
      font-weight: 600;
    }
    .tabs-content { padding: 16px 0; font-size: 14px; color: #555; }
  `],
})
export class TabsComponent implements OnChanges {
  private static _idCounter = 0;
  @HostBinding('attr.id') @Input() id = `ui-tabs-${++TabsComponent._idCounter}`;

  @Input() tabs: TabItem[] = [];
  @Input() activeTab = '';
  @Input() ariaLabel = 'Tabs';
  @Output() tabChange = new EventEmitter<string>();
  @ViewChildren(ButtonComponent) tabButtons!: QueryList<ButtonComponent>;

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
    // deferred one tick so tabIndexOverride re-renders to 0 before we move focus
    Promise.resolve().then(() => this.tabButtons?.toArray()[idx]?.focus());
  }
}