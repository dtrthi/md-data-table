import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';

import { MdPagination } from '../../md-data-table/models/md-pagination';

@Component({
  selector: 'app-inline-editing',
  templateUrl: './inline-editing.component.html',
  styleUrls: ['./inline-editing.component.scss']
})
export class InlineEditingComponent implements OnInit {
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
}
