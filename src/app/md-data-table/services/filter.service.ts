import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class FilterService {
  filterSource = new Subject<string>();

  constructor() { }

  doFilter(value: string) {
    this.filterSource.next(value);
  }

  onFilter() {
    return this.filterSource;
  }
}
