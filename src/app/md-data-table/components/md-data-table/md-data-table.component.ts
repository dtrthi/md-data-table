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
import { MdPaginator, PageEvent } from '@angular/material';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/takeUntil';

import { FilterService } from '../../services/filter.service';
import { TableEventService } from '../../services/table-event.service';
import { MdDataColumnComponent } from '../md-data-column/md-data-column.component';
import { MdPagination } from '../../models/md-pagination';
import { MdRowData } from '../../models/md-row-data';
import { MdTableHeaderComponent } from '../md-table-header/md-table-header.component';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'md-data-table',
  template: `
    <ng-content select="md-table-header"></ng-content>
    <md-progress-bar mode="indeterminate" [style.visibility]="isLoading ? 'visible' : 'hidden'"></md-progress-bar>
    <table class="mat-data-table-head" *ngIf="fixedHeader">
      <thead>
      <tr>
        <th *ngFor="let column of columns"
            [class.mat-numeric-column]="column.numeric">
          <span mdTooltip="{{column.tooltip}}">{{column.title}}</span>
        </th>
      </tr>
      </thead>
    </table>
    <div #container class="mat-table-container">
      <table class="mat-data-table" [class.fixed-header]="fixedHeader">
        <thead>
        <tr>
          <th *ngFor="let column of columns"
              [class.mat-numeric-column]="column.numeric">
            <span mdTooltip="{{column.tooltip}}">{{column.title}}</span>
          </th>
        </tr>
        </thead>
        <tbody #body>
        <tr mdDataTableRow *ngFor="let row of rows"
            [row]="row" [columns]="columns" (click)="_onClick(row)">
        </tr>
        <tr *ngIf="!rows || !rows.length"><td [attr.colspan]="columns.length" i18n>No data</td></tr>
        </tbody>
        <tfoot *ngIf="!fixedHeader">
        <tr>
          <td [attr.colspan]="columns.length">
            <md-paginator [length]="total" [pageSize]="pageSize" (page)="_onPageChange($event)"></md-paginator>
          </td>
        </tr>
        </tfoot>
      </table>
    </div>
    <table class="mat-data-table-tail" *ngIf="fixedHeader">
      <tfoot>
      <tr>
        <td [attr.colspan]="columns.length">
          <md-paginator [length]="total" [pageSize]="pageSize"  (page)="_onPageChange($event)"></md-paginator>
        </td>
      </tr>
      </tfoot>
    </table>
  `,
  styles: [
    `:host {
      display: block;
      border-width: 1px;
      border-style: solid;
      border-color: rgba(0, 0, 0, 0.12);
      border-radius: inherit; }

    md-progress-bar {
      height: 1px; }

    table {
      width: 100%;
      border-collapse: collapse; }
    table tr {
      position: relative;
      white-space: nowrap;
      line-height: 24px;
      letter-spacing: 0;
      font-size: 12px; }
    table tr th {
      overflow: hidden;
      text-overflow: ellipsis; }
    table tr th, table tr td {
      box-sizing: border-box; }
    table thead tr {
      border: none;
      border-bottom: 1px solid rgba(0, 0, 0, 0.12);
      font-size: 12px;
      font-weight: 500;
      color: rgba(0, 0, 0, 0.54);
      height: 56px;
      box-sizing: border-box; }
    table thead tr th {
      border: none;
      cursor: default;
      text-align: left;
      padding: 0 12px; }
    table thead tr th:first-of-type {
      padding-left: 24px; }
    table thead tr th:last-of-type {
      padding-right: 24px; }
    table thead tr th.mat-numeric-column {
      text-align: right; }
    table tfoot tr {
      border-top: 1px solid rgba(0, 0, 0, 0.12);
      font-size: 12px;
      color: rgba(0, 0, 0, 0.54); }
    table tfoot tr td {
      padding: 0; }
    table tfoot tr td md-paginator {
      margin-top: -1px; }

    .mat-table-container {
      max-width: 100%;
      display: block;
      overflow-x: auto;
      font-family: Roboto, "Helvetica Neue", sans-serif; }
    .mat-table-container .mat-data-table {
      overflow: hidden;
      white-space: nowrap;
      text-align: center; }
    .mat-table-container .mat-data-table.fixed-header {
      border-top-width: 0;
      border-bottom-width: 0; }
    .mat-table-container .mat-data-table.fixed-header thead {
      display: none; }
    .mat-table-container .mat-data-table tbody tr {
      border-top: 1px solid rgba(0, 0, 0, 0.12);
      border-bottom: 1px solid rgba(0, 0, 0, 0.12);
      font-size: 13px;
      color: rgba(0, 0, 0, 0.87);
      height: 48px; }
    .mat-table-container .mat-data-table tbody tr:first-of-type {
      border: none; }
    .mat-table-container .mat-data-table tbody tr:hover {
      background-color: #eeeeee; }
    .mat-table-container .mat-data-table tbody tr .selected {
      background-color: #f5f5f5; }

    table.mat-data-table-tail {
      margin-top: -1px; }

    :host.row-selectable tbody tr {
      cursor: pointer; }
    `
  ],
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

  @ViewChild('container') container;
  @ViewChild('body') body;
  @ViewChild(MdPaginator) paginatorComponent: MdPaginator;
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
        this.dataSource.connect(this).takeUntil(this._onDestroy)
          .subscribe(data => {
            this.data = data;
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
    private filterService: FilterService,
    private tableEvent: TableEventService
  ) { }

  ngOnInit() {
    this.isRowSelectable = this.rowClick.observers.length > 0;
    this.filterSubscription = this.filterService.onFilter().subscribe(
      (value) => {
        // reset to first page
        this.paginatorComponent.pageIndex = 0;
        this.filterValue = value;
        this.updateRows();
        this.filter.emit(value);
      }
    );

    if (this.filterable && !this.header) {
      throw new Error('Can only use filter feature with table has header for now.');
    }

    this.tableEvent.widthChange.subscribe(() => this.updateHeaderWidth());
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
    } else if (Array.isArray(this._data)) {
      const data = this.filterData();
      this.total = data.length;
      this.rows.length = 0;
      const rows = [];
      let currentPage = {begin: 0, end: this.pageSize - 1};
      if (pageEvent) {
        const begin = pageEvent.pageIndex * pageEvent.pageSize;
        currentPage = {begin: begin, end: begin + pageEvent.pageSize - 1};
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

  _onPageChange(event) {
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
