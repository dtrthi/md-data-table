import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '@angular/material';

import { InlineEditingComponent } from './inline-editing/inline-editing.component';
import { MdDataTableModule } from '../md-data-table/md-data-table.module';

@NgModule({
  declarations: [InlineEditingComponent],
  imports: [
    CommonModule,
    FlexLayoutModule,
    MaterialModule,
    MdDataTableModule
  ],
  exports: [
    InlineEditingComponent
  ]
})
export class DemoAppModule { }
