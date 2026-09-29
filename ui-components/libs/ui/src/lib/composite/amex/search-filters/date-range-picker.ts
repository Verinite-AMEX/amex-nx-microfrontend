import { Component, Input, Output, EventEmitter, HostBinding, HostListener, ElementRef, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface AmexDateRange {
  from: string; // ISO yyyy-mm-dd
  to: string; // ISO yyyy-mm-dd
}

interface RangeCalendarDay {
  date: Date;
  label: string;
  ariaLabel: string;
  isToday: boolean;
  isSelected: boolean; // is exactly the from or to date
  isDisabled: boolean;
}

const DAY_ABBR = [
  { letter: 'S', full: 'Sunday' },
  { letter: 'M', full: 'Monday' },
  { letter: 'T', full: 'Tuesday' },
  { letter: 'W', full: 'Wednesday' },
  { letter: 'T', full: 'Thursday' },
  { letter: 'F', full: 'Friday' },
  { letter: 'S', full: 'Saturday' },
];
const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

function toIsoDate(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}
function toDisplayDate(d: Date): string {
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${m}/${day}/${d.getFullYear()}`;
}
function parseDisplayDate(text: string): Date | null {
  const match = text.trim().match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
  if (!match) return null;
  const [, mm, dd, yyyy] = match;
  const d = new Date(Number(yyyy), Number(mm) - 1, Number(dd));
  if (d.getFullYear() !== Number(yyyy) || d.getMonth() !== Number(mm) - 1 || d.getDate() !== Number(dd)) {
    return null;
  }
  return d;
}
function isSameDay(a: Date, b: Date): boolean {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}
function startOfDay(d: Date): Date {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}

/**
 * DLS's date range picker (site/components/date-picker -> "Date Range" example)
 * is NOT two separate date-picker widgets side by side. It's one bordered
 * .formControl.iconHover.range strip containing two plain text inputs and a
 * "-" separator, ONE shared calendar-icon toggle button, and a single shared
 * .calendar.range popup below it. There's no dls.js logic for this (DLS ships
 * CSS only) — the two-click range-selection state machine below (first click
 * sets "from", second sets "to") is this library's own implementation.
 * Note: DLS's own docs example doesn't show a distinct visual style for the
 * days *between* the two selected endpoints (no "in-range" class exists in
 * css/datePicker.css) — only the two endpoints get .selected, matching what
 * DLS itself ships. We haven't invented an in-range highlight to stay
 * faithful to that.
 */
@Component({
  selector: 'amex-date-range-picker',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="datePicker" role="application">
      <label *ngIf="label" [attr.id]="id + '-label'" class="label3">{{ label }}</label>
      <span [attr.id]="id + '-format'" class="srOnly"
        >Please enter month, day, and year, separated by a /</span
      >
      <div class="formControl iconHover range" [class.hasWarning]="invalid">
        <input
          #fromInput
          [id]="id + '-from'"
          class="formControl"
          type="text"
          placeholder="MM/DD/YYYY"
          [value]="fromDisplay"
          [disabled]="disabled"
          [attr.aria-label]="fromLabel"
          [attr.aria-describedby]="id + '-format'"
          (input)="onFromInput($event)"
          (blur)="onFromBlur()"
          (focus)="openForField('from')"
        />
        <span aria-hidden="true">-</span>
        <input
          #toInput
          [id]="id + '-to'"
          class="formControl"
          type="text"
          placeholder="MM/DD/YYYY"
          [value]="toDisplay"
          [disabled]="disabled"
          [attr.aria-label]="toLabel"
          [attr.aria-describedby]="id + '-format'"
          (input)="onToInput($event)"
          (blur)="onToBlur()"
          (focus)="openForField('to')"
        />
        <button
          type="button"
          class="btnForm flex flexJustifyCenter flexAlignItemsCenter"
          [disabled]="disabled"
          aria-label="Open/close calendar"
          [attr.aria-expanded]="calendarOpen"
          (click)="toggleCalendar()"
        >
          <i class="icon dlsIconCalendar" aria-hidden="true"></i>
        </button>
        <div class="dateRangeFocus" aria-hidden="true"></div>
      </div>

      <div class="calendar range border" role="dialog" aria-label="Choose date range" *ngIf="calendarOpen">
        <div class="calendarNavigation">
          <button
            type="button"
            class="glyph glyphLg"
            aria-label="Previous Month"
            [disabled]="atMinMonth()"
            (click)="changeMonth(-1)"
          >
            <i class="dlsGlyphLeft" aria-hidden="true"></i>
          </button>
          <button
            type="button"
            class="dlsBrightBlue glyph glyphLg"
            aria-label="Next Month"
            [disabled]="atMaxMonth()"
            (click)="changeMonth(1)"
          >
            <i class="dlsGlyphRight" aria-hidden="true"></i>
          </button>
        </div>
        <table class="table" role="grid">
          <caption class="heading3 dlsGray06">{{ monthYearLabel }}</caption>
          <thead>
            <tr>
              <th *ngFor="let d of dayAbbr"><abbr [attr.aria-label]="d.full">{{ d.letter }}</abbr></th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let week of weeks">
              <td *ngFor="let day of week">
                <button
                  *ngIf="day"
                  type="button"
                  [class.current]="day.isToday"
                  [class.selected]="day.isSelected"
                  [disabled]="day.isDisabled"
                  [attr.aria-label]="day.ariaLabel"
                  [attr.aria-selected]="day.isSelected"
                  (click)="selectDay(day)"
                >
                  {{ day.label }}
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div *ngIf="errorMessage" class="hint hasWarning">{{ errorMessage }}</div>
    </div>
  `,
})
export class AmexDateRangePickerComponent {
  private static _idCounter = 0;
  @HostBinding('attr.id') @Input() id =
    `date-range-picker-${++AmexDateRangePickerComponent._idCounter}`;

