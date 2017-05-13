import { Component, ContentChild, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { MdTableCellDirective } from '../../directives/md-table-cell.directive';
import { isObject } from 'util';

@Component({
  selector: 'md-data-column',
  templateUrl: './md-data-column.component.html',
  styleUrls: ['./md-data-column.component.scss']
})
export class MdDataColumnComponent implements OnInit {
  private _placeholder: string;

  sortDir: 'asc' | 'desc' = null;

  @Input() title: string;
  @Input() field: string;
  @Input() tooltip: string;
  @Input() numeric = false;
  @Input() editable: boolean|'inline' = false;
  @Input() filterable = true;

  get placeholder() { return this._placeholder || this.title; }

  @Input() set placeholder(value) { this._placeholder = value; }

  get template() {
    return this._customTemplate ? this._customTemplate : this._internalTemplate;
  }
  @ContentChild(TemplateRef) _customTemplate: TemplateRef<MdTableCellDirective>;

  @Output() onFieldChange: EventEmitter<any> = new EventEmitter<any>();

  @ViewChild('internalTemplate') _internalTemplate: TemplateRef<MdTableCellDirective>;

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

  setFieldData(model, value) {
    const fields = this.field.split('.');
    let v = model;
    let f = null;
    fields.every((field, index) => {
      f = field;
      if (fields.length === index + 1) {
        return false;
      }
      return v = v[field];
    });
    if (isObject(v) && v.hasOwnProperty(f)) {
      v[f] = value;
    }
  }
}
