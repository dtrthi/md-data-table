import { Component, OnInit, ViewChild } from '@angular/core';
import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { HttpClient } from '@angular/common/http';
import { PageEvent } from '@angular/material';
import { merge, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { MdDataTableComponent } from '../../md-data-table/components/md-data-table/md-data-table.component';

@Component({
  selector: 'app-paging-data-source',
  templateUrl: './paging-data-source.component.html',
  styleUrls: ['./paging-data-source.component.scss']
})
export class PagingDataSourceComponent implements OnInit {
  dataSource: any;

  @ViewChild('dataTable', {static: false}) dataTable: MdDataTableComponent;

  constructor(
    private http: HttpClient,
  ) { }

  ngOnInit() {
    this.dataSource = new DummyDataSource(this.http, this.dataTable);
  }
}

class DummyDataSource extends DataSource<any> {
  total: number;

  constructor(
    private http: HttpClient,
    private dataTable: MdDataTableComponent,
  ) {
    super();
  }

  connect(collectionViewer: CollectionViewer): Observable<any[]> {
    const firstPageOb = this.http.get<any[]>('assets/data.json').pipe(
      map(response => {
        this.total = response.length;
        return response.filter((item, index) => index < 8);
      })
    );

    let pageEvent = new PageEvent();
    pageEvent.pageIndex = 0;
    pageEvent.pageSize = 10;
    const pageChanged = this.dataTable.pageChange.pipe(
      switchMap((evt: PageEvent) => {
        pageEvent = evt;
        return this.http.get<any[]>('assets/data.json');
      }),
      map(response => {
        this.total = response.length;
        const startIndex = pageEvent.pageIndex * pageEvent.pageSize;
        return response.splice(startIndex, pageEvent.pageSize);
      })
    );
    return merge(firstPageOb, pageChanged);
  }

  disconnect(collectionViewer: CollectionViewer): void { }
}
