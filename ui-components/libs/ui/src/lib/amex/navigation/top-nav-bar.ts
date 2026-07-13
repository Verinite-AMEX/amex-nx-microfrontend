import { Component, Input, Output, EventEmitter, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';

export type AmexNavPortalStyle = 'onls' | 'oms' | 'bcrb';

/**
 * TopNavBar
 * Matches 3 portal styles from screenshots:
 * - onls : ONLS Helper Tool / Hub Login / SOC&ROC / Supp Access / Lounge
 *          → thin blue top strip (Global Sites | Log Out) + white header (logo + title)
 * - oms  : Online Merchant Services portal
 *          → LOG OUT top-right + white header with "ONLINE Merchant Services ■ MANAGE YOUR ACCOUNT ONLINE"
 * - bcrb : BCRB Reports portal
 *          → solid indigo bar with hamburger menu, title left, "User :- username" right
 */
@Component({
  selector: 'amex-top-nav-bar',
  standalone: true,
  imports: [CommonModule],
  template: `
    <!-- ══ ONLS: Global Sites / Log Out strip + AMEX logo + portal title ══ -->
    <ng-container *ngIf="portalStyle === 'onls'">
      <div class="onls-strip">
        <span class="onls-strip__global">Global Sites</span>
        <button class="onls-strip__logout" (click)="logout.emit()">Log Out</button>
      </div>
      <div class="onls-header">
        <div class="onls-header__logo">
          <div class="onls-logo">
            <span class="onls-logo__text">AM<br>EX</span>
          </div>
        </div>
        <span class="onls-header__title">{{ portalTitle }}</span>
      </div>
      <div class="onls-header__rule"></div>
    </ng-container>

    <!-- ══ OMS: LOG OUT button top-right + ONLINE Merchant Services branding ══ -->
    <ng-container *ngIf="portalStyle === 'oms'">
      <div class="oms-toprow">
        <button class="oms-toprow__logout" (click)="logout.emit()">LOG OUT</button>
      </div>
      <div class="oms-header">
        <div class="oms-logo-wrap">
          <div class="oms-logo">
            <span class="oms-logo__am">AMERICAN</span>
            <span class="oms-logo__ex">EXPRESS</span>
          </div>
        </div>
        <div class="oms-brand">
          <div class="oms-brand__row1">
            <span class="oms-brand__online">ONLINE</span>
            <span class="oms-brand__service">{{ omsServiceName }}</span>
            <span class="oms-brand__dot">&#9646;</span>
          </div>
          <div class="oms-brand__sub">MANAGE YOUR ACCOUNT ONLINE</div>
        </div>
      </div>
    </ng-container>

    <!-- ══ BCRB: Indigo bar — ☰ Title left | User :- username right ══ -->
    <ng-container *ngIf="portalStyle === 'bcrb'">
      <div class="bcrb-bar">
        <div class="bcrb-bar__left">
          <button class="bcrb-bar__hamburger" (click)="menuToggle.emit()" aria-label="Menu">&#9776;</button>
          <span class="bcrb-bar__title">{{ portalTitle }}</span>
        </div>
        <span class="bcrb-bar__user" *ngIf="username">User :- {{ username }}</span>
      </div>
    </ng-container>
  `,
  styles: [`
    :host { display: block; font-family: Arial, sans-serif; }

    /* ── ONLS ── */
    .onls-strip {
      background: #006fcf;
      display: flex; justify-content: flex-end; align-items: center;
      padding: 2px 8px; gap: 12px; font-size: 11px;
    }
    .onls-strip__global {
      color: #fff; cursor: pointer; text-decoration: underline;
    }
    .onls-strip__logout {
      background: #fff; border: 1px solid #ccc; color: #333;
      font-size: 11px; font-family: Arial, sans-serif;
      padding: 1px 10px; cursor: pointer; border-radius: 1px;
    }
    .onls-strip__logout:hover { background: #f0f0f0; }

    .onls-header {
      background: #fff; display: flex; align-items: center;
      padding: 6px 10px; gap: 8px; min-height: 50px;
      border-bottom: 1px solid #d0d0d0;
    }
    .onls-logo {
      width: 40px; height: 40px; background: #006fcf;
      display: flex; align-items: center; justify-content: center;
      border-radius: 3px; flex-shrink: 0;
    }
    .onls-logo__text {
      color: #fff; font-weight: 900; font-size: 12px;
      font-family: 'Arial Black', sans-serif;
      line-height: 1.1; text-align: center; letter-spacing: -1px;
    }
    .onls-header__title {
      font-size: 18px; color: #333; font-weight: normal;
    }
    .onls-header__rule {
      height: 2px;
      background: linear-gradient(to right, #b8d0e8, #e8f0f8, #b8d0e8);
      border-top: 1px solid #c4d8ec;
    }

    /* ── OMS ── */
    .oms-toprow {
      display: flex; justify-content: flex-end;
      padding: 4px 10px; background: #fff;
    }
    .oms-toprow__logout {
      background: #1e3a5f; color: #fff; border: none;
      font-family: Arial, sans-serif; font-size: 11px; font-weight: bold;
      padding: 4px 12px; cursor: pointer; letter-spacing: 0.5px;
    }
    .oms-toprow__logout:hover { background: #16304f; }

    .oms-header {
      background: #fff; display: flex; align-items: center;
      padding: 8px 14px; border-bottom: 1px solid #ddd; gap: 12px;
    }
    .oms-logo-wrap { flex-shrink: 0; }
    .oms-logo {
      background: #006fcf; width: 56px; height: 48px; border-radius: 3px;
      display: flex; flex-direction: column;
      align-items: center; justify-content: center;
    }
    .oms-logo__am {
      color: #fff; font-size: 8px; font-weight: 900;
      font-family: 'Arial Black', sans-serif; letter-spacing: 0.5px;
    }
    .oms-logo__ex {
      color: #fff; font-size: 11px; font-weight: 900;
      font-family: 'Arial Black', sans-serif; letter-spacing: 0.5px;
    }
    .oms-brand { display: flex; flex-direction: column; }
    .oms-brand__row1 { display: flex; align-items: baseline; gap: 5px; }
    .oms-brand__online {
      font-size: 26px; font-weight: bold; color: #1e3a5f; letter-spacing: 1px;
    }
    .oms-brand__service { font-size: 13px; color: #444; }
    .oms-brand__dot { color: #7b1fa2; font-size: 18px; }
    .oms-brand__sub {
      font-size: 9px; color: #888; letter-spacing: 1.5px;
      text-transform: uppercase; margin-top: 1px;
    }

    /* ── BCRB ── */
    .bcrb-bar {
      background: #3d4dac; display: flex; align-items: center;
      justify-content: space-between; padding: 0 16px; height: 48px;
    }
    .bcrb-bar__left { display: flex; align-items: center; gap: 12px; }
    .bcrb-bar__hamburger {
      background: none; border: none; color: #fff;
      font-size: 20px; cursor: pointer; padding: 0; line-height: 1;
    }
    .bcrb-bar__title { color: #fff; font-size: 16px; font-weight: bold; }
    .bcrb-bar__user { color: #fff; font-size: 13px; }
  `],
})
export class AmexTopNavBarComponent {
  private static _idCounter = 0;
  @HostBinding('attr.id') readonly id = `top-nav-bar-${++AmexTopNavBarComponent._idCounter}`;


  @Input() portalStyle: AmexNavPortalStyle = 'onls';
  @Input() portalTitle = 'THE HUB LOGIN';
  @Input() omsServiceName = 'Merchant Services';
  @Input() username = '';
  @Output() logout = new EventEmitter<void>();
  @Output() menuToggle = new EventEmitter<void>();
}
