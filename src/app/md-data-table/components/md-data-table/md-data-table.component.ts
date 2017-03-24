import {
  AfterContentInit, Component, ContentChildren,
  Input, OnInit, OnChanges, SimpleChanges
} from '@angular/core';

import { MdDataTableColumnComponent } from '../md-data-table-column/md-data-table-column.component';
import { MdRowData } from '../../models/md-row-data';

@Component({
  selector: 'md-data-table',
  templateUrl: './md-data-table.component.html',
  styleUrls: ['./md-data-table.component.scss']
})
export class MdDataTableComponent implements OnInit, AfterContentInit, OnChanges {
  private rows: MdRowData[] = [];

  @ContentChildren(MdDataTableColumnComponent) columns;
  @Input() data: any[];

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
}
