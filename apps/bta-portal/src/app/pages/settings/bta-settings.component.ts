import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bta-settings',
  template: `
    <div class="bta-settings">
      <div class="sub-nav">
        <div class="sub-nav-item" (click)="router.navigate(['/bta'])">Dashboard</div>
        <div class="sub-nav-item" (click)="router.navigate(['/bta/travel'])">Travel Requests</div>
        <div class="sub-nav-item" (click)="router.navigate(['/bta/reports'])">Expense Reports</div>
        <div class="sub-nav-item active">Settings</div>
      </div>

      <div class="page-title">BTA Settings</div>
      <div class="page-subtitle">Configure travel policy, approval thresholds, and portal preferences</div>

      <div class="grid-2">

        <div class="card">
          <div class="card-header">Approval Thresholds</div>
          <div class="card-body">
            <div style="margin-bottom:20px;">
              <div style="font-size:12px;font-weight:700;color:#555;text-transform:uppercase;margin-bottom:10px;">
                Travel Request Limits
              </div>
              <div class="settings-row">
                <span class="settings-label">Manager approval required above</span>
                <div style="display:flex;align-items:center;gap:8px;">
                  <span style="color:#888;font-size:13px;">$</span>
                  <input type="number" [(ngModel)]="settings.managerThreshold"
                    style="width:100px;padding:6px 10px;border:1.5px solid #ddd;border-radius:6px;font-size:13px;" />
                </div>
              </div>
              <div class="settings-row">
                <span class="settings-label">VP approval required above</span>
                <div style="display:flex;align-items:center;gap:8px;">
                  <span style="color:#888;font-size:13px;">$</span>
                  <input type="number" [(ngModel)]="settings.vpThreshold"
                    style="width:100px;padding:6px 10px;border:1.5px solid #ddd;border-radius:6px;font-size:13px;" />
                </div>
              </div>
              <div class="settings-row">
                <span class="settings-label">International travel requires pre-approval</span>
                <label class="toggle">
                  <input type="checkbox" [(ngModel)]="settings.intlPreApproval" />
                  <span class="toggle-slider"></span>
                </label>
              </div>
            </div>

            <div>
              <div style="font-size:12px;font-weight:700;color:#555;text-transform:uppercase;margin-bottom:10px;">
                Expense Limits (per diem)
              </div>
              <div class="settings-row">
                <span class="settings-label">Domestic daily meal allowance</span>
                <div style="display:flex;align-items:center;gap:8px;">
                  <span style="color:#888;font-size:13px;">$</span>
                  <input type="number" [(ngModel)]="settings.domesticMeals"
                    style="width:80px;padding:6px 10px;border:1.5px solid #ddd;border-radius:6px;font-size:13px;" />
                </div>
              </div>
              <div class="settings-row">
                <span class="settings-label">International daily meal allowance</span>
                <div style="display:flex;align-items:center;gap:8px;">
                  <span style="color:#888;font-size:13px;">$</span>
                  <input type="number" [(ngModel)]="settings.intlMeals"
                    style="width:80px;padding:6px 10px;border:1.5px solid #ddd;border-radius:6px;font-size:13px;" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="card-header">Notifications & Preferences</div>
          <div class="card-body">
            <div style="font-size:12px;font-weight:700;color:#555;text-transform:uppercase;margin-bottom:10px;">
              Email Notifications
            </div>
            <div class="settings-row" *ngFor="let n of notifications">
              <span class="settings-label">{{ n.label }}</span>
              <label class="toggle">
                <input type="checkbox" [(ngModel)]="n.enabled" />
                <span class="toggle-slider"></span>
              </label>
            </div>

            <div style="font-size:12px;font-weight:700;color:#555;text-transform:uppercase;margin:20px 0 10px;">
              Receipt Policy
            </div>
            <div class="settings-row">
              <span class="settings-label">Receipts required above</span>
              <div style="display:flex;align-items:center;gap:8px;">
                <span style="color:#888;font-size:13px;">$</span>
                <input type="number" [(ngModel)]="settings.receiptThreshold"
                  style="width:80px;padding:6px 10px;border:1.5px solid #ddd;border-radius:6px;font-size:13px;" />
              </div>
            </div>
            <div class="settings-row">
              <span class="settings-label">Allow digital receipts</span>
              <label class="toggle">
                <input type="checkbox" [(ngModel)]="settings.digitalReceipts" />
                <span class="toggle-slider"></span>
              </label>
            </div>
          </div>
        </div>
      </div>
>
      <div style="display:flex;gap:10px;">
        <button class="btn-primary" (click)="save()">Save Changes</button>
        <button class="btn-secondary" (click)="reset()">Reset to Defaults</button>
      </div>
      <div *ngIf="saved" style="margin-top:12px;padding:10px 16px;background:#e6f9f0;border-radius:6px;color:#1a7a4a;font-size:13px;">
        ✓ Settings saved successfully.
      </div>
    </div>
  `,
  styles: [`
    .settings-row {
      display: flex; justify-content: space-between; align-items: center;
      padding: 10px 0; border-bottom: 1px solid #f5f5f5;
    }
    .settings-row:last-child { border-bottom: none; }
    .settings-label { font-size: 13px; color: #444; }

    .toggle { position: relative; display: inline-block; width: 40px; height: 22px; }
    .toggle input { opacity: 0; width: 0; height: 0; }
    .toggle-slider {
      position: absolute; cursor: pointer; inset: 0;
      background: #ccc; border-radius: 22px; transition: .3s;
    }
    .toggle-slider:before {
      content: ''; position: absolute; width: 16px; height: 16px;
      left: 3px; bottom: 3px; background: #fff; border-radius: 50%; transition: .3s;
    }
    input:checked + .toggle-slider { background: var(--color-primary); }
    input:checked + .toggle-slider:before { transform: translateX(18px); }
  `],
})
export class BtaSettingsComponent {
  saved = false;

  settings = {
    managerThreshold: 2000,
    vpThreshold: 5000,
    intlPreApproval: true,
    domesticMeals: 75,
    intlMeals: 120,
    receiptThreshold: 25,
    digitalReceipts: true,
  };

  notifications = [
    { label: 'New travel request submitted',       enabled: true  },
    { label: 'Request approved / rejected',        enabled: true  },
    { label: 'Expense report ready for review',    enabled: true  },
    { label: 'Policy exception flagged',           enabled: true  },
    { label: 'Reimbursement processed',            enabled: false },
    { label: 'Monthly summary digest',             enabled: false },
  ];

  save(): void {
    this.saved = true;
    setTimeout(() => this.saved = false, 3000);
  }

  reset(): void {
    this.settings = { managerThreshold: 2000, vpThreshold: 5000, intlPreApproval: true, domesticMeals: 75, intlMeals: 120, receiptThreshold: 25, digitalReceipts: true };
  }

  constructor(public router: Router) {}
}
