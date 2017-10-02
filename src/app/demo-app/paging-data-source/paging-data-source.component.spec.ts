import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PagingDataSourceComponent } from './paging-data-source.component';

describe('PagingDataSourceComponent', () => {
  let component: PagingDataSourceComponent;
  let fixture: ComponentFixture<PagingDataSourceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PagingDataSourceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PagingDataSourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
