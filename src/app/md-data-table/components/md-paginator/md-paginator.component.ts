import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MdPagination } from '../../models/md-pagination';

@Component({
  selector: 'md-paginator',
  template: `
    <div class="mat-paginator">
      <div class="mat-paginator-current-page">
        {{pageStart}}-{{pageEnd}} of {{total}}
      </div>
      <div class="mat-paginator-navigation">
        <button md-icon-button (click)="onPrevClick()" [disabled]="pageStart <= 1">
          <md-icon>chevron_left</md-icon>
        </button>
        <button md-icon-button (click)="onNextClick()" [disabled]="pageEnd >= total">
          <md-icon>chevron_right</md-icon>
        </button>
      </div>
    </div>
  `,
  styles: [
    `.mat-paginator {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: flex-start;
      align-content: center;
      align-items: center; }
    .mat-paginator .mat-paginator-current-page {
      margin: 0 16px; }
    .mat-paginator .mat-paginator-navigation {
      display: flex;
      margin: 0 14px 0 16px;
      justify-content: space-between;
      align-items: center;
      width: 72px; }
    .mat-paginator .mat-paginator-navigation button {
      display: flex;
      flex-direction: column;
      justify-content: center;
      width: 24px;
      height: 24px;
      line-height: 24px; }
    .mat-paginator .mat-paginator-navigation button:disabled {
      color: rgba(0, 0, 0, 0.26); }
    `
  ]
})
export class MdPaginatorComponent implements OnInit {

  private _selectedRange: number;

  @Input() selectedPage = 1;
  @Input() total = 0;
  @Input() ranges: number[] = [10, 25, 50, 100];
  @Input() set selectedRange(selectedRange: number) {
    this._selectedRange = selectedRange;
  }

  @Output() pageChange: EventEmitter<MdPagination> = new EventEmitter<MdPagination>();

  constructor() { }

  ngOnInit() {
    if (!this.selectedRange) {
      this.selectedRange = this.ranges[0];
    }
  }

  get selectedRange(): number {
    return this._selectedRange;
  }

  onPrevClick() {
    if (this.selectedPage > 1) {
      this.selectedPage -= 1;
      this.pageChange.emit(this.currentPage);
    }
  }

  onNextClick() {
    if (this.selectedPage < this.pageCount) {
      this.selectedPage += 1;
      this.pageChange.emit(this.currentPage);
    }
  }

  get pageCount(): number {
    const pageCount = (this.total / this.selectedRange) + ((this.total % this.selectedRange) > 0 ? 1 : 0);
    return pageCount ? parseInt('' + pageCount, 10) : 0;
  }

  get pageStart(): number {
    return parseInt('' + Math.min(((this.selectedPage * this.selectedRange) - this.selectedRange + 1), this.total), 10);
  }

  get pageEnd(): number {
    return parseInt('' + Math.min((this.selectedPage * this.selectedRange), this.total), 10);
  }

  get currentPage() {
    return new MdPagination(this.selectedPage, this.selectedRange);
  }
}
