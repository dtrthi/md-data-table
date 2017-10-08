import { Component, OnInit, ViewChild } from '@angular/core';
import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { Http } from '@angular/http';
import { PageEvent } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/switchMapTo';

import { MdDataTableComponent } from '../../md-data-table/components/md-data-table/md-data-table.component';

@Component({
  selector: 'app-paging-data-source-with-filter',
  templateUrl: './paging-data-source-with-filter.component.html',
  styleUrls: ['./paging-data-source-with-filter.component.scss']
})
export class PagingDataSourceWithFilterComponent implements OnInit {
  dataSource: DummyDataSource;

  @ViewChild('dataTable') dataTable: MdDataTableComponent;

  constructor(
    private http: Http,
  ) { }

  ngOnInit() {
    this.dataSource = new DummyDataSource(this.http, this.dataTable);
  }

  onFilter(data) {
    if (this.dataSource) {
      this.dataSource.filter = data;
    }
  }
}

class DummyDataSource extends DataSource<any> {
  private filterChange = new BehaviorSubject('');
  total: number;
  get filter() { return this.filterChange.value; }
  set filter(filter: string) { this.filterChange.next(filter); }

  constructor(
    private http: Http,
    private dataTable: MdDataTableComponent,
  ) {
    super();
  }

  connect(collectionViewer: CollectionViewer): Observable<any[]> {
    const firstPageOb = Observable.of(null);

    let pageEvent = new PageEvent();
    pageEvent.pageIndex = 0;
    pageEvent.pageSize = 10;
    const pageChanged = this.dataTable.pageChange.map((evt: PageEvent) => pageEvent = evt);
    const displayDataChanges = [firstPageOb, pageChanged, this.filterChange];
    return Observable.merge(...displayDataChanges).switchMapTo(this.http.get('assets/data.json'))
      .map(response => {
        let filteredResponse: any[] = response.json();
        if (this.filter) {
          filteredResponse = filteredResponse.filter(value => {
            const s = this.filter
              .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
              .toLocaleLowerCase().trim().split(/\s/);
            return this.dataTable.columns.some(
              column => {
                // prevent filter
                if (!column.filterable) {
                  return false;
                }
                // http://stackoverflow.com/questions/990904/remove-accents-diacritics-in-a-string-in-javascript
                const v = (column.getFieldData(value) + '')
                  .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
                  .toLocaleLowerCase();
                for (const i of s) {
                  if (v.indexOf(i) !== -1) {
                    return true;
                  }
                }
                return false;
              }
            );
          })
        }
        this.total = filteredResponse.length;
        const startIndex = pageEvent.pageIndex * pageEvent.pageSize;
        return filteredResponse.splice(startIndex, pageEvent.pageSize);
      });
  }

  disconnect(collectionViewer: CollectionViewer): void { }
}
