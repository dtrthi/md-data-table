import {
  AfterViewChecked, Component, ContentChild, ContentChildren, ElementRef, EventEmitter, HostBinding, Input, OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { FilterService } from '../../services/filter.service';
import { MdDataColumnComponent } from '../md-data-column/md-data-column.component';
import { MdPaginatorComponent } from '../md-paginator/md-paginator.component';
import { MdPagination } from '../../models/md-pagination';
import { MdRowData } from '../../models/md-row-data';
import { MdTableHeaderComponent } from '../md-table-header/md-table-header.component';

@Component({
  selector: 'md-data-table',
  templateUrl: './md-data-table.component.html',
  styleUrls: ['./md-data-table.component.scss'],
  providers: [FilterService]
})
export class MdDataTableComponent implements OnChanges, OnInit, AfterViewChecked, OnDestroy {
  private _fixedHeader: boolean;
  private _data: any[]|any;
  rows: MdRowData[] = [];
  private scrollable = false;
  isLoading = true;
  private ajax = false;

  private _pageSize: number;
  private _autoPageSize = false;

  private width;
  private height;
  private filterSubscription: Subscription;
  private filterValue: string;

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
  @ContentChild(MdTableHeaderComponent) header;
  @ContentChildren(MdDataColumnComponent) columns;
  @Input() total = 0;

  get pageSize() {
    return this._pageSize;
  }

  @Input() set pageSize(value) {
    if (isNaN(value)) {
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
    if (value instanceof Observable) {
      this.ajax = true;
    } else if (Array.isArray(this._data)) {
      this.pageChange.subscribe(() => this.updateRows());
      if (this.total !== this._data.length) {
        this.total = this._data.length;
      }
    }
  }

  @Input() set filterable(value) {
    if (value !== false) {
      this.header.filterable = true;
    }
  }

  @Output() pageChange: EventEmitter<MdPagination> = new EventEmitter<MdPagination>();
  @Output() rowClick: EventEmitter<any> = new EventEmitter<any>();
  @Output() filter = new EventEmitter<any>();

  @HostBinding('class.row-selectable') isRowSelectable = false;

  constructor(
    private elementRef: ElementRef,
    private filterService: FilterService
  ) { }

  ngOnInit() {
    this.isRowSelectable = this.rowClick.observers.length > 0;
    this.filterSubscription = this.filterService.onFilter().subscribe(
      (value) => {
        // reset to first page
        this.paginatorComponent.selectedPage = 1;
        this.filterValue = value;
        this.updateRows();
        this.filter.emit(value);
      }
    );
  }

  ngAfterViewChecked(): void {
    if (this.scrollable) {
      const h = this.elementRef.nativeElement.offsetHeight;
      if (!h) {
        throw new Error('Must set width when using `fixedHeader`.');
      }
      if (this.height !== h) {
        this.height = h;
        let dh = 1 /* host border */ + 56 * 2 + 1 + 1 /* one for progress bar */;
        if (this.header) {
          dh += 64 /* table header css height */;
        }
        this.container.nativeElement.style.height = `${h - dh}px`;

        // calculate page size
        if (this._autoPageSize) {
          this.pageSize = Math.ceil(this.container.nativeElement.offsetHeight / 48);
        }
      }

      // handle column width for fixed header + footer
      const firstRow = this.body.nativeElement.querySelector('tr[mdDataTableRow]');
      if (firstRow && this.width !== firstRow.offsetWidth) {
        const firstRowTds = firstRow.querySelectorAll('td');
        const headers = this.elementRef.nativeElement.querySelectorAll('.mat-data-table-head tr th');

        let sum = 0;
        if (headers.length === firstRowTds.length) {
          // for each row cell, set the corresponding header width
          firstRowTds.forEach(
            (value, index) => {
              headers[index].style.width = `${value.offsetWidth}px`;
              headers[index].style.maxWidth = `${value.offsetWidth}px`;
              sum += value.offsetWidth;
            }
          );
        } else if (firstRowTds.length === 0) {
          sum = this.body.nativeElement.offsetWidth;
        } else {
          throw new Error('Setup incorrect. See the document.');
        }
        this.width = sum;
        // then set total cell width to header + footer
        this.elementRef.nativeElement.querySelector('.mat-data-table-head').style.width = `${sum}px`;
        this.elementRef.nativeElement.querySelector('.mat-data-table-tail').style.width = `${sum}px`;
        if (this.header) {
          const elementWidth = this.elementRef.nativeElement.offsetWidth;
          this.header.rightGap = elementWidth - sum;
        }
      }
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.data) {
      this.updateRows();
    }
  }

  ngOnDestroy(): void {
    if (this.filterSubscription) {
      this.filterSubscription.unsubscribe();
    }
  }

  updateRows() {
    if (this.ajax) {
      this.isLoading = true;
      this._data.subscribe(
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
      const data = this.filterData();
      this.total = data.length;
      this.rows.length = 0;
      const rows = [];
      const currentPage = this.paginatorComponent.currentPage;
      data.some(
        (model: any, index: number) => {
          if (index < currentPage.begin) {
            return;
          }
          if (index > currentPage.end) {
            return true;
          }
          rows.push(new MdRowData(model));
        }
      );
      this.rows = rows;
      this.isLoading = false;
    }
  }

  private filterData() {
    let data = this._data;
    if (this.filterValue) {
      data = data.filter(value => {
        const s = this.filterValue
          .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
          .toLocaleLowerCase().trim().split(/\s/);
        for (const column of this.columns) {
          // http://stackoverflow.com/questions/990904/remove-accents-diacritics-in-a-string-in-javascript
          const v = (column.getFieldData(value) + '')
            .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
            .toLocaleLowerCase();
          for (const i of s) {
            if (v.indexOf(i) !== -1) {
              return true;
            }
          }
        }
        return false;
      });
    }
    return data;
  }

  _onPageChange(event) {
    this.isLoading = true;
    this.pageChange.emit(event);
  }

  _onClick(row: MdRowData) {
    this.rowClick.emit(row.model);
  }
}
