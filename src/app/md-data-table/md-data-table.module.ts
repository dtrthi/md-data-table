import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import {
  MdButtonModule, MdDialogModule, MdIconModule, MdInputModule, MdProgressBarModule,
  MdTooltipModule
} from '@angular/material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { InlineDialogComponent } from './components/inline-dialog/inline-dialog.component';
import { MdDataTableComponent } from './components/md-data-table/md-data-table.component';
import { MdDataColumnComponent } from './components/md-data-column/md-data-column.component';
import { MdDataTableRowComponent } from './components/md-data-table-row/md-data-table-row.component';
import { MdFilterButtonComponent } from './components/md-filter-button/md-filter-button.component';
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
    MdTooltipModule,
    ReactiveFormsModule
  ],
  declarations: [
    InlineDialogComponent,
    MdDataTableComponent,
    MdDataColumnComponent,
    MdDataTableRowComponent,
    MdFilterButtonComponent,
    MdPaginatorComponent,
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