  @Input() label = '';
  @Input() fromLabel = 'From date';
  @Input() toLabel = 'To date';
  @Input() min = ''; // ISO yyyy-mm-dd
  @Input() max = ''; // ISO yyyy-mm-dd
  @Input() disabled = false;
  @Input() invalid = false;
  @Input() errorMessage = '';

  @Output() rangeSelected = new EventEmitter<AmexDateRange>();

  readonly dayAbbr = DAY_ABBR;

  fromDate: Date | null = null;
  toDate: Date | null = null;
  fromDisplay = '';
  toDisplay = '';
  calendarOpen = false;
  activeField: 'from' | 'to' = 'from';
  viewYear = new Date().getFullYear();
  viewMonth = new Date().getMonth();
  weeks: (RangeCalendarDay | null)[][] = [];

  constructor(@Inject(ElementRef) private elementRef: ElementRef<HTMLElement>) {
  this.buildMonth();
}

  get monthYearLabel(): string {
    return `${MONTH_NAMES[this.viewMonth]} ${this.viewYear}`;
  }
  private get minDate(): Date | null {
    return this.min ? startOfDay(new Date(this.min + 'T00:00:00')) : null;
  }
  private get maxDate(): Date | null {
    return this.max ? startOfDay(new Date(this.max + 'T00:00:00')) : null;
  }

  atMinMonth(): boolean {
    const min = this.minDate;
    return !!min && this.viewYear === min.getFullYear() && this.viewMonth === min.getMonth();
  }
  atMaxMonth(): boolean {
    const max = this.maxDate;
    return !!max && this.viewYear === max.getFullYear() && this.viewMonth === max.getMonth();
  }

  toggleCalendar(): void {
    if (this.disabled) return;
    this.calendarOpen = !this.calendarOpen;
    if (this.calendarOpen) this.buildMonth();
  }

  openForField(field: 'from' | 'to'): void {
    if (this.disabled) return;
    this.activeField = field;
    this.calendarOpen = true;
    const base = (field === 'from' ? this.fromDate : this.toDate) ?? this.fromDate ?? new Date();
    this.viewYear = base.getFullYear();
    this.viewMonth = base.getMonth();
    this.buildMonth();
  }

