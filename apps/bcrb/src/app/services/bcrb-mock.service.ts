import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface BcrbReport {
  id: number;
  processId: string;
  reportType: string;
  reportName: string;
  fileName: string;
  createdAt: string;
  status: 'Processing' | 'Completed' | 'Failed';
}

@Injectable({
  providedIn: 'root'
})
export class BcrbMockService {

  private reports: BcrbReport[] = [];

  private reportsSubject = new BehaviorSubject<BcrbReport[]>([]);
  reports$ = this.reportsSubject.asObservable();

  private counter = 1000;

  constructor() {
    this.seedInitialData();
  }

  private seedInitialData() {
    this.reports = [
      this.createMockRow('cons-monthly', 'Completed'),
      this.createMockRow('corp-monthly', 'Processing')
    ];

    this.reportsSubject.next([...this.reports]);
  }

  createReport(reportType: string) {
    const newReport = this.createMockRow(reportType, 'Processing');

    this.reports.unshift(newReport);
    this.reportsSubject.next([...this.reports]);
    setTimeout(() => {
      newReport.status = 'Completed';
      this.reportsSubject.next([...this.reports]);
    }, 4000);
  }
  private createMockRow(reportType: string, status: any): BcrbReport {
    this.counter++;

    const reportNameMap: any = {
      'cons-monthly': 'Consumer Monthly Audit Report',
      'corp-monthly': 'Corporate Monthly Audit Report',
      'cons-data': 'Consumer Data Audit Report',
      'corp-data': 'Corporate Data Audit Report',
      'cons-full': 'Consumer Full Report',
      'corp-full': 'Corporate Full Report',
      'cons-history': 'Consumer History Report',
      'corp-history': 'Corporate History Report'
    };

    const repCodeMap: any = {
      'cons-monthly': 'REP-009',
      'corp-monthly': 'REP-010'
    };

    const now = new Date();

    return {
      id: this.counter,
      processId: this.counter.toString(),
      reportType,
      reportName: reportNameMap[reportType] || 'Report',
      fileName: `${this.counter}_${repCodeMap[reportType] || 'REP'}_${this.formatDate(now)}`,
      createdAt: this.formatDisplayDate(now),
      status
    };
  }

  private formatDate(date: Date): string {
    return `${date.getDate()}${date.getMonth()+1}${date.getFullYear()}${date.getHours()}${date.getMinutes()}`;
  }

  private formatDisplayDate(date: Date): string {
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
  }
}
