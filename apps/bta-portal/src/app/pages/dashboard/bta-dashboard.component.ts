import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BtaAuthService } from '../../core/services/auth.service';

interface TravelRequest {
  id: string;
  traveler: string;
  destination: string;
  dates: string;
  amount: number;
  status: 'approved' | 'pending' | 'rejected';
  type: string;
}

interface ExpenseItem {
  category: string;
  amount: number;
  percent: number;
  color: string;
}

@Component({
  selector: 'app-bta-dashboard',
  template: `
    <div class="bta-dashboard">

      <div class="sub-nav">
        <div class="sub-nav-item active" (click)="navigate('')">Dashboard</div>
        <div class="sub-nav-item" (click)="navigate('travel')">Travel Requests</div>
        <div class="sub-nav-item" (click)="navigate('reports')">Expense Reports</div>
        <div class="sub-nav-item" (click)="navigate('settings')">Settings</div>
      </div>

      <div class="page-title">BTA Portal</div>
      <div class="page-subtitle">Business Travel & Expense Management</div>

      <div class="grid-4">
        <div class="stat-card accent">
          <div class="label">Active Travel Requests</div>
          <div class="value">24</div>
          <div class="sub">↑ 3 this week</div>
        </div>
        <div class="stat-card success">
          <div class="label">Approved This Month</div>
          <div class="value">142</div>
          <div class="sub">$284,500 total</div>
        </div>
        <div class="stat-card warning">
          <div class="label">Pending Approval</div>
          <div class="value">18</div>
          <div class="sub">Awaiting manager sign-off</div>
        </div>
        <div class="stat-card danger">
          <div class="label">Policy Exceptions</div>
          <div class="value">5</div>
          <div class="sub">Require review</div>
        </div>
      </div>

      <div class="grid-2">

        <div class="card">
          <div class="card-header">
            Recent Travel Requests
            <button class="btn-secondary" style="font-size:12px;padding:5px 12px;" (click)="navigate('travel')">View All</button>
          </div>
          <table class="data-table">
            <thead>
              <tr>
                <th>Traveler</th>
                <th>Destination</th>
                <th>Dates</th>
                <th>Amount</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let req of recentRequests">
                <td>{{ req.traveler }}</td>
                <td>{{ req.destination }}</td>
                <td style="font-size:11px;color:#aaa;">{{ req.dates }}</td>
                <td><strong>\${{ req.amount.toLocaleString() }}</strong></td>
                <td>
                  <span class="badge"
                    [class.badge-success]="req.status === 'approved'"
                    [class.badge-warning]="req.status === 'pending'"
                    [class.badge-danger]="req.status === 'rejected'">
                    {{ req.status | titlecase }}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="card">
          <div class="card-header">Expense Breakdown — June 2025</div>
          <div class="card-body">
            <div *ngFor="let item of expenseBreakdown" class="expense-bar-row">
              <div class="expense-bar-label">
                <span>{{ item.category }}</span>
                <span class="expense-bar-amount">\${{ item.amount.toLocaleString() }}</span>
              </div>
              <div class="expense-bar-track">
                <div class="expense-bar-fill" [style.width.%]="item.percent" [style.background]="item.color"></div>
              </div>
            </div>

            <div class="expense-total">
              <span>Total Spend</span>
              <strong>\$284,500</strong>
            </div>
          </div>
        </div>

      </div>

      <div class="card">
        <div class="card-header">Recent Activity</div>
        <div class="card-body">
          <div class="timeline">
            <div class="timeline-item" *ngFor="let item of activityLog">
              <div class="timeline-dot" [ngClass]="item.dotClass">{{ item.icon }}</div>
              <div class="timeline-content">
                <div class="timeline-title">{{ item.title }}</div>
                <div class="timeline-meta">{{ item.meta }}</div>
              </div>
              <div class="timeline-amount" *ngIf="item.amount">\${{ item.amount.toLocaleString() }}</div>
            </div>
          </div>
        </div>
      </div>

    </div>
  `,
  styles: [`
    .bta-dashboard { padding: 0; }

    .expense-bar-row { margin-bottom: 16px; }
    .expense-bar-label {
      display: flex; justify-content: space-between;
      font-size: 12px; color: #555; margin-bottom: 6px;
    }
    .expense-bar-amount { font-weight: 600; color: #333; }
    .expense-bar-track { background: #f0f0f0; border-radius: 4px; height: 8px; }
    .expense-bar-fill  { height: 8px; border-radius: 4px; transition: width .4s; }

    .expense-total {
      display: flex; justify-content: space-between; align-items: center;
      margin-top: 20px; padding-top: 16px; border-top: 1px solid #f0f0f0;
      font-size: 14px; color: #555;
    }
    .expense-total strong { font-size: 18px; color: var(--color-primary); }
  `],
})
export class BtaDashboardComponent implements OnInit {

  user: { username: string; role: string } | null = null;

  recentRequests: TravelRequest[] = [
    { id: 'TR001', traveler: 'Sarah Johnson',   destination: 'New York, NY',    dates: 'Jun 10–14',  amount: 3200,  status: 'approved', type: 'Conference' },
    { id: 'TR002', traveler: 'Michael Chen',    destination: 'London, UK',      dates: 'Jun 15–22',  amount: 8750,  status: 'pending',  type: 'Client Visit' },
    { id: 'TR003', traveler: 'Amanda Rodriguez',destination: 'Chicago, IL',     dates: 'Jun 18–19',  amount: 1400,  status: 'approved', type: 'Internal Meeting' },
    { id: 'TR004', traveler: 'David Park',      destination: 'San Francisco, CA',dates: 'Jun 20–24', amount: 4100,  status: 'pending',  type: 'Sales Call' },
    { id: 'TR005', traveler: 'Emily Watson',    destination: 'Toronto, Canada', dates: 'Jun 25–27',  amount: 2850,  status: 'rejected', type: 'Conference' },
  ];

  expenseBreakdown: ExpenseItem[] = [
    { category: 'Airfare',        amount: 98400,  percent: 85, color: '#1a3c5e' },
    { category: 'Hotels',         amount: 72300,  percent: 62, color: '#2d6a9f' },
    { category: 'Meals',          amount: 41200,  percent: 35, color: '#0070c0' },
    { category: 'Ground Transport',amount: 28600, percent: 25, color: '#5a9fd4' },
    { category: 'Miscellaneous',  amount: 44000,  percent: 38, color: '#90bce8' },
  ];

  activityLog = [
    { icon: '✓', dotClass: 'green',  title: 'Travel request TR001 approved by J. Martinez',             meta: 'Today, 10:24 AM',   amount: 3200 },
    { icon: '⏳', dotClass: 'orange', title: 'TR002 submitted — awaiting VP approval (>$5K threshold)',   meta: 'Today, 9:05 AM',    amount: 8750 },
    { icon: '✕', dotClass: 'red',    title: 'TR005 rejected — exceeds quarterly budget cap',              meta: 'Yesterday, 4:15 PM', amount: 2850 },
    { icon: '✓', dotClass: 'green',  title: 'Expense report ER-0218 reimbursed',                         meta: 'Yesterday, 2:30 PM', amount: 1820 },
    { icon: '!', dotClass: 'blue',   title: 'Policy reminder sent to 5 travelers with pending receipts', meta: 'Jun 8, 11:00 AM',   amount: 0 },
  ];

  constructor(private router: Router, private auth: BtaAuthService) {}

  ngOnInit(): void {
    this.user = this.auth.getUser();
  }

  navigate(path: string): void {
    const url = path ? ['/bta', path] : ['/bta'];
    this.router.navigate(url);
  }
}
