import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  AmexSuccessToastComponent,
  AmexErrorToastComponent
} from '@vn-core-ui-components/ui';
import { NumbersOnlyDirective } from '../../../core/directives/numbers-only.directive';

interface CalendarDay {
  date: Date;
  currentMonth: boolean;
}

@Component({
  selector: 'app-file-formation-upload',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    AmexSuccessToastComponent,
    AmexErrorToastComponent,
    NumbersOnlyDirective
  ],
  templateUrl: './file-formation-upload.html',
  styleUrl: './file-formation-upload.css'
})
export class FileFormationUpload implements OnInit {
  julianDay: string = '';
  selectedDate: Date | null = null;
  country: string = '';
  currency: string = '';
  isLoading = false;
  uploadStatus: 'idle' | 'success' | 'error' = 'idle';
  statusMessage = '';

  countries = [
    'ALGERIA','BAHRAIN','EGYPT','EUROPE','INDIA','JORDAN','KUWAIT',
    'LEBANON','LIBYA','MAURITANIA','OMAN','QATAR','SAUDI ARABIA',
    'SOMALIA','SUDAN','SYRIA','TUNISIA','UAE','US','YEMAN'
  ];

  currencies = [
    'ALGERIAN DINAR','BAHRAIN DINAR','EGYPTIAN POUND','INDIAN RUPEE',
    'KUWAITI DINAR','LIBYAN DINAR','MOROCCAN DIRHAM','OMANI RIAL',
    'QATARI RIYAL','SAUDI RIYAL','SMT DINAR','SOMALI SHILLING',
    'SUDANESE DINAR','TUNISIAN DINAR','UAE DIRHAM','US DOLLAR','OUGUIJA'
  ];

  // Calendar state
  viewYear: number = new Date().getFullYear();
  viewMonth: number = new Date().getMonth();
  calendarDays: CalendarDay[] = [];

  get calendarMonthYear(): string {
    const d = new Date(this.viewYear, this.viewMonth, 1);
    return d.toLocaleString('en-US', { month: 'long', year: 'numeric' });
  }

  ngOnInit(): void {
    this.buildCalendar();
    this.setToday();
  }

  buildCalendar(): void {
    const days: CalendarDay[] = [];
    const first = new Date(this.viewYear, this.viewMonth, 1);
    const startDay = first.getDay();

    for (let i = startDay - 1; i >= 0; i--) {
      const d = new Date(this.viewYear, this.viewMonth, -i);
      days.push({ date: d, currentMonth: false });
    }
    const daysInMonth = new Date(this.viewYear, this.viewMonth + 1, 0).getDate();
    for (let i = 1; i <= daysInMonth; i++) {
      days.push({ date: new Date(this.viewYear, this.viewMonth, i), currentMonth: true });
    }
    const remaining = 42 - days.length;
    for (let i = 1; i <= remaining; i++) {
      days.push({ date: new Date(this.viewYear, this.viewMonth + 1, i), currentMonth: false });
    }
    this.calendarDays = days;
  }

  prevMonth(): void {
    if (this.viewMonth === 0) { this.viewMonth = 11; this.viewYear--; }
    else this.viewMonth--;
    this.buildCalendar();
  }

  nextMonth(): void {
    if (this.viewMonth === 11) { this.viewMonth = 0; this.viewYear++; }
    else this.viewMonth++;
    this.buildCalendar();
  }

  setToday(): void {
    const today = new Date();
    this.viewYear = today.getFullYear();
    this.viewMonth = today.getMonth();
    this.selectDate({ date: today, currentMonth: true });
    this.buildCalendar();
  }

  selectDate(day: CalendarDay): void {
    this.selectedDate = day.date;
    this.julianDay = this.toJulian(day.date);
  }

  isToday(d: Date): boolean {
    const t = new Date();
    return d.getFullYear() === t.getFullYear() &&
           d.getMonth() === t.getMonth() &&
           d.getDate() === t.getDate();
  }

  isSelected(d: Date): boolean {
    if (!this.selectedDate) return false;
    return d.getFullYear() === this.selectedDate.getFullYear() &&
           d.getMonth() === this.selectedDate.getMonth() &&
           d.getDate() === this.selectedDate.getDate();
  }

  onJulianDayInput(): void {
    const j = parseInt(this.julianDay, 10);
    if (!isNaN(j) && j >= 1 && j <= 366) {
      const d = new Date(new Date().getFullYear(), 0, j);
      this.selectedDate = d;
      this.viewYear = d.getFullYear();
      this.viewMonth = d.getMonth();
      this.buildCalendar();
    }
  }

  toJulian(date: Date): string {
    const start = new Date(date.getFullYear(), 0, 0);
    const diff = date.getTime() - start.getTime();
    return Math.floor(diff / (1000 * 60 * 60 * 24)).toString();
  }

  onDoFileFormation(): void {
    if (!this.julianDay) {
      this.uploadStatus = 'error';
      this.statusMessage = 'Julian Day is required.';
      return;
    }
    if (!this.country) {
      this.uploadStatus = 'error';
      this.statusMessage = 'Country is required.';
      return;
    }
    if (!this.currency) {
      this.uploadStatus = 'error';
      this.statusMessage = 'Currency is required.';
      return;
    }
    this.isLoading = true;
    this.uploadStatus = 'idle';
    // TODO: Replace with UtilityService API call
    setTimeout(() => {
      this.isLoading = false;
      this.uploadStatus = 'success';
      this.statusMessage = 'File formation completed successfully.';
    }, 1000);
  }

  onDismissSuccess(): void {
    this.uploadStatus = 'idle';
  }

  onDismissError(): void {
    this.uploadStatus = 'idle';
  }
}