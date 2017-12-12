import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'app works!';
  data: any;
  total = 0;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    return this.http.get('assets/data.json').subscribe(
      response => {
        this.data = response;
        this.total = this.data.length;
      }
    );
  }

  onRowClick(data) {
    console.log(data);
  }
}
