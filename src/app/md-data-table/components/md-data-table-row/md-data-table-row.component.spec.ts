import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MdDataTableRowComponent } from './md-data-table-row.component';

describe('MdDataTableRowComponent', () => {
  let component: MdDataTableRowComponent;
  let fixture: ComponentFixture<MdDataTableRowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MdDataTableRowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MdDataTableRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
