import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MdTableHeaderComponent } from './md-table-header.component';

describe('MdTableHeaderComponent', () => {
  let component: MdTableHeaderComponent;
  let fixture: ComponentFixture<MdTableHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MdTableHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MdTableHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
