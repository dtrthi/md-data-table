import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-filterable',
  templateUrl: './filterable.component.html',
  styleUrls: ['./filterable.component.scss']
})
export class FilterableComponent implements OnInit {
  data: any;

  constructor(
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.http.get('assets/data.json').subscribe(
      response => {
        this.data = response;
      }
    );
  }
}
