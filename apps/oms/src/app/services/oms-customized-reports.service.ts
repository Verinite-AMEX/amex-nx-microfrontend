import {
  Injectable
} from '@angular/core';

import {
  BehaviorSubject
} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OmsCustomizedReportsService {

  private STORAGE_KEY =
    'customized_reports';

  private reportsSubject =
    new BehaviorSubject<any[]>([]);

  reports$ =
    this.reportsSubject.asObservable();

  constructor() {

    this.loadReports();
  }

  private loadReports() {

    const storedReports =
      localStorage.getItem(
        this.STORAGE_KEY
      );

    if (storedReports) {

      this.reportsSubject.next(
        JSON.parse(
          storedReports
        )
      );

    } else {

      this.reportsSubject.next([]);
    }
  }

  private saveReports(
    reports: any[]
  ) {

    localStorage.setItem(

      this.STORAGE_KEY,

      JSON.stringify(
        reports
      )
    );

    this.reportsSubject.next(
      reports
    );
  }

  getReports() {

    return this.reports$;
  }

  addReport(
  report: any
) {

  const formattedReport = {

    id:
      Date.now(),

    reportType:
      report.reportType ||

      '',

    fromDate:
      report.fromDate ||

      '',

    toDate:
      report.toDate ||

      '',

    merchantAccount:
      report.merchantAccount ||

      '',

    settlementDate:
      report.settlementDate ||

      '',

    emailSubscription:
      report.emailSubscription ||

      false,

    subscriptionEmail:
      report.subscriptionEmail ||

      '',

    screenReaderMode:
      report.screenReaderMode ||

      false,

    status:
      'Generated',

    createdDate:
      new Date()
        .toLocaleDateString()
  };

  const updatedReports = [

    ...this.reportsSubject.value,

    formattedReport
  ];

  this.saveReports(
    updatedReports
  );
}

searchReports(
  keyword: string
) {

  const reports =
    this.reportsSubject.value;

  return reports.filter(
    report =>

      report.reportType
        ?.toLowerCase()
        .includes(
          keyword.toLowerCase()
        )
  );
}
}