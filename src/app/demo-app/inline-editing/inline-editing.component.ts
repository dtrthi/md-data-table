import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder } from '@angular/forms';
import { Http } from '@angular/http';
import { Subject } from 'rxjs/Subject';

import { MdPagination } from '../../md-data-table/models/md-pagination';

@Component({
  selector: 'app-inline-editing',
  templateUrl: './inline-editing.component.html',
  styleUrls: ['./inline-editing.component.scss']
})
export class InlineEditingComponent implements OnInit {
  fetchData: any;
  total = 0;
  private formArray: FormArray;
  private subject: Subject<any>;

  constructor(
    private fb: FormBuilder,
    private http: Http
  ) { }

  ngOnInit() {
    this.buildForm();

    this.subject = new Subject();
    this.http.get('assets/data.json').subscribe(
      response => {
        const data = response.json();
        this.subject.next(Array.isArray(data) && (this.total = data.length) && data.slice(0, 11) || []);
      }
    );
    this.fetchData = this.subject.asObservable();
  }

  onFieldChange(event) {
    this.formArray.insert(
      event.data.id,
      this.fb.group({
        id: event.data.id,
        value: event.data
      })
    );
  }

  onPageChange(event: MdPagination) {
    console.log(event);
    this.http.get('assets/data.json').subscribe(
      response => {
        const data = response.json();
        this.subject.next(Array.isArray(data) && (this.total = data.length) && data.slice(event.begin, event.end + 1) || []);
      }
    );
  }

  logFormArray() {
    console.log(this.formArray.value);
  }

  private buildForm() {
    this.formArray = this.fb.array([]);
  }
}
