import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MdDataTableComponent } from './md-data-table.component';

describe('MdDataTableComponent', () => {
  let component: MdDataTableComponent;
  let fixture: ComponentFixture<MdDataTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MdDataTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MdDataTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
