import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { MatCardModule, MatDialogModule } from '@angular/material';
import { MdDataTableModule } from '@dtrthi/md-data-table';

import { AppComponent } from './app.component';
import { DemoAppModule } from './demo-app/demo-app.module';

const MATERIAL_MODULES = [
  MatCardModule,
  MatDialogModule
];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    FormsModule,
    HttpClientModule,
    ...MATERIAL_MODULES,
    MdDataTableModule,
    DemoAppModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
