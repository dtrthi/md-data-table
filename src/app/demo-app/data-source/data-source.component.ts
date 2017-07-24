import { Component, OnInit } from '@angular/core';
import { CollectionViewer, DataSource } from '@angular/cdk';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-data-source',
  templateUrl: './data-source.component.html',
  styleUrls: ['./data-source.component.scss']
})
export class DataSourceComponent implements OnInit {
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
