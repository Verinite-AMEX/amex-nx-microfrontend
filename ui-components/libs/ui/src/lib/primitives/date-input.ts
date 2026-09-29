import {
  Component,
  Input,
  forwardRef,
  HostBinding,
  HostListener,
  ElementRef,
  ViewChild,
  ChangeDetectorRef,
  Inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';

interface CalendarDay {
  date: Date;
  label: string; // "1", "2", ... "31"
  ariaLabel: string; // "Monday, August 1, 2022"
  isToday: boolean;
  isSelected: boolean;
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
  if (
    d.getFullYear() !== Number(yyyy) ||
    d.getMonth() !== Number(mm) - 1 ||
    d.getDate() !== Number(dd)
  ) {
    return null; // rejects things like 02/30/2024
  }
  return d;
}
function isSameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}
function startOfDay(d: Date): Date {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}

/**
 * DLS's date picker (css/datePicker.css, site/components/date-picker) is a
 * text input formatted MM/DD/YYYY, paired with a calendar-icon toggle button
 * that opens a popup month-grid calendar. It is NOT DLS-styled as a native
 * <input type="date"> (browsers render those with their own non-DLS chrome
 * and non-MM/DD/YYYY formats depending on OS/locale, which DLS's actual
 * component avoids by using a plain text input + custom calendar instead).
 * There is no dls.js logic for this component — DLS ships CSS classes only;
 * the month-grid generation, navigation, and selection logic below is
 * this library's own implementation, built to produce exactly the DOM
 * structure and classes shown in DLS's own docs example.
 */
@Component({
  selector: 'ui-date-input',
  standalone: true,
  imports: [CommonModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DateInputComponent),
      multi: true,
    },
  ],
  template: `
    <div class="datePicker" role="application">
      <label *ngIf="label" [attr.id]="id + '-label'" [attr.for]="id" class="label3">{{
        label
      }}</label>
      <span [attr.id]="id + '-format'" class="srOnly"
        >Please enter month, day, and year, separated by a /</span
      >
      <div class="formControl iconHover" [class.hasWarning]="invalid">
        <input
          #textInput
          [id]="id"
          class="formControl"
          type="text"
          placeholder="MM/DD/YYYY"
          [value]="displayValue"
          [disabled]="disabled"
          [attr.aria-describedby]="id + '-format'"
          [attr.aria-invalid]="invalid ? 'true' : null"
          [attr.aria-required]="required"
          [attr.aria-label]="!label ? ariaLabel || 'Date' : null"
          [attr.aria-labelledby]="label ? id + '-label' : null"
          (input)="onTextInput($event)"
          (blur)="onTextBlur()"
        />
        <button
          type="button"
          class="btnForm flex flexJustifyCenter flexAlignItemsCenter"
          [disabled]="disabled"
          [attr.aria-label]="'date picker calendar'"
          [attr.aria-expanded]="calendarOpen"
          (click)="toggleCalendar()"
        >
          <i class="icon dlsIconCalendar" aria-hidden="true"></i>
        </button>
      </div>

      <div
        class="calendar border"
        role="dialog"
        [attr.aria-label]="'Choose date'"
        *ngIf="calendarOpen"
      >
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
          <caption class="heading3 dlsGray06">
            {{
              monthYearLabel
            }}
          </caption>
          <thead>
            <tr>
              <th *ngFor="let d of dayAbbr">
                <abbr [attr.aria-label]="d.full">{{ d.letter }}</abbr>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let week of weeks">
              <td *ngFor="let day of week">
                <button
                  *ngIf="day"
                  type="button"
                  [id]="day.isSelected ? id + '-selected-day' : null"
                  [class.current]="day.isToday"
                  [class.selected]="day.isSelected"
                  [disabled]="day.isDisabled"
                  [attr.aria-describedby]="id + '-label'"
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
    </div>
  `,
})
export class DateInputComponent implements ControlValueAccessor {
  private static _idCounter = 0;
  @HostBinding('attr.id') @Input() id =
    `ui-date-input-${++DateInputComponent._idCounter}`;

  @Input() label = '';
  @Input() min = ''; // ISO yyyy-mm-dd
  @Input() max = ''; // ISO yyyy-mm-dd
  @Input() disabled = false;
  @Input() invalid = false;
  @Input() required = false;
  @Input() ariaLabel = '';

  @ViewChild('textInput') private textInputRef?: ElementRef<HTMLInputElement>;

  readonly dayAbbr = DAY_ABBR;

