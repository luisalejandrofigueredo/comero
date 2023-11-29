import { Component, Inject, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { VitalSignsService } from '../vital-signs.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';
import { Patient } from '../patient';

@Component({
  selector: 'app-zoom',
  templateUrl: './zoom.component.html',
  styleUrl: './zoom.component.css'
})
export class ZoomComponent {
  private socket = inject(Socket);
  public getSocket$: Observable<any> | undefined;
 constructor(@Inject(MAT_DIALOG_DATA) public data: string,public dialogRef: MatDialogRef<ZoomComponent>, private VitalSings: VitalSignsService){}
 profileForm = new FormGroup({
  firstName: new FormControl<string>('', { nonNullable: true, validators: Validators.required }),
  lastName: new FormControl<string>('', { nonNullable: true, validators: Validators.required }),
  bloodPressureMin: new FormControl<number>(100, { nonNullable: true }),
  bloodPressureMax: new FormControl<number>(150, { nonNullable: true}),
  pulse: new FormControl<number>(0, { nonNullable: true, validators: Validators.required })
});
ngOnInit(): void {
  this.profileForm.disable();
  this.VitalSings.getPatient(this.data).subscribe((patient)=>{
    this.profileForm.patchValue({
      firstName:patient.firstName,
      lastName:patient.lastName,
      pulse:patient.pulse,
      bloodPressureMax:patient.bloodPressureMax,
      bloodPressureMin:patient.bloodPressureMin
    })
  })
  this.getSocket$ = this.socket.fromEvent<any>("dataChange");
  this.getSocket$.subscribe((document) => {
    const found = document.find((patient:Patient) => patient.id = this.data);
    this.profileForm.patchValue({
      firstName:found.firstName,
      lastName:found.lastName,
      pulse:found.pulse,
      bloodPressureMax:found.bloodPressureMax,
      bloodPressureMin:found.bloodPressureMin
    })
  })
}
 close(){
  this.dialogRef.close();
 }
}
