import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-supp-search',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
  ],
  template: `
    <div class="supp-page">
      <div class="search-section">
        <div class="section-title">Supplementary Access Administration</div>
        <div class="search-row">
          <label class="search-label">Please enter a UCI</label>
          <div class="input-wrap">
            <input class="search-input" type="text" [(ngModel)]="uciValue" />
            <span class="field-error" *ngIf="uciError">{{ uciError }}</span>
          </div>
          <span class="or-text">or a User Id</span>
          <div class="input-wrap">
            <input class="search-input" type="text" [(ngModel)]="userIdValue" />
            <span class="field-error" *ngIf="userIdError">{{ userIdError }}</span>
          </div>
          <button class="btn-search" (click)="onSearch()">Search</button>
          <button class="btn-reset"  (click)="onReset()">Reset</button>
        </div>
      </div>
      <div class="lock-success" *ngIf="lockMessage">{{ lockMessage }}</div>
      <ng-container *ngIf="searched && accessGroup.length > 0">
        <div class="section-header">Access Group: Family - {{ accessGroupId }}</div>
        <table class="data-table">
          <thead>
            <tr>
              <th>Emboss Name</th>
              <th>Uci</th>
              <th>Masked Card</th>
              <th>Is Admin UCI</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let row of accessGroup">
              <td>{{ row.embossName }}</td>
              <td>{{ row.uci }}</td>
              <td>{{ row.maskedCard }}</td>
              <td>{{ row.isAdminUci ? '✓' : '' }}</td>
            </tr>
          </tbody>
        </table>
      </ng-container>
      <ng-container *ngIf="searched && userInfo">
        <div class="section-header" style="margin-top: 18px;">User Information</div>
        <table class="data-table">
          <thead>
            <tr>
              <th>User Id</th>
              <th>Account Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{{ userInfo.userId }}</td>
              <td>{{ userInfo.accountStatus }}</td>
              <td>
                <button class="btn-action" (click)="onLockUser()">
                  {{ userInfo.accountStatus === 'Locked' ? 'Unlock User' : 'Lock User' }}
                </button>
                <button class="btn-action" (click)="onDeleteUser()">Delete User</button>
                <button class="btn-action" (click)="goToOffers()">Offers</button>
                <button class="btn-action" (click)="goToBenefits()">Benefits</button>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="user-details">
          <div class="detail-row">
            <span class="detail-label">User Status</span>
            <span class="detail-value">{{ userInfo.userStatus }}</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">Mail</span>
            <span class="detail-value">{{ userInfo.mail }}</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">Mobile No</span>
            <span class="detail-value">{{ userInfo.mobileNo }}</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">Registration Date</span>
            <span class="detail-value">{{ userInfo.registrationDate }}</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">Last Login</span>
            <span class="detail-value">{{ userInfo.lastLogin }}</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">Secret Question 1</span>
            <span class="detail-value"></span>
          </div>
          <div class="detail-row">
            <span class="detail-label indent">Secret Answer 1</span>
            <span class="detail-value"></span>
          </div>
          <div class="detail-row">
            <span class="detail-label">Secret Question 2</span>
            <span class="detail-value"></span>
          </div>
          <div class="detail-row">
            <span class="detail-label indent">Secret Answer 2</span>
            <span class="detail-value"></span>
          </div>
          <div class="detail-row">
            <span class="detail-label">Secret Question 3</span>
            <span class="detail-value"></span>
          </div>
          <div class="detail-row">
            <span class="detail-label indent">Secret Answer 3</span>
            <span class="detail-value"></span>
          </div>
        </div>
      </ng-container>
      <div *ngIf="searched && !userInfo" class="no-results">
        No supplementary card member found for the given search criteria.
      </div>
    </div>
  `,
  styles: [`
    :host { display: block; font-family: Arial, sans-serif; font-size: 12px; color: #333; }
    .supp-page { padding: 14px 16px; }
    .search-section { border: 1px solid #b0cce0; background: #fff; margin-bottom: 16px; }
    .section-title { background: #d6e8f5; border-bottom: 1px solid #7aaecf; padding: 6px 12px; font-size: 12px; font-weight: bold; color: #1a3a5c; }
    .search-row { display: flex; align-items: flex-start; gap: 8px; flex-wrap: wrap; padding: 10px 12px; }
    .search-label { font-size: 12px; white-space: nowrap; padding-top: 4px; }
    .or-text      { font-size: 12px; white-space: nowrap; padding-top: 4px; }
    .input-wrap   { display: flex; flex-direction: column; }
    .field-error  { color: #cc0000; font-size: 11px; margin-top: 2px; }
    .search-input { border: 1px solid #999; padding: 3px 6px; font-size: 12px; height: 24px; width: 160px; }
    .btn-search { background: #5b8db8; color: #fff; border: 1px solid #4a7aa0; padding: 3px 12px; font-size: 12px; cursor: pointer; height: 24px; }
    .btn-search:hover { background: #4a7aa0; }
    .btn-reset { background: #e8e8e8; color: #333; border: 1px solid #aaa; padding: 3px 12px; font-size: 12px; cursor: pointer; height: 24px; }
    .btn-reset:hover { background: #d5d5d5; }
    .lock-success { background: #dff0d8; border: 1px solid #a3c98a; color: #3a6e28; padding: 6px 12px; font-size: 12px; margin-bottom: 12px; }
    .section-header { background: #c5dcee; border: 1px solid #7aaecf; padding: 5px 10px; font-size: 12px; font-weight: bold; color: #1a3a5c; margin-bottom: 0; }
    .data-table { width: 100%; border-collapse: collapse; font-size: 12px; border: 1px solid #7aaecf; border-top: none; }
    .data-table th { background: #ddeeff; border: 1px solid #a8c8e8; padding: 4px 8px; text-align: left; font-weight: bold; color: #1a3a5c; }
    .data-table td { border: 1px solid #c8dcea; padding: 4px 8px; background: #fff; }
    .data-table tbody tr:hover td { background: #f0f7ff; }
    .btn-action { background: #5b8db8; color: #fff; border: 1px solid #4a7aa0; padding: 2px 10px; font-size: 11px; cursor: pointer; margin-right: 4px; height: 22px; }
    .btn-action:hover { background: #4a7aa0; }
    .user-details { margin-top: 12px; font-size: 12px; }
    .detail-row   { display: flex; padding: 2px 0; }
    .detail-label { width: 160px; font-weight: bold; color: #333; flex-shrink: 0; padding-left: 4px; }
    .detail-label.indent { padding-left: 20px; font-weight: normal; }
    .detail-value { color: #333; }
    .no-results { border: 1px solid #f5c6c6; background: #ffeaea; color: #cc0000; padding: 10px 14px; font-size: 12px; max-width: 480px; }
  `],
})
export class SuppSearchComponent {

