import { Component, Inject, OnInit, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { VitalSignsService } from '../vital-signs.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Patient } from '../patient';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit-paciente',
  templateUrl: './edit-paciente.component.html',
  styleUrl: './edit-paciente.component.css'
})
export class EditPacienteComponent implements OnInit {
  matSnackBar= inject(MatSnackBar)
  profileForm = new FormGroup({
    firstName: new FormControl<string>('', { nonNullable: true, validators: Validators.required }),
    lastName: new FormControl<string>('', { nonNullable: true, validators: Validators.required }),
    bloodPressureMax: new FormControl<number>(0, { nonNullable: true, validators: Validators.required }),
    bloodPressureMin: new FormControl<number>(0, { nonNullable: true, validators: Validators.required }),
    pulse: new FormControl<number>(0, { nonNullable: true, validators: Validators.required })
  });
  constructor(@Inject(MAT_DIALOG_DATA) public data: string, public dialogRef: MatDialogRef<EditPacienteComponent>, private VitalSings: VitalSignsService) { }
  ngOnInit(): void {
    this.profileForm.controls.firstName.disable();
    this.profileForm.controls.lastName.disable();
    this.VitalSings.getPatient(this.data).subscribe((paciente: Patient) => {
      this.profileForm.patchValue({ firstName: paciente.firstName, lastName: paciente.lastName, bloodPressureMax: paciente.bloodPressureMax, bloodPressureMin: paciente.bloodPressureMin, pulse: paciente.pulse })
    })
  }

  saveDialog() {
    this.VitalSings.putPatient({id:this.data,
      bloodPressureMax:this.profileForm.controls.bloodPressureMax.value,
      bloodPressureMin:this.profileForm.controls.bloodPressureMin.value,
      pulse:this.profileForm.controls.pulse.value
    }).subscribe((next)=>{
      this.matSnackBar.open('Signos vitales actualizado','',{duration:500})
      this.dialogRef.close();
    })

  }

}
