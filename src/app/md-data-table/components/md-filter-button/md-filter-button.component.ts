import { Component, OnInit } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { FormBuilder, FormGroup } from '@angular/forms';
import 'rxjs/add/operator/debounceTime';

import { FilterService } from '../../services/filter.service';

@Component({
  selector: 'md-filter-button',
  template: `
    <form [formGroup]="filterForm">
      <md-form-field floatPlaceholder="never" [@filterState2]="filterState">
        <input mdInput i18n-placeholder placeholder="Filter" formControlName="input">
      </md-form-field>
    </form>
    <button md-icon-button i18n-mdTooltip mdTooltip="Filter"
            [@filterState]="filterState"
            (@filterState.done)="onFilterStateDone($event)"
            (click)="toggleFilterState()">
      <md-icon [hidden]="isOpening">search</md-icon>
      <md-icon [hidden]="!isOpening">close</md-icon>
    </button>
  `,
  styles: [
    `:host {
      position: relative; }

    button {
      width: inherit;
      height: inherit;
      line-height: inherit; }

    md-form-field {
      position: absolute;
      right: 0;
      top: -16px;
      width: 0; }

    [hidden] {
      display: none !important; }
    `
  ],
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
  isOpening = false;
  filterForm: FormGroup;
  delay = 300;

  constructor(
    private fb: FormBuilder,
    private filterService: FilterService
  ) { }

  ngOnInit() {
    this.filterForm = this.fb.group({
      input: []
    });

    this.filterForm.get('input').valueChanges
      .debounceTime(this.delay)
      .subscribe((value) => this.filterService.doFilter(value));
  }

  toggleFilterState() {
    if (this.filterState === 'none') {
      this.isOpening = true;
      this.filterState = 'filtering';
    } else {
      this.filterState = 'none';
    }
  }

  onFilterStateDone(event) {
    if (event.fromState === 'filtering' && event.toState === 'none') {
      this.isOpening = false;
      this.filterForm.reset();
    }
  }
}
