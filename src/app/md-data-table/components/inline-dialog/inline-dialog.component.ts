import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MdDialogRef } from '@angular/material';

@Component({
  selector: 'md-inline-dialog',
  template: `
    <form [formGroup]="form" (ngSubmit)="onFormSubmit()">
      <md-form-field floatPlaceholder="never">
        <input mdInput placeholder="{{placeholder}}" formControlName="value" [style.text-align]="isNumeric ? 'end' : 'start'">
      </md-form-field>
    </form>
  `,
  styles: [
    `:host {
      display: flex; }

    form {
      flex: 1;
      display: flex; }
    form md-form-field {
      flex: 1;
      margin-top: -15px;
      margin-bottom: -18px;
      width: auto; }
    form md-form-field md-hint {
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
