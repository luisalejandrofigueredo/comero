import { AfterViewInit, Component, ViewChild, inject } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { VitalSignsService } from '../services/vital-signs.service';
import { EstadoPacientesService } from "../services/estado-pacientes.service";
import { DoctorDashboardDataSource, DoctorDashboardItem } from '../doctor-dashboard/doctor-dashboard-datasource';
import { YesNOComponent } from "../yes-no/yes-no.component";
import { MatSnackBar } from '@angular/material/snack-bar';
import { PatientDocument } from '../patient-document';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-crud-paciente',
  templateUrl: './crud-paciente.component.html',
  styleUrls: ['./crud-paciente.component.css']
})
export class CrudPacienteComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<DoctorDashboardItem>;
  private vitalSingsService = inject(VitalSignsService)
  private addPacienteDialog = inject(MatDialog);
  private matSnackBar = inject(MatSnackBar);
  private estadoPaciente= inject(EstadoPacientesService)
  private router = inject(Router);
  public dataSource = new DoctorDashboardDataSource([]);
  private vitalSingsService$:Subscription|undefined;
  private vitalSingsServiceDel$:Subscription|undefined;
  private vitalSingsServiceGet$:Subscription|undefined;
  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['firstName', 'lastName', 'bloodPressureMin', 'bloodPressureMax', 'pulse', 'oxygen', 'edit', 'delete'];
  constructor() { }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
    this.vitalSingsService.getPatients().subscribe(data => {
      this.dataSource = new DoctorDashboardDataSource(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.table.dataSource = this.dataSource;
      this.estadoPaciente.update(data.length);
    })
  }

  refreshDataSource(pacientes: PatientDocument[]) {
    this.dataSource = new DoctorDashboardDataSource(pacientes);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }

  addPaciente() {
    this.router.navigate(['addPatient']);
  }

  editPaciente(id: string) {
    this.router.navigate(['/editPaciente', id, 0]);
  }

  deletePaciente(id: string) {
    this.vitalSingsService$=this.vitalSingsService.getPatient(id).subscribe((paciente) => {
      this.addPacienteDialog.open(YesNOComponent, { enterAnimationDuration: 500, disableClose: true, data: { action: $localize `:@@egresar:Egresar`, description: $localize `:@@pregunta_egresar:Desea egresar a ${paciente.firstName} ${paciente.lastName}` } }).afterClosed().subscribe((respuesta: boolean) => {
        if (respuesta === true) {
          this.vitalSingsServiceDel$=this.vitalSingsService.deletePatient(id).subscribe((ok) => {
            this.matSnackBar.open($localize `:@@paciente_egresado:Paciente egresado`, '', { duration: 500 });
            this.vitalSingsServiceGet$=this.vitalSingsService.getPatients().subscribe(pacientes => {
              this.refreshDataSource(pacientes);
            })
          });
        }
      });
    });
  }

  ngOnDestroy(): void {
    this.vitalSingsService$?.unsubscribe()
    this.vitalSingsServiceDel$?.unsubscribe();
    this.vitalSingsServiceGet$?.unsubscribe();
  }
}
