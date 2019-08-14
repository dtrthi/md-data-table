import {
  AfterViewChecked,
  Component,
  ContentChild,
  ContentChildren,
  ElementRef,
  EventEmitter,
  HostBinding,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { MatPaginator, PageEvent } from '@angular/material';
import { BehaviorSubject, Observable, Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { FilterService } from '../../services/filter.service';
import { TableEventService } from '../../services/table-event.service';
import { MdDataColumnComponent } from '../md-data-column/md-data-column.component';
import { MdRowData } from '../../models/md-row-data';
import { MdTableHeaderComponent } from '../md-table-header/md-table-header.component';

@Component({
  selector: 'md-data-table',
  templateUrl: './md-data-table.component.html',
  styleUrls: ['./md-data-table.component.scss'],
  providers: [FilterService, TableEventService]
})
export class MdDataTableComponent implements CollectionViewer, OnChanges, OnInit, AfterViewChecked, OnDestroy {
  private _fixedHeader: boolean;
  private _onDestroy = new Subject();
  private _data: any[]|any;
  private _dataSource: DataSource<any>;
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

  viewChange = new BehaviorSubject<{ start: number; end: number }>({ start: 0, end: Number.MAX_VALUE });

  get fixedHeader(): boolean {
    return this._fixedHeader;
  }

  @Input() set fixedHeader(value) {
      this._fixedHeader = value;
      this.scrollable = true;
  }

  @ViewChild('container', {static: true}) container;
  @ViewChild('body', {static: true}) body;
  @ViewChild(MatPaginator, {static: false}) paginatorComponent: MatPaginator;
  @ContentChild(MdTableHeaderComponent, {static: false}) header;
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

  get dataSource() {
    return this._dataSource;
  }

  set dataSource(dataSource) {
    if (this._dataSource !== dataSource) {
      this._data = [];

      if (this._dataSource) {
        this._dataSource.disconnect(this);
      }

      this._dataSource = dataSource;

      if (this._dataSource) {
        this.dataSource.connect(this).pipe(takeUntil(this._onDestroy))
          .subscribe(data => {
            this._data = data;
            this.updateRows();
          });
      }
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
      this.pageChange.subscribe((pageEvent) => this.updateRows(pageEvent));
      if (this.total !== this._data.length) {
        this.total = this._data.length;
      }
    } else if (value instanceof DataSource) {
      this.dataSource = value;
    }
  }

  @Input() set filterable(value) {
    if (value !== false && this.header) {
      this.header.filterable = true;
    }
  }

  @Output() pageChange: EventEmitter<PageEvent> = new EventEmitter<PageEvent>();
  @Output() rowClick: EventEmitter<any> = new EventEmitter<any>();
  @Output() filter = new EventEmitter<any>();

  @HostBinding('class.row-selectable') isRowSelectable = false;

  constructor(
    private elementRef: ElementRef,
    private filterService: FilterService,
    private tableEvent: TableEventService
  ) { }

  ngOnInit() {
    this.isRowSelectable = this.rowClick.observers.length > 0;
    this.filterSubscription = this.filterService.onFilter().subscribe(
      (value) => {
        this.isLoading = true;
        // reset to first page
        this.paginatorComponent.pageIndex = 0;
        this.filter.emit(value);
        if (this._dataSource) {
          return;
        }

        this.filterValue = value;
        this.updateRows();
      }
    );

    if (this.filterable && !this.header) {
      throw new Error('Can only use filter feature with table has header for now.');
    }

    this.tableEvent.widthChange.subscribe(() => { if (this.scrollable) { this.updateHeaderWidth(); } });
  }

  ngAfterViewChecked(): void {
    if (this.scrollable) {
      const h = this.elementRef.nativeElement.offsetHeight;
      if (!h) {
        if (console.warn) {
          console.warn('Must set width when using `fixedHeader`.');
        }
        return;
      }
      if (this.height !== h) {
        this.height = h;
        let dh = 1 /* host border */ + 56 * 2 /* top & bot */ + 2 /* ? */ + 1 /* one for progress bar */;
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
    this._onDestroy.next();
    this._onDestroy.complete();

    if (this.filterSubscription) {
      this.filterSubscription.unsubscribe();
    }

    if (this._dataSource) {
      this._dataSource.disconnect(this);
    }
  }

  updateRows(pageEvent?: PageEvent) {
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
    } else if (this._dataSource) {
      if (Array.isArray(this._data) && this._data.length) {
        this.rows.length = 0;
        this._data.forEach(
          (model: any, index: number) => {
            if (index >= this.pageSize) {
              return true;
            }
            this.rows[index] = new MdRowData(model);
          }
        );
      }
      this.isLoading = false;
    } else if (Array.isArray(this._data)) {
      const data = this.filterData();
      this.total = data.length;
      this.rows.length = 0;
      const rows = [];
      let currentPage = {begin: 0, end: this.pageSize - 1};
      if (pageEvent) {
        const begin = pageEvent.pageIndex * pageEvent.pageSize;
        currentPage = {begin, end: begin + pageEvent.pageSize - 1};
      }
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
        return this.columns.some(
          column => {
            // prevent filter
            if (!column.filterable) {
              return false;
            }
            // http://stackoverflow.com/questions/990904/remove-accents-diacritics-in-a-string-in-javascript
            const v = (column.getFieldData(value) + '')
              .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
              .toLocaleLowerCase();
            for (const i of s) {
              if (v.indexOf(i) !== -1) {
                return true;
              }
            }
            return false;
          }
        );
      });
    }
    return data;
  }

  _onPageChange(event: PageEvent) {
    this.isLoading = true;
    this.pageChange.emit(event);

    // recalculate header width
  }

  _onClick(row: MdRowData) {
    this.rowClick.emit(row.model);
  }

  private updateHeaderWidth() {
    // handle column width for fixed header + footer
    const firstRow = this.body.nativeElement.querySelector('tr[mdDataTableRow]');
    if (firstRow) {
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
