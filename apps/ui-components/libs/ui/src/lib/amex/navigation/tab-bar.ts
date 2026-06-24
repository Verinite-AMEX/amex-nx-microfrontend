import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface AmexTabItem { id: string; label: string; }

/**
 * TabBar
 * onls: blue text tabs on white bg, active = bold + underline (image4, image5 supp access)
 *       Second sub-row of links (Priority Pass, Supp Access, Digital Wallet, Wearables)
 *       is embedded as optional subItems
 * oms:  solid gray bar, white text, active = dark (OMS portal image9)
 */
@Component({
  selector: 'amex-tab-bar',
  standalone: true,
  imports: [CommonModule],
  template: `
    <!-- ══ ONLS: blue link tabs + optional second sub-link row ══ -->
    <div *ngIf="portalStyle === 'onls'" class="onls-nav">
      <div class="onls-nav__row1">
        <span *ngFor="let tab of tabs"
          class="onls-nav__tab"
          [class.onls-nav__tab--active]="tab.id === activeTabId"
          (click)="tabClick.emit(tab.id)">
          {{ tab.label }}
        </span>
      </div>
      <!-- sub-link row — shown only when subItems provided -->
      <div *ngIf="subItems && subItems.length" class="onls-nav__row2">
        <span *ngFor="let item of subItems"
          class="onls-nav__sub"
          [class.onls-nav__sub--active]="item.id === activeSubId"
          (click)="subClick.emit(item.id)">
          {{ item.label }}
        </span>
      </div>
    </div>

    <!-- ══ OMS: solid gray bar with white text tabs ══ -->
    <div *ngIf="portalStyle === 'oms'" class="oms-nav">
      <span *ngFor="let tab of tabs"
        class="oms-nav__tab"
        [class.oms-nav__tab--active]="tab.id === activeTabId"
        (click)="tabClick.emit(tab.id)">
        {{ tab.label }}
      </span>
    </div>
  `,
  styles: [`
    :host { display: block; font-family: Arial, sans-serif; }

    /* ── ONLS row 1: blue link tabs ── */
    .onls-nav { background: #fff; }
    .onls-nav__row1 {
      display: flex; flex-wrap: wrap; align-items: center;
      padding: 0 4px; border-bottom: 1px dotted #ccc;
    }
    .onls-nav__tab {
      color: #006fcf; padding: 5px 9px; cursor: pointer;
      font-size: 12px; white-space: nowrap;
      border-bottom: 2px solid transparent; display: inline-block;
    }
    .onls-nav__tab:hover { text-decoration: underline; }
    .onls-nav__tab--active {
      font-weight: bold; color: #003087;
      border-bottom: 2px solid #006fcf;
    }

    /* ── ONLS row 2: sub-links (e.g. "ENROLL FOR PRIORITY PASS™  Supplementary Access") ── */
    .onls-nav__row2 {
      display: flex; flex-wrap: wrap; align-items: center;
      background: #e8f0f8; padding: 2px 8px;
      border-bottom: 1px solid #c8d8e8;
    }
    .onls-nav__sub {
      color: #006fcf; font-size: 12px; padding: 2px 8px;
      cursor: pointer; white-space: nowrap;
    }
    .onls-nav__sub:hover { text-decoration: underline; }
    .onls-nav__sub--active { font-weight: bold; color: #003087; }

    /* ── OMS: solid gray bar ── */
    .oms-nav {
      display: flex; flex-wrap: wrap;
      background: #5a5a5a; font-size: 13px;
    }
    .oms-nav__tab {
      color: #fff; padding: 10px 16px; cursor: pointer;
      white-space: nowrap; border-right: 1px solid #767676;
    }
    .oms-nav__tab:hover { background: #484848; }
    .oms-nav__tab--active { background: #3a3a3a; font-weight: bold; }
  `],
})
export class AmexTabBarComponent {
  @Input() portalStyle: 'onls' | 'oms' = 'onls';
  @Input() tabs: AmexTabItem[] = [];
  @Input() activeTabId = '';
  @Input() subItems: AmexTabItem[] = [];
  @Input() activeSubId = '';
  @Output() tabClick = new EventEmitter<string>();
  @Output() subClick = new EventEmitter<string>();
}
