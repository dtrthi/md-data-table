import { Component, Input, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'md-table-header',
  template: `
    <div #wrapper>
      <span *ngIf="heading">{{heading}}</span>
      <ng-content></ng-content>
      <md-filter-button class="card-action-icon" *ngIf="filterable"></md-filter-button>
      <button mat-icon-button class="card-action-icon"
              i18n-matTooltip matTooltip="More Options" *ngIf="false"><mat-icon>more_vert</mat-icon></button>
    </div>
  `,
  styles: [
    `div {
      display: flex;
      align-items: center;
      height: 64px;
      padding-left: 24px;
      padding-right: 14px;
      border-bottom: 1px solid rgba(0, 0, 0, 0.12);
      margin-bottom: -1px; }
    div span {
      font-size: 20px;
      color: rgba(0, 0, 0, 0.87); }
    div span:first-of-type {
      flex: 1; }
    div .card-action-icon {
      display: flex;
      flex-direction: column;
      justify-content: center;
      width: 24px;
      height: 24px;
      line-height: 24px;
      color: rgba(0, 0, 0, 0.54); }
    div .card-action-icon + .card-action-icon {
      margin-left: 24px; }
    `
  ]
})
export class MdTableHeaderComponent implements OnInit {
  filterable = false;

  set rightGap(value) {
    if (this.wrapper) {
      this.wrapper.nativeElement.style.paddingRight += `${value + 14}px`;
    }
  }

  /** @deprecated Use heading instead */
  @Input() set title(value) {
    this.heading = value;
  };

  @Input() heading = '';

  @ViewChild('wrapper', {static: true}) wrapper;

  constructor() { }

  ngOnInit() {
  }
}
