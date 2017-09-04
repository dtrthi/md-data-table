import { Component, OnInit } from '@angular/core';
import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-data-source-with-filter',
  templateUrl: './data-source-with-filter.component.html',
  styleUrls: ['./data-source-with-filter.component.scss']
})
export class DataSourceWithFilterComponent implements OnInit {
  data: any;

  constructor(
    private http: Http
  ) { }

  ngOnInit() {
    this.data = new DummyDataSource(this.http);
  }
}

class DummyDataSource extends DataSource<any> {

  constructor(private http: Http) {
    super();
  }

  connect(collectionViewer: CollectionViewer): Observable<any[]> {
    return this.http.get('assets/data.json').map(response => response.json());
  }

  disconnect(collectionViewer: CollectionViewer): void { }
}
