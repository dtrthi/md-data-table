import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PagingDataSourceWithFilterComponent } from './paging-data-source-with-filter.component';

describe('PagingDataSourceWithFilterComponent', () => {
  let component: PagingDataSourceWithFilterComponent;
  let fixture: ComponentFixture<PagingDataSourceWithFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PagingDataSourceWithFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PagingDataSourceWithFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
