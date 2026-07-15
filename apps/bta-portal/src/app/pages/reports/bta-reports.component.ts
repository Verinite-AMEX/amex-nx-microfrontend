import { Component } from '@angular/core';
import { Router } from '@angular/router';

interface ExpenseReport {
  id: string; employee: string; department: string; period: string;
  total: number; status: 'submitted' | 'under_review' | 'reimbursed' | 'rejected';
  submittedDate: string; items: number;
}

@Component({
  selector: 'app-bta-reports',
  templateUrl: './bta-reports.component.html',
  styleUrls: ['./bta-reports.component.css'],
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

  constructor(public router: Router) {}

  get filteredReports(): ExpenseReport[] {
    return this.reports.filter(r => !this.statusFilter || r.status === this.statusFilter);
  }

  approve(report: ExpenseReport): void {
    report.status = report.status === 'submitted' ? 'under_review' : 'reimbursed';
  }
}