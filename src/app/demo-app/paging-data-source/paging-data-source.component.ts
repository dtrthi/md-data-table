import { Component, OnInit, ViewChild } from '@angular/core';
import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { Http } from '@angular/http';
import { PageEvent } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/switchMap';

import { MdDataTableComponent } from '../../md-data-table/components/md-data-table/md-data-table.component';

@Component({
  selector: 'app-paging-data-source',
  templateUrl: './paging-data-source.component.html',
  styleUrls: ['./paging-data-source.component.scss']
})
export class PagingDataSourceComponent implements OnInit {
  dataSource: any;

  @ViewChild('dataTable') dataTable: MdDataTableComponent;

  constructor(
    private http: Http,
  ) { }

  ngOnInit() {
    this.dataSource = new DummyDataSource(this.http, this.dataTable);
  }
}

class DummyDataSource extends DataSource<any> {
  total: number;

  constructor(
    private http: Http,
    private dataTable: MdDataTableComponent,
  ) {
    super();
  }

  connect(collectionViewer: CollectionViewer): Observable<any[]> {
    const firstPageOb = this.http.get('assets/data.json').map(response => {
      this.total = response.json().length;
      return response.json().filter((item, index) => index < 8);
    });

    const pageChanged = this.dataTable.pageChange
      .switchMap((pageEvent: PageEvent) => this.http.get('assets/data.json').map(response => {
        this.total = response.json().length;
        const startIndex = pageEvent.pageIndex * pageEvent.pageSize;
        return response.json().splice(startIndex, pageEvent.pageSize);
      }));
    return Observable.merge(firstPageOb, pageChanged);
  }

  disconnect(collectionViewer: CollectionViewer): void { }
}
