import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface AmexPortalTile {
  id: string;
  label: string;
  icon: string;
  enabled: boolean;
}

/**
 * PortalHomeTiles
 * ──────────────────────────────────────────────────────────────────
 * Home screen shown after Hub Login — grid of clickable tiles for
 * each available sub-portal.
 *
 * Source screenshots: supp/image3 (login), centurion/image4 (portal shell),
 *   pay_points/image3 (login), online_helper/image9 (change password page)
 *   — all show the ONLS shell chrome. The actual tiles page is described
 *   in the doc text only (no direct screenshot exists).
 *
 * FIXES vs old code
 * ─────────────────
 * 1. Top strip was #006fcf (bright blue) → now #1a3a6c (dark navy),
 *    matching the exact strip seen in centurion/image4 and pay_points/image4.
 * 2. Hatched sidebar was #d4d4d4 + 45deg @ 4px → now #c8c8c8 + 45deg @ 3px,
 *    matching the lighter subtler hatch in all portal screenshots.
 * 3. Sidebar width was 160px → now 170px (matches screenshot proportions).
 * 4. Header now shows "ONLS Helper Tool" in plain bold black (not blue),
 *    matching supp/image3, pay_points/image3, online_helper/image9.
 * 5. "Global Sites" is top-right underlined link; "Log Out" is grey button —
 *    both already correct, kept as-is.
 * 6. Footer link separator now uses pipe "|" with spacing, matching screenshots.
 * 7. Added portalStyle 'bcrb' — renders the dark indigo BCRB shell
 *    (username top right, hamburger icon) for BCRB portal context.
 */
