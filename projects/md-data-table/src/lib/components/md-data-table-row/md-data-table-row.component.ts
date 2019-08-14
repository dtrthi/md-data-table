import { AfterViewInit, Component, Input, OnInit, ViewContainerRef } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';

import { MdRowData } from '../../models/md-row-data';
import { TableEventService } from '../../services/table-event.service';
import { MdDataColumnComponent } from '../md-data-column/md-data-column.component';
import { InlineDialogComponent } from '../inline-dialog/inline-dialog.component';

@Component({
  selector: 'md-data-table-row,[md-data-table-row],[mdDataTableRow]',
  template: `
    <td *ngFor="let column of columns"
        [class.mat-numeric-column]="column.numeric"
        [class.mat-editable]="column.editable"
        (click)="onCellClick(column, thisCell)" #thisCell>
      <span class="mat-column-title">{{column.title}}</span>
      <span>
        <ng-template mdTableCell [mdTableCellColumn]="column" [mdTableCellModel]="row.model"></ng-template>
      </span>
    </td>
  `,
  styles: [
    `td {
      position: relative;
      text-align: left;
      vertical-align: middle;
      box-sizing: border-box;
      padding: 0 12px; }
    td:first-of-type {
      padding-left: 24px; }
    td:last-of-type {
      padding-right: 24px; }
    td.mat-numeric-column {
      text-align: right; }
    td.mat-editable {
      cursor: pointer; }
    td .mat-column-title {
      display: none;
      font-size: 12px;
      font-weight: 500; }
    `
  ]
})
export class MdDataTableRowComponent implements OnInit, AfterViewInit {
  @Input() row: MdRowData;
  @Input() columns: MdDataColumnComponent[];

  constructor(
    private dialog: MatDialog,
    private viewContainerRef: ViewContainerRef,
    private tableEvent: TableEventService
  ) { }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    this.tableEvent.raiseWidthChange();
  }

  onCellClick(column, cellEl) {
    if (column.editable !== false) {
      const boundingRect = cellEl.getBoundingClientRect();
      const dialogConfig = new MatDialogConfig();
      dialogConfig.viewContainerRef = this.viewContainerRef;
      dialogConfig.width = `${cellEl.offsetWidth}px`;
      dialogConfig.position = {
        top: `${boundingRect.top}px`,
        left: `${boundingRect.left}px`,
      };
      dialogConfig.data = cellEl;

      const dialogRef = this.dialog.open(InlineDialogComponent, dialogConfig);
      dialogRef.componentInstance.placeholder = column.placeholder;
      dialogRef.componentInstance.value = column.getFieldData(this.row.model);
      dialogRef.componentInstance.isNumeric = column.numeric;

      dialogRef.afterClosed().subscribe((result) => {
        if (typeof result !== 'undefined') {
          const oldValue = column.getFieldData(this.row.model);
          // TODO(dtrthi): consider add validation feature when using inline edit
          if ('' + oldValue !== result) {
            column.setFieldData(this.row.model, result);
            column.onFieldChange.emit({
              data: this.row.model,
              field: column.field,
              oldValue: oldValue,
              newValue: result
            });
          }
        }
      });
    }
  }
}
