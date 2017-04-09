import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';

import { MdPagination } from './md-data-table/models/md-pagination';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'app works!';
  private fetchData: any;
  private total = 0;

  constructor(private http: Http) { }

  ngOnInit() {
    this.fetchData = (paging: MdPagination) => {
      return this.http.get('assets/data.json').map(
        response => {
          const data = response.json();
          return Array.isArray(data) && (this.total = data.length) && data.slice(paging.begin, paging.end + 1) || [];
        }
      );
    };
  }

  onRowClick(data) {
    console.log(data);
  }
}
