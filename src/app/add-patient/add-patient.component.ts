import { Component, inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Patient } from '../patient';
import { Observable } from 'rxjs';
import { VitalSignsService } from "../vital-signs.service";
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-add-patient',
  templateUrl: './add-patient.component.html',
  styleUrl: './add-patient.component.css'
})
export class AddPatientComponent {
  profileForm = new FormGroup({
    firstName: new FormControl<string>('',{nonNullable:true,validators: Validators.required} ),
    lastName: new FormControl<string>('',{nonNullable:true,validators: Validators.required}),
  });
  patient$!: Observable<Patient>;
  private snackBar= inject(MatSnackBar)
  constructor(public dialogRef: MatDialogRef<AddPatientComponent>,private VitalSings:VitalSignsService){}
  saveDialog(){
    const id=this.profileForm.controls.firstName.value+this.profileForm.controls.lastName.value;
    this.VitalSings.addPatient({id:id,bloodPressureMax:0,bloodPressureMin:0,pulse:0}).subscribe(result=>{
      this.snackBar.open('Paciente agregado','',{duration:500})
      this.dialogRef.close();
    })
  }
}