  uciValue      = '';
  userIdValue   = '';
  searched      = false;
  accessGroupId = '11208';
  lockMessage   = '';
  uciError      = '';
  userIdError   = '';

  private masterData = [
    { uci: 'DE8522VS', userId: 'Supp15', embossName: 'DEV ANAND',  maskedCard: '3744XXXXXXXX2263', isAdminUci: false, accountStatus: 'Unlocked', userStatus: 'Active', mail: 'murali.esakkimuthu@americanexpress.com.bh', mobileNo: '93 12121212121',  registrationDate: 'Feb 18 2023 12:11:04 PM AST', lastLogin: '29/9/2024 1:51:21 PM AST'   },
    { uci: 'DE8518HS', userId: 'Supp16', embossName: 'DEV ANAND',  maskedCard: '3744XXXXXXXX2198', isAdminUci: false, accountStatus: 'Unlocked', userStatus: 'Active', mail: 'devanand2@americanexpress.com.bh',              mobileNo: '93 98765432101', registrationDate: 'Mar 10 2023 09:00:00 AM AST', lastLogin: '01/10/2024 10:00:00 AM AST' },
    { uci: 'DE8539VS', userId: 'Supp17', embossName: 'LINKE INKE', maskedCard: '3744XXXXXXXX2297', isAdminUci: false, accountStatus: 'Locked',   userStatus: 'Active', mail: 'linkeinke@americanexpress.com.bh',              mobileNo: '93 11122233301', registrationDate: 'Apr 05 2023 11:30:00 AM AST', lastLogin: '15/9/2024 02:15:00 PM AST'  },
    { uci: 'DE8528KS', userId: 'Supp18', embossName: 'MARY SMITH', maskedCard: '3744XXXXXXXX2271', isAdminUci: true,  accountStatus: 'Unlocked', userStatus: 'Active', mail: 'marysmith@americanexpress.com.bh',              mobileNo: '93 55566677701', registrationDate: 'Jan 20 2023 08:45:00 AM AST', lastLogin: '28/9/2024 04:30:00 PM AST'  },
  ];

