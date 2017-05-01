import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import {
  MdButtonModule, MdDialogModule, MdIconModule, MdInputModule, MdProgressBarModule,
  MdTooltipModule
} from '@angular/material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { MdDataTableComponent } from './components/md-data-table/md-data-table.component';
import { MdDataColumnComponent } from './components/md-data-column/md-data-column.component';
import { MdDataTableRowComponent } from './components/md-data-table-row/md-data-table-row.component';
import { MdPaginatorComponent } from './components/md-paginator/md-paginator.component';
import { MdTableCellDirective } from './directives/md-table-cell.directive';
import { MdTableHeaderComponent } from './components/md-table-header/md-table-header.component';

@NgModule({
  imports: [
    CommonModule,
    NoopAnimationsModule,
    FlexLayoutModule,
    MdButtonModule,
    MdDialogModule,
    MdIconModule,
    MdInputModule,
    MdProgressBarModule,
    MdTooltipModule
  ],
  declarations: [
    MdDataTableComponent,
    MdDataColumnComponent,
    MdDataTableRowComponent,
    MdPaginatorComponent,
    MdTableCellDirective,
    MdTableHeaderComponent
  ],
  exports: [
    MdDataColumnComponent,
    MdDataTableComponent,
    MdTableHeaderComponent
  ]
})
export class MdDataTableModule { }
