import { Component, Inject, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MedicamentosService } from "../services/medicamentos.service";
import { __values } from 'tslib';
import { MedicamentosDocument } from '../medicamentos-document';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-text-history',
  templateUrl: './add-text-history.component.html',
  styleUrl: './add-text-history.component.css'
})
export class AddTextHistoryComponent implements OnInit {
  medicamentosService = inject(MedicamentosService)
  public profileForm:FormGroup=new FormGroup({});
  retText='';
  arrayMedicamentos:MedicamentosDocument[]=[];
  constructor(public dialogRef: MatDialogRef<AddTextHistoryComponent>,@Inject(MAT_DIALOG_DATA) public data: {uuid: string}) { }
  ngOnInit(): void {
    this.medicamentosService.getMedicamentos(this.data.uuid).subscribe({
      next: (array) => {
        for (let index = 0; index < array.length; index++) {
          this.profileForm.addControl(`medicamento${index}`, new FormControl({value:array[index].name,disabled:true},{nonNullable:true}))
          this.profileForm.addControl(`hora${index}`, new FormControl<Date>({value:new Date(array[index].hora),disabled:true},{nonNullable:true}))
          this.profileForm.addControl(`seleccionado${index}`, new FormControl(false))
          this.arrayMedicamentos=array;
        }

      }
    })
  }

  onSubmit(){
    for (let index = 0; index < this.arrayMedicamentos.length; index++) {
      const element = this.arrayMedicamentos[index];
      if (this.profileForm.get(`seleccionado${index}`)?.value===true){
        if (this.profileForm.get(`hora${index}`)?.value!==null){}
        const hora=new Date(this.profileForm.get(`hora${index}`)?.value)  
        this.retText+=this.profileForm.get(`medicamento${index}`)?.value+' suministrado a las '+hora.getHours()+':'+hora.getMinutes()+' del '+hora.toLocaleDateString()+'\n'
      }
    }
    this.dialogRef.close(this.retText)
  }

}
