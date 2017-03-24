import { Component, ContentChild, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MdTableCellDirective } from '../../directives/md-table-cell.directive';

@Component({
  selector: 'md-data-table-column',
  templateUrl: './md-data-table-column.component.html',
  styleUrls: ['./md-data-table-column.component.scss']
})
export class MdDataTableColumnComponent implements OnInit {
  sortDir: 'asc' | 'desc' = null;

  @Input() title: string;
  @Input() field: string;
  @Input() tooltip: string;
  @Input() numeric: boolean = false;

  @ContentChild(TemplateRef) _customTemplate: TemplateRef<MdTableCellDirective>;
  @ViewChild('internalTemplate') _internalTemplate: TemplateRef<MdTableCellDirective>;

  get template() {
    return this._customTemplate ? this._customTemplate : this._internalTemplate;
  }

  constructor() { }

  ngOnInit() {
  }

  getFieldData(model) {
    return model[this.field];
  }
}