  changeMonth(delta: number): void {
    this.viewMonth += delta;
    if (this.viewMonth > 11) { this.viewMonth = 0; this.viewYear++; }
    else if (this.viewMonth < 0) { this.viewMonth = 11; this.viewYear--; }
    this.buildMonth();
  }

  selectDay(day: RangeCalendarDay): void {
    if (day.isDisabled) return;
    if (this.activeField === 'from') {
      this.fromDate = day.date;
      this.fromDisplay = toDisplayDate(day.date);
      if (this.toDate && this.toDate < this.fromDate) this.toDate = null, (this.toDisplay = '');
      this.activeField = 'to';
    } else {
      if (this.fromDate && day.date < this.fromDate) {
        // picking an end date before the start just restarts the range
        this.fromDate = day.date;
        this.fromDisplay = toDisplayDate(day.date);
        this.toDate = null;
        this.toDisplay = '';
        this.activeField = 'to';
      } else {
        this.toDate = day.date;
        this.toDisplay = toDisplayDate(day.date);
        this.calendarOpen = false;
        this.emitIfComplete();
      }
    }
    this.buildMonth();
  }

  onFromInput(e: Event): void {
    this.fromDisplay = (e.target as HTMLInputElement).value;
  }
  onFromBlur(): void {
    const parsed = parseDisplayDate(this.fromDisplay);
    if (parsed) {
      this.fromDate = parsed;
      this.fromDisplay = toDisplayDate(parsed);
    } else if (this.fromDisplay.trim() === '') {
      this.fromDate = null;
    }
    this.emitIfComplete();
  }
  onToInput(e: Event): void {
    this.toDisplay = (e.target as HTMLInputElement).value;
  }
  onToBlur(): void {
    const parsed = parseDisplayDate(this.toDisplay);
    if (parsed) {
      this.toDate = parsed;
      this.toDisplay = toDisplayDate(parsed);
    } else if (this.toDisplay.trim() === '') {
      this.toDate = null;
    }
    this.emitIfComplete();
  }

  private emitIfComplete(): void {
    if (this.fromDate && this.toDate) {
      this.rangeSelected.emit({ from: toIsoDate(this.fromDate), to: toIsoDate(this.toDate) });
    }
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (this.calendarOpen && !this.elementRef.nativeElement.contains(event.target as Node)) {
      this.calendarOpen = false;
    }
  }
  @HostListener('document:keydown.escape')
  onEscape(): void {
    this.calendarOpen = false;
  }

  private buildMonth(): void {
    const firstOfMonth = new Date(this.viewYear, this.viewMonth, 1);
    const startWeekday = firstOfMonth.getDay();
    const daysInMonth = new Date(this.viewYear, this.viewMonth + 1, 0).getDate();
    const today = startOfDay(new Date());
    const min = this.minDate;
    const max = this.maxDate;

    const cells: (RangeCalendarDay | null)[] = [];
    for (let i = 0; i < startWeekday; i++) cells.push(null);
    for (let d = 1; d <= daysInMonth; d++) {
      const date = new Date(this.viewYear, this.viewMonth, d);
      const isDisabled = !!((min && date < min) || (max && date > max));
      const isSelected = !!(
        (this.fromDate && isSameDay(date, this.fromDate)) ||
        (this.toDate && isSameDay(date, this.toDate))
      );
      cells.push({
        date,
        label: String(d),
        ariaLabel: `${DAY_ABBR[date.getDay()].full}, ${MONTH_NAMES[this.viewMonth]} ${d}, ${this.viewYear}`,
        isToday: isSameDay(date, today),
        isSelected,
        isDisabled,
      });
    }
    while (cells.length % 7 !== 0) cells.push(null);
    const weeks: (RangeCalendarDay | null)[][] = [];
    for (let i = 0; i < cells.length; i += 7) weeks.push(cells.slice(i, i + 7));
    this.weeks = weeks;
  }
}