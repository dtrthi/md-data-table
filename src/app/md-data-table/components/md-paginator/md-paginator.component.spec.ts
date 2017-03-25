import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MdPaginatorComponent } from './md-paginator.component';

describe('MdPaginatorComponent', () => {
  let component: MdPaginatorComponent;
  let fixture: ComponentFixture<MdPaginatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MdPaginatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MdPaginatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
