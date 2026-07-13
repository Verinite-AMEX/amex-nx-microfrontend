import {
  Injectable
} from '@angular/core';

import {
  BehaviorSubject
} from 'rxjs';

import {
  TaxInvoiceReportData
} from '../models/tax-invoice-report.model';

import {
  MOCK_TAX_INVOICE_REPORT
} from '../mock-data/mock-tax-invoice-report';

@Injectable({
  providedIn: 'root'
})
export class OmsTaxInvoiceReportService {

  private STORAGE_KEY =
    'oms_tax_invoice_report';

  private reportSubject =
    new BehaviorSubject<
      TaxInvoiceReportData
    >(MOCK_TAX_INVOICE_REPORT);

  report$ =
    this.reportSubject
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

      this.reportSubject.next(

        JSON.parse(storedData)
      );

    } else {

      localStorage.setItem(

        this.STORAGE_KEY,

        JSON.stringify(
          MOCK_TAX_INVOICE_REPORT
        )
      );
    }
  }

  saveReport(
    data: TaxInvoiceReportData
  ) {

    localStorage.setItem(

      this.STORAGE_KEY,

      JSON.stringify(data)
    );

    this.reportSubject.next(
      data
    );

    console.log(
      'Tax Invoice Report Saved'
    );
  }

  getReport() {

    return this.report$;
  }

  clearReport() {

    localStorage.removeItem(
      this.STORAGE_KEY
    );

    this.reportSubject.next({

      vatSearchType: '',

      vatRegistrationNumber: '',

      merchantNumber: '',

      selectedCountry: '',

      fromDate: '',

      toDate: '',

      reportType: ''
    });
  }
}