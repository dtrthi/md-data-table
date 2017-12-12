import { Component, OnInit } from '@angular/core';
import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { HttpClient } from '@angular/common/http';
import { FormArray, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-inline-editing',
  templateUrl: './inline-editing.component.html',
  styleUrls: ['./inline-editing.component.scss']
})
export class InlineEditingComponent implements OnInit {
  dataSource: DataSource<any>;
  total = 0;
  private formArray: FormArray;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.buildForm();
    this.dataSource = new DummyDataSource(this.http);
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

  private buildForm() {
    this.formArray = this.fb.array([]);
  }
}

class DummyDataSource extends DataSource<any> {

  constructor(private http: HttpClient) {
    super();
  }

  connect(collectionViewer: CollectionViewer): Observable<any[]> {
    return this.http.get<any[]>('assets/data.json');
  }

  disconnect(collectionViewer: CollectionViewer): void { }
}
