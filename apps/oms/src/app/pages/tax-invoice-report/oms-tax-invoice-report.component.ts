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
  ButtonComponent,
  InputComponent,
  SelectComponent,
  SelectOption,
  RadioGroupComponent,
  RadioOption,
  DateInputComponent,
  LabelComponent
} from '@ui-components/ui';

import {
  OmsTaxInvoiceReportService
} from '../../services/oms-tax-invoice-report.service';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'oms-tax-invoice-report',

  standalone: true,

  imports: [
    CommonModule,
    FormsModule,
    ButtonComponent,
    InputComponent,
    SelectComponent,
    RadioGroupComponent,
    DateInputComponent,
    LabelComponent
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

    margin-bottom: 28px;
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

  .field ui-label {

    margin-bottom: 8px;
  }

  .field ui-input,
  .field ui-select,
  .field ui-date-input {

    --input-padding: 11px 12px;
    --select-padding: 11px 32px 11px 12px;
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

  .button-group ui-button {

    --btn-bg: #1d3b8b;
    --btn-padding: 0 24px;
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

  countryOptions: SelectOption[] = this.countries.map(
    c => ({ label: c, value: c })
  );

  vatSearchTypeOptions: RadioOption[] = [
    { label: 'VAT Registration Number', value: 'vat' },
    { label: 'Merchant Number', value: 'merchant' }
  ];

  reportTypeOptions: RadioOption[] = [
    { label: 'Summary', value: 'summary' },
    { label: 'Detail', value: 'detail' }
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