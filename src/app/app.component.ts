import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'app works!';
  private data: Array<any>;

  constructor(private http: Http) { }

  ngOnInit() {
    this.http.get('assets/data.json').subscribe(
      response => {
        this.data = response.json();
      }
    );
  }
}
