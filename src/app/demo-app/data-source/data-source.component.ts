import { Component, OnInit } from '@angular/core';
import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-data-source',
  templateUrl: './data-source.component.html',
  styleUrls: ['./data-source.component.scss']
})
export class DataSourceComponent implements OnInit {
  data: any;

  constructor(
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.data = new DummyDataSource(this.http);
  }
}

class DummyDataSource extends DataSource<any> {

  constructor(private http: HttpClient) {
    super();
  }

  connect(collectionViewer: CollectionViewer): Observable<any[]> {
    return this.http.get<any[]>('assets/data.json');
  }

  disconnect(collectionViewer: CollectionViewer): void { }
}
