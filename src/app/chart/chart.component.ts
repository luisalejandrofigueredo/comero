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
  imports:[CommonModule,MatDialogModule,MatButtonModule],
  providers:[{ provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: { disableClose: true, hasBackdrop: true,enterAnimationDuration:1000 } as MatDialogConfig }]
})
export class ChartComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data:string,private dialogRef:MatDialogRef<ChartComponent>) { }

  ngOnInit() {
  }

  close(){
    this.dialogRef.close()
  }

}

