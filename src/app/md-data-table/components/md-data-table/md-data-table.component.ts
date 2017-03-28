import {
  AfterContentInit, AfterViewInit, Component, ContentChildren, ElementRef, EventEmitter,
  Input, OnInit, OnChanges, Output, SimpleChanges, ViewChild
} from '@angular/core';

import { MdDataTableColumnComponent } from '../md-data-table-column/md-data-table-column.component';
import { MdPaginatorComponent } from '../md-paginator/md-paginator.component';
import { MdPagination } from '../../models/md-pagination';
import { MdRowData } from '../../models/md-row-data';

@Component({
  selector: 'md-data-table',
  templateUrl: './md-data-table.component.html',
  styleUrls: ['./md-data-table.component.scss']
})
export class MdDataTableComponent implements OnChanges, OnInit, AfterContentInit, AfterViewInit {
  private _fixedHeader: boolean;
  private _data: any[]|any;
  private rows: MdRowData[] = [];
  private scrollable: boolean = false;
  private isLoading: boolean = false;
  private ajax: boolean = false;

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
  @ContentChildren(MdDataTableColumnComponent) columns;
  @Input() total: number = 0;
  @Input() pageSize: number|'auto' = 'auto';

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

  constructor(
    private elementRef: ElementRef
  ) { }

  ngOnInit() {
  }

  ngAfterContentInit(): void {
    this._updateRows();
  }

  ngAfterViewInit(): void {
    if (this.scrollable) {
      let h = this.elementRef.nativeElement.parentNode.offsetHeight;
      this.container.nativeElement.style.height = `${h - 56 * 2}px`;

      // handle column width for fixed header + footer
      // TODO why I have to cheat T_T
      setTimeout(() => {
        let firstRowTds = this.body.nativeElement.querySelectorAll('tr:first-child td');
        let headers = this.elementRef.nativeElement.querySelectorAll('.mat-data-table-head tr th');

        let sum = 0;
        if (headers.length == firstRowTds.length) {
          // for each row cell, set the corresponding header width
          firstRowTds.forEach(
            (value, index) => {
              headers[index].style.width = `${value.offsetWidth}px`;
              sum += value.offsetWidth;
            }
          );
        } else if (firstRowTds.length == 0) {
          sum = this.body.nativeElement.offsetWidth;
          this.elementRef.nativeElement.querySelector('.mat-data-table-head').style.width = `${sum}px`;
        } else {
          throw new Error('Setup incorrect. See the document.');
        }
        // then set total cell width to footer
        this.elementRef.nativeElement.querySelector('.mat-data-table-tail').style.width = `${sum}px`;

        // calculate page size
        this.pageSize == 'auto' && (this.pageSize = Math.ceil(this.container.nativeElement.offsetHeight / 48));
      }, 500);
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

  private _onPageChange() {
    this._updateRows();
    this.onPageChange.emit(this.paginatorComponent.currentPage);
  }
}
