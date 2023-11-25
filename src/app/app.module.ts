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
import { MatDialogModule } from '@angular/material/dialog';
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
import {MatTooltipModule} from '@angular/material/tooltip';


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
    EditPacienteComponent
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
    MatTooltipModule
  ],
  providers: [provideHttpClient()],
  bootstrap: [AppComponent]
})
export class AppModule { }
