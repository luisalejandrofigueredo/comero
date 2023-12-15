import { AfterViewInit, Component, OnDestroy, ViewChild, inject } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { DoctorDashboardDataSource, DoctorDashboardItem } from './doctor-dashboard-datasource';
import { VitalSignsService } from "../services/vital-signs.service";
import { Socket } from 'ngx-socket-io';
import { Observable, Subscription } from 'rxjs';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ZoomComponent  } from "../zoom/zoom.component";
import { PatientDocument } from '../patient-document';
import { Router } from '@angular/router';
@Component({
  selector: 'app-doctor-dashboard',
  templateUrl: './doctor-dashboard.component.html',
  styleUrls: ['./doctor-dashboard.component.css']
})
export class DoctorDashboardComponent implements AfterViewInit, OnDestroy {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<DoctorDashboardItem>;
  private vitalSingsService = inject(VitalSignsService)
  public dataSource = new DoctorDashboardDataSource([]);
  private socket = inject(Socket);
  private madDialog=inject(MatDialog);
  private router=inject(Router)
  public getSocket$: Observable<any> | undefined;
  public subScriptionFromUpdate$:Subscription | undefined;
  public subScriptionFromDelete$:Subscription | undefined;
  public subScriptionFromInsert$:Subscription | undefined;
  public getFromDelete$:Observable<PatientDocument>=this.socket.fromEvent<PatientDocument>("deleteRecord");
  public getFromUpdate$:Observable<PatientDocument>=this.socket.fromEvent<PatientDocument>("updateRecord");
  public getFromInsert$:Observable<PatientDocument>=this.socket.fromEvent<PatientDocument>("insertRecord");

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['firstName','lastName', 'bloodPressureMin', 'bloodPressureMax', 'pulse','oxygen','zoom'];
  constructor() { }

  ngAfterViewInit(): void {
    this.vitalSingsService.getPatients().subscribe((data:PatientDocument[]) => {
      this.dataSource = new DoctorDashboardDataSource(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.table.dataSource = this.dataSource;
    })
  }

  refresh(){
    this.dataSource = new DoctorDashboardDataSource(JSON.parse(JSON.stringify(this.dataSource.data)));
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
    this.table.renderRows()
  }



  ngOnInit(): void {
    this.subScriptionFromDelete$=this.getFromDelete$.subscribe((document:any)=>{
      const ind=this.dataSource.data.findIndex((data:DoctorDashboardItem)=>{ return data.id === document.documentData.id} );
      this.dataSource.data.splice(ind,1);
      this.refresh();
    });
    this.subScriptionFromUpdate$=this.getFromUpdate$.subscribe((document:any)=>{
      if (document.documentData!==document.previousDocumentData) {
        const ind=this.dataSource.data.findIndex((data:DoctorDashboardItem)=>{ return data.id === document.documentData.id} );
        this.dataSource.data[ind]=document.documentData as DoctorDashboardItem;
        this.refresh();
      }
    });
    this.subScriptionFromInsert$=this.getFromInsert$.subscribe((document:any)=>{
      this.dataSource.data.push(JSON.parse(JSON.stringify(document.documentData as DoctorDashboardItem)));
      this.refresh();
    });
  }

  close() {
    this.router.navigate(['']);
  }

  zoom(id:string){
    this.madDialog.open(ZoomComponent,{role:'dialog' ,disableClose:true,data:id})
  }

  ngOnDestroy(): void {
    this.subScriptionFromDelete$?.unsubscribe();
    this.subScriptionFromInsert$?.unsubscribe();
    this.subScriptionFromUpdate$?.unsubscribe();    
  }
}


