import {
  Component
} from '@angular/core';

import { CommonModule } from '@angular/common';

import {
  AmexTopNavBarComponent
} from '@ui-components/ui';

import {
  OmsCustomizedReportsFormComponent
} from '../customized-reports-form/oms-customized-reports-form.component';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'oms-customized-report',

  standalone: true,

  imports: [
    CommonModule,
    AmexTopNavBarComponent,
    OmsCustomizedReportsFormComponent
  ],

  templateUrl:
    './oms-customized-report.component.html',

  styles: [`

    .content {

      padding: 24px;
    }

  `]
})
export class OmsCustomizedReportComponent {}