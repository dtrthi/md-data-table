import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MdFilterButtonComponent } from './md-filter-button.component';

describe('MdFilterButtonComponent', () => {
  let component: MdFilterButtonComponent;
  let fixture: ComponentFixture<MdFilterButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MdFilterButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MdFilterButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
