import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-ia-text',
  templateUrl: './add-ia-text.component.html',
  styleUrl: './add-ia-text.component.css'
})
export class AddIaTextComponent implements OnInit {
  profileForm = new FormGroup({
    history: new FormControl<string>('', { nonNullable: true }),
  });
  constructor(dialogRef: MatDialogRef<AddIaTextComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {text:string}
  ){}

  ngOnInit(): void {
    this.profileForm.controls.history.setValue(this.data.text);
  }
}