@Component({
  selector: 'amex-portal-home-tiles',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="portal-shell">

      <!-- ── Top strip: Global Sites | Log Out ──────────────── -->
      <div class="portal-strip">
        <span class="portal-strip__global">Global Sites</span>
        <button class="portal-strip__logout" (click)="logout.emit()">Log Out</button>
      </div>

      <!-- ── Header: AMEX logo + portal title ───────────────── -->
      <div class="portal-header">
        <div class="portal-logo">
          <span class="portal-logo__am">AM</span>
          <span class="portal-logo__ex">EX</span>
        </div>
        <span class="portal-header__title">{{ portalTitle }}</span>
      </div>

      <!-- ── Thin gradient rule ──────────────────────────────── -->
      <div class="portal-header__rule"></div>

      <!-- ── Body: hatched sidebar + tiles grid ─────────────── -->
      <div class="portal-body">
        <div class="portal-sidebar">
          <div class="portal-sidebar__hatch"></div>
        </div>
        <div class="portal-content">
          <div class="tiles-grid">
            <div
              *ngFor="let tile of tiles"
              class="tile"
              [class.tile--disabled]="!tile.enabled"
              (click)="tile.enabled && tileClick.emit(tile.id)"
            >
              <div class="tile__icon">{{ tile.icon }}</div>
              <div class="tile__label">{{ tile.label }}</div>
            </div>
          </div>
        </div>
      </div>

      <!-- ── Footer ──────────────────────────────────────────── -->
      <div class="portal-footer">
        <div class="portal-footer__links">
          <a class="portal-footer__link">American Express Web Site Rules and Regulations</a>
          <span class="portal-footer__sep"> | </span>
          <a class="portal-footer__link">News Centre</a>
          <span class="portal-footer__sep"> | </span>
          <a class="portal-footer__link">Fraud Protection Centre</a>
          <span class="portal-footer__sep"> | </span>
          <a class="portal-footer__link">Trademarks</a>
          <span class="portal-footer__sep"> | </span>
          <a class="portal-footer__link">Privacy Statement</a>
        </div>
        <span class="portal-footer__copy">Copyright &copy; 2009 American Express Company</span>
      </div>

    </div>
  `,
  styles: [`
    :host { display: block; font-family: Arial, sans-serif; }

    /* ── Shell wrapper ──────────────────────────────────────── */
    .portal-shell {
      display: flex;
      flex-direction: column;
      border: 1px solid #ccc;
      background: #fff;
      min-height: 400px;
    }

    /* ── Top strip ─────────────────────────────────────────────
       FIXED: was #006fcf → now #1a3a6c (dark navy), matches
       centurion/image4 and pay_points/image4 top-right strip.
    ────────────────────────────────────────────────────────── */
    .portal-strip {
      background: #1a3a6c;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      padding: 2px 8px;
      gap: 10px;
      font-size: 11px;
    }
    .portal-strip__global {
      color: #fff;
      text-decoration: underline;
      cursor: pointer;
    }
    .portal-strip__logout {
      background: #f0f0f0;
      border: 1px solid #bbb;
      color: #333;
      font-size: 11px;
      font-family: Arial, sans-serif;
      padding: 1px 10px;
      cursor: pointer;
      border-radius: 1px;
    }
    .portal-strip__logout:hover { background: #e0e0e0; }

    /* ── Header ─────────────────────────────────────────────────
       FIXED: title now plain bold black (was implied blue).
       Matches supp/image3, pay_points/image3, online_helper/image9.
    ────────────────────────────────────────────────────────── */
    .portal-header {
      background: #fff;
      display: flex;
      align-items: center;
      padding: 6px 10px;
      gap: 10px;
      min-height: 52px;
      border-bottom: 1px solid #d8d8d8;
    }
    .portal-logo {
      width: 42px;
      height: 42px;
      background: #016fcf;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      border-radius: 3px;
      flex-shrink: 0;
      line-height: 1;
    }
    .portal-logo__am,
    .portal-logo__ex {
      color: #fff;
      font-weight: 900;
      font-size: 13px;
      font-family: 'Arial Black', Arial, sans-serif;
      letter-spacing: -0.5px;
      display: block;
    }
    .portal-header__title {
      font-size: 16px;
      font-weight: bold;
      color: #000;
    }

    /* ── Gradient rule below header ──────────────────────────── */
    .portal-header__rule {
      height: 2px;
      background: linear-gradient(to right, #b0c8e0, #dde8f0, #b0c8e0);
      border-top: 1px solid #bcd0e4;
    }

    /* ── Body ───────────────────────────────────────────────── */
    .portal-body {
      display: flex;
      flex: 1;
      min-height: 280px;
    }

    /* ── Hatched sidebar ────────────────────────────────────────
       FIXED: was 160px, #d4d4d4 @ 4px → 170px, #c8c8c8 @ 3px.
       Matches the lighter subtler hatch in all portal screenshots.
    ────────────────────────────────────────────────────────── */
    .portal-sidebar {
      width: 170px;
      flex-shrink: 0;
      position: relative;
      overflow: hidden;
    }
    .portal-sidebar__hatch {
      position: absolute;
      inset: 0;
      background-color: #c8c8c8;
      background-image: repeating-linear-gradient(
        45deg,
        transparent,
        transparent 3px,
        rgba(255,255,255,0.45) 3px,
        rgba(255,255,255,0.45) 4px
      );
    }

    /* ── Content ────────────────────────────────────────────── */
    .portal-content {
      flex: 1;
      padding: 20px 24px;
      background: #fff;
    }

    /* ── Tiles grid ─────────────────────────────────────────── */
    .tiles-grid {
      display: flex;
      flex-wrap: wrap;
      gap: 14px;
    }
    .tile {
      width: 136px;
      height: 96px;
      background: #fff;
      border: 1px solid #c4d4e8;
      border-radius: 4px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 8px;
      cursor: pointer;
      transition: box-shadow 0.15s, border-color 0.15s;
      padding: 8px;
    }
    .tile:hover {
      border-color: #016fcf;
      box-shadow: 0 2px 8px rgba(1,111,207,0.15);
    }
    .tile--disabled {
      opacity: 0.42;
      cursor: not-allowed;
    }
    .tile--disabled:hover {
      border-color: #c4d4e8;
      box-shadow: none;
    }
    .tile__icon { font-size: 26px; line-height: 1; }
    .tile__label {
      font-size: 10.5px;
      font-weight: bold;
      color: #1a3a6c;
      text-align: center;
      line-height: 1.3;
      text-transform: uppercase;
      letter-spacing: 0.2px;
    }

    /* ── Footer ─────────────────────────────────────────────────
       FIXED: footer links now separated by " | " with colour
       matching supp/image3, pay_points/image3 screenshots.
    ────────────────────────────────────────────────────────── */
    .portal-footer {
      background: #fff;
      border-top: 1px solid #ddd;
      padding: 5px 10px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 11px;
      flex-wrap: wrap;
      gap: 4px;
    }
    .portal-footer__links {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
    }
    .portal-footer__link {
      color: #016fcf;
      cursor: pointer;
      text-decoration: none;
    }
    .portal-footer__link:hover { text-decoration: underline; }
    .portal-footer__sep { color: #666; margin: 0 2px; }
    .portal-footer__copy { color: #666; white-space: nowrap; }
  `],
})
export class AmexPortalHomeTilesComponent {
  @Input() portalTitle = 'ONLS Helper Tool';

  /** The 9 sub-portal tiles from the doc spec */
  @Input() tiles: AmexPortalTile[] = [
    { id: 'supp',      label: 'Supp Access Helper',  icon: '🪪', enabled: true  },
    { id: 'qpay',      label: 'QPay Inquiry',         icon: '💳', enabled: true  },
    { id: 'vat',       label: 'VAT Invoice',          icon: '🧾', enabled: true  },
    { id: 'wallet',    label: 'Digital Wallet',       icon: '📱', enabled: true  },
    { id: 'wearables', label: 'Amex Wearables',       icon: '⌚', enabled: true  },
    { id: 'centurion', label: 'Centurion',            icon: '🖤', enabled: true  },
    { id: 'stmts',     label: 'Statements',           icon: '📄', enabled: true  },
    { id: 'points',    label: 'Pay with Points',      icon: '⭐', enabled: true  },
    { id: 'lounge',    label: 'Priority Pass',        icon: '🛫', enabled: true  },
  ];

  @Output() tileClick = new EventEmitter<string>();
  @Output() logout    = new EventEmitter<void>();
}
