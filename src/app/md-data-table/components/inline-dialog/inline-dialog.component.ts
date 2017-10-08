import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'md-inline-dialog',
  template: `
    <form [formGroup]="form" (ngSubmit)="onFormSubmit()">
      <mat-form-field floatPlaceholder="never">
        <input matInput placeholder="{{placeholder}}" formControlName="value" [style.text-align]="isNumeric ? 'end' : 'start'">
      </mat-form-field>
    </form>
  `,
  styles: [
    `:host {
      display: flex; }

    form {
      flex: 1;
      display: flex; }
    form mat-form-field {
      flex: 1;
      margin-top: -15px;
      margin-bottom: -18px;
      width: auto; }
    form mat-form-field mat-hint {
      font-size: 80%; }
    form [matInput] {
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
    private dialogRef: MatDialogRef<InlineDialogComponent>,
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
