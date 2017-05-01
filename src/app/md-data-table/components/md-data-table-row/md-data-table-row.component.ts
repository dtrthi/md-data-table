import { Component, Input, OnInit, ViewContainerRef } from '@angular/core';

import { MdRowData } from '../../models/md-row-data';
import { MdDataColumnComponent } from '../md-data-column/md-data-column.component';
import { MdDialog, MdDialogConfig, MdDialogRef } from '@angular/material';
import { InlineDialogComponent } from '../inline-dialog/inline-dialog.component';

@Component({
  selector: 'md-data-table-row,[md-data-table-row],[mdDataTableRow]',
  templateUrl: './md-data-table-row.component.html',
  styleUrls: ['./md-data-table-row.component.scss']
})
export class MdDataTableRowComponent implements OnInit {
  @Input() row: MdRowData;
  @Input() columns: MdDataColumnComponent[];

  constructor(
    private dialog: MdDialog,
    private viewContainerRef: ViewContainerRef
  ) { }

  ngOnInit() {
  }

  onCellClick(column, cellEl) {
    if (column.editable !== false) {
      const boundingRect = cellEl.getBoundingClientRect();
      let dialogRef: MdDialogRef<InlineDialogComponent>;
      let dialogConfig = new MdDialogConfig();
      dialogConfig.viewContainerRef = this.viewContainerRef;
      dialogConfig.width = `${cellEl.offsetWidth}px`;
      dialogConfig.position = {
        top: `${boundingRect.top}px`,
        left: `${boundingRect.left}px`,
      };
      dialogConfig.data = cellEl;

      dialogRef = this.dialog.open(InlineDialogComponent, dialogConfig);

      dialogRef.componentInstance.placeholder = column.placeholder;
      dialogRef.componentInstance.value = column.getFieldData(this.row.model);
      dialogRef.componentInstance.isNumeric = column.numeric;

      dialogRef.afterClosed().subscribe((result) => {
        if (typeof result !== 'undefined') {
          let oldValue = column.getFieldData(this.row.model);
          if (oldValue != result) {
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
