import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InlineDialogComponent } from './inline-dialog.component';

describe('InlineDialogComponent', () => {
  let component: InlineDialogComponent;
  let fixture: ComponentFixture<InlineDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InlineDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InlineDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
