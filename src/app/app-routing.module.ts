import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrudPacienteComponent } from "./crud-paciente/crud-paciente.component";
import { EditPacienteComponent } from './edit-paciente/edit-paciente.component';
import { AddPatientComponent } from './add-patient/add-patient.component';
import { AddMedicamentosComponent } from './add-medicamentos/add-medicamentos.component';
import { AddHistoryComponent } from "./add-history/add-history.component";
import { EditHistoryComponent } from './edit-history/edit-history.component';
import { ComPythonComponent } from "./com-python/com-python.component";
import { LoginComponent } from "./login/login.component";
import { HomepageComponent } from './homepage/homepage.component';
import { AuthFirebaseGuard } from "./auth-firebase.guard";
import { DoctorDashboardComponent } from "./doctor-dashboard/doctor-dashboard.component";
import { ChatComponent  } from "./chat/chat.component";
const routes: Routes = [
  { component: CrudPacienteComponent, path: 'crudPaciente', canActivate: [AuthFirebaseGuard] },
  { component: EditPacienteComponent, path: 'editPaciente/:id/:tabIndex', canActivate: [AuthFirebaseGuard] },
  { component: AddPatientComponent, path: 'addPatient', canActivate: [AuthFirebaseGuard] },
  { component: AddMedicamentosComponent, path: 'addMedicamentos/:id', canActivate: [AuthFirebaseGuard] },
  { component: AddHistoryComponent, path: 'addHistory/:id', canActivate: [AuthFirebaseGuard] },
  { component: EditHistoryComponent, path: 'editHistory/:id', canActivate: [AuthFirebaseGuard] },
  { component: ComPythonComponent, path: 'comPython', canActivate: [AuthFirebaseGuard] },
  { component: LoginComponent, path: 'login' },
  { component: HomepageComponent, path: '' },
  { component:DoctorDashboardComponent,path:'doctorDashboard',canActivate: [AuthFirebaseGuard]},
  { component:ChatComponent,path:'chat',canActivate: [AuthFirebaseGuard]},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
