import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@angular/material';
import { MdDataTableComponent } from './components/md-data-table/md-data-table.component';
import { MdDataTableColumnComponent } from './components/md-data-table-column/md-data-table-column.component';
import { MdDataTableRowComponent } from './components/md-data-table-row/md-data-table-row.component';
import { MdTableCellDirective } from './directives/md-table-cell.directive';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule
  ],
  declarations: [
    MdDataTableComponent,
    MdDataTableColumnComponent,
    MdDataTableRowComponent,
    MdTableCellDirective
  ],
  exports: [
    MdDataTableColumnComponent,
    MdDataTableComponent
  ]
})
export class MdDataTableModule { }
