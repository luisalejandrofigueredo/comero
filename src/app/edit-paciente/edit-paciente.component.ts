import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { VitalSignsService } from '../services/vital-signs.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Patient } from '../patient';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-edit-paciente',
  templateUrl: './edit-paciente.component.html',
  styleUrl: './edit-paciente.component.css'
})
export class EditPacienteComponent implements OnInit, OnDestroy {
  matSnackBar = inject(MatSnackBar)
  private router = inject(Router);
  public uuid: string = "";
  private route$: any;
  public tabIndex=0;
  profileForm = new FormGroup({
    firstName: new FormControl<string>('', { nonNullable: true, validators: Validators.required }),
    lastName: new FormControl<string>('', { nonNullable: true, validators: Validators.required }),
    bloodPressureMax: new FormControl<number>(0, { nonNullable: true, validators: Validators.required }),
    bloodPressureMin: new FormControl<number>(0, { nonNullable: true, validators: Validators.required }),
    pulse: new FormControl<number>(0, { nonNullable: true, validators: Validators.required })
  });
  constructor(private route: ActivatedRoute, private VitalSings: VitalSignsService) { }
  ngOnInit(): void {
    this.route$ = this.route.params.subscribe((value: Params) => {
      this.uuid = value['id'];
      this.tabIndex= value['tabIndex'];
      this.VitalSings.getPatient(this.uuid).subscribe((paciente: Patient) => {
        this.profileForm.patchValue({ firstName: paciente.firstName, lastName: paciente.lastName, bloodPressureMax: paciente.bloodPressureMax, bloodPressureMin: paciente.bloodPressureMin, pulse: paciente.pulse })
      });
    })
  }

  closeDialog() {
    this.router.navigate(['crudPaciente']);
  }

  saveDialog() {
    this.VitalSings.putPatient({
      id: this.uuid,
      firstName:this.profileForm.controls.firstName.value,
      lastName:this.profileForm.controls.lastName.value,
      bloodPressureMax: this.profileForm.controls.bloodPressureMax.value,
      bloodPressureMin: this.profileForm.controls.bloodPressureMin.value,
      pulse: this.profileForm.controls.pulse.value
    }).subscribe((next) => {
      this.matSnackBar.open('Signos vitales actualizado', '', { duration: 500 })
      this.router.navigate(['crudPaciente']);
    })
  }

  agregarMedicamentos() {
    this.router.navigate(['addMedicamentos',this.uuid]);
  }

  agregarHistoria(){
    this.router.navigate(['addHistory',this.uuid])
  }

  ngOnDestroy(): void {
    this.route$.unsubscribe()
  }


}
