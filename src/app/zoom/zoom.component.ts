import { Component, Inject, OnDestroy, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { VitalSignsService } from '../services/vital-signs.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Socket } from 'ngx-socket-io';
import { Observable, Subscription } from 'rxjs';
import { PatientDocument } from '../patient-document';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-zoom',
  templateUrl: './zoom.component.html',
  styleUrl: './zoom.component.css'
})
export class ZoomComponent implements OnDestroy {
  private socket = inject(Socket);
  private matSnackBar = inject(MatSnackBar);
  public subScriptionFromUpdate$: Subscription | undefined;
  public subScriptionFromDelete$: Subscription | undefined;
  public getFromUpdate$: Observable<any> = this.socket.fromEvent<PatientDocument>("updateRecord");
  public getFromDelete$: Observable<any> = this.socket.fromEvent<PatientDocument>("deleteRecord");
  constructor(@Inject(MAT_DIALOG_DATA) public data: string, public dialogRef: MatDialogRef<ZoomComponent>, private VitalSings: VitalSignsService) { }
  profileForm = new FormGroup({
    firstName: new FormControl<string>({value:'',disabled:true}, { nonNullable: true, validators: Validators.required }),
    lastName: new FormControl<string>({value:'',disabled:true}, { nonNullable: true, validators: Validators.required }),
    bloodPressureMin: new FormControl<number>(100, { nonNullable: true }),
    bloodPressureMax: new FormControl<number>(150, { nonNullable: true }),
    pulse: new FormControl<number>({value:0,disabled:true}, { nonNullable: true, validators: Validators.required }),
    oxygen: new FormControl<number>({value:0,disabled:true}, { nonNullable: true, validators: Validators.required })
  });
  ngOnInit(): void {
    this.VitalSings.getPatient(this.data).subscribe((patient) => {
      this.profileForm.patchValue({
        firstName: patient.firstName,
        lastName: patient.lastName,
        pulse: patient.pulse,
        bloodPressureMax: patient.bloodPressureMax,
        bloodPressureMin: patient.bloodPressureMin,
        oxygen:patient.oxygen
      });
    })
    this.subScriptionFromUpdate$ = this.getFromUpdate$.subscribe((document: any) => {
      if (this.data === document.documentData.id) {
        if (document.documentData !== document.previousDocumentData) {
          this.profileForm.patchValue({
            firstName: document.documentData.firstName,
            lastName: document.documentData.lastName,
            pulse: document.documentData.pulse,
            bloodPressureMax: document.documentData.bloodPressureMax,
            bloodPressureMin: document.documentData.bloodPressureMin,
            oxygen:document.oxygen
          });
          if (document.documentData.pulse !== document.previousDocumentData.pulse) {
            this.matSnackBar.open(`El pulso ha variado en:${document.documentData.pulse - document.previousDocumentData.pulse}`, '', { duration: 1000 })
          }
          if (document.documentData.bloodPressureMax !== document.previousDocumentData.bloodPressureMax) {
            this.matSnackBar.open(`La maxima ha variado en:${document.documentData.bloodPressureMax - document.previousDocumentData.bloodPressureMax}`, '', { duration: 1000 })
          }
          if (document.documentData.bloodPressureMin !== document.previousDocumentData.bloodPressureMin) {
            this.matSnackBar.open(`La minima ha variado en:${document.documentData.bloodPressureMin - document.previousDocumentData.bloodPressureMin}`, '', { duration: 1000 })
          }
          if (document.documentData.oxygen !== document.previousDocumentData.oxygen) {
            this.matSnackBar.open(`La saturación de oxígeno ha variado en:${document.documentData.oxygen - document.previousDocumentData.oxygen}`, '', { duration: 1000 })
          }

        }
      }
    });
    this.subScriptionFromDelete$ = this.getFromDelete$.subscribe((document) => {
      if (document.documentData.id === this.data) {
        this.dialogRef.close();
      }
    });
  }
  
  close() {
    this.dialogRef.close();
  }

  ngOnDestroy(): void {
    this.subScriptionFromUpdate$?.unsubscribe();
    this.subScriptionFromDelete$?.unsubscribe()
  }

  change(event: number) {
    this.matSnackBar.open('Los valores no pueden ser cambiados en el monitor', '', { duration: 1000 })
    this.VitalSings.getPatient(this.data).subscribe((patient) => {
      this.profileForm.patchValue({
        firstName: patient.firstName,
        lastName: patient.lastName,
        pulse: patient.pulse,
        bloodPressureMax: patient.bloodPressureMax,
        bloodPressureMin: patient.bloodPressureMin
      });
    })
  }
}
