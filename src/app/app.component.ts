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
  private data: any;
  private total = 0;

  constructor(private http: Http) { }

  ngOnInit() {
    return this.http.get('assets/data.json').subscribe(
      response => {
        this.data = response.json();
        this.total = this.data.length;
      }
    );
  }

  onRowClick(data) {
    console.log(data);
  }
}
