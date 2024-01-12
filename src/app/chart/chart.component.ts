import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogModule ,MatDialogClose,MatDialogActions,MatDialogContent,MatDialogTitle, MAT_DIALOG_DEFAULT_OPTIONS, MatDialogConfig} from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css'],
  standalone:true,
  imports:[CommonModule,MatDialogModule,MatButtonModule]
})
export class ChartComponent implements OnInit {

  constructor(private dialogRef:MatDialogRef<ChartComponent>) { }

  ngOnInit() {
  }

  close(){
    this.dialogRef.close()
  }

}
