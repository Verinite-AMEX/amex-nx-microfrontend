import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';

import {
  ButtonComponent
} from '@ui-components/ui';

@Component({
  selector: 'oms-pagination',

  standalone: true,

  imports: [
    CommonModule,
    ButtonComponent
  ],

  templateUrl:
    './oms-pagination.component.html',

  styleUrls: [
    './oms-pagination.component.css'
  ]
})
export class OmsPaginationComponent
implements OnChanges {

  @Input()
  rows: any[] = [];

  @Input()
  pageSize = 10;

  @Output()
  pageData =
    new EventEmitter<any[]>();

  currentPage = 1;

  totalPages = 1;

  pages: number[] = [];

  ngOnChanges(
    changes: SimpleChanges
  ) {

    if (changes['rows']) {

      this.currentPage = 1;

      this.calculatePages();
    }
  }

  calculatePages() {

    this.totalPages = Math.max(
      1,
      Math.ceil(
        this.rows.length /
        this.pageSize
      )
    );

    this.pages =
      Array.from(

        {
          length:
            this.totalPages
        },

        (_, i) => i + 1
      );

    this.emitCurrentPage();
  }

  emitCurrentPage() {

    const start =

      (
        this.currentPage - 1
      ) *
      this.pageSize;

    const end =
      start +
      this.pageSize;

    this.pageData.emit(

      this.rows.slice(
        start,
        end
      )

    );
  }

  previousPage() {

    if (
      this.currentPage > 1
    ) {

      this.currentPage--;

      this.emitCurrentPage();
    }
  }

  nextPage() {

    if (
      this.currentPage <
      this.totalPages
    ) {

      this.currentPage++;

      this.emitCurrentPage();
    }
  }

  goToPage(
    page: number
  ) {

    this.currentPage =
      page;

    this.emitCurrentPage();
  }

  get startRecord() {

    if (
      this.rows.length === 0
    ) {

      return 0;
    }

    return (

      (
        this.currentPage - 1
      ) *
      this.pageSize

    ) + 1;
  }

  get endRecord() {

    return Math.min(

      this.currentPage *
      this.pageSize,

      this.rows.length

    );
  }

}