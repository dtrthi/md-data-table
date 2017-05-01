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
  private fetchData: any;
  private total = 0;
  private formArray: FormArray;

  constructor(
    private fb: FormBuilder,
    private http: Http
  ) { }

  ngOnInit() {
    this.buildForm();

    this.fetchData = (paging: MdPagination) => {
      let subject = new Subject();
      setTimeout(
        () => {
          this.http.get('assets/data.json').subscribe(
            response => {
              const data = response.json();
              subject.next(Array.isArray(data) && (this.total = data.length) && data.slice(paging.begin, paging.end + 1) || []);
            }
          );
        }, 500);
      return subject.asObservable();
    };
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

  logFormArray() {
    console.log(this.formArray.value);
  }

  private buildForm() {
    this.formArray = this.fb.array([]);
  }
}