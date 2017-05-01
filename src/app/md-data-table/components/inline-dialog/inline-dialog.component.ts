import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'md-inline-dialog',
  templateUrl: './inline-dialog.component.html',
  styleUrls: ['./inline-dialog.component.scss']
})
export class InlineDialogComponent implements OnInit {
  placeholder: string;
  value: any;
  isNumeric: boolean;

  constructor() { }

  ngOnInit() {
  }
}
