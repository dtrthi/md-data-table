import {
  AfterContentInit, Component, ContentChildren, EventEmitter,
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
export class MdDataTableComponent implements OnInit, AfterContentInit, OnChanges {
  private rows: MdRowData[] = [];
  private isLoading: boolean = false;

  @ViewChild(MdPaginatorComponent) paginatorComponent;
  @ContentChildren(MdDataTableColumnComponent) columns;
  @Input() data: any[];
  @Input() total: number = 0;

  @Output('pageChange') onPageChange: EventEmitter<MdPagination> = new EventEmitter<MdPagination>();

  constructor() { }

  ngOnInit() {
  }

  ngAfterContentInit(): void {
    this._updateRows();
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
