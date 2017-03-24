import { Directive, EmbeddedViewRef, Input, OnDestroy, OnInit, ViewContainerRef } from '@angular/core';

import { MdDataTableColumnComponent } from '../components/md-data-table-column/md-data-table-column.component';

@Directive({
  selector: '[mdTableCell]'
})
export class MdTableCellDirective implements OnInit, OnDestroy {
  private childView: EmbeddedViewRef<MdTableCellDirective>;

  @Input() mdTableCellColumn: MdDataTableColumnComponent;
  @Input() mdTableCellModel: any;

  constructor(
    private viewContainer: ViewContainerRef
  ) { }

  ngOnInit(): void {
    let template = this.mdTableCellColumn.template;
    if (this.viewContainer && template) {
      this.childView = this.viewContainer.createEmbeddedView(template, this);
    }
  }

  ngOnDestroy(): void {
    this.childView && this.childView.destroy();
  }
}
