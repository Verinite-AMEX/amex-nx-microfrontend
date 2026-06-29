import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  AmexSuccessToastComponent,
  AmexErrorToastComponent
} from '@vn-core-ui-components/ui';

interface CalendarDay {
  date: Date;
  currentMonth: boolean;
}

@Component({
  selector: 'app-extract-rejected-items',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    AmexSuccessToastComponent,
    AmexErrorToastComponent
  ],
  templateUrl: './extract-rejected-items.html',
  styleUrl: './extract-rejected-items.css'
})
export class ExtractRejectedItems implements OnInit {
  julianDay: string = '';
  selectedDate: Date | null = null;
  seNumber: string = '';
  seNumbers: string[] = [];
  selectedIndex: number = -1;
  includeSocHeader: boolean = true;
  isLoading = false;
  status: 'idle' | 'success' | 'error' = 'idle';
  statusMessage = '';

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
      days.push({ date: new Date(this.viewYear, this.viewMonth, -i), currentMonth: false });
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
    return d.getFullYear() === t.getFullYear() && d.getMonth() === t.getMonth() && d.getDate() === t.getDate();
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

  addSeNumber(): void {
    const val = this.seNumber.trim();
    if (val && !this.seNumbers.includes(val)) {
      this.seNumbers.push(val);
    }
    this.seNumber = '';
  }

  removeSelected(): void {
    if (this.selectedIndex >= 0 && this.selectedIndex < this.seNumbers.length) {
      this.seNumbers.splice(this.selectedIndex, 1);
      this.selectedIndex = -1;
    }
  }

  onExtractRejectedItems(): void {
    if (!this.julianDay) {
      this.status = 'error';
      this.statusMessage = 'Julian Day is required.';
      return;
    }
    if (this.seNumbers.length === 0) {
      this.status = 'error';
      this.statusMessage = 'Please add at least one SE Number.';
      return;
    }
    this.isLoading = true;
    this.status = 'idle';
    // TODO: Replace with UtilityService API call
    setTimeout(() => {
      this.isLoading = false;
      this.status = 'success';
      this.statusMessage = 'Rejected items extracted successfully.';
    }, 1000);
  }

  onDismissSuccess(): void { this.status = 'idle'; }
  onDismissError(): void { this.status = 'idle'; }
}