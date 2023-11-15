import { Component, inject } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AddPatientComponent } from "../add-patient/add-patient.component";
import { ChangeEstateComponent } from '../change-estate/change-estate.component';
import { MonitorComponent } from "../monitor/monitor.component";
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-navigator',
  templateUrl: './navigator.component.html',
  styleUrls: ['./navigator.component.css']
})
export class NavigatorComponent {

  private breakpointObserver = inject(BreakpointObserver);
  private dialog = inject(MatDialog)

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  addPatient() {
    let dialogRef = this.dialog.open(AddPatientComponent)
  }

  changeState() {
    let dialogRef = this.dialog.open(ChangeEstateComponent)
  }

  monitorComponent(){
    let dialogRef = this.dialog.open(MonitorComponent)
  }
}
