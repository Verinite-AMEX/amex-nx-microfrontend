import {
  Component,
  EventEmitter,
  Output,
  OnInit,
  OnChanges,
  SimpleChanges
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';

import {
  FormsModule
} from '@angular/forms';

import {
  AmexCustomizedReportsFormComponent
} from '@vn-core-ui-components/ui';

import {
  OmsCustomizedReportsService
} from '../../services/oms-customized-reports.service';

import {
  OmsPaginationComponent
} from '../../shared/pagination/oms-pagination.component';

@Component({

  selector: 'oms-customized-reports-form',

  standalone: true,

  imports: [
    CommonModule,
    FormsModule,
    AmexCustomizedReportsFormComponent,
    OmsPaginationComponent
  ],

  templateUrl:
    './oms-customized-reports-form.component.html',

  styles: [`

    :host {

      width: 100%;
    }

    .warning-box {

      margin-top: 16px;

      padding: 12px;

      background: #fff3cd;

      border: 1px solid #ffeeba;

      color: #856404;

      border-radius: 4px;

      font-size: 14px;
    }

    .search-container {

      margin-top: 20px;

      display: flex;

      gap: 12px;

      align-items: center;
    }

    .search-input {

      height: 38px;

      padding: 0 12px;

      width: 280px;

      border: 1px solid #ccc;

      border-radius: 4px;
    }

    .search-btn {

      height: 38px;

      padding: 0 18px;

      background: #6a1b9a;

      color: white;

      border: none;

      border-radius: 4px;

      cursor: pointer;
    }

    .reports-table-container {

      margin-top: 24px;
    }

    .reports-title {

      margin-bottom: 16px;

      color: #333;
    }

    .reports-table {

      width: 100%;

      border-collapse: collapse;
    }

    .reports-table th {

      background: #f3f3f3;

      padding: 12px;

      text-align: left;

      border: 1px solid #ddd;
    }

    .reports-table td {

      padding: 12px;

      border: 1px solid #ddd;
    }

    .no-data {

      text-align: center;

      padding: 20px;

      color: #777;
    }

    .reports-table-container {

  margin-top: 24px;
}

.reports-title {

  margin-bottom: 16px;

  color: #333;

  font-size: 20px;

  font-weight: 600;
}

.reports-table {

  width: 100%;

  border-collapse: collapse;

  background: white;
}

.reports-table th {

  background: #f4f6f9;

  padding: 14px;

  text-align: left;

  border: 1px solid #ddd;

  font-weight: 600;

  color: #333;
}

.reports-table td {

  padding: 14px;

  border: 1px solid #ddd;

  color: #555;
}

.status-badge {

  background: #e8f5e9;

  color: #2e7d32;

  padding: 4px 10px;

  border-radius: 12px;

  font-size: 12px;

  font-weight: 600;
}

.no-data {

  text-align: center;

  padding: 30px;

  color: #888;

  font-style: italic;
}

  `]
})
export class OmsCustomizedReportsFormComponent
implements OnInit, OnChanges {

  generatedReports: any[] = [];

  paginatedReports: any[] = [];

  searchKeyword = '';

  isSubmitting = false;

  showSubscriptionWarning = false;

  @Output()
  backClicked =
    new EventEmitter<void>();

  reportTypes = [

    {
      value:
        'settlement-detail',

      label:
        'Settlement Detail'
    },

    {
      value:
        'submission-detail',

      label:
        'Submission Detail'
    },

    {
      value:
        'submission-transaction-detail',

      label:
        'Submission & Transaction Detail'
    },

    {
      value:
        'adjustment-detail',

      label:
        'Adjustment Detail'
    },

    {
      value:
        'settlement-advice',

      label:
        'Settlement Advice'
    }
  ];

  constructor(

    private customizedReportsService:
      OmsCustomizedReportsService

  ) {}

  ngOnInit() {

    this.loadGeneratedReports();
  }

  ngOnChanges(
  changes: SimpleChanges
) {

  if (
    changes['generatedReports']
  ) {

    this.paginatedReports = [
      ...this.generatedReports
    ];

  }

}

  // LOAD REPORTS
  loadGeneratedReports() {

    this.customizedReportsService
      .getReports()
      .subscribe((reports: any[]) => {

        this.generatedReports =
          reports;

        this.paginatedReports =
          [...reports];

        console.log(
          'GENERATED REPORTS:',
          reports
        );
      });
  }

  onPageChanged(
  rows: any[]
) {

  this.paginatedReports =
    rows;

}

  // SUBMIT REPORT
onSubmit(
  event: any
) {

  console.log(
    'CUSTOMIZED REPORT:',
    event
  );

  console.log(
    'RAW EVENT:',
    JSON.stringify(
      event,
      null,
      2
    )
  );

  console.log(
  'Report Type:',
  event.reportType
);

console.log(
  'Report Type JSON:',
  JSON.stringify(
    event.reportType
  )
);

console.log(
  'Report Type Length:',
  event.reportType?.length
);

  // CHECK DATE VALUES
  console.log(
    'Date From:',
    event.dateFrom
  );

  console.log(
    'Date To:',
    event.dateTo
  );

  console.log(
    'Date From Type:',
    typeof event.dateFrom
  );

  console.log(
    'Date To Type:',
    typeof event.dateTo
  );

  // REPORT TYPE
  if (
    !event.reportType
  ) {

    alert(
      'Please select Report Type.'
    );

    return;
  }

  // FROM DATE
  if (
    !event.dateFrom
  ) {

    alert(
      'Please select From Date.'
    );

    return;
  }

  // TO DATE
  if (
    !event.dateTo
  ) {

    alert(
      'Please select To Date.'
    );

    return;
  }

  // PARSE DATES
  const fromDate =
    new Date(
      event.dateFrom
    );

  const toDate =
    new Date(
      event.dateTo
    );

  console.log(
    'Parsed From Date:',
    fromDate
  );

  console.log(
    'Parsed To Date:',
    toDate
  );

  console.log(
    'From Timestamp:',
    fromDate.getTime()
  );

  console.log(
    'To Timestamp:',
    toDate.getTime()
  );

  // VALIDATE DATE RANGE
  if (
    fromDate.getTime() >
    toDate.getTime()
  ) {

    alert(
      'From Date cannot be greater than To Date.'
    );

    return;
  }

  this.isSubmitting = true;

  this.showSubscriptionWarning =
    !!event.emailSubscription;

  // MOCK API DELAY
  setTimeout(() => {

    const newReport = {

      reportType:
        event.reportType || '',

      fromDate:
        event.dateFrom || '',

      toDate:
        event.dateTo || '',

      merchantAccount:
        event.merchantAccount || '',

      settlementDate:
        event.settlementDate || '',

      emailSubscription:
        event.emailSubscription || false,

      subscriptionEmail:
        event.subscriptionEmail || '',

      screenReaderMode:
        event.screenReaderMode || false,

      createdDate:
        new Date()
          .toLocaleDateString(),

      status:
        'Generated'
    };

    console.log(
      'FINAL REPORT:',
      newReport
    );

    this.customizedReportsService
      .addReport(
        newReport
      );

    this.loadGeneratedReports();

    this.isSubmitting = false;

    alert(
      'Customized Report Generated Successfully'
    );

  }, 1500);

}

  // SEARCH REPORTS
  onSearchReports() {

    console.log(
      'SEARCH:',
      this.searchKeyword
    );

    // EMPTY SEARCH
    if (
      !this.searchKeyword
    ) {

      this.loadGeneratedReports();

      return;
    }

    this.generatedReports =

      this.customizedReportsService
        .searchReports(
          this.searchKeyword
        );

    console.log(
      'FILTERED REPORTS:',
      this.generatedReports
    );
  }

  // BACK
  onBack() {

    console.log(
      'Back Clicked'
    );

    this.backClicked.emit();
  }
}