import { Component } from '@angular/core';
import { Router } from '@angular/router';

interface ExpenseReport {
  id: string; employee: string; department: string; period: string;
  total: number; status: 'submitted' | 'under_review' | 'reimbursed' | 'rejected';
  submittedDate: string; items: number;
}

@Component({
  selector: 'app-bta-reports',
  template: `
    <div class="bta-reports">
      <div class="sub-nav">
        <div class="sub-nav-item" (click)="router.navigate(['/bta'])">Dashboard</div>
        <div class="sub-nav-item" (click)="router.navigate(['/bta/travel'])">Travel Requests</div>
        <div class="sub-nav-item active">Expense Reports</div>
        <div class="sub-nav-item" (click)="router.navigate(['/bta/settings'])">Settings</div>
      </div>

      <div class="page-title">Expense Reports</div>
      <div class="page-subtitle">Review and process employee expense submissions</div>

      <div class="grid-4" style="margin-bottom:24px;">
        <div class="stat-card accent">
          <div class="label">Total Submitted</div>
          <div class="value">87</div>
          <div class="sub">This month</div>
        </div>
        <div class="stat-card warning">
          <div class="label">Under Review</div>
          <div class="value">12</div>
          <div class="sub">\$34,200 pending</div>
        </div>
        <div class="stat-card success">
          <div class="label">Reimbursed</div>
          <div class="value">68</div>
          <div class="sub">\$198,450 paid out</div>
        </div>
        <div class="stat-card danger">
          <div class="label">Rejected</div>
          <div class="value">7</div>
          <div class="sub">Policy non-compliance</div>
        </div>
      </div>

      <div class="card">
        <div class="card-header">
          Expense Reports
          <div style="display:flex;gap:8px;">
            <select [(ngModel)]="statusFilter" style="padding:5px 10px;border:1.5px solid #ddd;border-radius:6px;font-size:12px;">
              <option value="">All Statuses</option>
              <option value="submitted">Submitted</option>
              <option value="under_review">Under Review</option>
              <option value="reimbursed">Reimbursed</option>
              <option value="rejected">Rejected</option>
            </select>
            <button class="btn-primary" style="font-size:12px;padding:5px 14px;">Export CSV</button>
          </div>
        </div>
        <table class="data-table">
          <thead>
            <tr>
              <th>Report ID</th>
              <th>Employee</th>
              <th>Department</th>
              <th>Period</th>
              <th>Items</th>
              <th>Total</th>
              <th>Submitted</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let r of filteredReports">
              <td style="font-family:monospace;font-size:12px;color:#006fcf;">{{ r.id }}</td>
              <td><strong>{{ r.employee }}</strong></td>
              <td style="font-size:12px;color:#888;">{{ r.department }}</td>
              <td style="font-size:12px;">{{ r.period }}</td>
              <td style="text-align:center;">{{ r.items }}</td>
              <td><strong>\${{ r.total.toLocaleString() }}</strong></td>
              <td style="font-size:12px;color:#aaa;">{{ r.submittedDate }}</td>
              <td>
                <span class="badge"
                  [class.badge-info]="r.status === 'submitted'"
                  [class.badge-warning]="r.status === 'under_review'"
                  [class.badge-success]="r.status === 'reimbursed'"
                  [class.badge-danger]="r.status === 'rejected'">
                  {{ r.status === 'under_review' ? 'Under Review' : (r.status | titlecase) }}
                </span>
              </td>
              <td>
                <button *ngIf="r.status === 'submitted' || r.status === 'under_review'"
                  class="btn-secondary" style="font-size:11px;padding:4px 10px;"
                  (click)="approve(r)">Approve</button>
                <button *ngIf="r.status === 'reimbursed'" disabled
                  style="font-size:11px;padding:4px 10px;background:#f5f5f5;border:1px solid #ddd;border-radius:6px;color:#aaa;cursor:not-allowed;">
                  Done
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `,
})
export class BtaReportsComponent {
  statusFilter = '';

  reports: ExpenseReport[] = [
    { id: 'ER-0218', employee: 'Sarah Johnson',    department: 'Marketing',   period: 'May 2025', total: 3820,  status: 'reimbursed',  submittedDate: 'Jun 1',  items: 12 },
    { id: 'ER-0219', employee: 'Michael Chen',     department: 'Sales',       period: 'May 2025', total: 6400,  status: 'under_review',submittedDate: 'Jun 2',  items: 18 },
    { id: 'ER-0220', employee: 'Amanda Rodriguez', department: 'Risk',        period: 'May 2025', total: 1200,  status: 'submitted',   submittedDate: 'Jun 3',  items: 5  },
    { id: 'ER-0221', employee: 'David Park',       department: 'Sales',       period: 'May 2025', total: 4100,  status: 'reimbursed',  submittedDate: 'Jun 3',  items: 14 },
    { id: 'ER-0222', employee: 'Emily Watson',     department: 'Operations',  period: 'May 2025', total: 890,   status: 'rejected',    submittedDate: 'Jun 4',  items: 3  },
    { id: 'ER-0223', employee: 'James Liu',        department: 'Technology',  period: 'May 2025', total: 7200,  status: 'under_review',submittedDate: 'Jun 5',  items: 22 },
    { id: 'ER-0224', employee: 'Priya Sharma',     department: 'Compliance',  period: 'May 2025', total: 540,   status: 'reimbursed',  submittedDate: 'Jun 6',  items: 4  },
    { id: 'ER-0225', employee: 'Robert Taylor',    department: 'Finance',     period: 'May 2025', total: 2300,  status: 'submitted',   submittedDate: 'Jun 7',  items: 8  },
  ];

  get filteredReports(): ExpenseReport[] {
    return this.reports.filter(r => !this.statusFilter || r.status === this.statusFilter);
  }

  approve(report: ExpenseReport): void {
    report.status = report.status === 'submitted' ? 'under_review' : 'reimbursed';
  }

  constructor(public router: Router) {}
}
