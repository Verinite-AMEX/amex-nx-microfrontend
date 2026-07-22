import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonComponent, SelectComponent, SelectOption } from '@ui-components/ui';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'oms-new-outlet-portal',

  standalone: true,

  imports: [
    CommonModule,
    FormsModule,
    ButtonComponent,
    SelectComponent
  ],

  templateUrl:
    './new-outlet-portal.component.html',

  styles: [`

    .portal-container {

      width: 100%;

      min-height: 78vh;

      display: flex;

      justify-content: center;

      align-items: center;

      background: #f5f5f5;
    }

    .portal-card {

      width: 600px;

      background: white;

      padding: 48px;

      text-align: center;

      border-radius: 8px;

      box-shadow:
        0 2px 10px rgba(0,0,0,0.1);
    }

    .title {

      font-size: 42px;

      font-weight: 300;

      color: #5a5a5a;

      margin-bottom: 40px;
    }

    .description {

      color: #7b7b7b;

      font-size: 16px;

      margin-bottom: 20px;
    }

    .create-btn-wrap {

      margin-bottom: 40px;

      /* size/spacing for the ui-button rendered inside, via its CSS vars */
      --btn-bg: #0070d2;
      --btn-padding: 0 32px;
      --btn-font-size: 18px;
    }

    .create-btn-wrap ::ng-deep .btn {

      height: 48px;
    }

    .or-text {

      font-size: 42px;

      color: #666;

      margin-bottom: 32px;
    }

    .label {

      font-size: 24px;

      font-weight: 600;

      color: #444;

      text-align: left;

      margin-bottom: 12px;
    }

    ui-select {

      display: block;

      --select-padding: 14px 32px 14px 12px;

      --select-font-size: 16px;
    }

  `]
})
export class NewOutletPortalComponent {

  selectedApplication = '';

  @Output()
  createApplicationClicked = new EventEmitter<void>();

  applicationOptions: SelectOption[] = [
    { label: 'Application 1', value: 'Application 1' },
    { label: 'Application 2', value: 'Application 2' },
    { label: 'Application 3', value: 'Application 3' }
  ];

  onCreateApplication() {

    console.log(
        'Create New Application Clicked'
    );

    this.createApplicationClicked.emit();
    }
}