  accessGroup: { embossName: string; uci: string; maskedCard: string; isAdminUci: boolean; }[] = [];
  userInfo: { userId: string; accountStatus: string; userStatus: string; mail: string; mobileNo: string; registrationDate: string; lastLogin: string; } | null = null;
  constructor(private router: Router) {}
  onSearch(): void {
    this.uciError = ''; this.userIdError = '';
    const uci    = this.uciValue.trim();
    const userId = this.userIdValue.trim();
    if (!uci && !userId) {
      this.uciError = 'Please enter a UCI or User ID.';
      this.userIdError = 'Please enter a UCI or User ID.';
      return;
    }
    let matched = [...this.masterData];
    if (uci) {
      matched = matched.filter(r => r.uci.toLowerCase() === uci.toLowerCase());
      if (matched.length === 0) {
        this.uciError = `UCI "${uci}" not found.`;
        this.searched = false; this.accessGroup = []; this.userInfo = null;
        return;
      }
    }
    if (userId) {
      matched = matched.filter(r => r.userId.toLowerCase() === userId.toLowerCase());
      if (matched.length === 0) {
        this.userIdError = `User ID "${userId}" not found.`;
        this.searched = false; this.accessGroup = []; this.userInfo = null;
        return;
      }
    }
    if (uci && userId) {
      const both = this.masterData.find(r =>
        r.uci.toLowerCase() === uci.toLowerCase() &&
        r.userId.toLowerCase() === userId.toLowerCase()
      );
      if (!both) {
        this.uciError = 'UCI and User ID do not match.';
        this.userIdError = 'UCI and User ID do not match.';
        this.searched = false; this.accessGroup = []; this.userInfo = null;
        return;
      }
      matched = [both];
    }
    const record     = matched[0];
    this.searched    = true;
    this.accessGroup = this.masterData.map(r => ({ embossName: r.embossName, uci: r.uci, maskedCard: r.maskedCard, isAdminUci: r.isAdminUci }));
    this.userInfo    = { userId: record.userId, accountStatus: record.accountStatus, userStatus: record.userStatus, mail: record.mail, mobileNo: record.mobileNo, registrationDate: record.registrationDate, lastLogin: record.lastLogin };
  }
  onReset(): void {
    this.uciValue = ''; this.userIdValue = ''; this.searched = false;
    this.accessGroup = []; this.userInfo = null;
    this.lockMessage = ''; this.uciError = ''; this.userIdError = '';
  }
  onLockUser(): void {
    if (this.userInfo) {
      if (this.userInfo.accountStatus === 'Locked') {
        this.userInfo.accountStatus = 'Unlocked';
        this.lockMessage = 'Account has been unlocked successfully';
      } else {
        this.userInfo.accountStatus = 'Locked';
        this.lockMessage = 'Account has been locked successfully';
      }
      setTimeout(() => this.lockMessage = '', 4000);
    }
  }
  onDeleteUser(): void {
    this.searched = false; this.accessGroup = [];
    this.userInfo = null; this.lockMessage = '';
  }
  goToOffers(): void   { window.location.href = '/offers';   }
  goToBenefits(): void { window.location.href = '/offers/benefits'; }
}