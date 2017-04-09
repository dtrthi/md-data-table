import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MdPagination } from '../../models/md-pagination';

@Component({
  selector: 'md-paginator',
  templateUrl: './md-paginator.component.html',
  styleUrls: ['./md-paginator.component.scss']
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
