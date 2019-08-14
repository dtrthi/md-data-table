import { Directive, EmbeddedViewRef, Input, OnDestroy, OnInit, ViewContainerRef } from '@angular/core';

import { MdDataColumnComponent } from '../components/md-data-column/md-data-column.component';

@Directive({
  selector: '[mdTableCell]'
})
export class MdTableCellDirective implements OnInit, OnDestroy {
  private childView: EmbeddedViewRef<MdTableCellDirective>;

  @Input() mdTableCellColumn: MdDataColumnComponent;
  @Input() mdTableCellModel: any;

  constructor(
    private viewContainer: ViewContainerRef
  ) { }

  ngOnInit(): void {
    const template = this.mdTableCellColumn.template;
    if (this.viewContainer && template) {
      this.childView = this.viewContainer.createEmbeddedView(template, this);
    }
  }

  ngOnDestroy(): void {
    if (this.childView) {
      this.childView.destroy();
    }
  }
}
