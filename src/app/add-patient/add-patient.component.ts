import { Component, inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { MatDialogRef,MatDialogActions,MatDialogClose,MatDialogTitle,MatDialogContent } from '@angular/material/dialog';
import { Patient } from '../patient';
import { Observable } from 'rxjs';
import { VitalSignsService } from "../services/vital-signs.service";
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
@Component({
  selector: 'app-add-patient',
  templateUrl: './add-patient.component.html',
  styleUrl: './add-patient.component.css'
})
export class AddPatientComponent {
  profileForm = new FormGroup({
    firstName: new FormControl<string>('', { nonNullable: true, validators: Validators.required }),
    lastName: new FormControl<string>('', { nonNullable: true, validators: Validators.required }),
    bloodPressureMin: new FormControl<number>(100, { nonNullable: true }),
    bloodPressureMax: new FormControl<number>(150, { nonNullable: true}),
    pulse: new FormControl<number>(50, { nonNullable: true, validators: Validators.required })
  });
  patient$!: Observable<Patient>;
  private snackBar = inject(MatSnackBar);
  private router=inject(Router);
  constructor(private VitalSings: VitalSignsService) { }
  saveDialog() {
    const id = this.profileForm.controls.firstName.value + this.profileForm.controls.lastName.value;
    this.VitalSings.addPatient({
      id: id,
      firstName:this.profileForm.controls.firstName.value,
      lastName:this.profileForm.controls.lastName.value,
      bloodPressureMax: this.profileForm.controls.bloodPressureMax.value,
      bloodPressureMin: this.profileForm.controls.bloodPressureMin.value,
      pulse: this.profileForm.controls.pulse.value
    }).subscribe({next: _result => {this.snackBar.open('Paciente agregado', '', { duration: 500 })
    this.router.navigate(['crudPaciente'])},error: error=>{this.snackBar.open('Error al agregar paciente', '', { duration: 500 }),this.router.navigate(['crudPaciente'])}})
  }

  closeDialog(){
    this.router.navigate(['crudPaciente'])
  }
}
