import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrudPacienteComponent } from "./crud-paciente/crud-paciente.component";
import { EditPacienteComponent } from './edit-paciente/edit-paciente.component';
import { AddPatientComponent } from './add-patient/add-patient.component';
import { AddMedicamentosComponent } from './add-medicamentos/add-medicamentos.component';
import { AddHistoryComponent } from "./add-history/add-history.component";

const routes: Routes = [{
  component: CrudPacienteComponent, path: 'crudPaciente'
},
{ component: EditPacienteComponent, path: 'editPaciente/:id' },
{ component: AddPatientComponent, path: 'addPatient' },
{ component: AddMedicamentosComponent, path: 'addMedicamentos/:id' },
{ component: AddHistoryComponent, path: 'addHistory/:id' }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
