import { Component, ContentChild, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MdTableCellDirective } from '../../directives/md-table-cell.directive';

@Component({
  selector: 'md-data-column',
  templateUrl: './md-data-column.component.html',
  styleUrls: ['./md-data-column.component.scss']
})
export class MdDataColumnComponent implements OnInit {
  sortDir: 'asc' | 'desc' = null;

  @Input() title: string;
  @Input() field: string;
  @Input() tooltip: string;
  @Input() numeric = false;

  @ContentChild(TemplateRef) _customTemplate: TemplateRef<MdTableCellDirective>;
  @ViewChild('internalTemplate') _internalTemplate: TemplateRef<MdTableCellDirective>;

  get template() {
    return this._customTemplate ? this._customTemplate : this._internalTemplate;
  }

  constructor() { }

  ngOnInit() {
  }

  getFieldData(model) {
    const fields = this.field.split('.');
    let value = model;
    fields.every((field) => {
      return value = value[field];
    });
    return value;
  }
}
