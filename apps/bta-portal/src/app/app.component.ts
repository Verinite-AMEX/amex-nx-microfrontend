import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, NavigationEnd, RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import {
  AmexPageComponent,
  AmexTabItem,
} from '@ui-components/ui';
import { SecureFormService } from './core/services/secure-form.service'; 
import { BtaAuthService } from './core/services/auth.service';

interface NavItem { id: string; label: string; }

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    AmexPageComponent,
  ],
  template: `
    <amex-page-component
      portalStyle="onls"
      portalTitle="MY BTA"
      [tabs]="tabs"
      activeTabId="bta"
      [showCustomSidebar]="true"
      (logout)="onLogout()">

      <!-- left-nav slot: our nav when logged in, empty div on login page -->
      <div left-nav>
        <ng-container *ngIf="navItems.length > 0">
          <div class="bta-nav-hd">NAVIGATION</div>
          <a
            *ngFor="let item of navItems"
            class="bta-nav-item"
            [class.active]="activeId === item.id"
            (click)="onNavClick(item.id)">
            {{ item.label }}
          </a>
        </ng-container>
      </div>

      <!-- default slot: page content -->
      <router-outlet></router-outlet>

    </amex-page-component>
  `,
  styles: [`
    .bta-nav-hd   { background:#1e3a6e; color:#fff; font-size:11px; font-weight:bold; padding:6px 10px; text-align:center; letter-spacing:.04em; }
    .bta-nav-item { display:block; padding:6px 10px; font-size:12px; color:#006fcf; cursor:pointer; border-bottom:1px solid #e8f0f8; text-decoration:none; }
    .bta-nav-item:hover  { background:#e8f0f8; text-decoration:underline; }
    .bta-nav-item.active { background:#cfe2f3; color:#1e3a6e; font-weight:bold; }
  `],
})
export class AppComponent implements OnInit, OnDestroy {

  tabs: AmexTabItem[] = [{ id: 'bta', label: 'BTA Portal' }];

  navItems: NavItem[] = [];
  activeId = '';

  private routeSub!: Subscription;

  constructor(
    private auth: BtaAuthService,
    private secureForm: SecureFormService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.secureForm.enable(); 
    this.updateNav(this.router.url);

    this.routeSub = this.router.events.pipe(
      filter(e => e instanceof NavigationEnd)
    ).subscribe((e: any) => {
      this.updateNav(e.urlAfterRedirects ?? e.url);
    });
  }

  ngOnDestroy(): void {
    this.routeSub?.unsubscribe();
  }

  private updateNav(url: string): void {
    if (url.includes('/bta/login') || !this.auth.isLoggedIn()) {
      this.navItems = [];
      this.activeId = '';
      return;
    }

    this.navItems = this.buildNav();
    const seg = url.split('/').filter(Boolean).pop() ?? '';
    this.activeId = this.navItems.find(i => i.id === seg)?.id
      ?? this.navItems[0]?.id
      ?? '';
  }

  private buildNav(): NavItem[] {
    if (this.auth.isAemeAdmin()) {
      return [
        { id: 'user-management',   label: 'User Management'    },
        { id: 'audit-trail',       label: 'Audit Trail'        },
        { id: 'memo-statement',    label: 'Memo Statement'     },
        { id: 'monthly-statement', label: 'Monthly Statements' },
      ];
    }
    if (this.auth.isCorpAdmin()) {
      return [
        { id: 'user-management',    label: 'User Management'    },
        { id: 'memo-statement',     label: 'Memo Statement'     },
        { id: 'large-reports',      label: 'Large Reports'      },
        { id: 'monthly-statement',  label: 'Monthly Statements' },
        { id: 'payment-allocation', label: 'Payment Allocation' },
        { id: 'audit-trail',        label: 'Audit Trail'        },
      ];
    }
    if (this.auth.isCorpUser()) {
      return [
        { id: 'memo-statement',     label: 'Memo Statement'     },
        { id: 'large-reports',      label: 'Large Reports'      },
        { id: 'monthly-statement',  label: 'Monthly Statements' },
        { id: 'payment-allocation', label: 'Payment Allocation' },
        { id: 'audit-trail',        label: 'Audit Trail'        },
      ];
    }
    if (this.auth.isTaAdmin()) {
      return [
        { id: 'user-management',  label: 'User Management'  },
        { id: 'case-management',  label: 'Case Management'  },
        { id: 'audit-trail',      label: 'Audit Trail'      },
        { id: 'tmc-transactions', label: 'TMC Transactions' },
      ];
    }
    if (this.auth.isTaUser()) {
      return [
        { id: 'case-management',  label: 'Case Management'  },
        { id: 'tmc-transactions', label: 'TMC Transactions' },
      ];
    }
    return [];
  }

  onNavClick(id: string): void {
    this.activeId = id;
    this.router.navigate(['/bta', id]);
  }

  onLogout(): void {
  // OLD:
  // this.auth.clearSession();
  // this.router.navigate(['/bta/login']);

  // NEW — delegates to Login-Logout-auth-app
  this.auth.logout();
}
}