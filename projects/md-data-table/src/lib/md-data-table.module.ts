import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import {
  MatButtonModule,
  MatDialogModule,
  MatIconModule,
  MatInputModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatTooltipModule
} from '@angular/material';

import { InlineDialogComponent } from './components/inline-dialog/inline-dialog.component';
import { MdDataTableComponent } from './components/md-data-table/md-data-table.component';
import { MdDataColumnComponent } from './components/md-data-column/md-data-column.component';
import { MdDataTableRowComponent } from './components/md-data-table-row/md-data-table-row.component';
import { MdFilterButtonComponent } from './components/md-filter-button/md-filter-button.component';
import { MdTableCellDirective } from './directives/md-table-cell.directive';
import { MdTableHeaderComponent } from './components/md-table-header/md-table-header.component';

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    MatButtonModule,
    MatDialogModule,
    MatIconModule,
    MatInputModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatTooltipModule,
    ReactiveFormsModule
  ],
  declarations: [
    InlineDialogComponent,
    MdDataTableComponent,
    MdDataColumnComponent,
    MdDataTableRowComponent,
    MdFilterButtonComponent,
    MdTableCellDirective,
    MdTableHeaderComponent
  ],
  entryComponents: [
    InlineDialogComponent
  ],
  exports: [
    MdDataColumnComponent,
    MdDataTableComponent,
    MdTableHeaderComponent
  ]
})
export class MdDataTableModule { }
