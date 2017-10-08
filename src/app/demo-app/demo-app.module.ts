import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material';

import { DataSourceComponent } from './data-source/data-source.component';
import { DataSourceWithFilterComponent } from './data-source-with-filter/data-source-with-filter.component';
import { FilterableComponent } from './filterable/filterable.component';
import { InlineEditingComponent } from './inline-editing/inline-editing.component';
import { MdDataTableModule } from '../md-data-table/md-data-table.module';
import { PagingDataSourceComponent } from './paging-data-source/paging-data-source.component';

@NgModule({
  declarations: [
    DataSourceComponent,
    DataSourceWithFilterComponent,
    FilterableComponent,
    InlineEditingComponent,
    PagingDataSourceComponent,
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    MatCardModule,
    ReactiveFormsModule,
    MdDataTableModule,
  ],
  exports: [
    DataSourceComponent,
    DataSourceWithFilterComponent,
    FilterableComponent,
    InlineEditingComponent,
    PagingDataSourceComponent,
  ]
})
export class DemoAppModule { }
