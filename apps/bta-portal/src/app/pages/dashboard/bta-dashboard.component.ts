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
  templateUrl: './bta-dashboard.component.html',
  styleUrls: ['./bta-dashboard.component.css'],
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
