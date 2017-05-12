import { Component, OnInit } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'md-filter-button',
  templateUrl: './md-filter-button.component.html',
  styleUrls: ['./md-filter-button.component.scss'],
  animations: [
    trigger('filterState', [
      state('none', style({
        transform: 'rotate(0)'
      })),
      state('filtering', style({
        transform: 'rotate(90deg)'
      })),
      transition('none => filtering', animate('150ms ease')),
      transition('filtering => none', animate('150ms ease'))
    ]),
    trigger('filterState2', [
      state('none', style({
        width: '0'
      })),
      state('filtering', style({
        width: '320px'
      })),
      transition('none => filtering', animate('300ms 100ms ease-in')),
      transition('filtering => none', animate('300ms ease-out'))
    ]),
  ]
})
export class MdFilterButtonComponent implements OnInit {
  filterState = 'none';
  isAnimating = false;
  filterForm: FormGroup;

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.filterForm = this.fb.group({
      input: []
    });
  }

  toggleFilterState() {
    if (this.filterState === 'none') {
      this.isAnimating = true;
      this.filterState = 'filtering';
    } else {
      this.filterState = 'none';
    }
  }

  onFilterStateDone(event) {
    if (event.fromState === 'filtering' && event.toState === 'none') {
      this.isAnimating = false;
    }
  }
}
