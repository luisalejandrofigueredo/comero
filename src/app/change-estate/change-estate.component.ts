import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { VitalSignsService } from "../vital-signs.service";
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-change-estate',
  templateUrl: './change-estate.component.html',
  styleUrl: './change-estate.component.css'
})
export class ChangeEstateComponent {
  profileForm = new FormGroup({
    firstName: new FormControl<string>('', { nonNullable: true, validators: Validators.required }),
    lastName: new FormControl<string>('', { nonNullable: true, validators: Validators.required }),
    bloodPressureMax: new FormControl<number>(0, { nonNullable: true, validators: Validators.required }),
    bloodPressureMin: new FormControl<number>(0, { nonNullable: true, validators: Validators.required }),
    pulse: new FormControl<number>(0, { nonNullable: true, validators: Validators.required })
  });
  vitalSingsService=inject(VitalSignsService);
  matSnackBar=inject(MatSnackBar);
  constructor(public dialogRef: MatDialogRef<ChangeEstateComponent>){}
  changeVital() {
    const patient={id:this.profileForm.controls.firstName.value+this.profileForm.controls.lastName.value,
      bloodPressureMin:this.profileForm.controls.bloodPressureMin.value,
      bloodPressureMax:this.profileForm.controls.bloodPressureMax.value,
      pulse:this.profileForm.controls.pulse.value
    }
    this.vitalSingsService.putPatient(patient).subscribe((_document:any)=>{
      this.matSnackBar.open("Los datos vitales han sido cambiados","",{duration:300})
      this.dialogRef.close();
    })
  }
}
