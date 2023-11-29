import { AfterViewInit, Component, ViewChild, inject } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { DoctorDashboardDataSource, DoctorDashboardItem } from './doctor-dashboard-datasource';
import { VitalSignsService } from "../vital-signs.service";
import { Socket } from 'ngx-socket-io';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ZoomComponent  } from "../zoom/zoom.component";
import { PatientDocument } from '../patient-document';
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
  private madDialog=inject(MatDialog);
  public getSocket$: Observable<any> | undefined;
  public getFromDelete$:Observable<PatientDocument>| undefined
  public getFromUpdate$:Observable<PatientDocument>| undefined
  public getFromInsert$:Observable<PatientDocument>| undefined

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['firstName','lastName', 'bloodPressureMin', 'bloodPressureMax', 'pulse','zoom'];
  constructor(public dialogRef: MatDialogRef<DoctorDashboardComponent>) { }

  ngAfterViewInit(): void {
    this.vitalSingsService.getPatients().subscribe((data:PatientDocument[]) => {
      this.paginator._intl = new MatPaginatorIntl();
      this.paginator._intl.itemsPerPageLabel = "Items por página"
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
    this.getSocket$ = this.socket.fromEvent<PatientDocument>("dataChange");
    this.getFromDelete$ = this.socket.fromEvent<PatientDocument>("deleteRecord");
    this.getFromInsert$ = this.socket.fromEvent<PatientDocument>("insertRecord");
    this.getFromUpdate$ = this.socket.fromEvent<PatientDocument>("updateRecord");
    this.getFromDelete$.subscribe((document:any)=>{
      const ind=this.dataSource.data.findIndex((data:DoctorDashboardItem)=>{ return data.id === document.documentData.id} );
      this.dataSource.data.splice(ind,1);
      this.refresh();
    });
    this.getFromUpdate$.subscribe((document:any)=>{
      if (document.documentData!==document.previousDocumentData) {
        const ind=this.dataSource.data.findIndex((data:DoctorDashboardItem)=>{ return data.id === document.documentData.id} );
        this.dataSource.data[ind]=document.documentData as DoctorDashboardItem;
        this.refresh();
      }
    });
    this.getFromInsert$.subscribe((document:any)=>{
      this.dataSource.data.push(JSON.parse(JSON.stringify(document.documentData as DoctorDashboardItem)));
      this.refresh();
    });
  }

  close() {
    this.dialogRef.close()
  }

  zoom(id:string){
    this.madDialog.open(ZoomComponent,{disableClose:true,data:id})
  }
}


