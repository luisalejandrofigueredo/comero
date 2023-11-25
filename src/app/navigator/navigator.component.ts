import { Component, inject } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { CrudPacienteComponent } from "../crud-paciente/crud-paciente.component";
import { DoctorDashboardComponent } from "../doctor-dashboard/doctor-dashboard.component";
import { MatDialog } from '@angular/material/dialog';
import {VitalSignsService} from '../vital-signs.service'


@Component({
  selector: 'app-navigator',
  templateUrl: './navigator.component.html',
  styleUrls: ['./navigator.component.css']
})
export class NavigatorComponent {

  private breakpointObserver = inject(BreakpointObserver);
  private dialog = inject(MatDialog)
  public vitalSignsService= inject(VitalSignsService);
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  changeState() {
    let dialogRef = this.dialog.open(CrudPacienteComponent,{disableClose:true})
  }

  monitorComponent(){
    let dialogRef = this.dialog.open(DoctorDashboardComponent,{disableClose:true})
  }
}
