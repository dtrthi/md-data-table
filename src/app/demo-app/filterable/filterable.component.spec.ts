import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterableComponent } from './filterable.component';

describe('FilterableComponent', () => {
  let component: FilterableComponent;
  let fixture: ComponentFixture<FilterableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilterableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
