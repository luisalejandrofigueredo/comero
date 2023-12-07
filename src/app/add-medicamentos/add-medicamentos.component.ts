import { Component, OnDestroy, OnInit, Optional, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MedicamentosService } from '../services/medicamentos.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-medicamentos',
  templateUrl: './add-medicamentos.component.html',
  styleUrl: './add-medicamentos.component.css'
})
export class AddMedicamentosComponent implements OnInit, OnDestroy {
  private activatedRoute = inject(ActivatedRoute)
  private router = inject(Router)
  private medicamentosService = inject(MedicamentosService);
  private matSnackBar = inject(MatSnackBar)
  private route$: Subscription | undefined;
  private uuid: string = '';
  constructor() { }
  profileForm = new FormGroup({
    drug: new FormControl<string>('', { nonNullable: true, validators: Validators.required }),
    type: new FormControl<string>("", { nonNullable: true, validators: Validators.required }),
    units: new FormControl<string>("", { nonNullable: true, validators: Validators.required }),
    canty:new FormControl<number>(0, { nonNullable: true, validators: Validators.required }),
  });

  ngOnInit(): void {
    this.route$ = this.activatedRoute.params.subscribe((value: Params) => {
      this.uuid = value['id'];
    })
  }

  saveDialog() {
    this.medicamentosService.addMedicamento({ idPatient: this.uuid, canty: this.profileForm.controls.canty.value, name: this.profileForm.controls.drug.value,type:this.profileForm.controls.type.value,units:this.profileForm.controls.units.value })
      .subscribe({
        next: medicamento => {
          this.matSnackBar.open(`Medicamento agregado ${medicamento.name}`, '', { duration: 500 });
          this.router.navigate(['editPaciente', this.uuid]);
        },error: _error=>{ this.matSnackBar.open(`Error al agregar medicamento`, '', { duration: 500 });}
      })
  }

  closeDialog() {
    this.router.navigate(['editPaciente', this.uuid]);
  }
  ngOnDestroy(): void {
    this.route$?.unsubscribe();
  }
}
