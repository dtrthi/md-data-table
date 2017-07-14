import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class TableEventService {

  private widthChangeSubject = new Subject<void>();
  widthChange: Observable<void> = this.widthChangeSubject.asObservable();

  constructor() { }

  raiseWidthChange() {
    this.widthChangeSubject.next();
  }
}
