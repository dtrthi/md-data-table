import {
  AfterContentInit, AfterViewChecked, Component, ContentChildren, ElementRef, EventEmitter,
  Input, OnInit, OnChanges, Output, SimpleChanges, ViewChild
} from '@angular/core';

import { MdDataColumnComponent } from '../md-data-column/md-data-column.component';
import { MdPaginatorComponent } from '../md-paginator/md-paginator.component';
import { MdPagination } from '../../models/md-pagination';
import { MdRowData } from '../../models/md-row-data';

@Component({
  selector: 'md-data-table',
  templateUrl: './md-data-table.component.html',
  styleUrls: ['./md-data-table.component.scss'],
  host: {
    '[class.row-selectable]': 'onRowClick.observers.length'
  }
})
export class MdDataTableComponent implements OnChanges, OnInit, AfterContentInit, AfterViewChecked {
  private _fixedHeader: boolean;
  private _data: any[]|any;
  private rows: MdRowData[] = [];
  private scrollable: boolean = false;
  private isLoading: boolean = false;
  private ajax: boolean = false;

  private _pageSize: number;
  private _autoPageSize: boolean = false;

  private width;
  private height;

  get fixedHeader(): boolean {
    return this._fixedHeader;
  }

  @Input() set fixedHeader(value) {
      this._fixedHeader = value;
      this.scrollable = true;
  }

  @ViewChild('container') container;
  @ViewChild('body') body;
  @ViewChild(MdPaginatorComponent) paginatorComponent;
  @ContentChildren(MdDataColumnComponent) columns;
  @Input() total: number = 0;

  get pageSize() {
    return this._pageSize;
  }

  @Input() set pageSize(value) {
    if (Number.isNaN(value)) {
      this._pageSize = 0;
      this._autoPageSize = true;
    } else {
      this._pageSize = value;
    }
  }

  get data(): any[]|any {
    return this._data;
  }

  @Input() set data(value: any[]|any) {
    this._data = value;
    if (typeof value == 'function') {
      this.ajax = true;
    }
  }

  @Output('pageChange') onPageChange: EventEmitter<MdPagination> = new EventEmitter<MdPagination>();
  @Output('rowClick') onRowClick: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private elementRef: ElementRef
  ) { }

  ngOnInit() {
  }

  ngAfterContentInit(): void {
    this._updateRows();
  }

  ngAfterViewChecked(): void {
    if (this.scrollable) {
      let h = this.elementRef.nativeElement.offsetHeight;
      if (!h) {
        throw new Error('Must set width when using `fixedHeader`.');
      }
      if (this.height != h) {
        console.log(h);
        this.height = h;
        this.container.nativeElement.style.height = `${h - 56 * 2 - 1}px`;

        // calculate page size
        this._autoPageSize && (this.pageSize = Math.ceil(this.container.nativeElement.offsetHeight / 48));
      }

      // handle column width for fixed header + footer
      let firstRow = this.body.nativeElement.querySelector('tr');
      if (firstRow && this.width != firstRow.offsetWidth) {
        let firstRowTds = firstRow.querySelectorAll('td');
        let headers = this.elementRef.nativeElement.querySelectorAll('.mat-data-table-head tr th');

        let sum = 0;
        if (headers.length == firstRowTds.length) {
          // for each row cell, set the corresponding header width
          firstRowTds.forEach(
            (value, index) => {
              headers[index].style.width = `${value.offsetWidth}px`;
              headers[index].style.maxWidth = `${value.offsetWidth}px`;
              sum += value.offsetWidth;
            }
          );
        } else if (firstRowTds.length == 0) {
          sum = this.body.nativeElement.offsetWidth;
        } else {
          throw new Error('Setup incorrect. See the document.');
        }
        this.width = sum;
        // then set total cell width to header + footer
        this.elementRef.nativeElement.querySelector('.mat-data-table-head').style.width = `${sum}px`;
        this.elementRef.nativeElement.querySelector('.mat-data-table-tail').style.width = `${sum}px`;
      }
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    this._updateRows();
  }

  private _updateRows() {
    if (this.ajax) {
      this.isLoading = true;
      this._data(
        this.paginatorComponent
          ? this.paginatorComponent.currentPage
          : { begin: 0, end: this.pageSize }
        ).subscribe(
          data => {
            if (Array.isArray(data) && data.length) {
              this.rows.length = 0;
              data.forEach(
                (model: any, index: number) => {
                  if (index >= this.pageSize) {
                    return true;
                  }
                  this.rows[index] = new MdRowData(model);
                }
              );
            }
            this.isLoading = false;
          }
        );
    } else if (Array.isArray(this._data)) {
      this.rows.length = 0;
      this._data.some(
        (model: any, index: number) => {
          if (index >= this.pageSize) {
            return true;
          }
          this.rows[index] = new MdRowData(model);
        }
      );
    }
  }

  _onPageChange() {
    this._updateRows();
    this.onPageChange.emit(this.paginatorComponent.currentPage);
  }

  _onClick(row: MdRowData) {
    this.onRowClick.emit(row.model);
  }
}
