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
  private rows: MdRowData[] = [];
  private _fixedHeader: boolean;
  private scrollable: boolean = false;
  private isLoading: boolean = false;

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
  @Input() data: any[];
  @Input() total: number = 0;

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
        if (headers.length != firstRowTds.length) {
          throw new Error('Setup incorrect. See the document.');
        }

        // for each row cell, set the corresponding header width
        let sum = 0;
        firstRowTds.forEach(
          (value, index) => {
            headers[index].style.width = `${value.offsetWidth}px`;
            sum += value.offsetWidth;
          }
        );
        // then set total cell width to footer
        this.elementRef.nativeElement.querySelector('.mat-data-table-tail').style.width = `${sum}px`;
      }, 500);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    this._updateRows();
  }

  private _updateRows() {
    if (this.data) {
      this.rows.length = 0;
      this.data.forEach(
        (model: any, index: number) => {
          this.rows[index] = new MdRowData(model);
        }
      );
    }
  }

  private _onPageChange() {
    this.isLoading = true;
    this._updateRows();
    this.onPageChange.emit(this.paginatorComponent.currentPage);
  }
}
