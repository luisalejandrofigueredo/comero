import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomepageComponent } from './homepage/homepage.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavigatorComponent } from './navigator/navigator.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { AddPatientComponent } from './add-patient/add-patient.component';
import { MAT_DIALOG_DATA, MAT_DIALOG_DEFAULT_OPTIONS, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { provideHttpClient } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MonitorComponent } from './monitor/monitor.component';
import { ChangeEstateComponent } from './change-estate/change-estate.component';
import { MatBadgeModule } from '@angular/material/badge';
import { DoctorDashboardComponent } from './doctor-dashboard/doctor-dashboard.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { CrudPacienteComponent } from './crud-paciente/crud-paciente.component';
import { EditPacienteComponent } from './edit-paciente/edit-paciente.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSliderModule } from '@angular/material/slider';
import { MatTabsModule } from "@angular/material/tabs";
import { ZoomComponent } from './zoom/zoom.component';
import { MedicamentosComponent } from './medicamentos/medicamentos.component';
import {MatChipsModule} from '@angular/material/chips';
import { AddMedicamentosComponent } from './add-medicamentos/add-medicamentos.component';


const config: SocketIoConfig = { url: 'http://localhost:3000', options: { withCredentials: true } };
@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    NavigatorComponent,
    AddPatientComponent,
    MonitorComponent,
    ChangeEstateComponent,
    DoctorDashboardComponent,
    CrudPacienteComponent,
    EditPacienteComponent,
    ZoomComponent,
    MedicamentosComponent,
    AddMedicamentosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    SocketIoModule.forRoot(config),
    MatSnackBarModule,
    MatBadgeModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatTooltipModule,
    MatSliderModule,
    MatTabsModule,
    MatChipsModule
  ],
  providers: [provideHttpClient(), 
  {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: false}}
],
  bootstrap: [AppComponent]
})
export class AppModule { }
