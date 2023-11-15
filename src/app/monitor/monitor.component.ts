import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { VitalSignsService } from "../vital-signs.service";
import { Observable } from 'rxjs';
import { PatientDocument } from "../patient-document";
import { Socket } from 'ngx-socket-io';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-monitor',
  templateUrl: './monitor.component.html',
  styleUrl: './monitor.component.css'
})
export class MonitorComponent implements OnInit, OnDestroy {
  private vitalSigns = inject(VitalSignsService);
  private socket = inject(Socket);
  private snackBar= inject(MatSnackBar);
  public getPatients$: Observable<PatientDocument[]> | undefined;
  public getSocket$: Observable<any> | undefined;
  constructor() { }
  ngOnInit(): void {
    this.getPatients$ = this.vitalSigns.getPatients();
    this.getSocket$ = this.socket.fromEvent<any>("dataChange");
    this.getSocket$.subscribe((_document) => {
      this.snackBar.open('Cambio en signos vitales','',{duration:500})
      this.getPatients$ = this.vitalSigns.getPatients();
    });
  }
  ngOnDestroy(): void {
  }
}
