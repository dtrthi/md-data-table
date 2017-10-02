import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MdCardModule } from '@angular/material';

import { DataSourceComponent } from './data-source/data-source.component';
import { DataSourceWithFilterComponent } from './data-source-with-filter/data-source-with-filter.component';
import { FilterableComponent } from './filterable/filterable.component';
import { InlineEditingComponent } from './inline-editing/inline-editing.component';
import { MdDataTableModule } from '../md-data-table/md-data-table.module';

@NgModule({
  declarations: [
    DataSourceComponent,
    DataSourceWithFilterComponent,
    FilterableComponent,
    InlineEditingComponent
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    MdCardModule,
    ReactiveFormsModule,
    MdDataTableModule
  ],
  exports: [
    DataSourceComponent,
    DataSourceWithFilterComponent,
    FilterableComponent,
    InlineEditingComponent
  ]
})
export class DemoAppModule { }
