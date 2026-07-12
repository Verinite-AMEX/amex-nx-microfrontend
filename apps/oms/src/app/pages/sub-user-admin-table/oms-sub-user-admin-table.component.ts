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
  AmexSubUserAdminTableComponent
} from '@ui-components/ui';

// Change path if required
import {
  OmsPaginationComponent
} from '../../shared/pagination/oms-pagination.component';

@Component({

  selector: 'oms-sub-user-admin-table',

  standalone: true,

  imports: [

    CommonModule,

    AmexSubUserAdminTableComponent,

    OmsPaginationComponent

  ],

  templateUrl:
    './oms-sub-user-admin-table.component.html',

  styles: [`

    :host {

      width: 100%;

      display: block;

    }

  `]
})
export class OmsSubUserAdminTableComponent
implements OnChanges {

  @Input()
  title =
    'SUB USER ADMINISTRATION';

  @Input()
  showCreate = true;

  @Input()
  createLabel =
    'Create Sub User';

  @Output()
  createUserClicked =
    new EventEmitter<void>();

  @Output()
  editUserClicked =
    new EventEmitter<any>();

  @Output()
  deleteUserClicked =
    new EventEmitter<any>();

  selectedRow: any = null;

  @Input()
  rows: any[] = [

    {
      name:
        'Ahmed Al Mansouri',

      email:
        'ahmed@merchant.ae',

      role:
        'Sub User',

      status:
        'Active'
    },

    {
      name:
        'Sara Khalid',

      email:
        'sara@merchant.ae',

      role:
        'VAT User',

      status:
        'Active'
    },

    {
      name:
        'Omar Hassan',

      email:
        'omar@merchant.ae',

      role:
        'Sub User',

      status:
        'Inactive'
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

  // TABLE ACTION
  handleAction(
    event: any
  ) {

    console.log(
      'TABLE ACTION:',
      event
    );

    // EDIT
    if (
      event?.action === 'edit'
    ) {

      this.editUserClicked.emit(
        event.row
      );

    }

    // DELETE
    if (
      event?.action === 'delete'
    ) {

      this.deleteUserClicked.emit(
        event.row
      );

    }

  }

}