import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ConfSerialService } from '../services/conf-serial.service';

@Component({
  selector: 'app-edit-bed',
  templateUrl: './edit-bed.component.html',
  styleUrl: './edit-bed.component.css'
})
export class EditBedComponent implements OnInit {
  public signosVitales:string[]=["Pulso","Presión","Oxigeno"];
  private confSerialService = inject(ConfSerialService);
  private router =inject(Router);
  private activatedRoute = inject(ActivatedRoute);
  nBed:number=0;
  profileForm = new FormGroup({
    serial: new FormControl<string>('', { nonNullable: true,validators: Validators.required }),
    sign: new FormControl<string>('', { nonNullable: true, validators: Validators.required }),
    bed: new FormControl<string>('', { nonNullable: true })
  });

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((value:Params)=>{
      this.confSerialService.getOne(parseInt(value['id'])).subscribe({next:value=>{
        this.nBed=value.id!;
        this.profileForm.controls.bed.setValue(value.bed);
        this.profileForm.controls.serial.setValue(value.serial);
        this.profileForm.controls.sign.setValue(value.sign);
      }})
    })
  }

  saveDialog() {
    this.confSerialService.editBed({
      id:this.nBed,
      bed: this.profileForm.controls.bed.value,
      sign: this.profileForm.controls.sign.value,
      serial: this.profileForm.controls.serial.value
    }).subscribe({next:(_editedBed)=>{
      this.router.navigate(['confSerial']);
    }})
  }

  closeDialog() { 
    this.router.navigate(['confSerial']);
  }

}
