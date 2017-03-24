import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MdDataTableColumnComponent } from './md-data-table-column.component';

describe('MdDataTableColumnComponent', () => {
  let component: MdDataTableColumnComponent;
  let fixture: ComponentFixture<MdDataTableColumnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MdDataTableColumnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MdDataTableColumnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
