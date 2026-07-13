import {
  Injectable
} from '@angular/core';

import {
  BehaviorSubject,
  of
} from 'rxjs';

import {
  delay
} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OmsSettlementSubmissionService {

  private STORAGE_KEY =
    'settlement_submissions';

  private rowsSubject =
    new BehaviorSubject<any[]>([]);

  rows$ =
    this.rowsSubject.asObservable();

  constructor() {

    this.loadMockData();
  }

  private loadMockData() {

    const storedData =
      localStorage.getItem(
        this.STORAGE_KEY
      );

    if (storedData) {

      this.rowsSubject.next(
        JSON.parse(
          storedData
        )
      );

    } else {

      const mockData = [

  {
    period: 'May 2026',
    merchantAccount: '9275640241',
    settlementAmount: 'AED 22,450.00',
    submissionsCount: '18',
    status: 'Completed'
  },

  {
    period: 'Apr 2026',
    merchantAccount: '9275640241',
    settlementAmount: 'AED 19,320.00',
    submissionsCount: '15',
    status: 'Completed'
  },

  {
    period: 'Mar 2026',
    merchantAccount: '9275640241',
    settlementAmount: 'AED 16,780.00',
    submissionsCount: '12',
    status: 'Completed'
  },

  {
    period: 'Feb 2026',
    merchantAccount: '9275640241',
    settlementAmount: 'AED 11,900.00',
    submissionsCount: '9',
    status: 'Pending'
  },

  {
    period: 'Jan 2026',
    merchantAccount: '9275640241',
    settlementAmount: 'AED 25,100.00',
    submissionsCount: '20',
    status: 'Completed'
  },

  {
    period: 'Dec 2025',
    merchantAccount: '1104166483',
    settlementAmount: 'AED 13,500.00',
    submissionsCount: '10',
    status: 'Completed'
  },

  {
    period: 'Nov 2025',
    merchantAccount: '1104166483',
    settlementAmount: 'AED 9,700.00',
    submissionsCount: '7',
    status: 'Pending'
  },

  {
    period: 'Oct 2025',
    merchantAccount: '1104166483',
    settlementAmount: 'AED 18,250.00',
    submissionsCount: '14',
    status: 'Completed'
  },

  {
    period: 'Sep 2025',
    merchantAccount: '8837291456',
    settlementAmount: 'AED 27,100.00',
    submissionsCount: '21',
    status: 'Completed'
  },

  {
    period: 'Aug 2025',
    merchantAccount: '8837291456',
    settlementAmount: 'AED 14,900.00',
    submissionsCount: '11',
    status: 'Completed'
  },

  {
    period: 'Jul 2025',
    merchantAccount: '8837291456',
    settlementAmount: 'AED 10,300.00',
    submissionsCount: '8',
    status: 'Pending'
  },

  {
    period: 'Jun 2025',
    merchantAccount: '8837291456',
    settlementAmount: 'AED 31,800.00',
    submissionsCount: '25',
    status: 'Completed'
  }
];

      localStorage.setItem(

        this.STORAGE_KEY,

        JSON.stringify(
          mockData
        )
      );

      this.rowsSubject.next(
        mockData
      );
    }
  }

  getRows() {

    return this.rows$;
  }

  filterRows(
    months: number
  ) {

    const rows =
      this.rowsSubject.value;

    const filteredRows =
      rows.slice(0, Number(months));

    return of(
      filteredRows
    ).pipe(
      delay(1500)
    );
  }
}