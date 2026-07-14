import {
  Component,
  EventEmitter,
  Output,
  OnInit
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';

import {
  FormsModule
} from '@angular/forms';

import {
  OmsTaxInvoiceReportService
} from '../../services/oms-tax-invoice-report.service';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'oms-tax-invoice-report',

  standalone: true,

  imports: [
    CommonModule,
    FormsModule
  ],

  templateUrl:
    './oms-tax-invoice-report.component.html',

  styles: [`

  .tax-report-container {

    width: 100%;

    background: white;

    border: 1px solid #dcdcdc;
  }

  .top-border {

    height: 4px;

    background: #7b1fa2;
  }

  .content {

    padding: 24px;

    display: flex;

    flex-direction: column;
  }

  .title {

    font-size: 34px;

    color: #555;

    margin-bottom: 28px;

    font-weight: 400;
  }

  .radio-group {

    display: flex;

    gap: 32px;

    margin-bottom: 28px;
  }

  .radio-group label {

    display: flex;

    align-items: center;

    gap: 8px;

    font-size: 14px;
  }

  .form-grid {

    display: grid;

    grid-template-columns: 1fr 1fr;

    gap: 28px;
  }

  .field {

    display: flex;

    flex-direction: column;
  }

  .field label {

    margin-bottom: 8px;

    font-size: 14px;

    font-weight: 600;
  }

  .field input,
  .field select {

    height: 42px;

    border: 1px solid #ccc;

    padding: 0 12px;

    font-size: 14px;
  }

  .field small {

    margin-top: 6px;

    color: red;

    font-size: 12px;
  }

  .bottom-radio {

    margin-top: 28px;

    margin-bottom: 28px;
  }

  .button-group {

    display: flex;

    gap: 12px;
  }

  .back-btn,
  .generate-btn {

    background: #1d3b8b;

    color: white;

    border: none;

    height: 40px;

    padding: 0 24px;

    cursor: pointer;
  }

`]
})
export class OmsTaxInvoiceReportComponent
  implements OnInit {

  @Output()
  backClicked =
    new EventEmitter<void>();

  vatSearchType = 'vat';

  reportType = 'summary';

  vatRegistrationNumber = '';

  merchantNumber = '';

  selectedCountry = '';

  fromDate = '';

  toDate = '';

  countries = [
    'UAE',
    'India',
    'USA'
  ];

  isGenerating = false;

  constructor(
    // eslint-disable-next-line @angular-eslint/prefer-inject
    private reportService:
      OmsTaxInvoiceReportService
  ) {}

  ngOnInit() {

    this.loadReportData();
  }

  loadReportData() {

    this.reportService
      .getReport()
      .subscribe(data => {

        this.vatSearchType =
          data.vatSearchType;

        this.vatRegistrationNumber =
          data.vatRegistrationNumber;

        this.merchantNumber =
          data.merchantNumber;

        this.selectedCountry =
          data.selectedCountry;

        this.fromDate =
          data.fromDate;

        this.toDate =
          data.toDate;

        this.reportType =
          data.reportType;

        console.log(
          'Loaded Report:',
          data
        );
      });
  }

  onBack() {

    this.backClicked.emit();
  }

  generateReport() {

    const payload = {

      vatSearchType:
        this.vatSearchType,

      vatRegistrationNumber:
        this.vatRegistrationNumber,

      merchantNumber:
        this.merchantNumber,

      selectedCountry:
        this.selectedCountry,

      fromDate:
        this.fromDate,

      toDate:
        this.toDate,

      reportType:
        this.reportType
    };

    console.log(
      'Generating Report:',
      payload
    );

    this.isGenerating = true;

    setTimeout(() => {

      this.reportService
        .saveReport(
          payload
        );

      this.isGenerating = false;

      alert(
        'Tax Invoice Report Generated Successfully'
      );

    }, 1500);
  }
}