import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'md-table-header',
  templateUrl: './md-table-header.component.html',
  styleUrls: ['./md-table-header.component.scss']
})
export class MdTableHeaderComponent implements OnInit {
  filterable = false;
  @Input() title = '';

  constructor() { }

  ngOnInit() {
  }
}
