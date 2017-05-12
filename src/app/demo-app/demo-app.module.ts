import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '@angular/material';

import { FilterableComponent } from './filterable/filterable.component';
import { InlineEditingComponent } from './inline-editing/inline-editing.component';
import { MdDataTableModule } from '../md-data-table/md-data-table.module';

@NgModule({
  declarations: [
    FilterableComponent,
    InlineEditingComponent
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    MaterialModule,
    ReactiveFormsModule,
    MdDataTableModule
  ],
  exports: [
    FilterableComponent,
    InlineEditingComponent
  ]
})
export class DemoAppModule { }
