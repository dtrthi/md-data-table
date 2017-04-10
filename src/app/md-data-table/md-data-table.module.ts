import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '@angular/material';

import { InlineDialogComponent } from './components/inline-dialog/inline-dialog.component';
import { MdDataTableComponent } from './components/md-data-table/md-data-table.component';
import { MdDataColumnComponent } from './components/md-data-column/md-data-column.component';
import { MdDataTableRowComponent } from './components/md-data-table-row/md-data-table-row.component';
import { MdPaginatorComponent } from './components/md-paginator/md-paginator.component';
import { MdTableCellDirective } from './directives/md-table-cell.directive';

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    MaterialModule
  ],
  declarations: [
    InlineDialogComponent,
    MdDataTableComponent,
    MdDataColumnComponent,
    MdDataTableRowComponent,
    MdPaginatorComponent,
    MdTableCellDirective
  ],
  entryComponents: [
    InlineDialogComponent
  ],
  exports: [
    MdDataColumnComponent,
    MdDataTableComponent
  ]
})
export class MdDataTableModule { }
