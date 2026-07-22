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
  AmexCustomizedReportsFormComponent,
  ButtonComponent,
  InputComponent,
  TableComponent,
  TableHeadComponent,
  TableBodyComponent,
  TableRowComponent,
  TableCellComponent,
  TableHeaderCellComponent
} from '@ui-components/ui';

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
    OmsPaginationComponent,
    ButtonComponent,
    InputComponent,
    TableComponent,
    TableHeadComponent,
    TableBodyComponent,
    TableRowComponent,
    TableCellComponent,
    TableHeaderCellComponent
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

    /* Styling for the ui-input / ui-button instances below, applied via
       the CSS custom properties those components already read. */
    .search-container ui-input {

      display: block;

      width: 280px;

      --input-padding: 9px 12px;
    }

    .search-container ui-button {

      --btn-bg: #6a1b9a;
      --btn-padding: 0 18px;
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

    ui-table {

      background: white;

      --table-header-bg: #f4f6f9;
      --table-header-padding: 14px;
      --table-cell-padding: 14px;
      --table-cell-color: #555;
      --table-border-color: #ddd;
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

  if (
    !event.reportType
  ) {

    alert(
      'Please select Report Type.'
    );

    return;
  }

  if (
    !event.dateFrom
  ) {

    alert(
      'Please select From Date.'
    );

    return;
  }

  if (
    !event.dateTo
  ) {

    alert(
      'Please select To Date.'
    );

    return;
  }

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

  onSearchReports() {

    console.log(
      'SEARCH:',
      this.searchKeyword
    );

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

  onBack() {

    console.log(
      'Back Clicked'
    );

    this.backClicked.emit();
  }
}