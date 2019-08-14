import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable()
export class TableEventService {

  private widthChangeSubject = new Subject<void>();
  widthChange: Observable<void> = this.widthChangeSubject.asObservable();

  constructor() { }

  raiseWidthChange() {
    this.widthChangeSubject.next();
  }
}
