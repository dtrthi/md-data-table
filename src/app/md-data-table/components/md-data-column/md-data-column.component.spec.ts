import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MdDataColumnComponent } from './md-data-column.component';

describe('MdDataColumnComponent', () => {
  let component: MdDataColumnComponent;
  let fixture: ComponentFixture<MdDataColumnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MdDataColumnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MdDataColumnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
