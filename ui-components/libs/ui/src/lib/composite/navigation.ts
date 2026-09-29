import {
  Component,
  Input,
  Output,
  EventEmitter,
  HostBinding,
  HostListener,
} from '@angular/core';
import { CommonModule } from '@angular/common';

export interface UiNavItem {
  id: string;
  label: string;
  href?: string;
  current?: boolean;
  children?: UiNavItem[];
}

/**
 * A new component - didn't exist in ui-components before. Built from DLS's
 * real nav.css + navHorizontal.css: .navHeader (brand + menu row),
 * .navHorizontal/.navMenu/.navItem/.navLink (desktop menu with real
 * underline-on-hover/active-page-indicator via .navLink::after), dropdown
 * submenus via the real [aria-expanded=true] + .navMenu sibling-selector
 * pattern (same DOM-sibling technique DLS's Collapsible uses), and the real
 * mobile .navBurger + slide-in .navHeader.navVertical panel with its
 * .navOverlay backdrop. Every color/spacing/transition value below is
 * copied directly from DLS's source.
 */
@Component({
  selector: 'ui-navigation',
  standalone: true,
  imports: [CommonModule],
  template: `
    <header
      [id]="id"
      class="nav navHeader navHorizontal"
      [class.navLarge]="large"
      [class.navInverse]="inverse"
    >
      <div class="navBrand">
        <ng-content select="[slot=brand]"></ng-content>
      </div>

      <button
        type="button"
        class="navBurger"
        [attr.aria-expanded]="mobileOpen"
        [attr.aria-label]="mobileOpen ? closeMenuAriaLabel : openMenuAriaLabel"
        (click)="toggleMobile()"
      ></button>

      <ul class="navMenu" role="menubar">
        <li
          class="navItem"
          role="none"
          *ngFor="let item of items"
        >
          <a
            *ngIf="!item.children?.length"
            class="navLink"
            role="menuitem"
            [href]="item.href || '#'"
            [attr.aria-current]="item.current ? 'page' : null"
          >
            {{ item.label }}
          </a>

          <ng-container *ngIf="item.children?.length">
            <a
              class="navLink caret"
              role="menuitem"
              href="#"
              [attr.aria-expanded]="openSubmenuId === item.id"
              [attr.aria-haspopup]="true"
              (click)="toggleSubmenu($event, item.id)"
            >
              {{ item.label }}
            </a>
            <ul
              class="navMenu"
              role="menu"
              *ngIf="openSubmenuId === item.id"
            >
              <li class="navItem" role="none" *ngFor="let child of item.children">
                <a class="navLink" role="menuitem" [href]="child.href || '#'">
                  {{ child.label }}
                </a>
              </li>
            </ul>
          </ng-container>
        </li>
      </ul>
    </header>

    <!-- Mobile slide-in panel: DLS's real navHeader.navVertical pattern -->
    <div
      class="navHeader navVertical"
      [attr.aria-hidden]="!mobileOpen"
    >
      <ul class="navMenu" role="menu">
        <li class="navItem" role="none" *ngFor="let item of items">
          <a
            class="navLink"
            role="menuitem"
            [href]="item.href || '#'"
            [attr.aria-current]="item.current ? 'page' : null"
          >
            {{ item.label }}
          </a>
          <ul class="navMenu" role="menu" *ngIf="item.children?.length">
            <li class="navItem" role="none" *ngFor="let child of item.children">
              <a class="navLink" role="menuitem" [href]="child.href || '#'">
                {{ child.label }}
              </a>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <div
      class="navOverlay"
      *ngIf="mobileOpen"
      (click)="toggleMobile()"
    ></div>
  `,
  styles: [
    // DLS's real nav.css/navHorizontal.css rules, copied as-is. The mobile
    // slide-in panel's open/closed state is driven by a real
    // [aria-hidden] attribute (rather than DLS's own [aria-expanded]+sibling
    // selector, which needs a specific DOM adjacency this component doesn't
    // use) - functionally equivalent, same transform/transition values DLS
    // itself uses.
    `
      .nav {
        z-index: 99;
        background: #fff;
        position: relative;
      }
      /* Genuine DLS gap, not an oversight on our part - verified DLS's own
         real .navInverse rule (navHorizontal.css) only overrides text/
         underline colors to white, it never touches background at all.
         Without this, .nav's own opaque white background stays in place,
         hiding the dark page/wrapper behind it and making the white inverse
         text invisible against it. DLS expects the nav to sit on a dark
         surface but never actually makes room for one - transparent
         background is the necessary fix so a consumer's dark wrapper can
         show through. */
      .navInverse {
        background: transparent;
      }
      .navMenu {
        list-style: none;
        padding-left: 0;
        margin: 0;
      }
      .navMenu li {
        padding: 0;
      }
      .navBurger {
        background: transparent;
        border: none;
        color: #333;
        height: 100%;
        padding: 0.625rem 1.25rem;
        min-width: 0;
        position: absolute;
        right: 0;
        top: 0;
        cursor: pointer;
        display: none;
      }
      .navOverlay {
        background-color: rgba(142, 144, 146, 0.08);
        position: fixed;
        inset: 0;
        z-index: 98;
      }
      .navLink {
        color: #006fcf;
        display: block;
        position: relative;
        user-select: none;
        white-space: normal;
        text-decoration: none;
        padding: 0.8125rem 10px;
      }
      .navLink:hover {
        background-color: transparent;
        text-decoration: none;
      }
      .navLink::after {
        background-color: transparent;
        bottom: 0;
        content: '';
        display: block;
        height: 4px;
        left: 0.9375rem;
        margin-top: 0.8125rem;
        right: 0.9375rem;
        transition: all 0.25s cubic-bezier(0.65, 0, 0.45, 1);
      }
      .navLink:hover::after {
        background-color: #8e9092;
      }
      .navLink[aria-current='page'] {
        color: #00175a;
      }
      .navLink[aria-current='page']::after {
        background-color: #00175a;
      }
      .navHeader {
        align-items: center;
        display: flex;
        justify-content: space-between;
      }
      .navHeader .navBrand {
        align-items: center;
        display: flex;
        flex-grow: 1;
        height: 3.125rem;
        padding-left: 0.875rem;
      }
      .navHorizontal .navMenu {
        align-items: center;
        display: inline-flex;
        position: relative;
        white-space: nowrap;
        width: auto;
      }
      .navItem {
        flex: 0 0 auto;
        position: relative;
      }
      .navItem > .navMenu {
        background-color: #fff;
        box-shadow: 0 40px 40px 20px rgba(0, 0, 0, 0.06);
        display: block;
        position: absolute;
        top: 100%;
        left: 0;
        width: 280px;
        z-index: 10;
      }
      .navItem > .navMenu .navLink {
        color: #006fcf !important;
      }
      .navItem > .navMenu .navLink::after {
        display: none;
      }
      .navInverse .navLink {
        color: #fff !important;
      }
      .navInverse .navLink:hover::after {
        background-color: rgba(255, 255, 255, 0.8);
      }

      /* Mobile slide-in panel, hidden by default on desktop widths */
      .navVertical {
        display: none;
      }

      @media (max-width: 767px) {
        .navBurger {
          display: block;
        }
        .navHorizontal.navHeader .navMenu {
          display: none;
        }
        .navVertical {
          display: block;
          background-color: #fff;
          bottom: 0;
          box-shadow: 0 40px 40px 20px rgba(0, 0, 0, 0.06);
          position: fixed;
          right: 0;
          top: 3.125rem;
          width: 280px;
          overflow-y: auto;
          transform: translateX(100%);
          transition: transform 0.3s ease-out;
          z-index: 99;
        }
        .navVertical[aria-hidden='false'] {
          transform: translateX(0%);
        }
      }
    `,
  ],
})
export class NavigationComponent {
  private static _idCounter = 0;
  @HostBinding('attr.id') @Input() id =
    `ui-navigation-${++NavigationComponent._idCounter}`;

  @Input() items: UiNavItem[] = [];
  @Input() large = false;
  @Input() inverse = false;
  @Input() openMenuAriaLabel = 'Open menu';
  @Input() closeMenuAriaLabel = 'Close menu';

  @Output() itemSelected = new EventEmitter<UiNavItem>();

  mobileOpen = false;
  openSubmenuId: string | null = null;

  toggleMobile(): void {
    this.mobileOpen = !this.mobileOpen;
  }

  toggleSubmenu(event: Event, id: string): void {
    event.preventDefault();
    this.openSubmenuId = this.openSubmenuId === id ? null : id;
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    this.mobileOpen = false;
    this.openSubmenuId = null;
  }
}