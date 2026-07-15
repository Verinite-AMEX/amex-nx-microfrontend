import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AmexPageHeaderComponent, AmexBreadcrumbTrailComponent } from '@ui-components/ui';

@Component({
  selector: 'app-bta-large-reports',
  imports: [CommonModule, FormsModule, AmexPageHeaderComponent, AmexBreadcrumbTrailComponent],
  templateUrl: './bta-large-reports.component.html',
  styleUrls: ['./bta-large-reports.component.css'],
})

export class BtaLargeReportsComponent {
  generated = false;
  submitted = false;
  errors: Record<string, string> = {};
  selectedAccount = '';
  reportType = '';
  format = '';
  fromMonth = ''; fromYear = ''; toMonth = ''; toYear = '';
  accounts = [
    { value:'BTACLIENTBAH001-3744XXXXXXX5229', label:'BTACLIENTBAH001-3744XXXXXXX5229' },
    { value:'BTACLIENTBAH002-3744XXXXXXX6130', label:'BTACLIENTBAH002-3744XXXXXXX6130' },
  ];
  reportTypes = [
    { value:'detailed', label:'Detailed Statement' },
    { value:'summary',  label:'Summary Statement'  },
    { value:'audit',    label:'Audit Trail'         },
  ];
  formats = ['PDF', 'Excel', 'CSV', 'RTF'];
  months  = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  years   = ['2025','2024','2023','2022','2021','2020','2019','2018','2017','2016'];

  private monthIndex(m: string): number {
    return this.months.indexOf(m);
  }
  validate(): boolean {
    this.errors = {};
    if (!this.selectedAccount)
      this.errors['selectedAccount'] = 'Please select a BTA Account.';

    if (!this.reportType)
      this.errors['reportType'] = 'Please select a Report Type.';

    if (!this.fromMonth || !this.fromYear || !this.toMonth || !this.toYear) {
      this.errors['dateRange'] = 'All date range fields (From and To) are required.';
    } else {
      const fromVal = Number(this.fromYear) * 12 + this.monthIndex(this.fromMonth);
      const toVal   = Number(this.toYear)   * 12 + this.monthIndex(this.toMonth);
      if (fromVal > toVal)
        this.errors['dateRange'] = '"From" date must be before or equal to "To" date.';
    }

    if (!this.format)
      this.errors['format'] = 'Please select a Report Format.';

    return Object.keys(this.errors).length === 0;
  }

  hasErrors(): boolean {
    return Object.keys(this.errors).length > 0;
  }

  reset() {
    this.generated = false;
    this.submitted = false;
    this.errors = {};
    this.selectedAccount = '';
    this.reportType = '';
    this.format = '';
    this.fromMonth = ''; this.fromYear = '';
    this.toMonth = '';   this.toYear = '';
  }

  generate() {
    this.submitted = true;
    if (!this.validate()) return;
    this.generated = true;
  }

  goBack() {}
}