import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogModule ,MatDialogClose,MatDialogActions,MatDialogContent,MatDialogTitle, MAT_DIALOG_DEFAULT_OPTIONS, MatDialogConfig} from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
@Component({
  selector: 'app-yes-no',
  standalone: true,
  imports: [CommonModule,MatDialogModule,MatButtonModule],
  providers:[{ provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {disableClose: true,hasBackdrop:true } as MatDialogConfig}],
  templateUrl: './yes-no.component.html',
  styleUrl: './yes-no.component.css'
})
export class YesNOComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public action: {action:string,description:string},private dialogRef:MatDialogRef<YesNOComponent>){}
  ngOnInit(): void {
    this.dialogRef.disableClose=false;
  }
  aceptar(){
    this.dialogRef.close(true);
  }
}