  value = ''; // ISO yyyy-mm-dd, what the form control actually holds
  displayValue = ''; // MM/DD/YYYY, what the text input shows
  calendarOpen = false;
  selectedDate: Date | null = null;
  viewYear = new Date().getFullYear();
  viewMonth = new Date().getMonth();
  weeks: (CalendarDay | null)[][] = [];

  onChange = (_: string) => {};
  onTouched = () => {};

  constructor(
  @Inject(ElementRef) private elementRef: ElementRef<HTMLElement>,
  @Inject(ChangeDetectorRef) private cdr: ChangeDetectorRef,
) {
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
    if (!min) return false;
    return this.viewYear === min.getFullYear() && this.viewMonth === min.getMonth();
  }
  atMaxMonth(): boolean {
    const max = this.maxDate;
    if (!max) return false;
    return this.viewYear === max.getFullYear() && this.viewMonth === max.getMonth();
  }

  toggleCalendar(): void {
    if (this.disabled) return;
    this.calendarOpen = !this.calendarOpen;
    if (this.calendarOpen) {
      const base = this.selectedDate ?? new Date();
      this.viewYear = base.getFullYear();
      this.viewMonth = base.getMonth();
      this.buildMonth();
    }
  }

  changeMonth(delta: number): void {
    this.viewMonth += delta;
    if (this.viewMonth > 11) {
      this.viewMonth = 0;
      this.viewYear++;
    } else if (this.viewMonth < 0) {
      this.viewMonth = 11;
      this.viewYear--;
    }
    this.buildMonth();
  }

  selectDay(day: CalendarDay): void {
    if (day.isDisabled) return;
    this.selectedDate = day.date;
    this.value = toIsoDate(day.date);
    this.displayValue = toDisplayDate(day.date);
    this.onChange(this.value);
    this.calendarOpen = false;
    this.buildMonth();
    this.textInputRef?.nativeElement.focus();
  }

  onTextInput(event: Event): void {
    this.displayValue = (event.target as HTMLInputElement).value;
  }

  onTextBlur(): void {
    const parsed = parseDisplayDate(this.displayValue);
    if (parsed) {
      this.selectedDate = parsed;
      this.value = toIsoDate(parsed);
      this.displayValue = toDisplayDate(parsed);
      this.onChange(this.value);
    } else if (this.displayValue.trim() === '') {
      this.selectedDate = null;
      this.value = '';
      this.onChange('');
    }
    this.onTouched();
    this.buildMonth();
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (
      this.calendarOpen &&
      !this.elementRef.nativeElement.contains(event.target as Node)
    ) {
      this.calendarOpen = false;
    }
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    this.calendarOpen = false;
  }

  private buildMonth(): void {
    const firstOfMonth = new Date(this.viewYear, this.viewMonth, 1);
    const startWeekday = firstOfMonth.getDay(); // 0=Sun
    const daysInMonth = new Date(this.viewYear, this.viewMonth + 1, 0).getDate();
    const today = startOfDay(new Date());
    const min = this.minDate;
    const max = this.maxDate;

    const cells: (CalendarDay | null)[] = [];
    for (let i = 0; i < startWeekday; i++) cells.push(null);
    for (let d = 1; d <= daysInMonth; d++) {
      const date = new Date(this.viewYear, this.viewMonth, d);
      const isDisabled = !!((min && date < min) || (max && date > max));
      cells.push({
        date,
        label: String(d),
        ariaLabel: `${DAY_ABBR[date.getDay()].full}, ${MONTH_NAMES[this.viewMonth]} ${d}, ${this.viewYear}`,
        isToday: isSameDay(date, today),
        isSelected: !!(this.selectedDate && isSameDay(date, this.selectedDate)),
        isDisabled,
      });
    }
    while (cells.length % 7 !== 0) cells.push(null);

    const weeks: (CalendarDay | null)[][] = [];
    for (let i = 0; i < cells.length; i += 7) weeks.push(cells.slice(i, i + 7));
    this.weeks = weeks;
    this.cdr.markForCheck();
  }

  writeValue(val: string): void {
    this.value = val ?? '';
    this.selectedDate = this.value ? new Date(this.value + 'T00:00:00') : null;
    this.displayValue = this.selectedDate ? toDisplayDate(this.selectedDate) : '';
    this.buildMonth();
  }
  registerOnChange(fn: (_: string) => void): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
  setDisabledState(disabled: boolean): void {
    this.disabled = disabled;
  }
}