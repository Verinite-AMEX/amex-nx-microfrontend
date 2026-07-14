import {
  Component,
  OnInit
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';

import {
  AmexReportFormatFormComponent
} from '@ui-components/ui';

import {
  OmsReportFormatService
} from '../../services/oms-report-format.service';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'oms-report-format',

  standalone: true,

  imports: [
    CommonModule,
    AmexReportFormatFormComponent
  ],

  templateUrl:
    './oms-report-format.component.html',
})
export class OmsReportFormatComponent
  implements OnInit {

  settlementOptions = [

    {
      value: 'pdf',
      label: 'PDF'
    },

    {
      value: 'excel',
      label: 'Excel'
    }
  ];

  submissionOptions = [

    {
      value: 'pdf',
      label: 'PDF'
    },

    {
      value: 'excel',
      label: 'Excel'
    }
  ];

  formData: any = {};

  isSubmitting = false;

  constructor(
    // eslint-disable-next-line @angular-eslint/prefer-inject
    private reportFormatService:
      OmsReportFormatService
  ) {}

  ngOnInit() {

    this.loadData();
  }

  loadData() {

    this.reportFormatService
      .getReportFormat()
      .subscribe(data => {

        this.formData = data;

        console.log(
          'Loaded Report Format:',
          data
        );
      });
  }

  onSubmit(
    event: any
  ) {

    console.log(
      'Report Format Submitted:',
      event
    );

    this.isSubmitting = true;

    setTimeout(() => {

      this.reportFormatService
        .saveReportFormat(
          event
        );

      this.isSubmitting = false;

      alert(
        'Report Format Saved Successfully'
      );

    }, 1500);
  }

  onBack() {

    console.log(
      'Back Clicked'
    );
  }
}