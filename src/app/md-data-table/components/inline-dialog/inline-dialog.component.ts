import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MdDialogRef } from '@angular/material';

@Component({
  selector: 'md-inline-dialog',
  template: `
    <form [formGroup]="form" (ngSubmit)="onFormSubmit()">
      <md-input-container [style.text-align]="isNumeric ? 'end' : 'start'" floatPlaceholder="never">
        <input mdInput placeholder="{{placeholder}}" formControlName="value">
      </md-input-container>
    </form>
  `,
  styles: [
    `:host {
      display: flex; }

    form {
      flex: 1;
      display: flex; }
    form md-input-container {
      flex: 1;
      margin-top: -15px;
      margin-bottom: -18px; }
    form md-input-container md-hint {
      font-size: 80%; }
    form [mdInput] {
      font-size: 14px; }
    `
  ]
})
export class InlineDialogComponent implements OnInit {
  form: FormGroup;
  placeholder: string;
  value: any;
  isNumeric: boolean;

  constructor(
    private dialogRef: MdDialogRef<InlineDialogComponent>,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      value: [this.value]
    });
  }

  onFormSubmit() {
    this.dialogRef.close(this.form.get('value').value);
  }
}
