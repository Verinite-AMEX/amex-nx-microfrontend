import {
  Injectable
} from '@angular/core';

import {
  BehaviorSubject
} from 'rxjs';

import {
  ReportFormatData
} from '../models/report-format.model';

import {
  MOCK_REPORT_FORMAT
} from '../mock-data/mock-report-format';

@Injectable({
  providedIn: 'root'
})
export class OmsReportFormatService {

  private STORAGE_KEY =
    'oms_report_format';

  private reportFormatSubject =
    new BehaviorSubject<
      ReportFormatData
    >(MOCK_REPORT_FORMAT);

  reportFormat$ =
    this.reportFormatSubject
      .asObservable();

  constructor() {

    this.loadData();
  }

  private loadData() {

    const storedData =
      localStorage.getItem(
        this.STORAGE_KEY
      );

    if (storedData) {

      this.reportFormatSubject.next(

        JSON.parse(storedData)
      );

    } else {

      localStorage.setItem(

        this.STORAGE_KEY,

        JSON.stringify(
          MOCK_REPORT_FORMAT
        )
      );
    }
  }

  saveReportFormat(
    data: ReportFormatData
  ) {

    localStorage.setItem(

      this.STORAGE_KEY,

      JSON.stringify(data)
    );

    this.reportFormatSubject.next(
      data
    );

    console.log(
      'Report Format Saved'
    );
  }

  getReportFormat() {

    return this.reportFormat$;
  }

  clearData() {

    localStorage.removeItem(
      this.STORAGE_KEY
    );

    this.reportFormatSubject.next({

      emailReports: false,

      emailAddresses: [],

      settlementAdvice: '',

      submissionDetails: ''
    });
  }
}