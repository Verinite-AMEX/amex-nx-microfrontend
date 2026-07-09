import { Component, Input, Output, EventEmitter, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface AmexSidebarMenuItem { id: string; label: string; }

/**
 * SidebarMenu
 * Three styles from screenshots:
 * - onls  : decorative gray diagonal-hatched left panel (no items) — all ONLS portals
 * - socroc: vertical menu — MASTERS, MERCHANT DATA, SOC'S & ROC'S, UTILITIES, REPORTS etc
 * - bcrb  : white panel with report list — Consumer Monthly, Corporate Monthly etc
 */
@Component({
  selector: 'amex-sidebar-menu',
  standalone: true,
  imports: [CommonModule],
  template: `
    <!-- ONLS: decorative hatched panel — no clickable items -->
    <div *ngIf="portalStyle === 'onls'" class="onls-sidebar">
      <div class="onls-sidebar__hatch"></div>
    </div>

    <!-- SOC/ROC: horizontal top-nav style menu bar (MASTERS  MERCHANT DATA  SOC'S & ROC'S ...) -->
    <!-- NOTE: SOC/ROC uses TabBar for top nav — sidebar is the same hatched panel -->
    <!-- This variant is the BCRB left sidebar list -->
    <div *ngIf="portalStyle === 'bcrb'" class="bcrb-sidebar">
      <div *ngFor="let item of items"
        class="bcrb-sidebar__item"
        [class.bcrb-sidebar__item--active]="item.id === activeId"
        (click)="itemClick.emit(item.id)">
        {{ item.label }}
      </div>
    </div>

    <!-- OMS: left vertical menu used in MRM/Admin dashboard -->
    <div *ngIf="portalStyle === 'oms'" class="oms-sidebar">
      <div *ngFor="let item of items"
        class="oms-sidebar__item"
        [class.oms-sidebar__item--active]="item.id === activeId"
        (click)="itemClick.emit(item.id)">
        {{ item.label }}
      </div>
    </div>
  `,
  styles: [`
    :host { display: block; }

    /* ── ONLS: gray diagonal-hatched decorative sidebar ── */
    .onls-sidebar {
      width: 160px; min-height: 300px; flex-shrink: 0;
      position: relative; overflow: hidden;
    }
    .onls-sidebar__hatch {
      position: absolute; inset: 0;
      background-color: #d4d4d4;
      background-image: repeating-linear-gradient(
        45deg,
        transparent, transparent 4px,
        rgba(255,255,255,0.4) 4px, rgba(255,255,255,0.4) 5px
      );
    }

    /* ── BCRB: white left panel, vertical report list ── */
    .bcrb-sidebar {
      width: 240px; flex-shrink: 0;
      border-right: 1px solid #e8e8e8;
      background: #fff; font-family: Arial, sans-serif;
    }
    .bcrb-sidebar__item {
      padding: 11px 16px; font-size: 13px;
      color: #1a3a6b; cursor: pointer;
      border-bottom: 1px solid #f2f2f2;
    }
    .bcrb-sidebar__item:hover { background: #f5f5f5; }
    .bcrb-sidebar__item--active {
      background: #ebebeb; color: #333; font-weight: normal;
    }

    /* ── OMS: left nav sidebar ── */
    .oms-sidebar {
      width: 200px; flex-shrink: 0;
      background: #f5f5f5; border-right: 1px solid #e0e0e0;
      font-family: Arial, sans-serif;
    }
    .oms-sidebar__item {
      padding: 11px 16px; font-size: 13px;
      color: #1e3a5f; cursor: pointer;
      border-bottom: 1px solid #e8e8e8;
    }
    .oms-sidebar__item:hover { background: #e8eaf0; }
    .oms-sidebar__item--active {
      background: #1e3a5f; color: #fff; font-weight: bold;
    }
  `],
})
export class AmexSidebarMenuComponent {
  private static _idCounter = 0;
  @HostBinding('attr.id') readonly id = `sidebar-menu-${++AmexSidebarMenuComponent._idCounter}`;


  @Input() portalStyle: 'onls' | 'bcrb' | 'oms' = 'onls';
  @Input() items: AmexSidebarMenuItem[] = [];
  @Input() activeId = '';
  @Output() itemClick = new EventEmitter<string>();
}
