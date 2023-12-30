import { Component, Input, OnChanges, OnInit, SimpleChanges, inject } from '@angular/core';
import { MedicamentosService } from "../services/medicamentos.service";
import { MedicamentosDocument } from "../medicamentos-document";
import { MatSnackBar } from '@angular/material/snack-bar';
import { YesNOComponent } from '../yes-no/yes-no.component';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-medicamentos',
  templateUrl: './medicamentos.component.html',
  styleUrl: './medicamentos.component.css'
})
export class MedicamentosComponent implements OnInit,OnChanges{
  @Input() uuid: string = '';
  medicamentosService = inject(MedicamentosService);
  matSnackBar = inject(MatSnackBar);
  medicamentosDialog= inject(MatDialog);
  medicamentos: MedicamentosDocument[] = [];
  currentTime=Date.now();
  
  ngOnInit(): void {
    this.medicamentosService.getMedicamentos(this.uuid).subscribe((medicamentos: MedicamentosDocument[]) => {
      this.medicamentos = medicamentos;
    })
    setInterval(() => {
      this.currentTime =Date.now();
    }, 10000);
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.medicamentosService.getMedicamentos(this.uuid).subscribe((medicamentos: MedicamentosDocument[]) => {
      this.medicamentos = medicamentos;
    })  
  }

  remove(id:string,name:string){
    this.medicamentosDialog.open(YesNOComponent, { closeOnNavigation:false,role:'alertdialog',enterAnimationDuration:500,disableClose: false, data: { action: 'Borrar', description: `Desea borrar al medicamento ${name}` } }).afterClosed().subscribe((respuesta: boolean) => {
      if (respuesta === true) {
        this.medicamentosService.deleteMedicamento(id).subscribe({next: document=>{
          this.medicamentosService.getMedicamentos(this.uuid).subscribe((medicamentos: MedicamentosDocument[]) => {
            this.medicamentos = medicamentos;
            this.matSnackBar.open(`Medicamento borrado ${document.name}`,'',{duration:500});
          });
        }});
      }
    });
  }
}
