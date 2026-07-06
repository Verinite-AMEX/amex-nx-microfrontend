import {
  Component,
  EventEmitter,
  Input,
  Output,
  OnChanges,
  SimpleChanges
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';

import {
  AmexUserManagementTableComponent
} from '@vn-core-ui-components/ui';

// CHANGE THE PATH AS PER YOUR PROJECT
import {
  OmsPaginationComponent
} from '../../shared/pagination/oms-pagination.component';

@Component({

  selector: 'oms-user-management-table',

  standalone: true,

  imports: [

    CommonModule,

    AmexUserManagementTableComponent,

    OmsPaginationComponent

  ],

  templateUrl:
    './oms-user-management-table.component.html',

  styles: [`

    :host {

      width: 100%;

      display: block;
    }

  `]
})
export class OmsUserManagementTableComponent
implements OnChanges {

  @Input()
  title =
    'MRM USER ADMINISTRATION';

  @Input()
  createLabel =
    'Create MRM User';

  @Input()
  showDelete = true;

  @Input()
  showMerchantNumber = false;

  @Output()
  editUserClicked =
    new EventEmitter<any>();

  @Output()
  deleteUserClicked =
    new EventEmitter<any>();

  @Output()
  createUserClicked =
    new EventEmitter<void>();

  @Input()
  rows: any[] = [

    {
      userId:
        'mrmadmin',

      userName:
        'Essa',

      emailAddress:
        'essa.memon@americanexpress.com.bh',

      creationDate:
        '09/09/2021',

      status:
        'Inactive'
    },

    {
      userId:
        'wasimtest123',

      userName:
        'wasimtest123',

      emailAddress:
        'wasim.sayyed@americanexpress.com.bh',

      creationDate:
        '05/05/2024',

      status:
        'Active'
    },

    {
      userId:
        'mrmadmintest4',

      userName:
        'mrmadminketaki',

      emailAddress:
        'ketaki_pore@yahoo.com',

      creationDate:
        '09/09/2021',

      status:
        'Active'
    },

    {
      userId:
        'ketakimrm12',

      userName:
        'Ketaki',

      emailAddress:
        'ketaki.pore222@gmail.com',

      creationDate:
        '08/09/2021',

      status:
        'Active'
    }
  ];

  // CURRENT PAGE DATA
  paginatedRows: any[] = [];

  ngOnChanges(
    changes: SimpleChanges
  ) {

    if (
      changes['rows']
    ) {

      // DEFAULT FIRST PAGE
      this.paginatedRows = [
        ...this.rows
      ];

    }

  }

  // PAGINATION CALLBACK
  onPageChanged(
    rows: any[]
  ) {

    this.paginatedRows =
      rows;

  }

  handleClick(
    event: any
  ) {

    const text =
      event.target?.innerText?.trim();

    console.log(
      'Clicked:',
      text
    );

    // CREATE
    if (
      text?.toLowerCase()
        .includes('create')
    ) {

      this.createUserClicked.emit();

      return;

    }

    // EDIT
    if (
      text?.toLowerCase()
        .includes('edit')
    ) {

      const selectedUser =

        this.paginatedRows.length > 0

          ? this.paginatedRows[0]

          : this.rows[0];

      this.editUserClicked.emit(
        selectedUser
      );

      return;

    }

    // DELETE
    if (
      text?.toLowerCase()
        .includes('delete')
    ) {

      const selectedUser =

        this.paginatedRows.length > 0

          ? this.paginatedRows[0]

          : this.rows[0];

      console.log(
        'Delete User:',
        selectedUser
      );

      this.deleteUserClicked.emit(
        selectedUser
      );

    }

  }

  get rowsWithoutMerchantNumber() {

    return this.rows.map(

      ({
        merchantNumber,
        ...rest
      }) => rest

    );

  }

  get paginatedRowsWithoutMerchantNumber() {

    return this.paginatedRows.map(

      ({
        merchantNumber,
        ...rest
      }) => rest

    );

  }

}