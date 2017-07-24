import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '@angular/material';

import { DataSourceComponent } from './data-source/data-source.component';
import { FilterableComponent } from './filterable/filterable.component';
import { InlineEditingComponent } from './inline-editing/inline-editing.component';
import { MdDataTableModule } from '../md-data-table/md-data-table.module';
import { DataSourceWithFilterComponent } from './src/app/demo-app/data-source-with-filter/data-source-with-filter.component';

@NgModule({
  declarations: [
    DataSourceComponent,
    FilterableComponent,
    InlineEditingComponent,
    DataSourceWithFilterComponent
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    MaterialModule,
    ReactiveFormsModule,
    MdDataTableModule
  ],
  exports: [
    DataSourceComponent,
    FilterableComponent,
    InlineEditingComponent
  ]
})
export class DemoAppModule { }
