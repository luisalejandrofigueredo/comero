import { AfterViewInit, ChangeDetectorRef, Component, ViewChild, inject } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { VitalSignsService } from '../vital-signs.service';
import { DoctorDashboardDataSource, DoctorDashboardItem } from '../doctor-dashboard/doctor-dashboard-datasource';
import { YesNOComponent } from "../yes-no/yes-no.component";
import { MatSnackBar } from '@angular/material/snack-bar';
import { PatientDocument } from '../patient-document';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
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
  private router=inject(Router);
  public dataSource = new DoctorDashboardDataSource([]);
  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['firstName', 'lastName', 'bloodPressureMin', 'bloodPressureMax', 'pulse', 'edit', 'delete'];
  constructor() { }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
    this.vitalSingsService.getPatients().subscribe(data => {
      this.paginator._intl = new MatPaginatorIntl();
      this.paginator._intl.itemsPerPageLabel = "Items por página"
      this.dataSource = new DoctorDashboardDataSource(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.table.dataSource = this.dataSource;
    })
  }

  refreshDataSource(pacientes: PatientDocument[]) {
    this.paginator._intl = new MatPaginatorIntl();
    this.paginator._intl.itemsPerPageLabel = "Items por página"
    this.dataSource = new DoctorDashboardDataSource(pacientes);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }

  addPaciente() {
    this.router.navigate(['addPatient']);
  }

  editPaciente(id: string) {
    this.router.navigate(['/editPaciente',id]);
  }

  deletePaciente(id: string) {
    this.vitalSingsService.getPatient(id).subscribe((paciente) => {
      this.addPacienteDialog.open(YesNOComponent, { enterAnimationDuration:500,disableClose: true, data: { action: 'Egresar', description: `Desea egresar a ${paciente.firstName} ${paciente.lastName}` } }).afterClosed().subscribe((respuesta: boolean) => {
        if (respuesta === true) {
          this.vitalSingsService.deletePatient(id).subscribe((ok) => {
            this.matSnackBar.open('Paciente egresado', '', { duration: 500 });
            this.vitalSingsService.getPatients().subscribe(pacientes => {
              this.refreshDataSource(pacientes);
            })
          });
        }
      });
    });
  }
}
