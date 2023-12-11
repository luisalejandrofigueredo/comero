import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrudPacienteComponent } from "./crud-paciente/crud-paciente.component";
import { EditPacienteComponent } from './edit-paciente/edit-paciente.component';
import { AddPatientComponent } from './add-patient/add-patient.component';
import { AddMedicamentosComponent } from './add-medicamentos/add-medicamentos.component';
import { AddHistoryComponent } from "./add-history/add-history.component";
import { EditHistoryComponent } from './edit-history/edit-history.component';
import { ComPythonComponent } from "./com-python/com-python.component";
const routes: Routes = [{
  component: CrudPacienteComponent, path: 'crudPaciente'
},
{ component: EditPacienteComponent, path: 'editPaciente/:id/:tabIndex' },
{ component: AddPatientComponent, path: 'addPatient' },
{ component: AddMedicamentosComponent, path: 'addMedicamentos/:id' },
{ component: AddHistoryComponent, path: 'addHistory/:id' },
{ component: EditHistoryComponent, path: 'editHistory/:id' },
{ component: ComPythonComponent, path: 'comPython' }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
