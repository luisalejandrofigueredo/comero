import { AfterViewInit, Component, Input, OnInit, ViewChild, inject } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { TableHistoryDataSource, TableHistoryItem } from './table-history-datasource';
import { HistoryService } from "../services/history.service";
import { Router } from '@angular/router';


@Component({
  selector: 'app-table-history',
  templateUrl: './table-history.component.html',
  styleUrls: ['./table-history.component.css']
})
export class TableHistoryComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<TableHistoryItem>;
  @Input() uuid: string = ''
  private historyService = inject(HistoryService);
  private router=inject(Router);

  dataSource = new TableHistoryDataSource([]);

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['date', 'history','edit'];

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
    this.historyService.getHistory_s(this.uuid).subscribe((data) => {
      this.paginator._intl = new MatPaginatorIntl();
      this.paginator._intl.itemsPerPageLabel = "Items por página"
      this.dataSource = new TableHistoryDataSource(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.table.dataSource = this.dataSource;
    })
  }

  ngOnInit(): void {
    this.historyService.getHistory_s(this.uuid).subscribe((data) => {
      this.paginator._intl = new MatPaginatorIntl();
      this.paginator._intl.itemsPerPageLabel = "Items por página"
      this.dataSource = new TableHistoryDataSource(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.table.dataSource = this.dataSource;
    })
  }

  edit(id: string) {
    this.router.navigate(["editHistory",id])
  }

}
