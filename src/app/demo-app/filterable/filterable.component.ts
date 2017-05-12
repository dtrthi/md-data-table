import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Subject } from 'rxjs/Subject';

import { MdPagination } from '../../md-data-table/models/md-pagination';

@Component({
  selector: 'app-filterable',
  templateUrl: './filterable.component.html',
  styleUrls: ['./filterable.component.scss']
})
export class FilterableComponent implements OnInit {
  fetchData: any;
  total = 0;
  private subject: Subject<any>;

  constructor(
    private http: Http
  ) { }

  ngOnInit() {
    this.subject = new Subject();
    this.http.get('assets/data.json').subscribe(
      response => {
        const data = response.json();
        this.subject.next(Array.isArray(data) && (this.total = data.length) && data.slice(0, 11) || []);
      }
    );
    this.fetchData = this.subject.asObservable();
  }

  onPageChange(event: MdPagination) {
    this.http.get('assets/data.json').subscribe(
      response => {
        const data = response.json();
        this.subject.next(Array.isArray(data) && (this.total = data.length) && data.slice(event.begin, event.end + 1) || []);
      }
    );
  }

  onFilter(event) {
    console.log(event);
  }
}
