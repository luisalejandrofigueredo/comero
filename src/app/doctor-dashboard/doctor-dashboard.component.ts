import { AfterViewInit, Component, ViewChild, inject } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { DoctorDashboardDataSource, DoctorDashboardItem } from './doctor-dashboard-datasource';
import { VitalSignsService } from "../vital-signs.service";
import { Socket } from 'ngx-socket-io';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-doctor-dashboard',
  templateUrl: './doctor-dashboard.component.html',
  styleUrls: ['./doctor-dashboard.component.css']
})
export class DoctorDashboardComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<DoctorDashboardItem>;
  private vitalSingsService = inject(VitalSignsService)
  public dataSource = new DoctorDashboardDataSource([]);
  private socket = inject(Socket);
  private snackBar = inject(MatSnackBar);
  public getSocket$: Observable<any> | undefined;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'bloodPressureMin', 'bloodPressureMax', 'pulse'];

  ngAfterViewInit(): void {
    this.vitalSingsService.getPatients().subscribe(data => {
      this.dataSource = new DoctorDashboardDataSource(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.table.dataSource = this.dataSource;
    })
  }



  ngOnInit(): void {
    this.getSocket$ = this.socket.fromEvent<any>("dataChange");
    this.getSocket$.subscribe((_document) => {
      this.snackBar.open('Cambio en signos vitales', '', { duration: 500 })
      this.vitalSingsService.getPatients().subscribe((documents) => {
        this.dataSource = new DoctorDashboardDataSource(documents);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.table.dataSource = this.dataSource;
      })
    });
  };
}
    
