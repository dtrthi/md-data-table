import { Component, Input, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'md-table-header',
  templateUrl: './md-table-header.component.html',
  styleUrls: ['./md-table-header.component.scss']
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

  @ViewChild('wrapper') wrapper;

  constructor() { }

  ngOnInit() {
  }
}
