import { Component, OnInit, ViewChild } from '@angular/core';
import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { HttpClient } from '@angular/common/http';
import { PageEvent } from '@angular/material';
import { BehaviorSubject, merge, Observable, of } from 'rxjs';
import { map, mergeMap, switchMapTo } from 'rxjs/operators';

import { MdDataTableComponent } from '../../md-data-table/components/md-data-table/md-data-table.component';

@Component({
  selector: 'app-paging-data-source-with-filter',
  templateUrl: './paging-data-source-with-filter.component.html',
  styleUrls: ['./paging-data-source-with-filter.component.scss']
})
export class PagingDataSourceWithFilterComponent implements OnInit {
  dataSource: DummyDataSource;

  @ViewChild('dataTable', {static: false}) dataTable: MdDataTableComponent;

  constructor(
    private http: HttpClient,
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
    private http: HttpClient,
    private dataTable: MdDataTableComponent,
  ) {
    super();
  }

  connect(collectionViewer: CollectionViewer): Observable<any[]> {
    const firstPageOb = of(null);

    let pageEvent = new PageEvent();
    pageEvent.pageIndex = 0;
    pageEvent.pageSize = 10;
    const pageChanged = this.dataTable.pageChange.pipe(map((evt: PageEvent) => pageEvent = evt));
    const displayDataChanges = [firstPageOb, pageChanged, this.filterChange];
    return merge(...displayDataChanges).pipe(
      switchMapTo(this.http.get('assets/data.json')),
      map((response: any[]) => {
        let filteredResponse: any[] = response;
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
          });
        }
        this.total = filteredResponse.length;
        const startIndex = pageEvent.pageIndex * pageEvent.pageSize;
        return filteredResponse.splice(startIndex, pageEvent.pageSize);
      }),
    );
  }

  disconnect(collectionViewer: CollectionViewer): void { }
}
