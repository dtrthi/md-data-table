import { Component, Input, OnInit } from '@angular/core';

import { MdRowData } from '../../models/md-row-data';
import { MdDataTableColumnComponent } from '../md-data-table-column/md-data-table-column.component';

@Component({
  selector: 'md-data-table-row,[md-data-table-row],[mdDataTableRow]',
  templateUrl: './md-data-table-row.component.html',
  styleUrls: ['./md-data-table-row.component.scss']
})
export class MdDataTableRowComponent implements OnInit {
  @Input() row: MdRowData;
  @Input() columns: MdDataTableColumnComponent[];

  constructor() { }

  ngOnInit() {
  }

}
