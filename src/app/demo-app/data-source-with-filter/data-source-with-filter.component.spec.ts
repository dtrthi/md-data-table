import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataSourceWithFilterComponent } from './data-source-with-filter.component';

describe('DataSourceWithFilterComponent', () => {
  let component: DataSourceWithFilterComponent;
  let fixture: ComponentFixture<DataSourceWithFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataSourceWithFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataSourceWithFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
