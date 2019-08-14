import { TestBed, inject } from '@angular/core/testing';

import { TableEventService } from './table-event.service';

describe('TableEventService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TableEventService]
    });
  });

  it('should ...', inject([TableEventService], (service: TableEventService) => {
    expect(service).toBeTruthy();
  }));
});
