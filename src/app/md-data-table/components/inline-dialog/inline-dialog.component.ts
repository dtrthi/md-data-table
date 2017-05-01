import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MdDialogRef } from '@angular/material';

@Component({
  selector: 'md-inline-dialog',
  templateUrl: './inline-dialog.component.html',
  styleUrls: ['./inline-dialog.component.scss']
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
    })
  }

  onFormSubmit() {
    this.dialogRef.close(this.form.get('value').value);
  }
}
