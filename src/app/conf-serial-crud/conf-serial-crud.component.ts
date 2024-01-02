import { AfterViewInit, Component, OnInit, ViewChild, inject } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ConfSerialCrudDataSource, ConfSerialCrudItem } from './conf-serial-crud-datasource';
import { ConfSerialService } from "../services/conf-serial.service";
import { ConfSerial } from '../interfaces/conf-serial';
import { Router } from "@angular/router";
import { YesNOComponent } from "../yes-no/yes-no.component";
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-conf-serial-crud',
  templateUrl: './conf-serial-crud.component.html',
  styleUrls: ['./conf-serial-crud.component.css']
})
export class ConfSerialCrudComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<ConfSerialCrudItem>;
  dataSource = new ConfSerialCrudDataSource([]);
  confSerialService = inject(ConfSerialService);
  router = inject(Router);
  matDialog = inject(MatDialog);

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'serial', 'sign', 'bed', 'edit', 'delete'];

  ngOnInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
    this.confSerialService.getAll().subscribe({
      next: confSerialVar => {
        this.dataSource = new ConfSerialCrudDataSource(confSerialVar);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.table.dataSource = this.dataSource;
      }
    })
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
    this.confSerialService.getAll().subscribe({
      next: confSerialVar => {
        this.dataSource = new ConfSerialCrudDataSource(confSerialVar);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.table.dataSource = this.dataSource;
      }
    })

  }

  reloadDataSource() {
    this.confSerialService.getAll().subscribe({
      next: confSerialVar => {
        this.dataSource = new ConfSerialCrudDataSource(confSerialVar);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.table.dataSource = this.dataSource;
      }
    });
  }

  addBed(event: MouseEvent) {
    this.router.navigate(['addBed'])
  }

  edit(id: number) {
    this.router.navigate(['editBed', id])
  }

  delete(id: number) {
    this.matDialog.open(YesNOComponent, { data: { action: $localize`:@@borrar:Borrar`, description: $localize`:@@borrar_cama:¿Desea borrar la cama ${id}?` }, enterAnimationDuration: 500 }).afterClosed().subscribe((resDialog) => {
      if (resDialog === true) {
        this.confSerialService.delete(id).subscribe({
          next: _deleted => {
            this.reloadDataSource();
          }
        })
      }
    })
  }
}
